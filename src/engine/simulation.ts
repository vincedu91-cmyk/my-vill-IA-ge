import { AGENTS, BASE_NOTES, getAgent } from "./agents";
import { bfs } from "./path";
import {
  getScenario,
  involvedAgents,
  runEvents,
  type Scenario,
  type ScenarioKey,
} from "./scenarios";
import type {
  AgentId,
  AgentLive,
  DeepReadonly,
  LiveState,
  NoteState,
  Speed,
  Spot,
  UiState,
  Vec2,
  VillageEvent,
} from "./types";
import {
  NAV_ADJ,
  NAV_POS,
  WALK_SPEED,
  beside,
  brainSpot,
  cafeSpot,
  dirToBrain,
  homeSpot,
} from "./world";

const MAX_DT = 0.05;
const READY_BUBBLE = "Prête pour un brief";
const READY_STATUS = "Prêt. Choisis un brief puis lance-le.";
export const CRYSTAL_POS = { x: 0, y: 4.7, z: 0 };
export const HEAD_Y = 1.9;
export const PARTICLE_COUNT = 6;
export const PARTICLE_DURATION = 0.8;
export const PARTICLE_DELAY = 0.09;

type GateDecision = "ok" | "revision" | "reset";

interface Waypoint extends Vec2 {
  node?: string;
}

interface Mover {
  path: Waypoint[];
  index: number;
  resolve: (arrived: boolean) => void;
}

interface Runtime {
  index: number;
  home: Spot;
  mover: Mover | null;
  coffeeToken: number;
  onBreak: boolean;
}

const ABORTED = Symbol("aborted");

function baseNotes(): NoteState[] {
  return BASE_NOTES.map((path) => ({ path, reads: 0, isNew: false, flash: 0 }));
}

function fileName(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1);
}

function homeSpotOf(id: AgentId): Spot {
  const dept = getAgent(id).dept;
  const mates = AGENTS.filter((a) => a.dept === dept);
  return homeSpot(
    dept,
    mates.findIndex((a) => a.id === id),
    mates.length,
  );
}

export class Simulation {
  private readonly live: LiveState;
  private ui: UiState;
  private readonly listeners = new Set<() => void>();
  private readonly rt: Record<AgentId, Runtime>;
  private timers: { at: number; resolve: () => void }[] = [];
  private runId = 0;
  private runStart = 0;
  private logSeq = 0;
  private involved: Set<AgentId> | null = null;
  private gateResolve: ((d: GateDecision) => void) | null = null;
  private nextCoffee: number;
  private readonly random: () => number;

  constructor(random: () => number = Math.random) {
    this.random = random;
    this.rt = Object.fromEntries(
      AGENTS.map((a, index) => [
        a.id,
        {
          index,
          home: homeSpotOf(a.id),
          mover: null,
          coffeeToken: 0,
          onBreak: false,
        },
      ]),
    ) as Record<AgentId, Runtime>;
    this.live = {
      simT: 0,
      agents: Object.fromEntries(
        AGENTS.map((a) => [a.id, this.restingAgent(a.id)]),
      ) as Record<AgentId, AgentLive>,
      brain: { pulse: 0, cardIndex: 0, cardGlow: 0 },
      particles: [],
    };
    this.live.agents.camille.bubble = { text: READY_BUBBLE, until: null };
    this.ui = {
      phase: "idle",
      status: READY_STATUS,
      progress: 0,
      log: [],
      notes: baseNotes(),
      gate: null,
      deliverables: null,
      selected: null,
      speed: 2,
    };
    this.nextCoffee = 4 + this.random() * 5;
  }

  // ---- Store observable ----

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getUi = (): UiState => this.ui;

  getLive(): DeepReadonly<LiveState> {
    return this.live;
  }

  homeOf(id: AgentId): Spot {
    return this.rt[id].home;
  }

  // ---- Actions ----

  setSpeed(speed: Speed): void {
    this.setUi({ speed });
  }

  select(id: AgentId | null): void {
    this.setUi({ selected: id });
  }

  launch(key: ScenarioKey, brief: string): void {
    if (this.ui.phase === "running" || this.ui.phase === "gate") return;
    const scenario = getScenario(key);
    const events = runEvents(scenario, new Date());
    const id = ++this.runId;
    this.involved = involvedAgents(events);
    for (const who of this.involved) {
      const r = this.rt[who];
      if (!r.onBreak) continue;
      r.coffeeToken++;
      r.onBreak = false;
      this.live.agents[who].cup = false;
      this.live.agents[who].bubble = null;
      void this.goTo(who, r.home);
    }
    this.live.agents.camille.bubble = null;
    this.runStart = this.live.simT;
    this.setUi({
      phase: "running",
      progress: 0,
      log: [],
      gate: null,
      deliverables: null,
    });
    void this.run(id, scenario, brief.trim() || scenario.brief, events);
  }

  approve(): void {
    this.decide("ok");
  }

  requestRevision(): void {
    this.decide("revision");
  }

  reset(): void {
    this.runId++;
    this.involved = null;
    this.decide("reset");
    const timers = this.timers;
    this.timers = [];
    timers.forEach((t) => t.resolve());
    for (const a of AGENTS) {
      const r = this.rt[a.id];
      r.coffeeToken++;
      r.onBreak = false;
      const mover = r.mover;
      r.mover = null;
      mover?.resolve(false);
      this.live.agents[a.id] = this.restingAgent(a.id);
    }
    this.live.agents.camille.bubble = { text: READY_BUBBLE, until: null };
    this.live.particles = [];
    this.live.brain = { pulse: 0, cardIndex: 0, cardGlow: 0 };
    this.setUi({
      phase: "idle",
      status: READY_STATUS,
      progress: 0,
      log: [],
      notes: baseNotes(),
      gate: null,
      deliverables: null,
    });
  }

  tick(realDt: number): void {
    const dt = Math.min(Math.max(realDt, 0), MAX_DT) * this.ui.speed;
    const live = this.live;
    live.simT += dt;
    const now = live.simT;

    for (const a of AGENTS) this.step(a.id, dt);

    if (this.timers.some((t) => t.at <= now)) {
      const due = this.timers.filter((t) => t.at <= now);
      this.timers = this.timers.filter((t) => t.at > now);
      due.forEach((t) => t.resolve());
    }

    for (const a of AGENTS) {
      const b = live.agents[a.id].bubble;
      if (b && b.until !== null && now >= b.until)
        live.agents[a.id].bubble = null;
    }

    const lastStart = now - PARTICLE_DURATION;
    if (live.particles.some((p) => p.start < lastStart)) {
      live.particles = live.particles.filter((p) => p.start >= lastStart);
    }

    live.brain.pulse = Math.max(0, live.brain.pulse - 0.8 * dt);
    live.brain.cardGlow = Math.max(0, live.brain.cardGlow - dt / 1.4);

    if (now >= this.nextCoffee) {
      this.nextCoffee = now + 4 + this.random() * 5;
      this.startCoffee();
    }
  }

  // ---- Interne ----

  private setUi(patch: Partial<UiState>): void {
    this.ui = { ...this.ui, ...patch };
    this.listeners.forEach((l) => l());
  }

  private restingAgent(id: AgentId): AgentLive {
    const home = this.rt[id].home;
    const toBrain = dirToBrain(getAgent(id).dept);
    return {
      id,
      x: home.x,
      z: home.z,
      node: home.node,
      heading: Math.atan2(toBrain.x, toBrain.z),
      walking: false,
      walkDist: 0,
      status: "idle",
      cup: false,
      bubble: null,
    };
  }

  private decide(decision: GateDecision): void {
    const resolve = this.gateResolve;
    if (!resolve) return;
    this.gateResolve = null;
    if (decision !== "reset") this.setUi({ phase: "running", gate: null });
    resolve(decision);
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) =>
      this.timers.push({ at: this.live.simT + ms / 1000, resolve }),
    );
  }

  private spotOf(id: AgentId): Spot {
    const a = this.live.agents[id];
    return { x: a.x, z: a.z, node: a.node };
  }

  /** Annule le déplacement en cours puis marche vers la cible. Résout `false` si annulé. */
  private goTo(id: AgentId, target: Spot): Promise<boolean> {
    const a = this.live.agents[id];
    const r = this.rt[id];
    const previous = r.mover;
    r.mover = null;
    previous?.resolve(false);
    const nodes: Waypoint[] =
      a.node === target.node
        ? []
        : bfs(NAV_ADJ, a.node, target.node).map((node) => ({
            ...(NAV_POS.get(node) as Vec2),
            node,
          }));
    a.walking = true;
    return new Promise((resolve) => {
      r.mover = { path: [...nodes, target], index: 0, resolve };
    });
  }

  private step(id: AgentId, dt: number): void {
    const r = this.rt[id];
    const mover = r.mover;
    if (!mover) return;
    const a = this.live.agents[id];
    let budget = WALK_SPEED * dt;
    while (budget > 0 && mover.index < mover.path.length) {
      const p = mover.path[mover.index];
      const dx = p.x - a.x;
      const dz = p.z - a.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 1e-6) a.heading = Math.atan2(dx, dz);
      if (dist <= budget) {
        a.x = p.x;
        a.z = p.z;
        a.walkDist += dist;
        budget -= dist;
        if (p.node) a.node = p.node;
        mover.index++;
      } else {
        a.x += (dx / dist) * budget;
        a.z += (dz / dist) * budget;
        a.walkDist += budget;
        budget = 0;
      }
    }
    if (mover.index >= mover.path.length) {
      r.mover = null;
      a.walking = false;
      mover.resolve(true);
    }
  }

  private setBubble(id: AgentId, text: string, ms: number | null): void {
    this.live.agents[id].bubble = {
      text,
      until: ms === null ? null : this.live.simT + ms / 1000,
    };
  }

  private log(who: AgentId, text: string): void {
    const entry = {
      id: ++this.logSeq,
      ms: Math.round((this.live.simT - this.runStart) * 1000),
      who,
      text,
    };
    this.setUi({ log: [...this.ui.log, entry] });
  }

  private touchNote(path: string): void {
    const notes = this.ui.notes;
    const found = notes.some((n) => n.path === path);
    this.setUi({
      notes: found
        ? notes.map((n) =>
            n.path === path
              ? { ...n, reads: n.reads + 1, flash: n.flash + 1 }
              : n,
          )
        : [...notes, { path, reads: 1, isNew: true, flash: 1 }],
    });
    const index = BASE_NOTES.indexOf(path);
    this.live.brain = {
      pulse: 1,
      cardIndex: index < 0 ? 0 : index,
      cardGlow: 1,
    };
  }

  private emitParticles(id: AgentId, towardAgent: boolean): void {
    const a = this.live.agents[id];
    const head = { x: a.x, y: HEAD_Y, z: a.z };
    const crystal = { ...CRYSTAL_POS };
    const fresh = Array.from({ length: PARTICLE_COUNT }, (_, k) => ({
      start: this.live.simT + k * PARTICLE_DELAY,
      from: towardAgent ? crystal : head,
      to: towardAgent ? head : crystal,
    }));
    this.live.particles = [...this.live.particles, ...fresh];
  }

  private async run(
    id: number,
    scenario: Scenario,
    brief: string,
    events: readonly VillageEvent[],
  ): Promise<void> {
    const total = events.length;
    try {
      for (const [i, event] of events.entries()) {
        const label = `Étape ${i + 1} sur ${total}`;
        this.setUi({ status: label, progress: (i + 1) / total });
        await this.exec(id, event, label);
      }
      this.setBubble("camille", "Livré", 3000);
      this.involved = null;
      this.setUi({
        phase: "done",
        status: "Terminé",
        progress: 1,
        deliverables: { brief, files: scenario.files },
      });
    } catch (err) {
      if (err !== ABORTED) throw err;
    }
  }

  private async exec(
    id: number,
    event: VillageEvent,
    label: string,
  ): Promise<void> {
    const check = () => {
      if (id !== this.runId) throw ABORTED;
    };
    const pause = async (ms: number) => {
      await this.wait(ms);
      check();
    };
    const walk = async (who: AgentId, spot: Spot) => {
      await this.goTo(who, spot);
      check();
    };
    const agents = this.live.agents;

    switch (event.t) {
      case "say": {
        agents[event.who].status = "working";
        this.setBubble(event.who, event.bubble, event.ms);
        this.log(event.who, event.log);
        await pause(event.ms);
        agents[event.who].status = "idle";
        return;
      }
      case "read":
      case "write": {
        const reading = event.t === "read";
        await walk(event.who, brainSpot(getAgent(event.who).dept));
        this.touchNote(event.note);
        this.emitParticles(event.who, reading);
        this.setBubble(
          event.who,
          `${reading ? "Je lis" : "J'écris"} ${fileName(event.note)}`,
          1500,
        );
        this.log(event.who, `${reading ? "lit" : "écrit"} ${event.note}.`);
        await pause(1500);
        await walk(event.who, this.rt[event.who].home);
        return;
      }
      case "hand": {
        await walk(
          event.from,
          beside(this.spotOf(event.to), this.spotOf(event.from)),
        );
        this.setBubble(event.from, `→ ${event.item}`, 1500);
        this.log(
          event.from,
          `transmet ${event.item} à ${getAgent(event.to).name}.`,
        );
        await pause(900);
        this.setBubble(event.to, "Reçu", 1000);
        await pause(600);
        await walk(event.from, this.rt[event.from].home);
        return;
      }
      case "gate": {
        const owner = event.owner;
        await walk(owner, beside(this.spotOf("vincent"), this.spotOf(owner)));
        for (;;) {
          this.setBubble("vincent", "À valider", null);
          this.setUi({
            phase: "gate",
            status: "En attente de ta validation",
            gate: { title: event.title, text: event.text },
          });
          const decision = await new Promise<GateDecision>((resolve) => {
            this.gateResolve = resolve;
          });
          check();
          this.setUi({ status: label });
          if (decision === "ok") {
            this.log("vincent", "valide le livrable.");
            this.setBubble("vincent", "Validé", 1500);
            break;
          }
          this.log("vincent", "demande une révision.");
          this.setBubble("vincent", "À revoir", 1500);
          agents[owner].status = "working";
          this.setBubble(owner, "Révision…", 2200);
          this.log(owner, "intègre les retours de Vincent.");
          await pause(2200);
          agents[owner].status = "idle";
        }
        await pause(1200);
        await walk(owner, this.rt[owner].home);
        return;
      }
    }
  }

  private startCoffee(): void {
    const candidates = AGENTS.filter((a) => {
      const live = this.live.agents[a.id];
      return (
        !a.human &&
        !this.rt[a.id].onBreak &&
        !live.bubble &&
        !live.walking &&
        live.status === "idle" &&
        !this.involved?.has(a.id)
      );
    });
    if (candidates.length === 0) return;
    const pick = candidates[Math.floor(this.random() * candidates.length)];
    void this.coffee(pick.id);
  }

  private async coffee(id: AgentId): Promise<void> {
    const r = this.rt[id];
    const token = ++r.coffeeToken;
    const stale = () => r.coffeeToken !== token;
    r.onBreak = true;
    await this.goTo(id, cafeSpot(r.index));
    if (stale()) return;
    this.live.agents[id].cup = true;
    this.setBubble(id, "Pause café", 2400);
    await this.wait(2600);
    if (stale()) return;
    await this.goTo(id, r.home);
    if (stale()) return;
    this.live.agents[id].cup = false;
    r.onBreak = false;
  }
}

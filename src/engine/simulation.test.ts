import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import skillsLock from "../../skills-lock.json";
import { AGENTS, LOCAL_AGENT_SKILLS, agentFile, agentFilePath, agentRules, getAgent } from "./agents";
import { bfs } from "./path";
import { SCENARIOS, getScenario, runEvents } from "./scenarios";
import { Simulation } from "./simulation";
import type { AgentId, VillageEvent } from "./types";
import {
  DEPTS,
  HOME_DIST,
  ISLAND_SIZE,
  NAV_ADJ,
  dirToBrain,
  islandCenter,
} from "./world";

const TICK = 0.05;

const flush = () => new Promise<void>((resolve) => setImmediate(resolve));

/** Avance l'horloge jusqu'à ce que `until` soit vrai, ou échoue après `maxSimSeconds`. */
async function advanceUntil(
  sim: Simulation,
  until: () => boolean,
  maxSimSeconds = 600,
): Promise<void> {
  const speed = sim.getUi().speed;
  for (let t = 0; t < maxSimSeconds; t += TICK * speed) {
    if (until()) return;
    sim.tick(TICK);
    await flush();
  }
  throw new Error("Délai dépassé");
}

async function advance(sim: Simulation, simSeconds: number): Promise<void> {
  const end = sim.getLive().simT + simSeconds;
  await advanceUntil(sim, () => sim.getLive().simT >= end, simSeconds + 1);
}

/** Simulation déterministe en vitesse x4. */
function quietSim(): Simulation {
  const sim = new Simulation(() => 0.999);
  sim.setSpeed(4);
  return sim;
}

const actorOf = (e: VillageEvent): AgentId =>
  e.t === "hand" ? e.from : e.t === "gate" ? "vincent" : e.who;

describe("BFS", () => {
  it("relie deux îles voisines par leurs ponts", () => {
    expect(bfs(NAV_ADJ, "D:mairie", "D:contenu")).toEqual([
      "D:mairie",
      "R:mairie",
      "R:contenu",
      "D:contenu",
    ]);
  });

  it("prend le côté le plus court de l'anneau", () => {
    expect(bfs(NAV_ADJ, "D:mairie", "D:conf")).toEqual([
      "D:mairie",
      "R:mairie",
      "R:cafe",
      "R:veille",
      "R:conf",
      "D:conf",
    ]);
  });

  it("gère départ = arrivée et nœud inaccessible", () => {
    expect(bfs(NAV_ADJ, "R:dev", "R:dev")).toEqual(["R:dev"]);
    expect(bfs(NAV_ADJ, "R:dev", "X")).toEqual([]);
  });
});

describe("Monde", () => {
  it("laisse au moins 2 unités entre deux îles voisines", () => {
    DEPTS.forEach((d, i) => {
      const a = islandCenter(d.key);
      const b = islandCenter(DEPTS[(i + 1) % DEPTS.length].key);
      const gap =
        Math.max(Math.abs(a.x - b.x), Math.abs(a.z - b.z)) - ISLAND_SIZE;
      expect(gap).toBeGreaterThanOrEqual(2);
    });
  });

  it("place la Mairie en haut de l'écran", () => {
    const depth = (key: (typeof DEPTS)[number]["key"]) =>
      islandCenter(key).x + islandCenter(key).z;
    for (const d of DEPTS.slice(1))
      expect(depth("mairie")).toBeLessThan(depth(d.key));
  });
});

describe("Positions d'attente", () => {
  const sim = new Simulation();

  it("sont à 2.2 du centre de l'île, côté Cerveau, et distinctes", () => {
    const seen = new Set<string>();
    for (const agent of AGENTS) {
      const home = sim.homeOf(agent.id);
      const c = islandCenter(agent.dept);
      const d = dirToBrain(agent.dept);
      const along = (home.x - c.x) * d.x + (home.z - c.z) * d.z;
      expect(along).toBeCloseTo(HOME_DIST, 6);
      expect(home.node).toBe(`D:${agent.dept}`);
      seen.add(`${home.x.toFixed(3)},${home.z.toFixed(3)}`);
    }
    expect(seen.size).toBe(AGENTS.length);
  });

  it("décale les agents en tangente selon leur nombre", () => {
    const offset = (id: AgentId) => {
      const agent = getAgent(id);
      const home = sim.homeOf(id);
      const c = islandCenter(agent.dept);
      const d = dirToBrain(agent.dept);
      return (home.x - c.x) * -d.z + (home.z - c.z) * d.x;
    };
    expect(offset("camille")).toBeCloseTo(-2.3, 6);
    expect(offset("vincent")).toBeCloseTo(0, 6);
    expect(offset("nina")).toBeCloseTo(2.3, 6);
    expect(["lea", "hugo", "ines"].map((id) => offset(id as AgentId))).toEqual([
      expect.closeTo(-2.3, 6),
      expect.closeTo(0, 6),
      expect.closeTo(2.3, 6),
    ]);
    expect(["theo", "adrien", "lola", "sacha"].map((id) => offset(id as AgentId))).toEqual([
      expect.closeTo(-3.45, 6),
      expect.closeTo(-1.15, 6),
      expect.closeTo(1.15, 6),
      expect.closeTo(3.45, 6),
    ]);
  });
});

describe("Fichier agent", () => {
  it("génère un slug sans accents et le front matter attendu", () => {
    const lea = getAgent("lea");
    expect(agentFilePath(lea)).toBe(
      ".claude/agents/lea-responsable-contenu.md",
    );
    expect(agentFile(lea)).toContain(
      'description: "Responsable contenu du département « Atelier Contenu ».',
    );
    expect(agentFile(lea)).toContain("tools: Read, Write, Grep");
    expect(agentFile(lea)).toContain("  - content-strategy");
    expect(agentFile(lea)).toContain("## Règles");
  });

  it("attribue à chaque agent des compétences installées et spécialisées", () => {
    expect(AGENTS.filter((agent) => agent.specialties.length === 0).every((agent) => agent.skills.length > 0)).toBe(true);
    expect(getAgent("nina").skills).toEqual([
      "ads",
      "analytics",
      "conversion-tracking",
      "attribution",
      "ab-testing",
      "cro",
    ]);
  });

  it("ajoute Adrien à Forge Dev et affiche ses expertises dans sa fiche", () => {
    const adrien = getAgent("adrien");
    expect(adrien.dept).toBe("dev");
    expect(adrien.manager).toBe(false);
    expect(adrien.tools).toEqual(["Read", "Write", "Edit", "Bash"]);
    expect(adrien.specialties.map(({ skill }) => skill)).toEqual([
      "php-symfony-backend",
      "nextjs-ssr-hybrid",
      "rest-api-integration",
      "docker-development",
      "database-optimization",
      "automated-testing",
    ]);
    expect(agentFilePath(adrien)).toBe(
      ".claude/agents/adrien-developpeur-senior-backend-fullstack-ssr.md",
    );
    expect(agentFile(adrien)).toContain("  - php-symfony-backend");
    expect(agentFile(adrien)).toContain(".agents/skills/automated-testing/SKILL.md");
  });

  it("relie Taste à Lola et Noé et conserve logo-design pour Noé", () => {
    for (const id of ["lola", "noe"] as const) {
      const agent = getAgent(id);
      expect(agent.skills).toContain("design-taste-frontend");
      expect(agentFile(agent)).toContain("  - design-taste-frontend");
    }
    expect(getAgent("noe").skills).toContain("logo-design");
    expect(skillsLock.skills["design-taste-frontend"].source).toBe("Leonxlnx/taste-skill");
    expect(skillsLock.skills["logo-design"].source).toBe("kaankiziltug/logo-design-skill");
  });

  it("référence des compétences installées avec leur nom officiel", () => {
    const installed = new Set([...Object.keys(skillsLock.skills), ...LOCAL_AGENT_SKILLS]);
    const assigned = new Set(AGENTS.flatMap((agent) => agent.skills));
    for (const skill of assigned) {
      expect(installed.has(skill), skill).toBe(true);
      const path = resolve(".agents", "skills", skill, "SKILL.md");
      expect(existsSync(path), path).toBe(true);
      expect(readFileSync(path, "utf8")).toMatch(new RegExp(`^name: ${skill}\\r?$`, "m"));
    }
    for (const { skill } of AGENTS.flatMap((agent) => agent.specialties)) {
      const path = resolve(".agents", "skills", skill, "SKILL.md");
      expect(existsSync(path), path).toBe(true);
      expect(readFileSync(path, "utf8")).toMatch(new RegExp(`^name: ${skill}\\r?$`, "m"));
    }
  });

  it("synchronise toutes les fiches, règles, outils et compétences du catalogue", () => {
    const files = readdirSync(resolve(".claude", "agents")).filter((file) => file.endsWith(".md"));
    expect(files.sort()).toEqual(AGENTS.map((agent) => agentFilePath(agent).split("/").at(-1)).sort());
    for (const agent of AGENTS) {
      const source = readFileSync(resolve(agentFilePath(agent)), "utf8").replace(/\r\n/g, "\n");
      expect(agentFile(agent), agent.id).toBe(source);
      expect(agentRules(agent).length, agent.id).toBeGreaterThan(0);
      const frontmatter = source.split("\n---\n")[0];
      const declared = [...frontmatter.matchAll(/^  - ([\w-]+)$/gm)].map((match) => match[1]);
      expect(declared, agent.id).toEqual([...agent.skills, ...agent.specialties.map(({ skill }) => skill)]);
      expect(frontmatter).toContain(`tools:${agent.tools.length ? ` ${agent.tools.join(", ")}` : ""}\n`);
    }
  });

  it("conserve les frontières de Forge Dev et les validations humaines", () => {
    const rules = agentRules(getAgent("adrien")).join("\n");
    for (const expected of ["gestion d’équipe", "architecture globale", "frontend", "Théo", "Sacha", "tu ne valides pas toi-même ta PR"]) {
      expect(rules).toContain(expected);
    }
    expect(agentRules(getAgent("theo")).join("\n")).toContain("validation technique finale");
    expect(agentRules(getAgent("lola")).join("\n")).toContain("Adrien");
    expect(agentRules(getAgent("sacha")).join("\n")).toContain("l'accord humain");
  });
});

describe("Gestion GitHub et GitLab", () => {
  it("attribue la compétence locale à Théo et l’inclut dans sa fiche exportée", () => {
    const theo = getAgent("theo");
    expect(theo.skills).toContain("github-gitlab-management");
    expect(theo.tools).toContain("Bash");
    expect(theo.mission).toContain("GitHub/GitLab");
    expect(agentFilePath(theo)).toBe(".claude/agents/theo-lead-dev.md");
    expect(agentFile(theo)).toContain("  - github-gitlab-management");
    expect(agentFile(theo)).toContain(".agents/skills/github-gitlab-management/SKILL.md");
    expect(LOCAL_AGENT_SKILLS).toContain("github-gitlab-management");
  });
});

describe("Scénarios", () => {
  it("propose la création de vidéos avec Malo dans le parcours", () => {
    const scenario = getScenario("video");

    expect(scenario.label).toBe("Création de vidéos");
    expect(scenario.steps).toContainEqual(
      expect.objectContaining({ t: "say", who: "malo" }),
    );
    expect(scenario.gate[1]).toContain("Aucun fichier réel n’a été généré.");
  });

  it("se terminent par la validation puis la note de journal", () => {
    const date = new Date(2026, 9, 25);
    for (const s of SCENARIOS) {
      const events = runEvents(s, date);
      expect(events.at(-2)).toEqual({
        t: "gate",
        owner: "camille",
        title: s.gate[0],
        text: s.gate[1],
      });
      expect(events.at(-1)).toEqual({
        t: "write",
        who: "camille",
        note: `journal/2026-10-25-${s.slug}.md`,
      });
    }
  });

  it.each(SCENARIOS.map((s) => [s.key]))(
    "exécute « %s » dans l’ordre jusqu’à la livraison",
    async (key) => {
      const sim = quietSim();
      const scenario = getScenario(key);
      sim.launch(key, scenario.brief);
      const gates = [
        ...scenario.steps.filter((step) => step.t === "gate").map((step) => step.title),
        scenario.gate[0],
      ];
      for (const title of gates) {
        await advanceUntil(sim, () => sim.getUi().phase === "gate" && sim.getUi().gate?.title === title);
        sim.approve();
      }
      await advanceUntil(sim, () => sim.getUi().phase === "done");

      const ui = sim.getUi();
      const expected = [...scenario.steps.map(actorOf), "vincent", "camille"];
      expect(ui.log.map((l) => l.who)).toEqual(expected);
      expect(ui.progress).toBe(1);
      expect(ui.status).toBe("Terminé");
      expect(ui.deliverables?.files).toEqual(scenario.files);
      const journal = ui.notes.find((n) => n.path.startsWith("journal/"));
      expect(journal).toMatchObject({ isNew: true, reads: 1 });
      expect(journal?.path).toMatch(
        new RegExp(`^journal/\\d{4}-\\d{2}-\\d{2}-${scenario.slug}\\.md$`),
      );
    },
  );
});

describe("Création de logo", () => {
  it("bloque la préparation du kit jusqu’à la validation des concepts", async () => {
    const sim = quietSim();
    sim.launch("logo", getScenario("logo").brief);
    await advanceUntil(sim, () => sim.getUi().phase === "gate");
    expect(sim.getUi().gate?.title).toBe("Concepts logo à valider");
    const count = sim.getUi().log.length;
    await advance(sim, 20);
    expect(sim.getUi().log).toHaveLength(count);
    expect(sim.getUi().deliverables).toBeNull();
    sim.requestRevision();
    await advanceUntil(sim, () => sim.getUi().phase === "gate");
    expect(sim.getUi().gate?.title).toBe("Concepts logo à valider");
    sim.approve();
    await advanceUntil(sim, () => sim.getUi().gate?.title === getScenario("logo").gate[0]);
    expect(sim.getUi().deliverables).toBeNull();
    sim.approve();
    await advanceUntil(sim, () => sim.getUi().phase === "done");
    expect(sim.getUi().deliverables?.files).toEqual(getScenario("logo").files);
  });
});

describe("Validation humaine", () => {
  it("boucle sur la révision sans dupliquer les événements", async () => {
    const sim = quietSim();
    sim.launch("newsletter", "Test");
    await advanceUntil(sim, () => sim.getUi().phase === "gate");

    for (let round = 0; round < 2; round++) {
      sim.requestRevision();
      sim.requestRevision();
      sim.approve();
      expect(sim.getUi().phase).toBe("running");
      await advanceUntil(sim, () => sim.getUi().phase === "gate");
    }
    sim.approve();
    sim.approve();
    await advanceUntil(sim, () => sim.getUi().phase === "done");

    const texts = sim.getUi().log.map((l) => l.text);
    expect(texts.filter((t) => t === "demande une révision.")).toHaveLength(2);
    expect(
      texts.filter((t) => t === "intègre les retours de Vincent."),
    ).toHaveLength(2);
    expect(texts.filter((t) => t === "valide le livrable.")).toHaveLength(1);
    expect(sim.getUi().deliverables?.brief).toBe("Test");
  });
});

describe("Annulation", () => {
  it("remet tout en place en plein run et ignore les étapes en cours", async () => {
    const sim = quietSim();
    sim.launch("carousel", "Test");
    await advance(sim, 12);
    expect(sim.getUi().log.length).toBeGreaterThan(0);

    sim.reset();

    const live = sim.getLive();
    expect(live.particles).toEqual([]);
    for (const agent of AGENTS) {
      const a = live.agents[agent.id];
      const home = sim.homeOf(agent.id);
      expect([a.x, a.z, a.walking, a.status, a.cup]).toEqual([
        home.x,
        home.z,
        false,
        "idle",
        false,
      ]);
    }
    expect(live.agents.camille.bubble).toEqual({
      text: "Prête pour un brief",
      until: null,
    });

    await advance(sim, 30);
    const ui = sim.getUi();
    expect(ui.phase).toBe("idle");
    expect(ui.log).toEqual([]);
    expect(ui.notes.every((n) => n.reads === 0 && !n.isNew)).toBe(true);
    expect(live.agents.camille.status).toBe("idle");
  });

  it("libère la validation en attente", async () => {
    const sim = quietSim();
    sim.launch("cx", "Test");
    await advanceUntil(sim, () => sim.getUi().phase === "gate");
    sim.reset();
    sim.approve();
    await advance(sim, 10);
    expect(sim.getUi()).toMatchObject({ phase: "idle", gate: null, log: [] });
  });
});

describe("Pause café", () => {
  it("envoie un agent au café puis le ramène", async () => {
    const sim = new Simulation(() => 0);
    sim.setSpeed(4);
    await advanceUntil(
      sim,
      () => AGENTS.some((a) => sim.getLive().agents[a.id].cup),
      30,
    );
    const drinker = AGENTS.find((a) => sim.getLive().agents[a.id].cup);
    expect(drinker?.human).toBe(false);
    await advanceUntil(sim, () => !sim.getLive().agents[drinker!.id].cup, 30);
    const a = sim.getLive().agents[drinker!.id];
    const home = sim.homeOf(drinker!.id);
    expect([a.x, a.z]).toEqual([home.x, home.z]);
  });

  it("rappelle au lancement les agents impliqués qui sont en pause", async () => {
    const sim = new Simulation(() => 0);
    sim.setSpeed(4);
    const isOut = (id: AgentId) => {
      const a = sim.getLive().agents[id];
      const home = sim.homeOf(id);
      return a.x !== home.x || a.z !== home.z;
    };
    // Avec random = 0, le premier candidat est Léa, impliquée dans le carrousel.
    await advanceUntil(sim, () => isOut("lea"), 30);
    sim.launch("carousel", "Test");
    expect(sim.getLive().agents.lea.cup).toBe(false);
    await advanceUntil(sim, () => !isOut("lea"), 30);
    await advance(sim, 20);
    expect(sim.getLive().agents.lea.cup).toBe(false);
  });
});

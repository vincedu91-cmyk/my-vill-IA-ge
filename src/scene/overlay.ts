import * as THREE from "three";
import { AGENTS, getAgent } from "@/engine/agents";
import type { AgentId, DeepReadonly, LiveState } from "@/engine/types";
import { DEPTS, islandPoint } from "@/engine/world";
import { BUILDING_OFFSET } from "./islands";

const BUBBLE_Y = 2.45;
const NAME_Y = 2.3;

interface Tag {
  el: HTMLElement;
  pos: THREE.Vector3;
}

export interface Overlay {
  update(
    camera: THREE.Camera,
    live: DeepReadonly<LiveState>,
    selected: AgentId | null,
    width: number,
    height: number,
  ): void;
  dispose(): void;
}

const scratch = new THREE.Vector3();

function place(
  el: HTMLElement,
  v: THREE.Vector3,
  camera: THREE.Camera,
  width: number,
  height: number,
): void {
  const p = scratch.copy(v).project(camera);
  const x = ((p.x + 1) / 2) * width;
  const y = ((1 - p.y) / 2) * height;
  el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -100%)`;
}

export function createOverlay(root: HTMLElement): Overlay {
  const make = (className: string, text = "") => {
    const el = document.createElement("div");
    el.className = className;
    el.textContent = text;
    root.appendChild(el);
    return el;
  };

  const labels: Tag[] = DEPTS.map((d) => {
    const p = islandPoint(d.key, -BUILDING_OFFSET);
    const y = d.key === "cafe" ? 3.9 : 5.3;
    return {
      el: make(`vlabel vlabel-${d.key}`, d.label),
      pos: new THREE.Vector3(p.x, y, p.z),
    };
  });
  labels.push({
    el: make("vlabel vlabel-brain", "Cerveau"),
    pos: new THREE.Vector3(0, 6.7, 0),
  });

  const bubbles = new Map(AGENTS.map((a) => [a.id, make("vbubble")]));
  const bubbleText = new Map<AgentId, string>();
  const name = make("vname");
  const v = new THREE.Vector3();

  return {
    update(camera, live, selected, width, height) {
      for (const l of labels) place(l.el, l.pos, camera, width, height);

      for (const a of AGENTS) {
        const el = bubbles.get(a.id) as HTMLElement;
        const agent = live.agents[a.id];
        const text = agent.bubble?.text ?? "";
        if (bubbleText.get(a.id) !== text) {
          bubbleText.set(a.id, text);
          el.textContent = text;
          el.hidden = text === "";
        }
        if (!text) continue;
        el.classList.toggle("vbubble-raised", a.id === selected);
        place(el, v.set(agent.x, BUBBLE_Y, agent.z), camera, width, height);
      }

      name.hidden = selected === null;
      if (selected) {
        const agent = live.agents[selected];
        const label = getAgent(selected).name;
        if (name.textContent !== label) name.textContent = label;
        place(name, v.set(agent.x, NAME_Y, agent.z), camera, width, height);
      }
    },
    dispose() {
      root.replaceChildren();
    },
  };
}

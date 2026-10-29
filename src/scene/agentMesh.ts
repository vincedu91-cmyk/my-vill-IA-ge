import * as THREE from "three";
import type { Agent } from "@/engine/agents";
import type { AgentLive, DeepReadonly } from "@/engine/types";
import { agentColor } from "@/engine/world";
import type { Kit } from "./materials";

const PANTS = 0x3a3f4b;
const SHOES = 0x2a2522;
const HUMAN_SHIRT = 0xc21b17;

export interface AgentMesh {
  group: THREE.Group;
  hitbox: THREE.Mesh;
  update(live: DeepReadonly<AgentLive>, dt: number, t: number): void;
}

function angleLerp(from: number, to: number, k: number): number {
  const diff = Math.atan2(Math.sin(to - from), Math.cos(to - from));
  return from + diff * k;
}

export function createAgentMesh(
  agent: Agent,
  kit: Kit,
  hitMat: THREE.Material,
): AgentMesh {
  const shirt = agent.human ? HUMAN_SHIRT : agentColor(agent);
  const group = new THREE.Group();
  const body = new THREE.Group();
  group.add(body);

  const limb = (x: number, y: number) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, y, 0);
    body.add(pivot);
    return pivot;
  };

  const legs = [-0.15, 0.15].map((x) => {
    const pivot = limb(x, 0.6);
    pivot.add(
      kit.box(0.26, 0.6, 0.3, PANTS, 0, -0.3, 0),
      kit.box(0.27, 0.1, 0.34, SHOES, 0, -0.55, 0.03),
    );
    return pivot;
  });
  body.add(kit.box(0.66, 0.8, 0.4, shirt, 0, 1.0, 0));
  const arms = [-0.43, 0.43].map((x) => {
    const pivot = limb(x, 1.32);
    pivot.add(
      kit.box(0.2, 0.62, 0.22, shirt, 0, -0.31, 0),
      kit.box(0.18, 0.14, 0.18, agent.skin, 0, -0.69, 0),
    );
    return pivot;
  });

  body.add(kit.box(0.54, 0.54, 0.54, agent.skin, 0, 1.67, 0));
  body.add(kit.box(0.58, 0.2, 0.58, agent.hair, 0, 1.92, 0));
  const backHair = agent.longHair ? 0.55 : 0.3;
  body.add(
    kit.box(0.58, backHair, 0.12, agent.hair, 0, 1.94 - backHair / 2, -0.26),
  );
  for (const x of [-0.12, 0.12])
    body.add(kit.box(0.08, 0.08, 0.02, 0x111111, x, 1.7, 0.275));
  if (agent.manager)
    body.add(kit.box(0.15, 0.15, 0.04, 0xe0b53a, 0.17, 1.2, 0.21));

  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.065, 0.16, 10),
    kit.mat(0xffffff),
  );
  cup.position.set(0, -0.78, 0.06);
  cup.visible = false;
  arms[1].add(cup);

  const hitbox = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.3, 1.1), hitMat);
  hitbox.position.y = 1.15;
  hitbox.userData.agentId = agent.id;
  group.add(hitbox);

  let swing = 0;
  let heading = 0;
  let first = true;

  return {
    group,
    hitbox,
    update(live, dt, t) {
      group.position.set(live.x, 0, live.z);
      heading = first
        ? live.heading
        : angleLerp(heading, live.heading, Math.min(1, dt * 10));
      first = false;
      group.rotation.y = heading;

      const k = Math.min(1, dt * 10);
      swing += ((live.walking ? 1 : 0) - swing) * k;
      const phase = live.walkDist * 2.2;
      const s = Math.sin(phase) * 0.7 * swing;
      legs[0].rotation.x = s;
      legs[1].rotation.x = -s;
      body.position.y = Math.abs(Math.sin(phase)) * 0.07 * swing;

      let left = -s;
      let right = s;
      if (live.status === "working") {
        left = -1.05 + Math.sin(t * 11) * 0.12;
        right = -1.05 - Math.sin(t * 11) * 0.12;
      }
      if (live.cup) right = -1.3;
      arms[0].rotation.x += (left - arms[0].rotation.x) * k;
      arms[1].rotation.x += (right - arms[1].rotation.x) * k;
      cup.visible = live.cup;
    },
  };
}

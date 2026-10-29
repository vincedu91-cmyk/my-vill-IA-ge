import type { DeptKey, Spot, Vec2 } from "./types";

export interface Dept {
  key: DeptKey;
  name: string;
  label: string;
  color: number;
}

/** Ordre de l'anneau : la Direction (index 0) apparaît en haut de l'écran. */
export const DEPTS: readonly Dept[] = [
  { key: "direction", name: "Direction", label: "Direction", color: 0xc21b17 },
  {
    key: "contenu",
    name: "Atelier Contenu",
    label: "Contenu",
    color: 0x3d78a8,
  },
  {
    key: "agence",
    name: "Agence Interne",
    label: "Agence Interne",
    color: 0xc9892b,
  },
  {
    key: "design",
    name: "Design d'Expériences",
    label: "Design d'Expériences",
    color: 0x5b5f97,
  },
  { key: "conf", name: "Conformité", label: "Conformité", color: 0x8a8d91 },
  { key: "veille", name: "Observatoire", label: "Veille", color: 0x3f8f7b },
  { key: "cafe", name: "Cafétéria", label: "Cafétéria", color: 0x8a5a3c },
];

export const RING_RADIUS = 19;
export const ISLAND_SIZE = 9;
export const BRAIN_RADIUS = 6.5;
export const BRIDGE_START = 6.2;
export const RING_NODE_RADIUS = 4.8;
export const HOME_DIST = 2.2;
export const WALK_SPEED = 7;

const HALF = ISLAND_SIZE / 2;
const CAFE_OFFSETS = [-2.3, -1.15, 0, 1.15, 2.3];
const HOME_OFFSETS: Record<number, readonly number[]> = {
  1: [0],
  2: [-1.2, 1.2],
  3: [-2.3, 0, 2.3],
  4: [-3.45, -1.15, 1.15, 3.45],
  5: [-3.6, -1.8, 0, 1.8, 3.6],
};

export function deptIndex(key: DeptKey): number {
  return DEPTS.findIndex((d) => d.key === key);
}

export function getDept(key: DeptKey): Dept {
  return DEPTS[deptIndex(key)];
}

export function cssColor(color: number): string {
  return `#${color.toString(16).padStart(6, "0")}`;
}

/** Couleur des rôles du village, hors quartier. */
export const VILLAGE_COLOR = 0xc21b17;

export function agentColor(agent: { dept: DeptKey | null }): number {
  return agent.dept ? getDept(agent.dept).color : VILLAGE_COLOR;
}

export function islandAngle(key: DeptKey): number {
  return ((deptIndex(key) * 360) / 7 - 135) * (Math.PI / 180);
}

export function islandCenter(key: DeptKey): Vec2 {
  const a = islandAngle(key);
  return { x: RING_RADIUS * Math.cos(a), z: RING_RADIUS * Math.sin(a) };
}

/** Vecteur unitaire de l'île vers le Cerveau. */
export function dirToBrain(key: DeptKey): Vec2 {
  const a = islandAngle(key);
  return { x: -Math.cos(a), z: -Math.sin(a) };
}

/** Vecteur unitaire tangent à l'anneau. */
export function tangent(key: DeptKey): Vec2 {
  const d = dirToBrain(key);
  return { x: -d.z, z: d.x };
}

/** Distance du centre de l'île au bord du carré, le long de la direction du Cerveau. */
export function edgeDistance(key: DeptKey, inset = 0): number {
  const d = dirToBrain(key);
  return (HALF - inset) / Math.max(Math.abs(d.x), Math.abs(d.z));
}

/** Point de l'île : `along` vers le Cerveau, `side` en tangente. */
export function islandPoint(key: DeptKey, along: number, side = 0): Vec2 {
  const c = islandCenter(key);
  const d = dirToBrain(key);
  const t = tangent(key);
  return {
    x: c.x + d.x * along + t.x * side,
    z: c.z + d.z * along + t.z * side,
  };
}

export const doorNodeId = (key: DeptKey) => `D:${key}`;
export const ringNodeId = (key: DeptKey) => `R:${key}`;

function buildNav() {
  const pos = new Map<string, Vec2>();
  const adj = new Map<string, string[]>();
  const link = (a: string, b: string) => {
    adj.set(a, [...(adj.get(a) ?? []), b]);
    adj.set(b, [...(adj.get(b) ?? []), a]);
  };
  DEPTS.forEach((d, i) => {
    const a = islandAngle(d.key);
    pos.set(doorNodeId(d.key), islandPoint(d.key, edgeDistance(d.key, 0.5)));
    pos.set(ringNodeId(d.key), {
      x: RING_NODE_RADIUS * Math.cos(a),
      z: RING_NODE_RADIUS * Math.sin(a),
    });
    link(doorNodeId(d.key), ringNodeId(d.key));
    link(ringNodeId(d.key), ringNodeId(DEPTS[(i + 1) % DEPTS.length].key));
  });
  return { pos, adj };
}

const NAV = buildNav();
export const NAV_POS: ReadonlyMap<string, Vec2> = NAV.pos;
export const NAV_ADJ: ReadonlyMap<string, readonly string[]> = NAV.adj;

export function homeSpot(
  dept: DeptKey,
  indexInDept: number,
  countInDept: number,
): Spot {
  const side = HOME_OFFSETS[countInDept]?.[indexInDept] ?? 0;
  return { ...islandPoint(dept, HOME_DIST, side), node: doorNodeId(dept) };
}

export function brainSpot(dept: DeptKey): Spot {
  const p = NAV_POS.get(ringNodeId(dept));
  if (!p) throw new Error(`Nœud inconnu : ${dept}`);
  return { ...p, node: ringNodeId(dept) };
}

export function cafeSpot(agentIndex: number): Spot {
  return {
    ...islandPoint("cafe", HOME_DIST, CAFE_OFFSETS[agentIndex % 5]),
    node: doorNodeId("cafe"),
  };
}

/** Point de la Direction où un livrable attend la décision de Vincent, qui n'est pas dans le quartier. */
export const VALIDATION_SPOT: Spot = {
  ...islandPoint("direction", HOME_DIST, 0),
  node: doorNodeId("direction"),
};

/** À côté du destinataire, du côté de l'expéditeur. */
export function beside(dest: Spot, sender: Vec2): Spot {
  return {
    x: dest.x + (sender.x < dest.x ? -1.1 : 1.1),
    z: dest.z + 0.2,
    node: dest.node,
  };
}

import * as THREE from "three";
import {
  BRAIN_RADIUS,
  BRIDGE_START,
  DEPTS,
  ISLAND_SIZE,
  RING_RADIUS,
  dirToBrain,
  edgeDistance,
  islandAngle,
  islandCenter,
  islandPoint,
} from "@/engine/world";
import type { Kit } from "./materials";

const GRASS = 0x79b857;
const DIRT = 0x8f6f4b;
const ROCK = 0x7a6244;
const SLAB = 0xd9cfbd;
const PLANK = 0xb9946a;
const RAIL = 0x7a5a3a;
const BRIDGE_WIDTH = 1.8;
export const BUILDING_OFFSET = 1.3;

function deptIsland(kit: Kit, key: (typeof DEPTS)[number]["key"]): THREE.Group {
  const g = new THREE.Group();
  const c = islandCenter(key);
  g.position.set(c.x, 0, c.z);

  g.add(kit.box(ISLAND_SIZE, 0.35, ISLAND_SIZE, GRASS, 0, -0.175, 0));
  const dirt = kit.box(ISLAND_SIZE, 0.7, ISLAND_SIZE, DIRT, 0, -0.7, 0);
  dirt.castShadow = false;
  g.add(dirt);

  const rock = new THREE.Mesh(
    new THREE.CylinderGeometry(6.364, 1.3, 4, 4),
    kit.mat(ROCK),
  );
  rock.rotation.y = Math.PI / 4;
  rock.position.y = -3.05;
  g.add(rock);

  const d = dirToBrain(key);
  const slab = kit.box(5.4, 0.06, 5.4, SLAB, d.x * 1.8, 0.03, d.z * 1.8);
  slab.castShadow = false;
  g.add(slab);
  return g;
}

function brainIsland(kit: Kit): THREE.Group {
  const g = new THREE.Group();
  const seg = 36;
  const grass = new THREE.Mesh(
    new THREE.CylinderGeometry(BRAIN_RADIUS, BRAIN_RADIUS, 0.35, seg),
    kit.mat(GRASS),
  );
  grass.position.y = -0.175;
  grass.receiveShadow = true;
  const dirt = new THREE.Mesh(
    new THREE.CylinderGeometry(BRAIN_RADIUS, 6.1, 0.7, seg),
    kit.mat(DIRT),
  );
  dirt.position.y = -0.7;
  const rock = new THREE.Mesh(
    new THREE.CylinderGeometry(6.1, 1.5, 5, seg),
    kit.mat(ROCK),
  );
  rock.position.y = -3.55;
  const slab = new THREE.Mesh(
    new THREE.CylinderGeometry(4.3, 4.3, 0.06, seg),
    kit.mat(SLAB),
  );
  slab.position.y = 0.03;
  slab.receiveShadow = true;
  g.add(grass, dirt, rock, slab);
  return g;
}

function bridge(kit: Kit, key: (typeof DEPTS)[number]["key"]): THREE.Group {
  const a = islandAngle(key);
  const end = RING_RADIUS - edgeDistance(key);
  const length = end - BRIDGE_START;
  const mid = BRIDGE_START + length / 2;
  const g = new THREE.Group();
  g.position.set(Math.cos(a) * mid, 0, Math.sin(a) * mid);
  g.rotation.y = -a;

  g.add(kit.box(length, 0.14, BRIDGE_WIDTH, PLANK, 0, -0.07, 0));
  for (const side of [-1, 1]) {
    const z = side * (BRIDGE_WIDTH / 2 - 0.05);
    g.add(kit.box(length, 0.1, 0.1, RAIL, 0, 0.5, z));
    for (let x = -length / 2 + 0.2; x <= length / 2 - 0.2 + 1e-6; x += 1.5) {
      g.add(kit.box(0.1, 0.5, 0.1, RAIL, x, 0.25, z));
    }
  }
  for (let x = -length / 2 + 0.75; x < length / 2; x += 1.5) {
    g.add(kit.box(0.18, 0.03, BRIDGE_WIDTH - 0.2, RAIL, x, 0.015, 0));
  }
  return g;
}

function tree(kit: Kit, x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14, 0.2, 0.7, 6),
    kit.mat(0x6b4a2f),
  );
  trunk.position.y = 0.35;
  const low = new THREE.Mesh(
    new THREE.ConeGeometry(0.95, 1.3, 7),
    kit.mat(0x2f7a3e),
  );
  low.position.y = 1.15;
  const high = new THREE.Mesh(
    new THREE.ConeGeometry(0.68, 1.05, 7),
    kit.mat(0x3f8f4a),
  );
  high.position.y = 1.75;
  for (const m of [trunk, low, high]) {
    m.castShadow = true;
    m.receiveShadow = true;
  }
  g.add(trunk, low, high);
  return g;
}

function islandTrees(
  kit: Kit,
  key: (typeof DEPTS)[number]["key"],
): THREE.Object3D[] {
  const c = islandCenter(key);
  const d = dirToBrain(key);
  const building = islandPoint(key, -BUILDING_OFFSET);
  const spots: [number, number][] = [
    [-3.6, -3.6],
    [3.6, -3.6],
    [-3.6, 3.6],
    [3.6, 3.6],
    [0, -3.7],
    [0, 3.7],
    [-3.7, 0],
    [3.7, 0],
  ];
  return spots
    .filter(([x, z]) => x * d.x + z * d.z <= 1.2)
    .filter(
      ([x, z]) => Math.hypot(c.x + x - building.x, c.z + z - building.z) >= 3.1,
    )
    .map(([x, z]) => tree(kit, c.x + x, c.z + z));
}

export function buildIslands(kit: Kit): THREE.Group {
  const root = new THREE.Group();
  root.add(brainIsland(kit));
  for (const d of DEPTS) {
    root.add(
      deptIsland(kit, d.key),
      bridge(kit, d.key),
      ...islandTrees(kit, d.key),
    );
  }
  const step = (2 * Math.PI) / DEPTS.length;
  DEPTS.forEach((d) => {
    const a = islandAngle(d.key) + step / 2;
    root.add(tree(kit, Math.cos(a) * 5.6, Math.sin(a) * 5.6));
  });
  return root;
}

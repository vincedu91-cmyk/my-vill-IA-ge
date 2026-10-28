import * as THREE from "three";
import { DEPTS, dirToBrain, islandPoint } from "@/engine/world";
import type { DeptKey } from "@/engine/types";
import { BUILDING_OFFSET } from "./islands";
import type { Kit } from "./materials";

const SOCLE = 0xd6c7a8;
const WALL = 0xf0e5cf;
const DOOR = 0x5b3a24;
const FRAME = 0x4a3a30;
const CHIMNEY = 0x8c5a48;
const WOOD = 0xa0754d;
const WOOD_DARK = 0x6b4a2f;
const RED = 0xc21b17;
const WINDOW_OFF = new THREE.Color(0x6e8ea6);
const WINDOW_ON = new THREE.Color(0xffe58a);
const GLOW = new THREE.Color(0xffd36b);
const BLACK = new THREE.Color(0x000000);
const CHIMNEY_TOP = new THREE.Vector3(1.1, 4.65, -0.9);

interface House {
  dept: DeptKey;
  windows: THREE.MeshLambertMaterial;
  puffs: THREE.Mesh<THREE.BufferGeometry, THREE.MeshLambertMaterial>[];
  level: number;
}

export interface Buildings {
  group: THREE.Group;
  update(
    dt: number,
    t: number,
    working: ReadonlySet<DeptKey>,
    reduced: boolean,
  ): void;
}

function windowAt(
  kit: Kit,
  glass: THREE.Material,
  x: number,
  z: number,
  onSideX: boolean,
): THREE.Group {
  const g = new THREE.Group();
  g.position.set(x, 1.9, z);
  if (onSideX) g.rotation.y = Math.PI / 2;
  g.add(
    kit.box(1.25, 1.25, 0.04, FRAME, 0, 0, -0.01),
    kit.box(1.05, 1.05, 0.06, glass, 0, 0, 0.01),
  );
  return g;
}

function house(
  kit: Kit,
  dept: DeptKey,
  color: number,
): { group: THREE.Group; house: House } {
  const g = new THREE.Group();
  const windows = new THREE.MeshLambertMaterial({ color: WINDOW_OFF.clone() });

  g.add(
    kit.box(4.4, 0.4, 4.4, SOCLE, 0, 0.2, 0),
    kit.box(4.2, 2.5, 4.2, WALL, 0, 1.65, 0),
  );
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.45, 1.9, 4),
    kit.mat(color),
  );
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 3.9;
  roof.castShadow = true;
  g.add(roof, kit.box(0.55, 1.1, 0.55, CHIMNEY, 1.1, 4.1, -0.9));

  g.add(kit.box(1.0, 1.7, 0.06, DOOR, 0, 1.25, 2.12));
  g.add(
    windowAt(kit, windows, -1.3, 2.12, false),
    windowAt(kit, windows, 1.3, 2.12, false),
  );
  g.add(
    windowAt(kit, windows, 2.12, -1, true),
    windowAt(kit, windows, 2.12, 1, true),
  );

  const puffGeo = new THREE.IcosahedronGeometry(0.28, 0);
  const puffs = Array.from({ length: 4 }, () => {
    const m = new THREE.Mesh(
      puffGeo,
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    m.visible = false;
    g.add(m);
    return m;
  });
  return { group: g, house: { dept, windows, puffs, level: 0 } };
}

function mairieExtras(
  kit: Kit,
  g: THREE.Group,
): THREE.Mesh<THREE.PlaneGeometry> {
  const apex = 3.9 + 0.95;
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 2.4, 6),
    kit.mat(0x5a5550),
  );
  mast.position.y = apex + 1.2;
  mast.castShadow = true;
  const geo = new THREE.PlaneGeometry(1.3, 0.7, 10, 1);
  geo.translate(0.65, 0, 0);
  const flag = new THREE.Mesh(
    geo,
    new THREE.MeshLambertMaterial({ color: RED, side: THREE.DoubleSide }),
  );
  flag.position.set(0.05, apex + 2.4 - 0.35, 0);
  flag.castShadow = true;
  g.add(mast, flag, kit.box(5.2, 0.2, 1.1, SOCLE, 0, 0.1, 2.75));
  return flag;
}

function cafeteria(kit: Kit): THREE.Group {
  const root = new THREE.Group();
  const d = dirToBrain("cafe");
  const base = islandPoint("cafe", -BUILDING_OFFSET);
  const g = new THREE.Group();
  g.position.set(base.x, 0, base.z);
  g.rotation.y = Math.atan2(d.x, d.z);

  g.add(
    kit.box(4.2, 2.6, 0.3, WALL, 0, 1.3, -1.6),
    kit.box(4.4, 0.25, 0.5, WOOD_DARK, 0, 2.7, -1.6),
  );
  g.add(
    kit.box(3.4, 1.1, 1.2, WOOD, 0, 0.55, -0.6),
    kit.box(3.6, 0.08, 1.35, WOOD_DARK, 0, 1.14, -0.6),
  );
  g.add(
    kit.box(0.55, 0.65, 0.45, 0x2d2a2a, 1.05, 1.5, -0.8),
    kit.box(0.2, 0.12, 0.05, RED, 1.05, 1.62, -0.56),
  );
  const awning = new THREE.Group();
  awning.position.set(0, 2.55, -0.85);
  awning.rotation.x = 0.38;
  for (let i = 0; i < 6; i++) {
    awning.add(
      kit.box(
        0.7,
        0.06,
        1.7,
        i % 2 === 0 ? RED : 0xffffff,
        -1.75 + i * 0.7,
        0,
        0,
      ),
    );
  }
  g.add(awning);
  g.add(kit.box(1.7, 0.62, 0.08, 0x2b2626, 0, 3.15, -1.42));
  const signCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.1, 0.24, 10),
    kit.mat(0xffffff),
  );
  signCup.position.set(0, 3.15, -1.36);
  signCup.rotation.x = Math.PI / 2;
  g.add(signCup);
  root.add(g);

  for (const side of [-1.7, 1.7]) {
    const p = islandPoint("cafe", 0.6, side);
    const table = new THREE.Group();
    table.position.set(p.x, 0, p.z);
    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 0.06, 16),
      kit.mat(0xf3efe8),
    );
    top.position.y = 0.75;
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.75, 6),
      kit.mat(0x4a4440),
    );
    leg.position.y = 0.375;
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 1.5, 6),
      kit.mat(0x4a4440),
    );
    pole.position.y = 1.5;
    const parasol = new THREE.Mesh(
      new THREE.ConeGeometry(1.05, 0.45, 8),
      kit.mat(RED),
    );
    parasol.position.y = 2.25;
    table.add(top, leg, pole, parasol);
    for (const [cx, cz] of [
      [0.28, 0.12],
      [-0.25, -0.18],
    ]) {
      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.06, 0.12, 8),
        kit.mat(0xffffff),
      );
      cup.position.set(cx, 0.84, cz);
      table.add(cup);
    }
    table.traverse((o) => {
      o.castShadow = true;
      o.receiveShadow = true;
    });
    root.add(table);
  }
  return root;
}

export function buildBuildings(kit: Kit): Buildings {
  const group = new THREE.Group();
  const houses: House[] = [];
  let flag: THREE.Mesh<THREE.PlaneGeometry> | null = null;

  for (const d of DEPTS) {
    if (d.key === "cafe") {
      group.add(cafeteria(kit));
      continue;
    }
    const built = house(kit, d.key, d.color);
    const p = islandPoint(d.key, -BUILDING_OFFSET);
    built.group.position.set(p.x, 0, p.z);
    if (d.key === "mairie") flag = mairieExtras(kit, built.group);
    group.add(built.group);
    houses.push(built.house);
  }

  const flagRest = flag
    ? Float32Array.from(flag.geometry.attributes.position.array)
    : null;

  return {
    group,
    update(dt, t, working, reduced) {
      const k = Math.min(1, dt * 6);
      for (const h of houses) {
        h.level += ((working.has(h.dept) ? 1 : 0) - h.level) * k;
        h.windows.color.lerpColors(WINDOW_OFF, WINDOW_ON, h.level);
        h.windows.emissive.lerpColors(BLACK, GLOW, h.level);
        h.puffs.forEach((m, i) => {
          const phase = (t * 0.35 + i / 4) % 1;
          m.visible = !reduced && h.level > 0.02;
          if (!m.visible) return;
          m.position.set(
            CHIMNEY_TOP.x + Math.sin(phase * 3 + i) * 0.15,
            CHIMNEY_TOP.y + phase * 1.8,
            CHIMNEY_TOP.z,
          );
          m.scale.setScalar(0.5 + phase * 0.9);
          m.material.opacity = h.level * (1 - phase) * 0.85;
        });
      }
      if (flag && flagRest) {
        const pos = flag.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = flagRest[i * 3];
          pos.setZ(i, reduced ? 0 : Math.sin(x * 4 - t * 5) * 0.12 * (x / 1.3));
        }
        pos.needsUpdate = true;
        flag.geometry.computeVertexNormals();
      }
    },
  };
}

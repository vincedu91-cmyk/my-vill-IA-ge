import * as THREE from "three";

const CLOUD_COUNT = 8;

export interface Clouds {
  group: THREE.Group;
  update(dt: number, reduced: boolean): void;
}

export function buildClouds(): Clouds {
  const group = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
  });
  const geo = new THREE.BoxGeometry(1, 1, 1);

  for (let i = 0; i < CLOUD_COUNT; i++) {
    const a = (i / CLOUD_COUNT) * Math.PI * 2 + ((i * 37) % 10) * 0.04;
    const r = 34 + ((i * 7) % 11);
    const cloud = new THREE.Group();
    cloud.position.set(
      Math.cos(a) * r,
      -7 - ((i * 5) % 9) * 0.45,
      Math.sin(a) * r,
    );
    cloud.rotation.y = -a;
    const puffs = 3 + (i % 3);
    for (let k = 0; k < puffs; k++) {
      const m = new THREE.Mesh(geo, mat);
      const s = 1.6 + ((i + k * 3) % 4) * 0.5;
      m.scale.set(s * 1.6, s * 0.7, s);
      m.position.set(
        (k - (puffs - 1) / 2) * 1.9,
        ((k * 13) % 3) * 0.25,
        (((k * 7) % 3) - 1) * 0.6,
      );
      cloud.add(m);
    }
    group.add(cloud);
  }

  return {
    group,
    update(dt, reduced) {
      if (!reduced) group.rotation.y += dt * 0.012;
    },
  };
}

import * as THREE from "three";
import { CRYSTAL_POS, PARTICLE_DURATION } from "@/engine/simulation";
import type { BrainLive, DeepReadonly, Particle } from "@/engine/types";
import type { Kit } from "./materials";

const CARD_COUNT = 9;
const CARD_LEVELS = [3.2, 3.95, 4.7];
const RING_YS = [1.5, 2.3, 3.1];
const VIOLET = new THREE.Color(0x7c3aed);
const MAX_PARTICLES = 36;

export interface Brain {
  group: THREE.Group;
  update(
    dt: number,
    t: number,
    brain: DeepReadonly<BrainLive>,
    particles: DeepReadonly<Particle[]>,
    simT: number,
    reduced: boolean,
  ): void;
}

export function buildBrain(kit: Kit): Brain {
  const group = new THREE.Group();
  const cyl = (
    top: number,
    bottom: number,
    h: number,
    mat: THREE.Material,
    y: number,
  ) => {
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(top, bottom, h, 24),
      mat,
    );
    m.position.y = y;
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
    return m;
  };

  cyl(2.5, 2.7, 0.7, kit.mat(0x6b7088), 0.35);
  cyl(1.6, 1.9, 2.5, kit.mat(0x4a4e6c), 1.95);
  const ringMat = new THREE.MeshLambertMaterial({
    color: 0x8b5cf6,
    emissive: VIOLET,
    emissiveIntensity: 0.6,
  });
  RING_YS.forEach((y) => cyl(1.72, 1.72, 0.13, ringMat, y));
  cyl(1.15, 2.0, 0.4, kit.mat(0x2d2a3f), 3.4);

  const crystalMat = new THREE.MeshLambertMaterial({
    color: 0xc4b5fd,
    emissive: VIOLET,
    emissiveIntensity: 0.5,
    flatShading: true,
  });
  const crystal = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.95, 0),
    crystalMat,
  );
  crystal.position.set(CRYSTAL_POS.x, CRYSTAL_POS.y, CRYSTAL_POS.z);
  crystal.castShadow = true;
  const light = new THREE.PointLight(0xa78bfa, 0.5, 16, 0);
  light.position.copy(crystal.position);
  group.add(crystal, light);

  const cardGeo = new THREE.BoxGeometry(0.55, 0.72, 0.06);
  const cards = Array.from({ length: CARD_COUNT }, () => {
    const m = new THREE.Mesh(
      cardGeo,
      new THREE.MeshLambertMaterial({
        color: 0xf4f1fb,
        emissive: VIOLET,
        emissiveIntensity: 0,
      }),
    );
    m.castShadow = true;
    group.add(m);
    return m;
  });

  const particleGeo = new THREE.SphereGeometry(0.14, 8, 6);
  const particleMat = new THREE.MeshBasicMaterial({ color: 0xc4b5fd });
  const dots = Array.from({ length: MAX_PARTICLES }, () => {
    const m = new THREE.Mesh(particleGeo, particleMat);
    m.visible = false;
    group.add(m);
    return m;
  });

  let spin = 0;
  let orbit = 0;

  return {
    group,
    update(dt, t, brain, particles, simT, reduced) {
      spin += dt * 0.8;
      orbit += dt * 0.22;
      const pulse = brain.pulse;
      crystal.rotation.set(0.3, spin, 0);
      crystal.position.y =
        CRYSTAL_POS.y + (reduced ? 0 : Math.sin(t * 1.6) * 0.15);
      crystal.scale.setScalar(
        (1 + (reduced ? 0 : Math.sin(t * 2.4) * 0.04)) * (1 + pulse * 0.35),
      );
      crystalMat.emissiveIntensity = 0.5 + pulse * 0.8;
      light.intensity = 0.5 + pulse * 1.4;
      ringMat.emissiveIntensity = 0.6 + pulse * 1.2;

      cards.forEach((card, i) => {
        const a = orbit + (i / CARD_COUNT) * Math.PI * 2;
        card.position.set(Math.cos(a) * 3, CARD_LEVELS[i % 3], Math.sin(a) * 3);
        card.rotation.y = -a + Math.PI / 2;
        card.material.emissiveIntensity =
          i === brain.cardIndex ? brain.cardGlow * 1.4 : 0;
      });

      let n = 0;
      for (const p of particles) {
        const u = (simT - p.start) / PARTICLE_DURATION;
        if (u < 0 || u > 1 || n >= MAX_PARTICLES) continue;
        const dot = dots[n++];
        dot.visible = true;
        dot.position.set(
          p.from.x + (p.to.x - p.from.x) * u,
          p.from.y + (p.to.y - p.from.y) * u + Math.sin(u * Math.PI) * 2.2,
          p.from.z + (p.to.z - p.from.z) * u,
        );
      }
      for (; n < MAX_PARTICLES; n++) dots[n].visible = false;
    },
  };
}

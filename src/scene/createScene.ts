import * as THREE from "three";
import { AGENTS } from "@/engine/agents";
import type { Simulation } from "@/engine/simulation";
import type { AgentId, DeptKey } from "@/engine/types";
import { createAgentMesh } from "./agentMesh";
import { buildBrain } from "./brain";
import { buildBuildings } from "./buildings";
import { buildClouds } from "./clouds";
import { buildIslands } from "./islands";
import { createKit, type Kit } from "./materials";
import { createOverlay } from "./overlay";

const ELEVATION = Math.atan(1 / Math.SQRT2);
const DISTANCE = 140;
const TARGET = new THREE.Vector3(0, -0.5, 0);
const HALF_WIDTH = 29;
const MIN_HALF_HEIGHT = 19;
/** Valeurs d'intensité du prototype, exprimées en éclairage hérité (×π en éclairage physique). */
const LIGHT_SCALE = Math.PI;

export interface SceneOptions {
  container: HTMLElement;
  overlay: HTMLElement;
  sim: Simulation;
  onPick(id: AgentId): void;
}

export interface SceneHandle {
  rotate(direction: 1 | -1): void;
  dispose(): void;
}

function selectionRing(): THREE.Mesh {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.62, 0.82, 32),
    new THREE.MeshBasicMaterial({ color: 0xc21b17, side: THREE.DoubleSide }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.visible = false;
  return ring;
}

function addLights(scene: THREE.Scene): void {
  scene.add(new THREE.HemisphereLight(0xffffff, 0xaebf9a, 0.82 * LIGHT_SCALE));
  const sun = new THREE.DirectionalLight(0xffffff, 0.7 * LIGHT_SCALE);
  sun.position.set(8, 30, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const cam = sun.shadow.camera;
  cam.left = -38;
  cam.right = 38;
  cam.top = 38;
  cam.bottom = -38;
  cam.near = 1;
  cam.far = 120;
  sun.shadow.bias = -0.0007;
  scene.add(sun);
}

function buildAgents(kit: Kit, scene: THREE.Scene) {
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const meshes = AGENTS.map((a) => {
    const m = createAgentMesh(a, kit, hitMat);
    scene.add(m.group);
    return [a.id, m] as const;
  });
  return new Map(meshes);
}

export function createScene({
  container,
  overlay,
  sim,
  onPick,
}: SceneOptions): SceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -300, 500);
  const kit = createKit();
  addLights(scene);

  const brain = buildBrain(kit);
  const buildings = buildBuildings(kit);
  const clouds = buildClouds();
  scene.add(buildIslands(kit), buildings.group, brain.group, clouds.group);
  const agents = buildAgents(kit, scene);
  const hitboxes = [...agents.values()].map((m) => m.hitbox);
  const ring = selectionRing();
  scene.add(ring);
  const labels = createOverlay(overlay);

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let azimuth = Math.PI / 4;
  let targetAzimuth = azimuth;
  let width = 1;
  let height = 1;

  const resize = () => {
    width = Math.max(1, container.clientWidth);
    height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height, false);
    const ratio = width / height;
    let halfW = HALF_WIDTH;
    let halfH = halfW / ratio;
    if (halfH < MIN_HALF_HEIGHT) {
      halfH = MIN_HALF_HEIGHT;
      halfW = halfH * ratio;
    }
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  const placeCamera = () => {
    const flat = Math.cos(ELEVATION) * DISTANCE;
    camera.position.set(
      TARGET.x + Math.sin(azimuth) * flat,
      TARGET.y + Math.sin(ELEVATION) * DISTANCE,
      TARGET.z + Math.cos(azimuth) * flat,
    );
    camera.lookAt(TARGET);
  };

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pick = (event: PointerEvent): AgentId | null => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(hitboxes, false)[0];
    return (hit?.object.userData.agentId as AgentId | undefined) ?? null;
  };
  const onClick = (event: PointerEvent) => {
    const id = pick(event);
    if (id) onPick(id);
  };
  const onMove = (event: PointerEvent) => {
    renderer.domElement.style.cursor = pick(event) ? "pointer" : "";
  };
  renderer.domElement.addEventListener("click", onClick);
  renderer.domElement.addEventListener("pointermove", onMove);

  const working = new Set<DeptKey>();
  let last = performance.now();
  let elapsed = 0;
  let frame = 0;

  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    elapsed += dt;
    const reduced = motion.matches;

    sim.tick(dt);
    const live = sim.getLive();
    const selected = sim.getUi().selected;

    azimuth = reduced
      ? targetAzimuth
      : azimuth + (targetAzimuth - azimuth) * Math.min(1, dt * 7);
    placeCamera();

    working.clear();
    for (const a of AGENTS) {
      const state = live.agents[a.id];
      if (state.status === "working") working.add(a.dept);
      agents.get(a.id)?.update(state, dt, elapsed);
    }
    buildings.update(dt, elapsed, working, reduced);
    brain.update(dt, elapsed, live.brain, live.particles, live.simT, reduced);
    clouds.update(dt, reduced);

    ring.visible = selected !== null;
    if (selected) {
      const s = live.agents[selected];
      ring.position.set(s.x, 0.05, s.z);
      ring.rotation.z += dt * 1.5;
    }

    renderer.render(scene, camera);
    labels.update(camera, live, selected, width, height);
  };
  frame = requestAnimationFrame(loop);

  return {
    rotate(direction) {
      targetAzimuth += (direction * Math.PI) / 2;
    },
    dispose() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(
          (m: THREE.Material) => m.dispose(),
        );
      });
      renderer.dispose();
      renderer.domElement.remove();
      labels.dispose();
    },
  };
}

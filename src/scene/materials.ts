import * as THREE from "three";

export interface Kit {
  mat(color: number): THREE.MeshLambertMaterial;
  box(
    w: number,
    h: number,
    d: number,
    color: number | THREE.Material,
    x?: number,
    y?: number,
    z?: number,
  ): THREE.Mesh;
}

/** Matériaux et boîtes partagés pour une scène, libérés avec elle. */
export function createKit(): Kit {
  const mats = new Map<number, THREE.MeshLambertMaterial>();
  const boxes = new Map<string, THREE.BoxGeometry>();
  const mat = (color: number) => {
    let m = mats.get(color);
    if (!m) {
      m = new THREE.MeshLambertMaterial({ color });
      mats.set(color, m);
    }
    return m;
  };
  const box: Kit["box"] = (w, h, d, color, x = 0, y = 0, z = 0) => {
    const key = `${w}|${h}|${d}`;
    let g = boxes.get(key);
    if (!g) {
      g = new THREE.BoxGeometry(w, h, d);
      boxes.set(key, g);
    }
    const mesh = new THREE.Mesh(
      g,
      typeof color === "number" ? mat(color) : color,
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };
  return { mat, box };
}

export function setShadows(
  obj: THREE.Object3D,
  cast: boolean,
  receive: boolean,
): void {
  obj.traverse((o) => {
    o.castShadow = cast;
    o.receiveShadow = receive;
  });
}

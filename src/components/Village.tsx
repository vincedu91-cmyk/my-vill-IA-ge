'use client';

import { useEffect, useImperativeHandle, useRef, useSyncExternalStore, type Ref } from 'react';
import type { Simulation } from '@/engine/simulation';
import { createScene, type SceneHandle } from '@/scene/createScene';

const ARIA_LABEL =
  "Village 3D de la Direction MKD : sept îles flottantes en anneau (Mairie, Contenu, Création, Dev, Conformité, Veille et Cafétéria) reliées par des ponts au Cerveau central. Les agents s'y déplacent pendant un brief.";

let webglSupport: boolean | null = null;

function hasWebGL2(): boolean {
  if (webglSupport === null) {
    const gl = document.createElement('canvas').getContext('webgl2');
    webglSupport = gl !== null;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

export interface VillageHandle {
  rotate(direction: 1 | -1): void;
}

export function Village({ sim, ref }: { sim: Simulation; ref?: Ref<VillageHandle> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneHandle | null>(null);
  const supported = useSyncExternalStore(noopSubscribe, hasWebGL2, () => true);

  useImperativeHandle(ref, () => ({ rotate: (direction) => sceneRef.current?.rotate(direction) }), []);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!supported || !container || !overlay) return;
    const handle = createScene({ container, overlay, sim, onPick: (id) => sim.select(id) });
    sceneRef.current = handle;
    return () => {
      handle.dispose();
      sceneRef.current = null;
    };
  }, [sim, supported]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} role="img" aria-label={ARIA_LABEL} className="scene absolute inset-0">
        {!supported && (
          <p className="flex h-full items-center justify-center p-6 text-center font-medium text-ink">
            La vue 3D demande WebGL, indisponible dans ce navigateur.
          </p>
        )}
      </div>
      <div ref={overlayRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}

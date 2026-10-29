'use client';

import { useEffect, useImperativeHandle, useRef, useSyncExternalStore, type Ref } from 'react';
import type { Simulation } from '@/engine/simulation';
import { createScene, type SceneHandle } from '@/scene/createScene';
import { resolveMoment, type Moment, type MomentChoice } from '@/scene/moments';

const ARIA_LABEL =
  "Quartier Direction MKD de My vill[IA]ge : sept îles flottantes en anneau (Direction, Contenu, Agence Interne, Design d'Expériences, Conformité, Veille et Cafétéria) reliées par des ponts au Cerveau central. Les agents s'y déplacent pendant un brief.";
const CLOCK_MS = 60_000;

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

export function Village({ sim, moment, ref }: { sim: Simulation; moment: MomentChoice; ref?: Ref<VillageHandle> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneHandle | null>(null);
  const shownMoment = useRef<Moment>('jour');
  const supported = useSyncExternalStore(noopSubscribe, hasWebGL2, () => true);

  useImperativeHandle(ref, () => ({ rotate: (direction) => sceneRef.current?.rotate(direction) }), []);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!supported || !container || !overlay) return;
    const handle = createScene({ container, overlay, sim, onPick: (id) => sim.select(id) });
    handle.setMoment(shownMoment.current);
    sceneRef.current = handle;
    return () => {
      handle.dispose();
      sceneRef.current = null;
    };
  }, [sim, supported]);

  // Résolu côté client uniquement : l'heure locale diffère du rendu serveur.
  useEffect(() => {
    const apply = () => {
      const next = resolveMoment(moment, new Date());
      shownMoment.current = next;
      if (containerRef.current) containerRef.current.dataset.moment = next;
      sceneRef.current?.setMoment(next);
    };
    apply();
    if (moment !== 'reel') return;
    const timer = window.setInterval(apply, CLOCK_MS);
    return () => window.clearInterval(timer);
  }, [moment]);

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

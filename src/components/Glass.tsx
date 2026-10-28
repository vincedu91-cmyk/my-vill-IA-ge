'use client';

import LiquidGlass from 'liquid-glass-react';
import { useSyncExternalStore, type ReactNode } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
}

interface GlassPillProps {
  children: ReactNode;
  /** Classes de taille fixes (largeur et hauteur) : liquid-glass mesure la pilule au montage. */
  size: string;
  className?: string;
  radius?: number;
  elastic?: boolean;
}

/** Pilule en verre liquide de taille fixe, posée dans le flux de la page. */
export function GlassPill({ children, size, className = '', radius = 999, elastic = true }: GlassPillProps) {
  const reduced = useReducedMotion();
  return (
    // isolate : les calques mix-blend de la bibliothèque bloquent sinon le flou des panneaux voisins.
    <div className={`pointer-events-auto relative isolate shrink-0 ${size}`}>
      <LiquidGlass
        cornerRadius={radius}
        padding="0"
        displacementScale={48}
        blurAmount={0.2}
        saturation={160}
        aberrationIntensity={1.5}
        elasticity={elastic && !reduced ? 0.12 : 0}
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      >
        <div className={`glass-pill-body ${size} ${className}`} style={{ borderRadius: radius }}>
          {children}
        </div>
      </LiquidGlass>
    </div>
  );
}

'use client';

import type { Simulation } from '@/engine/simulation';
import type { UiState } from '@/engine/types';

const CARD = 'glass-panel pointer-events-auto w-[min(560px,calc(100vw-24px))] rounded-3xl p-4';

export function GatePanel({ sim, gate }: { sim: Simulation; gate: UiState['gate'] }) {
  if (!gate) return null;
  return (
    <section aria-labelledby="gate-title" className={`${CARD} border-2 border-red`}>
      <p className="eyebrow mb-1 flex items-center gap-2 text-red">
        <span aria-hidden="true" className="size-2 rounded-full bg-red motion-safe:animate-pulse" />
        Validation humaine
      </p>
      <h2 id="gate-title" className="mb-1 text-lg font-bold">
        {gate.title}
      </h2>
      <p className="mb-4 text-sm">{gate.text}</p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={() => sim.approve()}>
          Valider
        </button>
        <button type="button" className="btn" onClick={() => sim.requestRevision()}>
          Demander une révision
        </button>
      </div>
    </section>
  );
}

export function Deliverables({ deliverables, onClose }: { deliverables: NonNullable<UiState['deliverables']>; onClose(): void }) {
  return (
    <section aria-labelledby="deliverables-title" className={CARD}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="eyebrow text-success">Livré · validé par Vincent</p>
        <button type="button" className="icon-btn" aria-label="Fermer les livrables" onClick={onClose}>
          ×
        </button>
      </div>
      <h2 id="deliverables-title" className="text-lg font-bold">
        Livrables (simulés)
      </h2>
      <p className="mb-3 text-sm text-muted">{deliverables.brief}</p>
      <ul className="flex flex-wrap gap-1.5">
        {deliverables.files.map((f) => (
          <li key={f} className="rounded-lg border border-line bg-surface px-2 py-1 font-mono text-xs">
            {f}
          </li>
        ))}
      </ul>
    </section>
  );
}

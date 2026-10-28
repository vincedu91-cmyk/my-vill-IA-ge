'use client';

import { useState } from 'react';
import { SCENARIOS, getScenario, type ScenarioKey } from '@/engine/scenarios';
import type { Simulation } from '@/engine/simulation';
import type { Speed, UiState } from '@/engine/types';
import { GlassPill } from './Glass';

const SPEEDS: readonly Speed[] = [1, 2, 4];
const MAX_BRIEF = 140;

/** Barre de commande flottante : type de livrable, brief, lancement, vitesse et réinitialisation. */
export function BriefPanel({ sim, ui }: { sim: Simulation; ui: UiState }) {
  const [key, setKey] = useState<ScenarioKey>('carousel');
  const [brief, setBrief] = useState(getScenario('carousel').brief);
  const [edited, setEdited] = useState(false);
  const busy = ui.phase === 'running' || ui.phase === 'gate';

  const changeScenario = (next: ScenarioKey) => {
    setKey(next);
    if (!edited) setBrief(getScenario(next).brief);
  };

  return (
    <GlassPill size="h-[100px] w-[min(720px,calc(100vw-24px))]" radius={30} elastic={false}>
      <form
        aria-label="Nouveau brief"
        className="flex h-full w-full flex-col justify-center gap-1.5 px-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          sim.launch(key, brief);
        }}
      >
        <div className="flex h-12 items-center gap-2 rounded-full border border-line/80 bg-surface/90 pr-1.5 pl-1.5 shadow-sm">
          <label htmlFor="brief-scenario" className="sr-only">
            Type de livrable
          </label>
          <select
            id="brief-scenario"
            value={key}
            disabled={busy}
            onChange={(e) => changeScenario(e.target.value as ScenarioKey)}
            className="h-9 max-w-[42%] shrink-0 cursor-pointer truncate rounded-full border border-line bg-glass-strong pr-2 pl-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
          >
            {SCENARIOS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
          <label htmlFor="brief-text" className="sr-only">
            Ton brief
          </label>
          <input
            id="brief-text"
            type="text"
            value={brief}
            maxLength={MAX_BRIEF}
            disabled={busy}
            placeholder="Donne une mission à Camille…"
            onChange={(e) => {
              setBrief(e.target.value);
              setEdited(true);
            }}
            className="h-9 min-w-0 flex-1 bg-transparent px-1 text-sm placeholder:text-muted focus-visible:outline-none disabled:opacity-60"
          />
          <span className="shrink-0 text-xs text-muted tabular-nums max-sm:hidden" aria-hidden="true">
            {brief.length}/{MAX_BRIEF}
          </span>
          <button type="submit" className="btn btn-primary h-9 min-h-9 shrink-0 px-4" disabled={busy}>
            Lancer
          </button>
        </div>

        <div className="flex min-w-0 items-center gap-2 px-2 text-xs text-muted">
          <p className="min-w-0 truncate max-md:hidden">Camille orchestre l&apos;équipe. Clique sur un personnage pour voir sa fiche.</p>
          <div className="ml-auto flex shrink-0 items-center gap-1" role="group" aria-label="Vitesse de simulation">
            <span aria-hidden="true" className="mr-0.5">
              Vitesse
            </span>
            {SPEEDS.map((s) => (
              <button key={s} type="button" className="chip min-h-6 px-2" aria-pressed={ui.speed === s} onClick={() => sim.setSpeed(s)}>
                x{s}
              </button>
            ))}
          </div>
          <button type="button" className="chip min-h-6 shrink-0" onClick={() => sim.reset()}>
            Réinitialiser
          </button>
        </div>
      </form>
    </GlassPill>
  );
}

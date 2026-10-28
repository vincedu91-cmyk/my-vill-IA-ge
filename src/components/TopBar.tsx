'use client';

import type { UiState } from '@/engine/types';
import { AGENTS } from '@/engine/agents';
import { BrandMark } from './BrandMark';
import { GlassPill } from './Glass';

export type PanelView = 'agent' | 'journal' | 'brain' | 'team';

const TABS: readonly { view: PanelView | null; label: string }[] = [
  { view: null, label: 'Village' },
  { view: 'journal', label: 'Journal' },
  { view: 'brain', label: 'Cerveau' },
  { view: 'team', label: 'Équipe' },
];

const DOT: Record<UiState['phase'], string> = {
  idle: 'bg-success',
  running: 'bg-red motion-safe:animate-pulse',
  gate: 'bg-warning motion-safe:animate-pulse',
  done: 'bg-success',
};

interface TopBarProps {
  ui: UiState;
  view: PanelView | null;
  onView(view: PanelView | null): void;
  onRotate(direction: 1 | -1): void;
}

export function TopBar({ ui, view, onView, onRotate }: TopBarProps) {
  const active = view === 'agent' ? null : view;
  return (
    <header className="pointer-events-none absolute inset-x-3 top-3 z-30 flex flex-wrap items-center gap-2">
      <div className="glass-panel pointer-events-auto flex h-11 items-center gap-2.5 rounded-full pr-4 pl-1.5">
        <span className="rounded-full bg-red px-2.5 py-1 text-[0.625rem] font-bold tracking-wider text-on-red uppercase max-[1100px]:hidden">Direction MKD</span>
        <h1 className="flex items-center gap-2 pl-2 text-base font-bold whitespace-nowrap min-[1100px]:pl-0">
          <BrandMark className="size-7 shrink-0 text-ink" />
          Village MKD
        </h1>
      </div>

      <GlassPill size="h-11 w-[326px]">
        <nav aria-label="Vues" className="flex w-full items-center justify-between px-1.5">
          {TABS.map((t) => (
            <button
              key={t.label}
              type="button"
              className="tab"
              aria-pressed={active === t.view}
              onClick={() => onView(t.view)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </GlassPill>

      <div className="hidden flex-1 min-[1100px]:block" />

      <GlassPill size="h-11 w-[min(320px,calc(100vw-24px-92px))]" elastic={false}>
        <div className="relative flex h-full w-full min-w-0 items-center gap-2.5 px-4">
          <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${DOT[ui.phase]}`} />
          <span className="shrink-0 font-medium max-sm:hidden">{AGENTS.filter((agent) => !agent.human).length} agents</span>
          <span aria-hidden="true" className="text-muted max-sm:hidden">·</span>
          <p aria-live="polite" className="min-w-0 truncate" title={ui.status}>
            {ui.status}
          </p>
          <div
            role="progressbar"
            aria-label="Avancement du brief"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(ui.progress * 100)}
            className="absolute inset-x-5 bottom-1 h-[3px] overflow-hidden rounded-full bg-black/10"
          >
            <div
              className="h-full rounded-full bg-red transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${ui.progress * 100}%` }}
            />
          </div>
        </div>
      </GlassPill>

      <GlassPill size="h-11 w-[84px]">
        <div className="flex w-full items-center justify-center gap-1">
          <button type="button" className="icon-btn" aria-label="Tourner la vue vers la gauche" onClick={() => onRotate(-1)}>
            ↺
          </button>
          <button type="button" className="icon-btn" aria-label="Tourner la vue vers la droite" onClick={() => onRotate(1)}>
            ↻
          </button>
        </div>
      </GlassPill>
    </header>
  );
}

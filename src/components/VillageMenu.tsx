'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ACTIVE_QUARTIER, QUARTIERS } from '@/engine/quartiers';
import { MOMENT_CHOICES, type MomentChoice } from '@/scene/moments';
import { GlassPill } from './Glass';

interface VillageMenuProps {
  moment: MomentChoice;
  onMoment(moment: MomentChoice): void;
}

/** Menu du village : moment de la journée et choix du quartier. */
export function VillageMenu({ moment, onMoment }: VillageMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const uid = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="pointer-events-auto relative">
      <GlassPill size="h-11 w-11">
        <div className="flex w-full items-center justify-center">
          <button
            ref={triggerRef}
            type="button"
            className="icon-btn"
            aria-label="Quartiers et moment de la journée"
            aria-expanded={open}
            aria-controls={`${uid}-menu`}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 20 20" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="3" width="5.5" height="5.5" rx="1.5" />
              <rect x="11.5" y="3" width="5.5" height="5.5" rx="1.5" />
              <rect x="3" y="11.5" width="5.5" height="5.5" rx="1.5" />
              <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.5" />
            </svg>
          </button>
        </div>
      </GlassPill>

      {open && (
        <div
          id={`${uid}-menu`}
          className="glass-panel absolute top-[calc(100%+8px)] right-0 z-40 flex max-h-[calc(100dvh-80px)] w-[min(320px,calc(100vw-24px))] flex-col gap-4 overflow-y-auto rounded-3xl p-3"
        >
          <section aria-labelledby={`${uid}-moment`}>
            <h2 id={`${uid}-moment`} className="eyebrow mb-2 px-1">
              Moment de la journée
            </h2>
            <div className="grid grid-cols-2 gap-1">
              {MOMENT_CHOICES.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  aria-pressed={moment === choice.id}
                  onClick={() => onMoment(choice.id)}
                  className="h-9 rounded-xl px-2 text-sm font-medium hover:bg-glass-strong aria-pressed:bg-surface aria-pressed:shadow-sm"
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </section>

          <section aria-labelledby={`${uid}-quartiers`}>
            <h2 id={`${uid}-quartiers`} className="eyebrow mb-2 px-1">
              Quartiers du village
            </h2>
            <ul className="flex flex-col gap-1">
              {QUARTIERS.map((quartier) => {
                const active = quartier.id === ACTIVE_QUARTIER.id;
                const soon = quartier.brain === null;
                return (
                  <li key={quartier.id}>
                    <button
                      type="button"
                      disabled={soon}
                      aria-pressed={active}
                      onClick={() => setOpen(false)}
                      className="flex w-full items-start gap-3 rounded-2xl p-2.5 text-left hover:enabled:bg-glass-strong disabled:cursor-not-allowed disabled:opacity-60 aria-pressed:bg-surface aria-pressed:shadow-sm"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">{quartier.name}</span>
                        <span className="block text-xs text-muted">{quartier.description}</span>
                      </span>
                      {active && (
                        <span aria-hidden="true" className="text-red">
                          ✓
                        </span>
                      )}
                      {soon && (
                        <span className="shrink-0 rounded-full border border-line bg-surface px-2 py-0.5 text-[0.625rem] font-bold tracking-wider uppercase">
                          Bientôt
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

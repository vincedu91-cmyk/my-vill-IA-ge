'use client';

import { getAgent } from '@/engine/agents';
import { ACTIVE_QUARTIER, VILLAGE_BRAIN, VILLAGE_NAME } from '@/engine/quartiers';
import type { LogEntry, NoteState } from '@/engine/types';
import { SidePanel } from './SidePanel';

const BRAIN_VERBS = ['lit ', 'écrit '];

const SCOPES = [
  { id: 'brain-village', prefix: `${VILLAGE_BRAIN}/`, title: `Cerveau commun · ${VILLAGE_NAME}` },
  { id: 'brain-quartier', prefix: `${ACTIVE_QUARTIER.brain}/`, title: `Cerveau du quartier · ${ACTIVE_QUARTIER.name}` },
] as const;

export function BrainNotes({ notes, log, onClose }: { notes: readonly NoteState[]; log: readonly LogEntry[]; onClose(): void }) {
  const recent = log.filter((l) => BRAIN_VERBS.some((v) => l.text.startsWith(v))).slice(-5).reverse();

  return (
    <SidePanel
      titleId="brain-title"
      onClose={onClose}
      eyebrow={
        <>
          <span className="size-2 rounded-full bg-violet-500" />
          Cerveau · notes Markdown
        </>
      }
    >
      <h2 id="brain-title" className="text-2xl font-bold">
        Le Cerveau
      </h2>
      <p className="mb-4 text-sm text-muted">
        {notes.length} notes · la mémoire que les agents lisent avant d&apos;agir : celle de tout le village, puis celle du quartier
      </p>

      {SCOPES.map((scope) => {
        const scoped = notes.filter((n) => n.path.startsWith(scope.prefix));
        return (
          <section key={scope.id} aria-labelledby={scope.id} className="mb-5">
            <h3 id={scope.id} className="eyebrow">
              {scope.title}
            </h3>
            <p className="mb-2 font-mono text-[0.6875rem] text-muted">brain/{scope.prefix}</p>
            <ul className="flex flex-col gap-1">
              {scoped.map((n) => (
                <li
                  key={`${n.path}#${n.flash}`}
                  title={`brain/${n.path}`}
                  className={`flex items-center gap-3 rounded-xl px-2 py-1.5 ${n.flash > 0 ? 'note-flash' : ''}`}
                >
                  <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-xs">
                    ▤
                  </span>
                  <span className="min-w-0 flex-1 text-sm">
                    <span className="block truncate font-mono text-xs">{n.path.slice(scope.prefix.length)}</span>
                    {n.isNew && <span className="text-xs font-bold text-success">nouveau</span>}
                  </span>
                  <span className="shrink-0 rounded-full border border-line bg-surface px-2 text-xs text-muted">
                    <span aria-hidden="true">×</span>
                    {n.reads}
                    <span className="sr-only"> lecture{n.reads > 1 ? 's' : ''}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <h3 className="eyebrow mb-2">Activité récente</h3>
      {recent.length === 0 ? (
        <p className="text-sm text-muted">Aucune lecture pour l&apos;instant.</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {recent.map((l) => (
            <li key={l.id} className="rounded-xl border border-line/60 bg-glass-strong px-3 py-2 text-sm">
              <strong className="font-medium">{getAgent(l.who).name}</strong> {l.text}
            </li>
          ))}
        </ul>
      )}
    </SidePanel>
  );
}

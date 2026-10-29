'use client';

import { useEffect, useRef } from 'react';
import { getAgent } from '@/engine/agents';
import type { LogEntry } from '@/engine/types';
import { agentColor, cssColor } from '@/engine/world';
import { SidePanel } from './SidePanel';

function clock(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function Journal({ log, onClose }: { log: readonly LogEntry[]; onClose(): void }) {
  const endRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [log.length]);

  return (
    <SidePanel titleId="journal-title" onClose={onClose} eyebrow="Journal du run">
      <h2 id="journal-title" className="text-2xl font-bold">
        Journal
      </h2>
      <p className="mb-4 text-sm text-muted">
        {log.length === 0 ? 'Le journal se remplit quand tu lances un brief.' : `${log.length} événements depuis le lancement`}
      </p>
      {log.length > 0 && (
        <ol aria-label="Lignes du journal" className="flex flex-col gap-1.5 text-sm">
          {log.map((entry, i) => {
            const agent = getAgent(entry.who);
            return (
              <li
                key={entry.id}
                ref={i === log.length - 1 ? endRef : undefined}
                className="flex gap-2.5 rounded-xl border border-line/60 bg-glass-strong px-3 py-2"
              >
                <time className="shrink-0 font-mono text-xs leading-5 text-muted">{clock(entry.ms)}</time>
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  style={{ background: cssColor(agentColor(agent)) }}
                />
                <span>
                  <strong className="font-medium">{agent.name}</strong> {entry.text}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </SidePanel>
  );
}

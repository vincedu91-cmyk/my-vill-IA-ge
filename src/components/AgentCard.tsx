'use client';

import { useId, useRef, useState } from 'react';
import { agentFile, agentFilePath, agentRules, getAgent, AGENT_SKILLS } from '@/engine/agents';
import type { AgentId, LogEntry } from '@/engine/types';
import { cssColor, getDept } from '@/engine/world';
import { SidePanel } from './SidePanel';
import { Avatar } from './TeamPanel';
import { AgentDiscussion } from './AgentDiscussion';
import type { Conversation } from '@/engine/discussion';

type Tab = 'discussion' | 'activity' | 'file';

interface AgentCardProps {
  selected: AgentId;
  log: readonly LogEntry[];
  onClose(): void;
  conversation: Conversation;
  onConversationChange(conversation: Conversation): void;
}

export function AgentCard({ selected, log, onClose, conversation, onConversationChange }: AgentCardProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [tab, setTab] = useState<Tab>('discussion');
  const [copied, setCopied] = useState<{ id: AgentId; message: string } | null>(null);
  const uid = useId();

  const agent = getAgent(selected);
  const dept = getDept(agent.dept);
  const recent = log.filter((l) => l.who === selected).slice(-3);
  const file = agent.human ? null : agentFile(agent);

  const copyFile = async () => {
    if (!file) return;
    try {
      await navigator.clipboard.writeText(file);
      setCopied({ id: agent.id, message: 'Fichier copié.' });
    } catch {
      const pre = preRef.current;
      if (pre) {
        const range = document.createRange();
        range.selectNodeContents(pre);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
      setCopied({ id: agent.id, message: 'Copie refusée : le texte est sélectionné, copie-le avec Ctrl+C.' });
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'discussion', label: 'Discussion' },
    { id: 'activity', label: 'Activité' },
    { id: 'file', label: 'Fiche' },
  ];

  return (
    <SidePanel
      fill={tab === 'discussion'}
      titleId="agent-title"
      onClose={onClose}
      eyebrow={
        <>
          <span className="size-2 rounded-full" style={{ background: cssColor(dept.color) }} />
          {dept.name}
          {agent.manager ? ' · Chef d’équipe' : ''}
        </>
      }
    >
      <div className="mb-4 flex shrink-0 items-center gap-3">
        <Avatar agent={agent} size="size-12" />
        <div className="min-w-0">
          <h2 id="agent-title" className="flex items-center gap-2 text-2xl leading-tight font-bold">
            {agent.name}
            {agent.manager && <span className="rounded-full bg-red-soft px-1.5 text-[0.625rem] font-bold text-red uppercase">Chef</span>}
          </h2>
          <p className="text-sm text-muted">{agent.role}</p>
        </div>
      </div>

      <div role="tablist" aria-label={`Fiche de ${agent.name}`} className="mb-4 flex shrink-0 gap-1 border-b border-line/70 pb-2"
        onKeyDown={(event) => {
          const index = tabs.findIndex((item) => item.id === tab);
          const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
            : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length
              : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
          if (next === null) return;
          event.preventDefault();
          setTab(tabs[next].id);
          document.getElementById(`${uid}-tab-${tabs[next].id}`)?.focus();
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`${uid}-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            tabIndex={tab === t.id ? 0 : -1}
            aria-controls={`${uid}-panel`}
            onClick={() => setTab(t.id)}
            className="tab h-8"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className={tab === 'discussion' ? 'flex min-h-0 flex-1 flex-col' : ''}>
        {tab === 'discussion' ? (
          <AgentDiscussion agent={agent} conversation={conversation} onChange={onConversationChange} />
        ) : tab === 'activity' ? (
          <>
            <p className="mb-4 text-sm leading-relaxed">{agent.mission}</p>
            <h3 className="eyebrow mb-2">Périmètre et validations</h3>
            <ul className="mb-4 list-disc space-y-2 pl-4 text-sm leading-relaxed">
              {agentRules(agent).map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
            {agent.specialties.length > 0 && (
              <>
                <h3 className="eyebrow mb-2">Expertises</h3>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {agent.specialties.map(({ label, skill }) => (
                    <span key={skill} className="rounded-md border border-line bg-surface px-2 py-0.5 text-xs">
                      {label}
                    </span>
                  ))}
                </div>
              </>
            )}
            {agent.skills.length > 0 && (
              <>
                <h3 className="eyebrow mb-2">Compétences</h3>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {agent.skills.map((skill) => (
                    <span key={skill} className="rounded-md border border-line bg-surface px-2 py-0.5 text-xs">
                      {AGENT_SKILLS[skill]}
                    </span>
                  ))}
                </div>
              </>
            )}
            <h3 className="eyebrow mb-2">Activité récente</h3>
            {recent.length === 0 ? (
              <p className="text-sm text-muted">Rien pour l&apos;instant. Lance un brief pour voir {agent.name} au travail.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {recent.map((l) => (
                  <li key={l.id} className="rounded-xl border border-line/70 bg-glass-strong px-3 py-2 text-sm">
                    {l.text}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <h3 className="eyebrow mb-2">Outils</h3>
            {agent.tools.length > 0 ? (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {agent.tools.map((tool) => (
                  <span key={tool} className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-xs">
                    {tool}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mb-4 text-sm">Aucun : Vincent est humain et valide chaque livrable.</p>
            )}
            {file && (
              <>
                <h3 className="eyebrow mb-2">Fichier agent</h3>
                <p className="mb-2 truncate font-mono text-xs text-muted">{agentFilePath(agent)}</p>
                <pre
                  ref={preRef}
                  tabIndex={0}
                  className="max-h-72 overflow-auto rounded-xl border border-line bg-surface p-3 font-mono text-xs leading-relaxed"
                >
                  {file}
                </pre>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="button" className="btn" onClick={copyFile}>
                    Copier le fichier
                  </button>
                  <span role="status" className="text-xs text-muted">
                    {copied?.id === agent.id ? copied.message : ''}
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </SidePanel>
  );
}

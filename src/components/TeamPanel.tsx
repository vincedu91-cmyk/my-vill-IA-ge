'use client';

import { QUARTIER_AGENTS, VILLAGE_AGENTS, agentFilePath, AGENT_SKILLS, type Agent } from '@/engine/agents';
import { ACTIVE_QUARTIER, VILLAGE_NAME } from '@/engine/quartiers';
import type { Simulation } from '@/engine/simulation';
import type { DeptKey } from '@/engine/types';
import { DEPTS, VILLAGE_COLOR, agentColor, cssColor, getDept } from '@/engine/world';
import { SidePanel } from './SidePanel';

const TEAMS = DEPTS.filter((d) => d.key !== 'cafe');

export function Avatar({ agent, size = 'size-10' }: { agent: Agent; size?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${size} flex shrink-0 items-center justify-center rounded-xl text-base font-bold text-white shadow-sm`}
      style={{ background: cssColor(agentColor(agent)) }}
    >
      {agent.name[0]}
    </span>
  );
}

/** Rail vertical des départements, à gauche de la scène. */
export function TeamRail({ active, onOpen }: { active: DeptKey | null; onOpen(dept: DeptKey): void }) {
  return (
    <nav
      aria-label="Départements"
      className="glass-panel pointer-events-auto absolute top-1/2 left-3 z-20 flex -translate-y-1/2 flex-col gap-1 rounded-full p-1.5 max-[600px]:hidden"
    >
      {TEAMS.map((d) => (
        <button
          key={d.key}
          type="button"
          title={d.name}
          aria-label={`Voir l'équipe ${d.name}`}
          aria-pressed={active === d.key}
          onClick={() => onOpen(d.key)}
          className="flex size-8 items-center justify-center rounded-full hover:bg-glass-strong aria-pressed:bg-surface aria-pressed:shadow-sm"
        >
          <span className="size-3.5 rounded-md" style={{ background: cssColor(d.color) }} />
        </button>
      ))}
    </nav>
  );
}

interface TeamPanelProps {
  sim: Simulation;
  dept: DeptKey | null;
  onDept(dept: DeptKey | null): void;
  onClose(): void;
}

function MemberItem({ agent: a, onSelect }: { agent: Agent; onSelect(): void }) {
  const highlights = a.specialties.length > 0
    ? a.specialties.map((specialty) => specialty.label)
    : a.skills.map((skill) => AGENT_SKILLS[skill]);
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-start gap-3 rounded-2xl border border-line/70 bg-glass-strong p-3 text-left transition-colors hover:bg-surface"
      >
        <Avatar agent={a} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="font-medium">{a.name}</span>
            {a.manager && <span className="rounded-full bg-red-soft px-1.5 text-[0.625rem] font-bold text-red uppercase">Chef</span>}
            {a.human && <span className="rounded-full bg-red-soft px-1.5 text-[0.625rem] font-bold text-red uppercase">Humain</span>}
          </span>
          <span className="block text-xs text-muted">{a.role}</span>
          <span className="mt-1.5 flex flex-wrap gap-1">
            {highlights.slice(0, 3).map((highlight) => (
              <span key={highlight} className="rounded-md border border-line bg-surface px-1.5 text-[0.6875rem]">
                {highlight}
              </span>
            ))}
            {highlights.length > 3 && (
              <span
                aria-label={`${highlights.length - 3} expertises supplémentaires : ${highlights.slice(3).join(', ')}`}
                title={highlights.slice(3).join(', ')}
                className="rounded-md border border-line bg-surface px-1.5 text-[0.6875rem]"
              >
                +{highlights.length - 3}
              </span>
            )}
          </span>
          {a.tools.length > 0 && (
            <span className="mt-1.5 flex flex-wrap gap-1">
              {a.tools.map((tool) => (
                <span key={tool} className="rounded-md border border-line bg-surface px-1.5 font-mono text-[0.6875rem]">
                  {tool}
                </span>
              ))}
            </span>
          )}
          {!a.human && <span className="mt-1 block truncate font-mono text-[0.6875rem] text-muted">{agentFilePath(a)}</span>}
        </span>
      </button>
    </li>
  );
}

/** Liste des agents par département : l'alternative clavier au clic sur un personnage 3D. */
export function TeamPanel({ sim, dept, onDept, onClose }: TeamPanelProps) {
  const teams = dept ? TEAMS.filter((d) => d.key === dept) : TEAMS;
  const current = dept ? getDept(dept) : null;
  const members = dept ? QUARTIER_AGENTS.filter((a) => a.dept === dept) : QUARTIER_AGENTS;
  const lead = members.find((a) => a.manager);

  return (
    <SidePanel
      titleId="team-title"
      onClose={onClose}
      eyebrow={
        <>
          {current && <span className="size-2 rounded-full" style={{ background: cssColor(current.color) }} />}
          Équipe · {ACTIVE_QUARTIER.name}
        </>
      }
    >
      <h2 id="team-title" className="text-2xl font-bold">
        {current?.name ?? `Tout le quartier ${ACTIVE_QUARTIER.name}`}
      </h2>
      <p className="mb-3 text-sm text-muted">
        {members.length} {members.length > 1 ? 'membres' : 'membre'}
        {current && lead ? ` · responsable : ${lead.name}` : ` · Vincent décide pour tout le village`}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par département">
        <button type="button" className="chip" aria-pressed={dept === null} onClick={() => onDept(null)}>
          Tous
        </button>
        {TEAMS.map((d) => (
          <button key={d.key} type="button" className="chip" aria-pressed={dept === d.key} onClick={() => onDept(d.key)}>
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: cssColor(d.color) }} />
            {d.label}
          </button>
        ))}
      </div>

      {!dept && (
        <div className="mb-4" role="group" aria-labelledby="team-village">
          <p id="team-village" className="eyebrow mb-1.5 flex items-center gap-2">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: cssColor(VILLAGE_COLOR) }} />
            Village · {VILLAGE_NAME}
          </p>
          <ul className="flex flex-col gap-2">
            {VILLAGE_AGENTS.map((a) => (
              <MemberItem key={a.id} agent={a} onSelect={() => sim.select(a.id)} />
            ))}
          </ul>
        </div>
      )}

      {teams.map((d) => (
        <div key={d.key} className="mb-4" role="group" aria-labelledby={`team-${d.key}`}>
          {!dept && (
            <p id={`team-${d.key}`} className="eyebrow mb-1.5 flex items-center gap-2">
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: cssColor(d.color) }} />
              {d.name}
            </p>
          )}
          {dept && <span id={`team-${d.key}`} className="sr-only">{d.name}</span>}
          <ul className="flex flex-col gap-2">
            {QUARTIER_AGENTS.filter((a) => a.dept === d.key).map((a) => (
              <MemberItem key={a.id} agent={a} onSelect={() => sim.select(a.id)} />
            ))}
          </ul>
        </div>
      ))}
    </SidePanel>
  );
}

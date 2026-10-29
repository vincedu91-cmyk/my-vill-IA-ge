'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { AgentCard } from '@/components/AgentCard';
import { BrainNotes } from '@/components/BrainNotes';
import { BriefPanel } from '@/components/BriefPanel';
import { Deliverables, GatePanel } from '@/components/GatePanel';
import { Journal } from '@/components/Journal';
import { TeamPanel, TeamRail } from '@/components/TeamPanel';
import { TopBar, type PanelView } from '@/components/TopBar';
import { Village, type VillageHandle } from '@/components/Village';
import { Simulation } from '@/engine/simulation';
import type { AgentId, DeptKey, UiState } from '@/engine/types';
import type { Conversation } from '@/engine/discussion';
import type { MomentChoice } from '@/scene/moments';

const EMPTY_CONVERSATION: Conversation = { messages: [], draft: '' };

export default function Home() {
  const [sim] = useState(() => new Simulation());
  const ui = useSyncExternalStore(sim.subscribe, sim.getUi, sim.getUi);
  const villageRef = useRef<VillageHandle>(null);
  const [view, setView] = useState<PanelView | null>(null);
  const [teamDept, setTeamDept] = useState<DeptKey | null>(null);
  const [seenSelected, setSeenSelected] = useState<AgentId | null>(null);
  const [dismissed, setDismissed] = useState<UiState['deliverables']>(null);
  const [conversations, setConversations] = useState<Partial<Record<AgentId, Conversation>>>({});
  const [moment, setMoment] = useState<MomentChoice>('reel');

  // Une sélection (clic 3D ou carte d'équipe) ouvre la fiche de l'agent.
  if (ui.selected !== seenSelected) {
    setSeenSelected(ui.selected);
    if (ui.selected) setView('agent');
  }

  const openView = (next: PanelView | null) => {
    setView(next);
    if (next !== 'agent') sim.select(null);
  };
  const close = () => openView(null);
  const deliverables = ui.deliverables && ui.deliverables !== dismissed ? ui.deliverables : null;
  const panelOpen = view !== null && (view !== 'agent' || ui.selected !== null);

  return (
    <main className="fixed inset-0 overflow-hidden">
      <Village sim={sim} moment={moment} ref={villageRef} />

      <TopBar
        ui={ui}
        view={view}
        onView={openView}
        onRotate={(d) => villageRef.current?.rotate(d)}
        moment={moment}
        onMoment={setMoment}
      />
      <TeamRail
        active={view === 'team' ? teamDept : null}
        onOpen={(dept) => {
          setTeamDept(dept);
          openView('team');
        }}
      />

      {view === 'agent' && ui.selected && (
        <AgentCard
          key={ui.selected}
          selected={ui.selected}
          log={ui.log}
          onClose={close}
          conversation={conversations[ui.selected] ?? EMPTY_CONVERSATION}
          onConversationChange={(conversation) => {
            const id = ui.selected;
            if (id) setConversations((current) => ({ ...current, [id]: conversation }));
          }}
        />
      )}
      {view === 'journal' && <Journal log={ui.log} onClose={close} />}
      {view === 'brain' && <BrainNotes notes={ui.notes} log={ui.log} onClose={close} />}
      {view === 'team' && <TeamPanel sim={sim} dept={teamDept} onDept={setTeamDept} onClose={close} />}

      <div
        className={`pointer-events-none absolute inset-x-3 bottom-3 z-30 flex flex-col items-center gap-3 ${
          panelOpen ? 'min-[940px]:right-[404px]' : ''
        }`}
      >
        <GatePanel sim={sim} gate={ui.gate} />
        {deliverables && <Deliverables deliverables={deliverables} onClose={() => setDismissed(deliverables)} />}
        <BriefPanel sim={sim} ui={ui} />
      </div>
    </main>
  );
}

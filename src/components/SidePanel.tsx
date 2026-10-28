'use client';

import type { ReactNode } from 'react';

interface SidePanelProps {
  eyebrow: ReactNode;
  titleId: string;
  onClose(): void;
  children: ReactNode;
  fill?: boolean;
}

/** Panneau en verre : colonne à droite sur grand écran, feuille au-dessus de la barre de commande sur mobile. */
export function SidePanel({ eyebrow, titleId, onClose, children, fill = false }: SidePanelProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={`glass-panel pointer-events-auto absolute inset-x-3 flex flex-col overflow-hidden rounded-3xl min-[940px]:inset-x-auto min-[940px]:right-3 min-[940px]:top-[84px] min-[940px]:bottom-3 min-[940px]:max-h-none min-[940px]:w-[380px] ${fill ? 'top-[176px] bottom-3 z-40 min-[600px]:top-[124px] min-[940px]:z-20' : 'bottom-[124px] z-20 max-h-[50dvh]'}`}
    >
      <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-1">
        <div className="eyebrow flex min-w-0 items-center gap-2 truncate">{eyebrow}</div>
        <button type="button" className="icon-btn shrink-0" aria-label="Fermer le panneau" onClick={onClose}>
          ×
        </button>
      </div>
      <div className={`min-h-0 flex-1 px-4 pt-1 pb-4 ${fill ? 'flex flex-col overflow-hidden' : 'overflow-y-auto'}`}>{children}</div>
    </section>
  );
}

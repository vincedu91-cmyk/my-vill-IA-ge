export type AgentId =
  | "adeline"
  | "vincent"
  | "nina"
  | "juliette"
  | "hugo"
  | "ines"
  | "virginie"
  | "sofia"
  | "malo"
  | "francois"
  | "jules"
  | "marie"
  | "theo"
  | "adrien"
  | "lola"
  | "sacha"
  | "paul"
  | "clara";

export type VillageEvent =
  | { t: "say"; who: AgentId; bubble: string; log: string; ms: number }
  | { t: "read"; who: AgentId; note: string }
  | { t: "write"; who: AgentId; note: string }
  | { t: "hand"; from: AgentId; to: AgentId; item: string }
  | { t: "gate"; owner: AgentId; title: string; text: string };

export type DeptKey =
  | "direction"
  | "contenu"
  | "agence"
  | "design"
  | "conf"
  | "veille"
  | "cafe";

export interface Vec2 {
  x: number;
  z: number;
}

export interface Spot extends Vec2 {
  node: string;
}

export type AgentStatus = "idle" | "working";

export interface Bubble {
  text: string;
  /** Instant simulé de disparition, null si permanente. */
  until: number | null;
}

export interface AgentLive {
  id: AgentId;
  x: number;
  z: number;
  node: string;
  heading: number;
  walking: boolean;
  walkDist: number;
  status: AgentStatus;
  cup: boolean;
  bubble: Bubble | null;
}

export interface Particle {
  start: number;
  from: { x: number; y: number; z: number };
  to: { x: number; y: number; z: number };
}

export interface BrainLive {
  pulse: number;
  cardIndex: number;
  cardGlow: number;
}

export interface LiveState {
  simT: number;
  agents: Record<AgentId, AgentLive>;
  brain: BrainLive;
  particles: Particle[];
}

export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

export interface LogEntry {
  id: number;
  ms: number;
  who: AgentId;
  text: string;
}

export interface NoteState {
  path: string;
  reads: number;
  isNew: boolean;
  /** Incrémenté à chaque lecture ou écriture, pour rejouer le surlignage. */
  flash: number;
}

export type RunPhase = "idle" | "running" | "gate" | "done";

export type Speed = 1 | 2 | 4;

export interface UiState {
  phase: RunPhase;
  status: string;
  progress: number;
  log: readonly LogEntry[];
  notes: readonly NoteState[];
  gate: { title: string; text: string } | null;
  deliverables: { brief: string; files: readonly string[] } | null;
  selected: AgentId | null;
  speed: Speed;
}

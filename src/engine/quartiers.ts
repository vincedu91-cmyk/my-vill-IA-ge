export const VILLAGE_NAME = "My vill[IA]ge";

/** Cerveau commun du village, relatif au dossier `brain`. */
export const VILLAGE_BRAIN = "village";

export interface Quartier {
  id: string;
  name: string;
  description: string;
  /** Cerveau du quartier relatif au dossier `brain` ; null tant que le quartier n'est pas ouvert. */
  brain: string | null;
}

export const DIRECTION_MKD = {
  id: "direction-mkd",
  name: "Direction MKD",
  description: "Marketing et Digital de Generali France",
  brain: "quartiers/direction-mkd",
} as const satisfies Quartier;

export const QUARTIERS: readonly Quartier[] = [
  DIRECTION_MKD,
  {
    id: "studio-motion",
    name: "Studio Motion",
    description: "Quartier en préparation",
    brain: null,
  },
];

/** Seul quartier ouvert pour l'instant : la scène, les agents et les scénarios lui appartiennent. */
export const ACTIVE_QUARTIER = DIRECTION_MKD;

export const villageNote = (path: string) => `${VILLAGE_BRAIN}/${path}`;
export const mkdNote = (path: string) => `${DIRECTION_MKD.brain}/${path}`;

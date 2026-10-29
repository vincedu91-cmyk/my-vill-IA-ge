export type Moment = "lever" | "jour" | "doree" | "nuit";
export type MomentChoice = Moment | "reel";

export const MOMENT_CHOICES: readonly { id: MomentChoice; label: string }[] = [
  { id: "reel", label: "Heure réelle" },
  { id: "jour", label: "Jour" },
  { id: "lever", label: "Lever du soleil" },
  { id: "doree", label: "Heure dorée" },
  { id: "nuit", label: "Nuit" },
];

/** Plages horaires fixes et approximatives : elles ne suivent ni la saison ni la position réelle du soleil. */
export function momentAt(date: Date): Moment {
  const hour = date.getHours();
  if (hour >= 5 && hour < 8) return "lever";
  if (hour >= 8 && hour < 17) return "jour";
  if (hour >= 17 && hour < 20) return "doree";
  return "nuit";
}

export function resolveMoment(choice: MomentChoice, date: Date): Moment {
  return choice === "reel" ? momentAt(date) : choice;
}

export interface Lighting {
  sky: number;
  ground: number;
  ambient: number;
  sun: number;
  sunIntensity: number;
  sunPosition: readonly [number, number, number];
}

/** Intensités en éclairage hérité, multipliées par π dans la scène. */
export const LIGHTING: Record<Moment, Lighting> = {
  jour: {
    sky: 0xffffff,
    ground: 0xaebf9a,
    ambient: 0.82,
    sun: 0xffffff,
    sunIntensity: 0.7,
    sunPosition: [8, 30, 20],
  },
  lever: {
    sky: 0xffe0cc,
    ground: 0x9c9a8a,
    ambient: 0.7,
    sun: 0xffb48a,
    sunIntensity: 0.65,
    sunPosition: [-26, 14, 20],
  },
  doree: {
    sky: 0xffe6b8,
    ground: 0xa8946c,
    ambient: 0.72,
    sun: 0xffbe5c,
    sunIntensity: 0.8,
    sunPosition: [26, 13, -8],
  },
  nuit: {
    sky: 0x6f84c2,
    ground: 0x232a3d,
    ambient: 0.5,
    sun: 0xb8caff,
    sunIntensity: 0.3,
    sunPosition: [-10, 30, -14],
  },
};

import type { AgentId, VillageEvent } from "./types";
import { mkdNote, villageNote } from "./quartiers";

export type ScenarioKey =
  | "carousel"
  | "newsletter"
  | "cx"
  | "landing"
  | "logo"
  | "video";

export interface Scenario {
  key: ScenarioKey;
  label: string;
  slug: string;
  brief: string;
  files: readonly string[];
  gate: readonly [string, string];
  steps: readonly VillageEvent[];
}

const say = (
  who: AgentId,
  bubble: string,
  log: string,
  ms = 2000,
): VillageEvent => ({ t: "say", who, bubble, log, ms });
/** Lecture dans le cerveau du quartier Direction MKD. */
const read = (who: AgentId, note: string): VillageEvent => ({
  t: "read",
  who,
  note: mkdNote(note),
});
/** Lecture dans le cerveau commun du village. */
const readVillage = (who: AgentId, note: string): VillageEvent => ({
  t: "read",
  who,
  note: villageNote(note),
});
const write = (who: AgentId, note: string): VillageEvent => ({
  t: "write",
  who,
  note: mkdNote(note),
});
const hand = (from: AgentId, to: AgentId, item: string): VillageEvent => ({
  t: "hand",
  from,
  to,
  item,
});
const gate = (owner: AgentId, title: string, text: string): VillageEvent => ({
  t: "gate",
  owner,
  title,
  text,
});

const carousel: Scenario = {
  key: "carousel",
  label: "Carrousel LinkedIn",
  slug: "carrousel",
  brief: "Carrousel LinkedIn de 6 slides sur le dispositif Parrainage",
  files: ["carrousel-parrainage.pdf", "legendes-linkedin.md"],
  gate: [
    "Carrousel prêt pour validation",
    "Adeline a assemblé 6 slides et leurs légendes. Relis-les avant toute diffusion.",
  ],
  steps: [
    say(
      "adeline",
      "Brief reçu",
      "reçoit le brief et le découpe en tâches par département.",
      1800,
    ),
    read("adeline", "projets/parrainage.md"),
    hand("adeline", "juliette", "le plan de travail"),
    read("juliette", "marque/ton-de-voix.md"),
    say(
      "juliette",
      "Angle trouvé",
      "fixe l’angle éditorial et le plan en 6 slides.",
    ),
    hand("juliette", "hugo", "le plan"),
    say("hugo", "Rédaction…", "rédige les textes des 6 slides.", 2800),
    hand("hugo", "ines", "les textes"),
    read("ines", "projets/parrainage.md"),
    say(
      "ines",
      "Faits vérifiés",
      "confronte chaque affirmation aux notes du Cerveau.",
    ),
    hand("ines", "virginie", "les textes validés"),
    read("virginie", "marque/charte-generali-red-studio.md"),
    hand("virginie", "sofia", "le brief visuel"),
    say(
      "sofia",
      "Mise en page…",
      "compose les 6 slides avec la charte Red Studio 2.0.",
      2800,
    ),
    hand("sofia", "clara", "les slides"),
    say(
      "clara",
      "Charte OK",
      "contrôle couleurs, typographie et usage de la marque.",
    ),
    read("paul", "conformite/mentions-legales.md"),
    say("paul", "Mentions OK", "ajoute et contrôle les mentions légales."),
    hand("paul", "adeline", "le dossier contrôlé"),
    say("adeline", "Assemblage…", "assemble les slides et les légendes."),
  ],
};

const newsletter: Scenario = {
  key: "newsletter",
  label: "Newsletter agents",
  slug: "newsletter",
  brief: "Newsletter mensuelle pour les agents généraux",
  files: ["newsletter-agents.html", "objets-et-preheaders.md"],
  gate: [
    "Newsletter prête pour validation",
    "Adeline a assemblé la newsletter et trois variantes d’objet.",
  ],
  steps: [
    say(
      "adeline",
      "Brief reçu",
      "reçoit le brief et le découpe en tâches.",
      1800,
    ),
    read("adeline", "audiences/agents.md"),
    hand("adeline", "juliette", "le plan de travail"),
    read("juliette", "marque/ton-de-voix.md"),
    say(
      "juliette",
      "Plan posé",
      "définit les rubriques et l’ordre des sujets.",
    ),
    hand("juliette", "hugo", "le plan"),
    say(
      "hugo",
      "Rédaction…",
      "rédige les rubriques et trois objets d’email.",
      3000,
    ),
    hand("hugo", "ines", "les textes"),
    say(
      "ines",
      "Faits vérifiés",
      "vérifie chaque affirmation et chaque chiffre cité.",
    ),
    hand("ines", "paul", "les textes validés"),
    read("paul", "conformite/mentions-legales.md"),
    say("paul", "Mentions OK", "contrôle mentions légales et désinscription."),
    hand("paul", "adeline", "le dossier contrôlé"),
    say("adeline", "Assemblage…", "assemble la newsletter finale."),
  ],
};

const cx: Scenario = {
  key: "cx",
  label: "Analyse CX d’un parcours",
  slug: "analyse-cx",
  brief: "Analyse CX du parcours de souscription en ligne",
  files: ["analyse-cx-parcours.md", "scoring-matrice-client.csv"],
  gate: [
    "Analyse prête pour validation",
    "Adeline a reçu la synthèse et le scoring des frictions, classés par priorité.",
  ],
  steps: [
    say(
      "adeline",
      "Brief reçu",
      "reçoit le brief et le confie à l’Observatoire.",
      1800,
    ),
    hand("adeline", "francois", "le brief d’analyse"),
    read("francois", "outils/matrice-client.md"),
    say(
      "francois",
      "Périmètre posé",
      "cadre le parcours à analyser et les critères.",
    ),
    hand("francois", "jules", "le périmètre"),
    read("jules", "veille/concurrence.md"),
    say(
      "jules",
      "Benchmark…",
      "compare des parcours concurrents et source chaque constat.",
      2800,
    ),
    hand("jules", "marie", "le benchmark"),
    read("marie", "outils/matrice-client.md"),
    say(
      "marie",
      "Scoring CX/UX…",
      "score chaque friction avec la Matrice Client.",
      2800,
    ),
    hand("marie", "francois", "le scoring"),
    say(
      "francois",
      "Synthèse…",
      "rédige la synthèse et priorise les actions.",
      2400,
    ),
    hand("francois", "adeline", "la synthèse"),
    say("adeline", "Assemblage…", "assemble le rapport final."),
  ],
};

const landing: Scenario = {
  key: "landing",
  label: "Landing page",
  slug: "landing-page",
  brief: "Landing page Next.js pour une offre digitale",
  files: ["landing-maquette.fig", "landing-next/ (code)", "checklist-rgpd.md"],
  gate: [
    "Landing prête pour validation",
    "Adeline a réuni la maquette, le code testé et la checklist RGPD.",
  ],
  steps: [
    say(
      "adeline",
      "Brief reçu",
      "reçoit le brief et le découpe en design, code et conformité.",
      1800,
    ),
    hand("adeline", "nina", "les objectifs de la landing"),
    read("nina", "audiences/prospects.md"),
    say(
      "nina",
      "Objectifs posés",
      "définit la conversion principale, les KPI et les hypothèses à tester.",
    ),
    hand("nina", "virginie", "les critères de conversion"),
    hand("adeline", "virginie", "le brief"),
    read("virginie", "marque/charte-generali-red-studio.md"),
    say(
      "virginie",
      "Maquette…",
      "dessine la maquette selon Red Studio 2.0.",
      2800,
    ),
    hand("virginie", "theo", "la maquette"),
    readVillage("theo", "tech/stack-symfony-next.md"),
    say(
      "theo",
      "Structure posée",
      "définit la structure Next.js et l’API Symfony.",
    ),
    hand("theo", "lola", "le découpage"),
    say(
      "lola",
      "Intégration…",
      "intègre la maquette en React et Tailwind.",
      2800,
    ),
    hand("lola", "sacha", "le code"),
    say("sacha", "Revue et tests…", "relit le code et lance les tests.", 2600),
    hand("sacha", "nina", "la landing intégrée"),
    say(
      "nina",
      "Mesure vérifiée",
      "vérifie le CTA, l’événement de conversion et l’indicateur de succès.",
    ),
    hand("nina", "paul", "la landing à contrôler"),
    read("paul", "conformite/rgpd-cookies.md"),
    say("paul", "RGPD OK", "contrôle bandeau cookies et mentions de collecte."),
    hand("paul", "adeline", "le dossier contrôlé"),
    say("adeline", "Assemblage…", "assemble maquette, code et checklist."),
  ],
};

const logo: Scenario = {
  key: "logo",
  label: "Création de logo",
  slug: "creation-logo",
  brief: "Créer un logo distinctif et son kit d’identité visuelle",
  files: [
    "logo.svg",
    "variantes-logo.svg",
    "favicon.ico",
    "guide-utilisation.md",
  ],
  gate: [
    "Kit logo prêt pour validation",
    "Simulation : Adeline a réuni le logo, ses variantes et le guide d’utilisation. Aucun fichier réel n’a été généré.",
  ],
  steps: [
    say(
      "adeline",
      "Brief logo reçu",
      "cadre le nom, les publics, les usages et les contraintes du logo.",
    ),
    hand("adeline", "virginie", "le brief d’identité"),
    say(
      "virginie",
      "Recherche visuelle…",
      "simule la recherche de références avec logo-design, puis sélectionne trois concepts distincts.",
    ),
    hand("virginie", "sofia", "les trois pistes à construire"),
    say(
      "sofia",
      "Concepts SVG…",
      "simule la construction des concepts en noir et blanc et les tests à 16 et 32 pixels.",
    ),
    hand("sofia", "virginie", "les concepts testés"),
    gate(
      "virginie",
      "Concepts logo à valider",
      "Simulation : valide une direction avant la préparation du kit. Les concepts et leurs tests ne sont pas réellement générés.",
    ),
    say(
      "virginie",
      "Préparation du kit…",
      "simule l’affinage de la direction approuvée, de la palette et des variantes.",
    ),
    hand("virginie", "lola", "les spécifications web du logo"),
    say(
      "lola",
      "Déclinaisons web…",
      "simule la préparation du favicon et le contrôle du logo dans une interface avec Taste.",
    ),
    hand("lola", "clara", "les déclinaisons du logo"),
    say(
      "clara",
      "Contrôle marque…",
      "simule la vérification des couleurs, des espacements et des usages monochromes.",
    ),
    hand("clara", "paul", "le dossier d’identité"),
    say(
      "paul",
      "Points juridiques…",
      "rappelle qu’une recherche professionnelle de disponibilité de marque reste nécessaire.",
    ),
    hand("paul", "adeline", "le dossier contrôlé"),
    say(
      "adeline",
      "Assemblage du kit…",
      "simule l’assemblage du logo, des variantes et du guide d’utilisation.",
    ),
  ],
};

const video: Scenario = {
  key: "video",
  label: "Création de vidéos",
  slug: "creation-video",
  brief: "Créer une vidéo pour les réseaux sociaux",
  files: [
    "script-video.md",
    "storyboard-video.pdf",
    "video-finale.mp4",
    "sous-titres.srt",
  ],
  gate: [
    "Vidéo prête pour validation",
    "Simulation : Adeline a réuni le script, le storyboard, la vidéo et ses sous-titres. Aucun fichier réel n’a été généré.",
  ],
  steps: [
    say(
      "adeline",
      "Brief vidéo reçu",
      "cadre l’objectif, le public et le canal de diffusion.",
    ),
    hand("adeline", "juliette", "le brief vidéo"),
    read("juliette", "audiences/clients.md"),
    say(
      "juliette",
      "Angle posé",
      "définit l’angle éditorial et la structure de la vidéo.",
    ),
    hand("juliette", "hugo", "l’angle et la structure"),
    read("hugo", "marque/ton-de-voix.md"),
    say(
      "hugo",
      "Script en cours…",
      "rédige la voix off et les textes à l’écran.",
      2600,
    ),
    hand("hugo", "ines", "le script"),
    say(
      "ines",
      "Vérification…",
      "vérifie les affirmations et les chiffres du script.",
    ),
    hand("ines", "virginie", "le script vérifié"),
    read("virginie", "marque/charte-generali-red-studio.md"),
    say(
      "virginie",
      "Storyboard…",
      "définit la direction visuelle et le storyboard.",
    ),
    gate(
      "virginie",
      "Storyboard vidéo à valider",
      "Valide le script et le storyboard avant l’animation. La production reste simulée et aucun rendu vidéo n’est créé.",
    ),
    hand("virginie", "malo", "le storyboard validé"),
    say(
      "malo",
      "Animation…",
      "simule l’animation et le montage de la vidéo.",
      3000,
    ),
    hand("malo", "clara", "la vidéo et ses éléments de marque"),
    say(
      "clara",
      "Contrôle marque…",
      "vérifie les couleurs, la typographie et les éléments de marque.",
    ),
    hand("clara", "adeline", "le dossier vidéo contrôlé"),
    say(
      "adeline",
      "Assemblage…",
      "simule l’assemblage de la vidéo, du script et des sous-titres.",
    ),
  ],
};

export const SCENARIOS: readonly Scenario[] = [
  carousel,
  newsletter,
  cx,
  landing,
  logo,
  video,
];

export function getScenario(key: ScenarioKey): Scenario {
  return SCENARIOS.find((s) => s.key === key) as Scenario;
}

/** Date locale au format AAAA-MM-JJ. */
export function isoDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Étapes complètes d'un run : celles du scénario, la validation humaine puis la note de journal. */
export function runEvents(scenario: Scenario, date: Date): VillageEvent[] {
  return [
    ...scenario.steps,
    gate("adeline", scenario.gate[0], scenario.gate[1]),
    write("adeline", `journal/${isoDay(date)}-${scenario.slug}.md`),
  ];
}

/** Agents qui interviennent dans une liste d'événements, plus Adeline et Vincent. */
export function involvedAgents(events: readonly VillageEvent[]): Set<AgentId> {
  const ids = new Set<AgentId>(["adeline", "vincent"]);
  for (const e of events) {
    if (e.t === "hand") {
      ids.add(e.from);
      ids.add(e.to);
    } else if (e.t === "gate") {
      ids.add(e.owner);
    } else {
      ids.add(e.who);
    }
  }
  return ids;
}

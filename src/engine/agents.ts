import type { AgentId, DeptKey } from "./types";
import profiles from "./agent-profiles.json";

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  dept: DeptKey;
  manager: boolean;
  human: boolean;
  tools: readonly string[];
  skills: readonly AgentSkill[];
  specialties: readonly AgentSpecialty[];
  mission: string;
  skin: number;
  hair: number;
  longHair: boolean;
}

export interface AgentSpecialty {
  label: string;
  skill: string;
}

export const AGENT_SKILLS = {
  "ab-testing": "Tests A/B",
  "ad-creative": "Création publicitaire",
  ads: "Publicité payante",
  "ai-seo": "SEO pour moteurs IA",
  analytics: "Analytics marketing",
  attribution: "Attribution marketing",
  "churn-prevention": "Prévention du churn",
  "competitor-profiling": "Analyse concurrentielle",
  competitors: "Pages comparatives",
  "content-strategy": "Stratégie de contenu",
  "conversion-tracking": "Suivi des conversions",
  "copy-editing": "Édition de contenu",
  copywriting: "Rédaction marketing",
  cro: "Optimisation de conversion",
  "customer-research": "Recherche client",
  "design-taste-frontend": "Taste — direction artistique web",
  emails: "Email marketing",
  "free-tools": "Outils gratuits",
  "github-gitlab-management": "Gestion GitHub et GitLab",
  image: "Création d’images",
  "influencer-marketing": "Marketing d’influence",
  launch: "Lancement",
  "link-building": "Netlinking",
  "logo-design": "Identité visuelle",
  "marketing-council": "Conseil marketing",
  "marketing-ideas": "Idées marketing",
  "marketing-loops": "Boucles de croissance",
  "marketing-plan": "Plan marketing",
  "marketing-psychology": "Psychologie marketing",
  offers: "Offres",
  onboarding: "Onboarding",
  paywalls: "Paywalls",
  pricing: "Pricing",
  "product-marketing": "Marketing produit",
  "programmatic-seo": "SEO programmatique",
  prospecting: "Prospection",
  referrals: "Parrainage",
  revops: "Revenue operations",
  schema: "Données structurées",
  "seo-audit": "Audit SEO",
  signup: "Parcours d’inscription",
  "site-architecture": "Architecture de site",
  social: "Réseaux sociaux",
  video: "Vidéo",
  hyperframes: "Production vidéo HyperFrames",
  "hyperframes-cli": "CLI HyperFrames",
  "hyperframes-registry": "Composants HyperFrames",
  "media-use": "Médias pour la vidéo",
  "remotion-best-practices": "Bonnes pratiques Remotion",
  "remotion-to-hyperframes": "Migration Remotion vers HyperFrames",
} as const;

export type AgentSkill = keyof typeof AGENT_SKILLS;

export const LOCAL_AGENT_SKILLS = [
  "github-gitlab-management",
  "hyperframes",
  "hyperframes-cli",
  "hyperframes-registry",
  "media-use",
  "remotion-best-practices",
  "remotion-to-hyperframes",
] as const satisfies readonly AgentSkill[];

const SKIN = [0xf1c9a5, 0xe0ac7e, 0xc68a5e, 0x9b6a45, 0x6e4a32];
const HAIR = [0x2b1d14, 0x5a3a22, 0x8b5a2b, 0xc89b52, 0x1a1a1a, 0x9e4a2a];

type Row = [
  AgentId,
  string,
  string,
  DeptKey,
  boolean,
  string,
  string,
  number,
  number,
  boolean,
];

const ROWS: readonly Row[] = [
  [
    "camille",
    "Camille",
    "Cheffe de projet",
    "mairie",
    true,
    "Read, Write, Grep",
    "Reçoit les briefs, répartit le travail entre départements et assemble le livrable final.",
    0,
    1,
    true,
  ],
  [
    "vincent",
    "Vincent",
    "Directeur de projet (toi)",
    "mairie",
    false,
    "",
    "Valide chaque livrable avant diffusion. Aucun agent ne publie sans son accord.",
    1,
    0,
    false,
  ],
  [
    "nina",
    "Nina",
    "Responsable croissance & acquisition",
    "mairie",
    false,
    "Read, Write, WebSearch, WebFetch",
    "Relie acquisition, mesure et conversion ; formule des tests mesurables et distingue les faits des hypothèses.",
    2,
    5,
    true,
  ],
  [
    "lea",
    "Léa",
    "Responsable contenu",
    "contenu",
    true,
    "Read, Write, Grep",
    "Cadre l'angle éditorial, distribue la rédaction et relit avant le fact-check.",
    2,
    3,
    true,
  ],
  [
    "hugo",
    "Hugo",
    "Rédacteur",
    "contenu",
    false,
    "Read, Write",
    "Écrit les textes (slides, newsletters, légendes) dans le ton de la marque.",
    0,
    4,
    false,
  ],
  [
    "ines",
    "Inès",
    "Fact-checker",
    "contenu",
    false,
    "Read, Grep",
    "Vérifie chaque affirmation contre les notes du Cerveau avant tout passage en création.",
    3,
    4,
    true,
  ],
  [
    "noe",
    "Noé",
    "Directeur artistique",
    "creation",
    true,
    "Read, Write",
    "Traduit le brief en direction visuelle conforme à Red Studio 2.0.",
    4,
    4,
    false,
  ],
  [
    "sofia",
    "Sofia",
    "Designer slides et carrousels",
    "creation",
    false,
    "Read, Write, Bash",
    "Compose les mises en page à partir de la direction visuelle.",
    1,
    5,
    true,
  ],
  [
    "malo",
    "Malo",
    "Motion designer",
    "creation",
    false,
    "Read, Write, Bash",
    "Anime les contenus vidéo et les tutoriels.",
    0,
    2,
    false,
  ],
  [
    "zoe",
    "Zoé",
    "Responsable veille et analyse",
    "veille",
    true,
    "Read, Write, WebSearch",
    "Cadre les analyses et synthétise les résultats pour la cheffe de projet.",
    2,
    1,
    true,
  ],
  [
    "jules",
    "Jules",
    "Veilleur marché",
    "veille",
    false,
    "Read, WebSearch, WebFetch",
    "Surveille concurrents et tendances, et source chaque information.",
    3,
    0,
    false,
  ],
  [
    "maya",
    "Maya",
    "Analyste CX/UX",
    "veille",
    false,
    "Read, Write, Bash",
    "Analyse le parcours d’inscription, étaye et priorise ses frictions ; recommande les évolutions UX.",
    4,
    4,
    true,
  ],
  [
    "theo",
    "Théo",
    "Lead dev",
    "dev",
    true,
    "Read, Write, Edit, Bash",
    "Cadre l'architecture (Symfony, Next.js), répartit le code et gère les dépôts GitHub/GitLab : branches, commits, push, pull requests et merge requests, avec validation humaine avant fusion.",
    1,
    3,
    false,
  ],
  [
    "adrien",
    "Adrien",
    "Développeur Senior Backend & Fullstack SSR",
    "dev",
    false,
    "Read, Write, Edit, Bash",
    "Implémente, maintient et fiabilise les fonctionnalités serveur en PHP/Symfony et Next.js SSR ou hybride. Prend en charge la logique métier, les flux de données et les intégrations REST ; utilise Docker pour rendre les environnements de développement reproductibles. Optimise les requêtes et les accès aux bases de données à partir de mesures, et couvre les comportements critiques par des tests automatisés unitaires et d’intégration.",
    1,
    0,
    false,
  ],
  [
    "lola",
    "Lola",
    "Développeuse front",
    "dev",
    false,
    "Read, Write, Edit, Bash",
    "Conçoit et implémente en React, Next.js et Tailwind les interfaces d’inscription à partir des besoins UX et maquettes approuvées.",
    0,
    5,
    true,
  ],
  [
    "sacha",
    "Sacha",
    "Revue de code et QA",
    "dev",
    false,
    "Read, Grep, Bash",
    "Relit le code, lance les tests et bloque ce qui ne passe pas.",
    2,
    2,
    false,
  ],
  [
    "paul",
    "Paul",
    "Juriste conformité",
    "conf",
    true,
    "Read, Grep",
    "Contrôle mentions légales, RGPD et ton réglementaire d'un contenu d'assurance.",
    3,
    1,
    false,
  ],
  [
    "clara",
    "Clara",
    "Contrôle marque",
    "conf",
    false,
    "Read, Grep",
    "Vérifie que couleurs, typographie et logos respectent la charte.",
    1,
    3,
    true,
  ],
];

const SKILLS_BY_AGENT: Record<AgentId, readonly AgentSkill[]> = {
  camille: ["marketing-plan", "marketing-council", "launch", "product-marketing"],
  vincent: ["marketing-council", "marketing-plan", "offers", "pricing"],
  nina: ["ads", "analytics", "conversion-tracking", "attribution", "ab-testing", "cro"],
  lea: ["content-strategy", "copywriting", "emails", "social", "product-marketing"],
  hugo: ["copywriting", "copy-editing", "emails", "social", "ad-creative"],
  ines: ["customer-research", "competitor-profiling", "competitors", "copy-editing", "product-marketing"],
  noe: ["design-taste-frontend", "logo-design", "image", "ad-creative", "video"],
  sofia: ["image", "ad-creative", "social", "video"],
  malo: ["video", "ad-creative", "social", "hyperframes", "hyperframes-cli", "hyperframes-registry", "media-use", "remotion-best-practices", "remotion-to-hyperframes"],
  zoe: ["customer-research", "competitor-profiling", "marketing-psychology", "marketing-ideas", "marketing-plan"],
  jules: ["competitor-profiling", "seo-audit", "ai-seo", "link-building", "prospecting"],
  maya: ["cro", "signup", "onboarding", "customer-research", "pricing"],
  theo: ["github-gitlab-management", "analytics", "conversion-tracking", "schema", "programmatic-seo", "site-architecture"],
  lola: ["design-taste-frontend", "signup", "site-architecture", "schema", "free-tools", "paywalls"],
  adrien: [],
  sacha: ["ab-testing", "analytics", "conversion-tracking", "seo-audit", "schema"],
  paul: ["copy-editing", "ads", "emails", "influencer-marketing", "conversion-tracking"],
  clara: ["copy-editing", "logo-design", "image", "ad-creative", "marketing-psychology"],
};

const SPECIALTIES_BY_AGENT: Partial<Record<AgentId, readonly AgentSpecialty[]>> = {
  adrien: [
    { label: "Backend PHP et Symfony", skill: "php-symfony-backend" },
    { label: "Next.js SSR et rendu hybride", skill: "nextjs-ssr-hybrid" },
    { label: "APIs REST et intégrations", skill: "rest-api-integration" },
    { label: "Environnements Docker", skill: "docker-development" },
    { label: "Optimisation des bases de données", skill: "database-optimization" },
    { label: "Tests automatisés", skill: "automated-testing" },
  ],
};

export const AGENTS: readonly Agent[] = ROWS.map(
  ([id, name, role, dept, manager, tools, mission, skin, hair, longHair]) => ({
    id,
    name,
    role,
    dept,
    manager,
    human: id === "vincent",
    tools: tools ? tools.split(", ") : [],
    skills: SKILLS_BY_AGENT[id],
    specialties: SPECIALTIES_BY_AGENT[id] ?? [],
    mission,
    skin: SKIN[skin],
    hair: HAIR[hair],
    longHair,
  }),
);

const BY_ID = new Map(AGENTS.map((a) => [a.id, a]));

export function getAgent(id: AgentId): Agent {
  return BY_ID.get(id) as Agent;
}

export function slug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function agentFileSlug(agent: Agent): string {
  return slug(`${agent.name}-${agent.role}`);
}

export function agentFilePath(agent: Agent): string {
  return `.claude/agents/${agentFileSlug(agent)}.md`;
}

export function agentFile(agent: Agent): string {
  const name = agentFileSlug(agent);
  if (!Object.hasOwn(profiles, name)) {
    throw new Error(`Fiche agent absente : ${name}. Exécute npm run sync:agents.`);
  }
  return profiles[name as keyof typeof profiles];
}

export function agentInstructions(agent: Agent): string {
  return agentFile(agent).split("\n---\n").slice(1).join("\n---\n").trim();
}

export function agentRules(agent: Agent): readonly string[] {
  const section = agentInstructions(agent).split("## Règles\n")[1]?.split("\n## ")[0];
  if (!section) throw new Error(`Règles absentes : ${agent.id}`);
  return section.split("\n").filter((line) => line.startsWith("- ")).map((line) => line.slice(2));
}

export const BASE_NOTES: readonly string[] = [
  "marque/ton-de-voix.md",
  "marque/charte-generali-red-studio.md",
  "projets/parrainage.md",
  "audiences/agents-et-collaborateurs.md",
  "conformite/mentions-legales.md",
  "conformite/rgpd-cookies.md",
  "outils/matrice-client.md",
  "veille/concurrence.md",
  "tech/stack-symfony-next.md",
];

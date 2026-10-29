> **Import Direction MKD — 28/10/2026.** Synthèse fournie par l'utilisateur, auteur non identifié ; corps conservé tel que reçu. Les niveaux « Charte », « Observé » et « Reco » sont déclarés par cette synthèse, non vérifiés lors de l'import. Les originaux et actifs cités ne sont pas inclus ; le MP3 n'est pas importé. Lire d'abord le [statut et les limites d'utilisation](../charte-generali-red-studio.md), qui encadrent ce document. Aucune validation de diffusion n'est acquise.

# {{NOM_DU_PROJET}} — Document de Conception Produit (template Generali France)

> **Mode d'emploi du template**
> - Les sections marquées 🔒 **Socle Generali** sont **pré-remplies** avec la charte : ne les modifier que sur décision du Studio graphique / de la Direction MKD.
> - Les sections marquées ✏️ **Projet** contiennent des `{{VARIABLES}}` et un exemple : à remplacer pour chaque projet.
> - Références : `generali-design.md` (UI), `tone-of-voice-generali.md` (rédaction), `orthotypo-generali.md`, `motion-design-generali.md`, `imagerie-bannieres-generali.md`, `tokens/generali-tokens.css`.
> - Légende de fiabilité : 🟥 Charte · 🌐 Observé sur les sites Generali · 🟨 Recommandation.

| Champ | Valeur |
|---|---|
| Projet | {{NOM_DU_PROJET}} |
| Direction / équipe | {{ex. Direction MKD — Marketing & Digital}} |
| Product owner | {{Prénom Nom}} |
| Version du document | {{v0.1 — AAAA-MM-JJ}} |
| Statut | {{Cadrage / Conception / Recette / Production}} |
| Domaine / URL | {{ex. recommandation.generali.fr}} |

---

## 1. 🎯 Vision produit ✏️

### 1.1 Résumé exécutif
- **Pitch (3 phrases)** : {{Quoi — pour qui — quel bénéfice}}
- **Valeur différenciante** : {{…}}
- **Rattachement Lifetime Partner** 🔒 : cocher les marqueurs servis
  - [ ] Touche humaine · [ ] Visibilité digitale · [ ] Langage B1 · [ ] Gestion des leads · [ ] Conseils personnalisés · [ ] Proposition de valeur différenciante · [ ] Expérience omnicanale · [ ] Zéro papier
- **Comportement principal incarné** 🔒 : [ ] Simplification · [ ] Responsabilisation · [ ] Empathie · [ ] Innovation

### 1.2 Objectifs & KPIs
| Objectif (OKR) | KPI | Cible | Source de mesure |
|---|---|---|---|
| {{ex. Augmenter les recommandations clients saisies par les agents}} | {{nb de parrainages / mois}} | {{+30 % à 6 mois}} | {{analytics / back-office}} |
| {{…}} | {{NPS / CES}} | {{…}} | {{Medallia}} |
| Qualité | Score Lighthouse a11y | ≥ 95 | CI |

### 1.3 Cibles & personas
Cibles Generali 🔒 : **Clients & prospects** (particuliers — familles installées, seniors —, PE, entreprises) · **Distributeurs** (6 réseaux captifs et non captifs) · **Collaborateurs & candidats** · **Cibles institutionnelles**.

| Persona ✏️ | Cible Generali | Besoin (charte) | Contexte d'usage |
|---|---|---|---|
| {{ex. Nadia, agente générale}} | Distributeurs | « Offres faciles à vendre, outils qui servent leur business » | {{mobile, entre deux RDV}} |
| {{ex. Paul, client 45 ans}} | Clients | « Avancer avec un assureur qui évolue au même rythme que ses besoins » | {{…}} |
| {{Administrateur MKD}} | Collaborateurs | « Cadre pour s'épanouir et se projeter » | {{back-office}} |

**User stories** : *En tant que {{persona}}, je veux {{action}}, afin de {{bénéfice}}.* (5 par persona)

### 1.4 Périmètre
| Fonctionnalité | Priorité (MoSCoW) | Version |
|---|---|---|
| {{…}} | Must | MVP |
| {{…}} | Should | V2 |

---

## 2. 🏗️ Architecture technique ✏️ (stack de référence MKD 🟨)

### 2.1 Vue d'ensemble
```
Navigateur ──► Azure Front Door / CDN ──► Front Next.js (AKS) ──► API Symfony (AKS) ──► PostgreSQL (Azure Flexible Server)
                                                     │                    ├──► Redis (cache, sessions, Messenger)
                                                     │                    └──► Services Generali (SSO, CRM, Medallia…)
                                                     └──► Analytics (TMS conforme CNIL) 
CI/CD : GitLab CI ──► Azure Container Registry ──► AKS (staging / prod)
```

### 2.2 Stack
| Couche | Choix | Notes |
|---|---|---|
| Front | Next.js 14+ (App Router), React 19, TypeScript, Tailwind CSS + tokens Generali | `tokens/generali-tokens.css` comme source |
| Back | Symfony 8.x (PHP 8.4), API Platform, Doctrine ORM | |
| Base | PostgreSQL 16, Redis 7 | |
| Auth | {{SSO Generali (OIDC) pour collaborateurs/agents ; espace client = SSO monespace}} | ne jamais recréer un login client parallèle 🟨 |
| Infra | Docker, Azure / AKS, GitLab CI/CD | cf. migration hébergement Azure IT Generali |
| Monitoring | {{Azure Monitor / App Insights, Sentry}} | |
| Motion | Framer Motion (UI) ; Remotion pour vidéos générées | `motion-design-generali.md` |

### 2.3 Modèle de données ✏️
{{Entités, attributs typés, relations, index}}

### 2.4 API ✏️
| Méthode | Route | Rôle | Description |
|---|---|---|---|
| GET | `/api/v1/{{ressources}}` | {{ROLE_USER}} | {{…}} |

Erreurs : JSON `{ "code", "message" }` où `message` suit le **ton Generali** (clair, sans jargon, avec solution) — cf. § 4.5.

### 2.5 Sécurité & conformité 🔒🟨
- **RGPD** : minimisation, durées de conservation, mentions d'information, DPO consulté ; bandeau cookies avec **« Continuer sans accepter »** (pratique observée 🌐 sur generali.fr et monespace).
- **DORA** (résilience opérationnelle numérique, applicable aux assureurs) : registre des prestataires TIC, gestion des incidents — à valider avec la DSI/RSSI.
- OWASP Top 10, secrets en coffre (Azure Key Vault), RBAC : `ROLE_USER`, `ROLE_AGENT`, `ROLE_EDITOR`, `ROLE_ADMIN`.
- Données de santé : **hors périmètre** sauf hébergement HDS validé.

---

## 3. 🎨 Design system 🔒

### 3.1 Identité visuelle
| Rôle | Token | Valeur | Source |
|---|---|---|---|
| Primaire / marque / CTA | `--g-red` | `#C21B17` | 🟥 |
| Primaire foncé (combiné au rouge) | `--g-dark-red` | `#AA1B17` | 🟥 |
| Rouge profond (ombres, contraste illus.) | `--g-deep-red` | `#711B17` | 🌐 |
| Fond | `--g-white` | `#FFFFFF` | 🟥 |
| Surface chaude | `--g-surface-warm` | `#F9F5F4` | 🌐 |
| Surface rose (cartes data, carrousels) | `--g-surface-rose` | `#F3E7E9` | 🟥 PPT |
| Surface neutre | `--g-surface-grey` | `#F2F2F2` | 🟥 PPT |
| Bordure | `--g-border` | `#DCDCDC` | 🟥 PPT |
| Texte | `--g-ink` | `#20252B` | 🌐 |
| Texte bureautique / anthracite | `--g-anthracite` | `#323232` | 🟥 PPT |
| Texte secondaire | `--g-grey-dark` | `#707070` | 🟥 |
| Gris fonctionnel (non texte) | `--g-grey-light` | `#A0A0A0` | 🟥 |
| Succès 🟨 | `--g-success` | `#1E7B4F` | hors charte, usage fonctionnel strict |
| Avertissement 🟨 | `--g-warning` | `#B35C00` | idem |
| Erreur | `--g-error` | `#C21B17` + icône | le rouge de marque sert d'erreur **avec** icône et texte (pas couleur seule) 🟨 |
| Info 🟨 | `--g-info` | `#20252B` | |

> **Mode sombre** : non prévu par la charte. Pour un back-office, autorisé 🟨 avec fond `#20252B`, surfaces `#2B3038`, texte `#FFFFFF`, accent `#C21B17` (CTA) — jamais pour un support de marque client.

**Typographie** 🔒
| Rôle | Police | Taille / interligne / graisse |
|---|---|---|
| Display (H1) | Roboto Condensed (web) · Helvetica Neue LT Std Black Cn (print) | 48/52 desktop · 32/38 mobile · 700 · CAPITALES optionnelles pour accroches |
| H2 | Roboto Condensed | 35/48 · 700 |
| H3 | Roboto Condensed | 25/35 · 700 |
| H4 | Roboto Condensed | 22/32 · 700 |
| Lead | Roboto Condensed | 18/27 · 400 |
| Body | Roboto Condensed ou Roboto | 16/25 · 400 |
| Small | Roboto Condensed | 14/21 · 500 |
| Overline | Roboto Condensed | 12/18 · 600 · CAPITALES · `#C21B17` |
| Bouton | Roboto Condensed | 15 · 600 |
| Mono (code/data) 🟨 | Roboto Mono | 14/21 |

**Espacements** (base 8) : 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128
**Rayons** : 5 · 8 (boutons) · 12 · 16 (cartes) · 24 · 40 (hero) · 99 (pill) · 50 %
**Ombres** : `sm 0 4px 16px rgba(0,0,0,.08)` · `md 0 20px 35px -15px rgba(113,27,23,.15)` (signature) · `lg 0 22px 34px -12px rgba(32,1,0,.7)`
**Z-index** : base 0 · sticky 10 · header 20 · dropdown 30 · overlay 40 · modal 50 · toast 60 · tooltip 70
**Breakpoints** : 576 · 768 · 992 · 1200 · conteneur 1080 px

### 3.2 Tokens CSS
→ fichier `tokens/generali-tokens.css` (à importer tel quel). Extrait :
```css
:root{
  --g-red:#C21B17; --g-dark-red:#AA1B17; --g-deep-red:#711B17;
  --g-ink:#20252B; --g-grey-dark:#707070; --g-grey-light:#A0A0A0;
  --g-surface-warm:#F9F5F4; --g-surface-rose:#F3E7E9;
  --g-font-display:"Helvetica Neue LT Std","Roboto Condensed","Arial Narrow",Arial,sans-serif;
  --g-font-ui:"Roboto Condensed",Roboto,Arial,sans-serif;
  --g-radius-btn:8px; --g-radius-card:16px;
  --g-shadow-card:0 20px 35px -15px rgba(113,27,23,.15);
  --g-ease-out:cubic-bezier(.22,1,.36,1); --g-dur-base:400ms;
}
```

### 3.3 Inventaire composants 🔒
| Composant | Variantes | États | Spécificité Generali |
|---|---|---|---|
| Button | primary (rouge), inverse (blanc/rouge), dark (`#20252B`), outline, link | default, hover, focus, active, disabled, loading | h 48, padding 0 24, rayon 8, 15/600 |
| PlumeLabel | plein rouge, plein gris, contour rouge, contour gris | — | parallélogramme 50°, angles obtus arrondis |
| Card | offre, article, chiffre clé, citation, profil | hover, focus | rayon 16, ombre signature, picto deux couleurs |
| Hero | campagne vidéo, produit, institutionnel | — | panneau rouge rayon 40 ou diagonale d'aile |
| Overline / Tag | catégorie (« PARTICULIERS »), pill | — | 12/600 capitales rouge |
| Input / Select / Textarea | default, error, success, disabled | focus ring rouge 2 px | label au-dessus, message d'aide B1 |
| Checkbox / Radio / Toggle | — | checked, focus, disabled | coche blanche sur rouge |
| Stepper (tunnel devis) | horizontal / vertical | done, current, todo | chiffres condensés, plume pour l'étape active |
| Accordion (FAQ) | — | open/closed | « Nous répondons à vos questions » |
| Toast / Alert / Banner | info, succès, erreur, légal | — | icône + texte, jamais couleur seule |
| Modal / Drawer | — | — | rayon 16 |
| Navbar | desktop / mobile (loupe, logo centré, burger) | sticky | hauteur 68 px mobile |
| Footer | foncé | — | logo B blanc, liens légaux, « Accessibilité : [statut] » |
| DataTable (back-office) | — | tri, filtre, pagination | en-tête rouge texte blanc (template PPT) |
| KeyNumber | rouge / blanc | count-up | chiffres condensés |
| Quote | — | — | guillemets rouges surdimensionnés |
| Skeleton | — | shimmer | gris `#F2F2F2` → `#DCDCDC` |
| LegalMentions | court / long | — | texte § 4.6 |

### 3.4 Animations 🔒🟨
Durées : micro 150 ms · fast 250 · base 400 · slow 600. Courbes : `--g-ease-out` (cubic-bezier .22,1,.36,1), `--g-ease-in-out` (.65,0,.35,1). Direction des entrées : **bas-gauche → haut-droite** (sens de l'aile). Pas de rebond sur logo et titres. `prefers-reduced-motion` respecté partout.

---

## 4. ✨ Micro-interactions & contenus 🔒🟨

### 4.1 Navigation
| Déclencheur | Composant | Comportement | Durée | Easing |
|---|---|---|---|---|
| Hover lien | NavLink | soulignement rouge 2 px de gauche à droite | 200 ms | ease-out |
| Scroll > 80 px | Navbar | ombre `sm` apparaît | 250 ms | ease-out |
| Ouverture menu mobile | MobileNav | panneau depuis la droite + items en stagger 60 ms | 400 ms | ease-out |
| Changement de page | Page | fondu + translateY 8→0 | 400 ms | ease-out |

### 4.2 Boutons & CTA
| Déclencheur | Composant | Comportement | Durée | Easing |
|---|---|---|---|---|
| Hover primary | Button | fond `#C21B17` → `#AA1B17` | 150 ms | ease-out |
| Hover inverse | Button | fond blanc → `#F9F5F4` | 150 ms | ease-out |
| Active | Button | scale 0.98 | 100 ms | ease-out |
| Focus clavier | Button | outline 2 px `#C21B17` offset 2 (blanc sur fond rouge) | 0 | — |
| Loading | Button | spinner blanc + libellé conservé (« Envoi en cours… ») | 250 ms | ease-in-out |

### 4.3 Formulaires
| Déclencheur | Composant | Comportement | Durée |
|---|---|---|---|
| Focus | Input | bordure `#20252B` → `#C21B17`, label fixe | 150 ms |
| Erreur au blur | Input | bordure rouge + icône + message **explicatif** (pas de shake agressif) | 200 ms |
| Valide | Input | icône coche discrète | 200 ms |
| Étape suivante | Stepper | plume active glisse vers l'étape suivante | 400 ms |
| Soumission | Form | bouton loading → écran de confirmation | — |

### 4.4 Cartes, contenus, data
| Déclencheur | Composant | Comportement | Durée |
|---|---|---|---|
| Hover carte | Card | translateY −4 px + ombre signature renforcée | 250 ms |
| Hover média | CardMedia | image scale 1.04 | 400 ms |
| Entrée viewport | Card / Section | fondu + translate diagonal 16 px | 400 ms, stagger 60 ms |
| Entrée viewport | KeyNumber | count-up | 1 000 ms |
| Tri | DataTable | flèche rotate + fondu des lignes | 250 ms |
| Toast | Toast | slide depuis le bas | 300 ms |
| Modal | Modal | scale 0.98→1 + overlay | 250 ms |

### 4.5 Microcopy 🔒 (voir `tone-of-voice-generali.md` § 9)
- CTA à l'infinitif + bénéfice + durée si vraie : « Obtenir une estimation en 2 minutes ».
- Erreurs : constat + solution, B1. Vides : rassurer (« À vos côtés »).
- **Mots proscrits** : protéger (IARD), adapté, sur mesure.
- « nous » plutôt que « Generali ».

### 4.6 Mentions légales 🔒🌐
« Informations non contractuelles à caractère publicitaire. » + paragraphe exclusions/limitations/franchises + sources des statistiques (astérisque) + conditions des offres (renvoi numéroté). **Validation Conformité obligatoire**.

---

## 5. 🌊 Scroll storytelling (optionnel) 🟨
Parallax **sobre** : la marque est plate. Autorisé :
- Hero : vidéo de fond (≤ 15 s, muette, boucle, poster image) + panneau rouge fixe.
- Lignes d'aile qui se tracent au scroll (stroke-dashoffset).
- Chiffres clés en count-up.
- Masque plume qui s'ouvre sur une photo.
Interdit : rotations 3D, effets de profondeur multicouches lourds, désactivation impossible. `prefers-reduced-motion` → statique.

---

## 6. 🗺️ Pages & navigation ✏️
### 6.1 Plan du site
```
{{/ (accueil)
├── /{{parcours}}
├── /aide
├── /mentions-legales · /donnees-personnelles · /cookies · /accessibilite
└── /admin (back-office)}}
```
### 6.2 Fiche page (à dupliquer)
| Attribut | Valeur |
|---|---|
| URL | {{/…}} |
| Titre SEO | {{Sujet — bénéfice \| Generali}} (≤ 60 car.) |
| Meta description | {{≤ 155 car., bénéfice + preuve}} |
| Layout | Default / Tunnel / Admin |
| Auth | {{Non / ROLE_…}} |
| Composants | {{…}} |
| API | {{…}} |
| Rendu | SSG / ISR / SSR |
| Contenu | pilier éditorial {{…}}, mode d'écriture {{Éclairer/Faciliter/Agir/Partager une vision}} |

---

## 7. 🛠️ Back-office ✏️
Layout sidebar anthracite `#20252B` + logo B blanc, topbar blanche, contenu `#F2F2F2`. DataTable (en-tête rouge, lignes alternées `#F3E7E9`), formulaires, médiathèque (contrôle des droits photo : interne / externe / publication), journal d'audit, gestion des rôles. Prévisualisation des contenus avec checklist ton & orthotypo.

---

## 8. ⚡ Performance, accessibilité, qualité 🔒🟨

### 8.1 Performance
LCP < 2,5 s · INP < 200 ms · CLS < 0,1 · JS initial < 100 kB gzip · images AVIF/WebP · polices Roboto/Roboto Condensed **auto-hébergées** avec `font-display: swap` (Helvetica Neue LT Std : licence web à vérifier avant usage en ligne).

### 8.2 Accessibilité
- Cible **RGAA 4.1 / WCAG 2.1 AA** (obligation légale pour les grandes entreprises privées et services couverts par l'European Accessibility Act depuis juin 2025 — à confirmer avec le Juridique). 🌐 Constat : le footer de monespace affiche « Accessibilité : non conforme » → tout nouveau produit doit publier une déclaration d'accessibilité.
- Contrastes validés (cf. `generali-design.md` § 2.5) : **pas de texte `#A0A0A0`**, pas de dark red sur rouge.
- Focus visible, navigation clavier, ARIA, alternatives textuelles, sous-titres vidéo, `lang="fr"`.

### 8.3 SEO
Titres « … | Generali », Open Graph avec visuel conforme (1200×630, red touch), schema.org `Organization` / `InsuranceAgency` / `FAQPage`.

### 8.4 Tests
Unitaires + E2E Playwright sur parcours critiques, axe-core en CI, Lighthouse CI, revue de contenu (ton + orthotypo + mots proscrits) avant mise en production.

---

## 9. 🗓️ Roadmap ✏️
| Phase | Contenu | Livrable | Validation |
|---|---|---|---|
| 0. Cadrage | objectifs, cibles, pilier éditorial | ce document v0.1 | PO + MKD |
| 1. Design | maquettes Figma (Red Studio 2.0 / GRiD), prototype | maquettes | Studio graphique |
| 2. Contenus | rédaction B1, mentions | deck contenus | Conformité / Juridique |
| 3. Dev | front, back, CI/CD AKS | staging | Tech lead |
| 4. Recette | fonctionnelle, a11y, perf | PV | PO |
| 5. Prod | déploiement, déclaration d'accessibilité | prod | DSI |

Conventions : composants PascalCase, tokens `--g-*`, routes Symfony `app_*`, branches GitLab `feature/*`.

---

## 10. 📎 Annexes
### 10.1 Checklist conformité marque (à cocher avant mise en ligne) 🔒
- [ ] Rouge `#C21B17` exact, dark red combiné au rouge
- [ ] Logo officiel (version/taille/zone de protection) — favicon = aile coupée
- [ ] Titres condensés gras, majuscules accentuées
- [ ] Décors issus de l'aile uniquement
- [ ] Photos : humain + lumière chaude + red touch
- [ ] Pictos deux couleurs (rouge + gris clair)
- [ ] Ton : nous, B1, pointu/bienveillant/engagé/direct
- [ ] Orthotypo (espaces insécables, « », ordinaux, nombres)
- [ ] Mots proscrits absents
- [ ] Mentions légales validées
- [ ] RGAA AA + déclaration d'accessibilité
- [ ] RGPD / cookies (« Continuer sans accepter »)

### 10.2 ADR ✏️
Format : Contexte → Décision → Conséquences (ex. ADR-001 : Roboto Condensed vs Helvetica Neue en web — décision : Roboto Condensed, police digitale officielle 🟥 et usage generali.fr 🌐).

### 10.3 RACI ✏️
| Activité | MKD | Studio graphique | DSI | Conformité | Métier |
|---|---|---|---|---|---|
| Charte & visuels | A | R | I | I | C |
| Contenus | A/R | C | I | C | C |
| Dev & infra | C | I | A/R | I | I |
| Mentions légales | C | I | I | A/R | C |

### 10.4 Références
Brand Guidelines Generali · Charte éditoriale Lifetime Partner · Charte orthotypo · Branding Guidelines Video (mars 2025) · templates PPT 2026 · generali.fr · WCAG 2.1 https://www.w3.org/WAI/WCAG21/quickref · RGAA https://accessibilite.numerique.gouv.fr

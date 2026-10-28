# Village MKD

Village MKD est une application de démonstration destinée à la direction Marketing et Digital de **Generali France**. Elle représente une équipe d'agents IA dans un village 3D : les départements reçoivent un brief, échangent leurs contributions et sollicitent une validation humaine.

**État actuel : simulation interactive avec chat IA optionnel, pas une plateforme d'exécution d'agents.** Les déplacements, lectures de notes, échanges, validations et livrables restent scénarisés dans le navigateur. Les scénarios n'appellent aucun modèle IA et ne produisent aucun fichier métier. L'onglet **Discussion**, séparé de la simulation, peut appeler un service IA compatible OpenAI après configuration serveur.

## Fonctionnalités

- Village Three.js de sept îles : Mairie MKD, Atelier Contenu, Studio Création, Forge Dev, Conformité, Observatoire et Cafétéria.
- Dix-sept agents IA représentés dans la simulation et un rôle humain, Vincent, chargé de la validation.
- Six scénarios : carrousel LinkedIn, newsletter agents, analyse CX d'un parcours, landing page, création de logo et création de vidéos.
- Brief personnalisable, vitesses de simulation x1/x2/x4 et réinitialisation.
- Fiches agents, journal d'activité, liste des notes du Cerveau et rotation du village.
- Onglet **Discussion** sur chaque agent IA : messages texte, historique séparé et dictée vocale avec relecture avant envoi.
- Étape de validation humaine : valider ou demander une révision.

Le texte saisi personnalise le brief affiché, mais ne génère pas un nouveau plan de travail : le déroulé reste celui du scénario sélectionné.

## Démarrage local

### Prérequis

- Node.js et npm ; le [Dockerfile](./Dockerfile) utilise Node.js 24.
- Un navigateur avec **WebGL 2** pour afficher la scène 3D.
- Une connexion permettant le téléchargement des dépendances et de la police Roboto utilisée par `next/font/google` lors de la construction.

Depuis la racine du projet, dans PowerShell :

```powershell
npm ci
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000), sauf si Next.js indique un autre port. WampServer n'est pas nécessaire pour exécuter cette application Next.js.

Aucune clé de modèle IA ni variable d'environnement métier n'est nécessaire au fonctionnement actuel de la simulation.

### Activer les discussions IA

Renseigne le fichier `.env` à la racine (ignoré par Git), puis redémarre Next.js :

```dotenv
CHAT_API_BASE_URL=https://api.openai.com/v1
CHAT_API_MODEL=
CHAT_API_KEY=
```

Complète `CHAT_API_MODEL` avec l'identifiant exact du modèle et `CHAT_API_KEY` avec la clé de ton fournisseur. L'URL doit être la base de l'API compatible OpenAI, avec son éventuel préfixe `/v1` ; le serveur ajoute `/chat/completions`. La clé est optionnelle pour un service local sans authentification. Ces variables sont exclusivement serveur : ne leur ajoute pas de préfixe `NEXT_PUBLIC_`. Un éventuel fichier `.env.local` peut surcharger les valeurs de `.env`. Sans configuration, la discussion affiche une erreur explicite sans fabriquer de réponse ; le reste de la simulation fonctionne normalement.

Clique sur un personnage ou choisis-le dans **Équipe** : **Discussion** s'ouvre à côté d'**Activité** et **Fiche**. Saisis ton message, puis clique sur la flèche ou appuie sur Entrée (Maj+Entrée insère une ligne). Le micro transcrit en français : arrête la dictée, relis ou corrige, puis envoie. Aucun envoi automatique. La dictée nécessite un navigateur compatible (notamment Chrome/Edge), l'autorisation du micro et HTTPS ou localhost. Si elle est indisponible ou refusée, le chat texte reste utilisable.

Sur mobile et tablette, la discussion utilise la hauteur disponible sous la navigation et recouvre la barre de brief ; ferme le panneau pour retrouver cette barre.

L'historique et le brouillon de chaque agent restent uniquement en mémoire jusqu'au rechargement de la page, y compris après fermeture du panneau ou changement d'agent. Fermer une discussion ou changer d'onglet pendant une réponse annule l'attente côté navigateur ; le brouillon est conservé pour réessayer. Le contexte envoyé est limité aux 14 derniers échanges et au nouveau message, de 8 000 caractères maximum chacun. Une réponse attend au plus 60 secondes côté serveur. Les échanges ne modifient pas les scénarios, n'exécutent aucun outil et ne lisent ni les fichiers des compétences ni les notes du Cerveau. Vincent étant humain, aucune IA ne répond en son nom.

**Données et mise en production :** les messages et leur contexte sont envoyés au fournisseur configuré. La dictée peut transmettre l'audio au service vocal du navigateur ; l'application n'enregistre ni n'envoie de fichier audio. Évite les données sensibles. Fais valider fournisseur, destinataires, conservation et transferts par la DSI/DPO avant usage métier. Cette route est destinée à une démonstration locale : elle ne fournit ni authentification utilisateur, ni quotas de facturation. Avant toute exposition réseau, ajoute le contrôle d'accès et les limites d'usage approuvés. La vérification d'origine ne remplace pas l'authentification.

### Utiliser la démonstration

1. Choisis un type de livrable et adapte le brief si besoin.
2. Clique sur **Lancer** et observe les déplacements et échanges.
3. Consulte **Journal**, **Cerveau** ou **Équipe**, ou clique sur un personnage pour voir sa fiche.
4. À l'étape de validation humaine, valide ou demande une révision.
5. Utilise **Réinitialiser** pour repartir de l'état initial.

L'état est conservé en mémoire pendant la session de la page ; il n'y a pas de persistance serveur des briefs, journaux ou décisions.

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Démarrer Next.js en développement |
| `npm run lint` | Exécuter ESLint sans avertissement toléré |
| `npm run typecheck` | Vérifier les types TypeScript |
| `npm test` | Exécuter les tests Vitest |
| `npm test -- src/engine/simulation.test.ts` | Cibler les tests du moteur |
| `npm run build` | Construire l'application de production |
| `npm start` | Démarrer une construction existante |

La configuration active la sortie Next.js `standalone`. Le [Dockerfile](./Dockerfile) décrit une construction multi-étapes et un serveur sur le port 3000, sous un utilisateur non privilégié. Il ne copie actuellement pas le dossier `public` dans l'image finale : la disponibilité des ressources publiques doit être traitée avant d'utiliser cette image comme livraison complète. Le processus de déploiement approuvé pour Generali reste à définir.

## Architecture

| Emplacement | Contenu |
|---|---|
| [src/app](./src/app/) | Page principale, layout et styles globaux |
| [src/components](./src/components/) | Interface React, panneaux et intégration de la scène |
| [src/engine](./src/engine/) | Catalogue des agents, scénarios, état de simulation et chemins |
| [src/scene](./src/scene/) | Scène Three.js, personnages, bâtiments et animation |
| [brain](./brain/) | Connaissances métier Markdown communes aux agents |
| [.claude/agents](./.claude/agents/) | Fiches Markdown individuelles |
| [.agents/skills](./.agents/skills/) | Compétences et références disponibles pour les assistants |
| [public/brand](./public/brand/) | Identité et ressources de **Village MKD** |

La stack déclarée dans [package.json](./package.json) comprend Next.js 16.4.3, React 19.3.0, TypeScript, Tailwind CSS 4, Three.js et `liquid-glass-react`. Les dépendances de développement ajoutent HyperFrames (`hyperframes`) et Remotion (`remotion`, `@remotion/cli`) pour la production vidéo programmatique ; elles ne sont pas utilisées par le runtime de la simulation. Les tests utilisent Vitest en environnement Node.js.

Le catalogue est défini dans [agents.ts](./src/engine/agents.ts), les workflows dans [scenarios.ts](./src/engine/scenarios.ts) et leur exécution dans [simulation.ts](./src/engine/simulation.ts). Le rendu 3D est séparé du moteur de simulation.

## Agents et connaissances

### Organisation

| Département | Rôles |
|---|---|
| Mairie MKD | Camille : coordination ; Nina : croissance/acquisition ; Vincent : validation humaine |
| Atelier Contenu | Léa : cadrage éditorial ; Hugo : rédaction ; Inès : vérification factuelle |
| Studio Création | Noé : direction artistique ; Sofia : slides/carrousels ; Malo : motion |
| Observatoire | Zoé : cadrage des analyses ; Jules : veille ; Maya : CX/UX |
| Forge Dev | Théo : architecture ; Adrien : backend et fullstack SSR ; Lola : front ; Sacha : revue et QA |
| Conformité | Paul : juridique et données personnelles ; Clara : marque |

La fiche de [Malo](./.claude/agents/malo-motion-designer.md) référence les compétences vidéo, HyperFrames, Remotion, les médias et le passage de Remotion vers HyperFrames. Les six bundles supplémentaires ont été repris depuis le profil local de l'assistant dans [.agents/skills](./.agents/skills/), avec leurs références, le 26/10/2026 ; aucune version distante plus récente n'est garantie.

La fiche de Vincent décrit un rôle humain : un assistant ne doit pas décider ni valider en son nom. Adrien apparaît dans le village et dans l'équipe Forge Dev ; les scénarios existants ne l'intègrent pas automatiquement à leurs étapes.

### Adrien — Développeur Senior Backend & Fullstack SSR

La [fiche d'Adrien](./.claude/agents/adrien-developpeur-senior-backend-fullstack-ssr.md) complète la Forge Dev avec les responsabilités suivantes :

- Logique métier serveur en PHP/Symfony et parcours Next.js en SSR ou rendu hybride.
- Flux de données et intégrations d'APIs REST.
- Environnements de développement Docker reproductibles.
- Optimisation des bases de données fondée sur des mesures.
- Tests automatisés unitaires et d'intégration sur les comportements critiques.

Adrien travaille dans le cadre architectural validé par **Théo**, à qui il rend compte des changements, tests, migrations et limites. **Lola** conserve le périmètre frontend ; Adrien limite ses contributions d'interface au câblage fonctionnel nécessaire aux parcours serveur. **Sacha** assure la revue de code et la QA. Adrien ne valide pas lui-même sa PR ; la validation technique finale de Théo ne remplace pas l'autorisation humaine de publication ou de déploiement.

Sa fiche référence six compétences : `php-symfony-backend`, `nextjs-ssr-hybrid`, `rest-api-integration`, `docker-development`, `database-optimization` et `automated-testing`. Ces six guides locaux ont été rédigés dans [.agents/skills](./.agents/skills/) le 26/10/2026 et s'affichent comme expertises. Ils imposent de vérifier les versions et documentations du projet ciblé ; ils ne constituent pas une certification de sa stack.

Le référentiel contient **17 fiches d'agents IA et une fiche de rôle humain**. Le catalogue de [agents.ts](./src/engine/agents.ts) alimente les personnages ; les fiches Markdown constituent la référence complète des périmètres et validations.

### Notes du Cerveau

- [Ton de voix](./brain/marque/ton-de-voix.md)
- [Charte Generali Red Studio 2.0](./brain/marque/charte-generali-red-studio.md)
- [Projet Parrainage](./brain/projets/parrainage.md)
- [Audiences : agents et collaborateurs](./brain/audiences/agents-et-collaborateurs.md)
- [Mentions légales](./brain/conformite/mentions-legales.md)
- [RGPD et cookies](./brain/conformite/rgpd-cookies.md)
- [Matrice Client](./brain/outils/matrice-client.md)
- [Veille concurrentielle](./brain/veille/concurrence.md)
- [Référentiel technique multi-projets](./brain/tech/stack-symfony-next.md)

Ces documents contiennent des informations confirmées et des sections **à compléter / à confirmer**. Le parrainage n'est qu'un projet parmi d'autres ; il ne définit pas le périmètre général de MKD.

**Distinction importante :** le panneau Cerveau simule des lectures et écritures à partir des chemins de notes ; il ne lit pas leur contenu sur disque. De même, le journal de démonstration n'écrit pas réellement de fichier Markdown.

La fiche copiable, les règles affichées dans **Activité** et le contexte de discussion utilisent un snapshot complet des fiches Markdown. Après modification d'une fiche, exécute `npm run sync:agents` ; `npm run dev` et `npm run build` le font automatiquement avant le démarrage. Les tests vérifient que le snapshot et les outils/compétences du catalogue restent synchronisés. Le navigateur n'accède pas au système de fichiers ; la discussion reçoit le texte du rôle, mais n'exécute toujours aucun outil et ne consulte ni les notes du Cerveau ni les fichiers des compétences.

### Marque et conformité

- **Village MKD** : identité de la plateforme, décrite dans le [guide de marque local](./public/brand/brand-guidelines.md).
- **Generali France** : client final.
- **Red Studio 2.0** : charte Generali ; les ressources détaillées restent à fournir. Ne pas lui substituer les actifs Village MKD.
- Les sources publiques citées dans les notes juridiques sont des références datées, pas une validation universelle pour tous les sites et supports.

## Contribuer

Lis les consignes dans [AGENTS.md](./AGENTS.md) avant toute intervention. Maintiens les informations du code, des fiches et des notes concernées cohérentes, sans supposer qu'elles sont synchronisées automatiquement.

Les changements fonctionnels doivent être vérifiés avec les commandes adaptées et, pour l'interface ou la scène, dans un navigateur. Les notes métier doivent citer leurs sources, leur date et leurs limites.

Ne publie ni ne déploie de livrable sans validation humaine explicite. Les exigences DSI, le circuit juridique/DPO, les règles d'architecture et le déploiement propres à chaque projet restent à confirmer dans les référentiels correspondants.

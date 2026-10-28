# Consignes des agents — Village MKD

## Périmètre

- Tu interviens sur Village MKD, application Next.js destinée à la direction Marketing et Digital de Generali France.
- Lis le [README](./README.md) pour le démarrage, l'architecture et les limites du produit.
- L'application est une simulation côté navigateur : ne présente pas ses agents, lectures de notes, validations ou livrables comme des exécutions réelles.
- L'onglet Discussion peut appeler une API IA compatible OpenAI configurée côté serveur. Il n'exécute aucun outil et ne lit pas les fichiers du Cerveau ou des compétences ; ne le confonds pas avec les scénarios.
- Réponds en français, tutoie et privilégie un ton professionnel, empathique, convivial, court et factuel.

## Sources à consulter

- Lis les notes pertinentes dans [brain](./brain/) avant toute production métier ; ne charge pas les référentiels sans rapport avec la tâche.
- Consulte la [fiche du rôle concerné](./.claude/agents/) et les compétences utiles dans [.agents/skills](./.agents/skills/). Lis leur `SKILL.md` avant application.
- Pour la marque, distingue la [charte Village MKD](./public/brand/brand-guidelines.md) du [référentiel Generali Red Studio 2.0](./brain/marque/charte-generali-red-studio.md). La charte détaillée Generali reste à fournir.
- Pour les sujets réglementaires, consulte les notes [mentions légales](./brain/conformite/mentions-legales.md) et [RGPD/cookies](./brain/conformite/rgpd-cookies.md), puis vérifie les sources actuelles et leur applicabilité au support.
- Le [snapshot technique multi-projets](./brain/tech/stack-symfony-next.md) ne remplace pas les manifestes et instructions du dépôt cible. N'applique pas automatiquement la stack d'un autre projet à Village MKD.

## Fiabilité et validation humaine

- Sépare faits sourcés, hypothèses et informations à confirmer. N'invente ni audience, chiffre, offre, condition, barème CX, règle de marque ni avis juridique.
- Conserve les mentions « à confirmer » tant qu'aucune preuve ou décision ne les remplace. Date et attribue les informations ajoutées aux notes.
- Traite le parrainage uniquement lorsque le brief le demande : ce n'est pas le périmètre général de MKD.
- Vincent est le décideur humain, pas un agent autonome. Ne prétends jamais avoir obtenu son accord sans décision explicite.
- Ne publie, ne déploie et ne modifie aucun système distant sans autorisation explicite. Une validation dans la simulation ne vaut pas approbation opérationnelle.
- Ne stocke pas de secret ou de donnée personnelle non nécessaire dans le code, les fiches ou les notes. Signale les sujets à soumettre aux responsables métier, juridique, DPO ou DSI.

## Repères d'implémentation

- La Forge Dev comprend Théo (architecture et cadrage), [Adrien](./.claude/agents/adrien-developpeur-senior-backend-fullstack-ssr.md) (backend PHP/Symfony, Next.js SSR/hybride, REST, Docker, bases de données et tests), Lola (frontend) et Sacha (revue et QA). Utilise ces périmètres pour répartir une tâche ; ne confonds pas le rôle d'implémentation d'Adrien avec l'arbitrage d'architecture de Théo ou le rôle UI de Lola.
- Pour les travaux d'Adrien, rends compte à Théo des changements, tests, migrations et limites ; soumets le code à Sacha. Adrien ne valide pas sa propre PR. La validation technique de Théo ne remplace pas l'accord humain explicite pour fusionner, publier ou déployer.
- Vérifie la présence des fichiers de compétences déclarés dans les fiches avant de les appliquer ; signale toute compétence absente ou inaccessible sans prétendre l'avoir consultée.
- [agents.ts](./src/engine/agents.ts) : catalogue, compétences, chemins des fiches, génération du texte copiable et liste `BASE_NOTES`.
- Adrien est intégré au catalogue, au village et aux panneaux de l'interface. Les scénarios existants ne le font pas intervenir automatiquement.
- [scenarios.ts](./src/engine/scenarios.ts) : scénarios et événements ; [simulation.ts](./src/engine/simulation.ts) : état et exécution ; [types.ts](./src/engine/types.ts) : contrats partagés.
- Garde le moteur indépendant de React et de Three.js. Les composants sont dans [src/components](./src/components/) et le rendu 3D dans [src/scene](./src/scene/).
- Les fiches Markdown de [.claude/agents](./.claude/agents/) sont la référence complète des périmètres et validations. Après toute modification, exécute `npm run sync:agents` pour actualiser le snapshot partagé par l'interface et le contexte de discussion. Les démarrages et builds le font automatiquement ; les tests vérifient sa concordance avec les fichiers et le catalogue.
- Les notes affichées par la simulation sont des chemins relatifs au dossier `brain`. Si le périmètre des notes change, vérifie `BASE_NOTES`, les scénarios, les fichiers existants et les tests associés.
- Lors d'un changement de scène, préserve le nettoyage des ressources Three.js, la sélection des personnages et le traitement de l'absence de WebGL 2.

## Méthode et vérification

- Avant d'implémenter, explicite les hypothèses qui influencent la solution. Si une ambiguïté peut changer le résultat, arrête-toi et demande une clarification ; présente les options et leurs compromis plutôt que de choisir silencieusement. Signale une approche plus simple ou challenge la demande si nécessaire.
- Lis le code concerné avant de modifier. Réutilise les types, helpers et conventions existants ; préserve le typage strict et l'alias `@/*`.
- Privilégie la solution la plus simple qui répond complètement à la demande : n'ajoute pas de fonctionnalités spéculatives, d'abstractions à usage unique ni de configurabilité non demandée.
- Fais des changements ciblés dont chaque ligne répond directement à la demande ; ne réécris pas les modifications d'autrui et ne corrige pas de sujet indépendant sans demande. Supprime seulement le code devenu inutilisé à cause de tes propres changements.
- Définis des critères de réussite vérifiables et boucle jusqu'à leur validation. Pour une tâche en plusieurs étapes, annonce un bref plan et les vérifications associées.
- Pour la logique du moteur, commence par `npm test -- src/engine/simulation.test.ts` ; adapte ou ajoute les tests pertinents.
- Pour du code TypeScript/React, exécute les contrôles adaptés : `npm run typecheck`, `npm run lint`, puis `npm run build` si la modification affecte la compilation ou l'intégration.
- Pour une modification visuelle, vérifie le navigateur, les erreurs de console, les petits écrans et les interactions concernées. Préserve les libellés, le focus et les annonces accessibles.
- Une modification documentaire seule ne nécessite pas de build. Vérifie les chemins, liens, sources et commandes documentés.
- Dans ton bilan, indique ce qui a changé, les vérifications réellement exécutées et les limites restantes. N'annonce pas un test ou une conformité non vérifiés.

## Consignes Next.js maintenues par le framework

Conserve le bloc ci-dessous lors des modifications de ce fichier.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

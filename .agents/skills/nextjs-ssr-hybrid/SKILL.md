---
name: nextjs-ssr-hybrid
description: "Développer les parcours Next.js en SSR ou rendu hybride, avec frontières serveur/client, récupération des données, autorisations et cache. À utiliser pour les traitements Next.js côté serveur."
---

# Next.js SSR et rendu hybride

Compétence locale Village MKD, rédigée le 26/10/2026.

## Procédure

1. Vérifie les versions installées, le routeur utilisé, les instructions locales et les manifestes. Lis les guides pertinents dans `node_modules/next/dist/docs` lorsqu'ils sont disponibles ; sinon utilise la [documentation officielle](https://nextjs.org/docs) de la version ciblée.
2. Trace les données, l'identité et les autorisations depuis la requête jusqu'au rendu. Conserve secrets, accès aux bases et contrôles d'accès sur le serveur.
3. Privilégie les composants serveur pour les données et limite les composants client aux interactions. Ne sérialise vers le navigateur que les données nécessaires ; aucun secret dans les props ou variables publiques.
4. Décide explicitement de la portée et de la durée du cache d'après la documentation installée. Ne place jamais de données personnelles ou spécifiques à une session dans un cache partagé sans isolation démontrée. Vérifie invalidation et cohérence après mutation.
5. Applique validation et autorisation aux mutations et handlers, pas seulement à l'interface. Préserve les états chargement, erreur et absence de données ; respecte le contrat HTTP.
6. Teste au moins deux identités, les accès anonymes, les mutations, les erreurs et le rafraîchissement du cache. Vérifie types, tests et build avec les scripts du dépôt.

## Livraison

Décris à Théo le rendu choisi, les frontières, le cache, les tests et les limites. Limite l'interface au câblage fonctionnel des composants fournis ; passe par Sacha avant validation technique de Théo et accord humain de livraison.

---
name: database-optimization
description: "Diagnostiquer et optimiser les accès aux bases de données à partir de mesures : plans d'exécution, index, N+1, pagination et transactions. À utiliser pour une lenteur SQL ou ORM démontrée."
---

# Optimisation des bases de données

Compétence locale Village MKD, rédigée le 26/10/2026.

## Procédure

1. Confirme le moteur, sa version, les volumes, contraintes et métriques du projet. Lis la documentation du moteur installé et les conventions ORM/migrations.
2. Reproduis la lenteur sur des données de test représentatives. Mesure temps, nombre de requêtes, volume retourné et contexte ; conserve une référence comparable avant/après.
3. Analyse le plan avec les outils adaptés. Attention : un `EXPLAIN ANALYZE` peut exécuter la requête ; n'exécute pas une écriture ou une charge de production sans autorisation.
4. Recherche N+1, chargements inutiles, filtres non indexables, pagination coûteuse et contention. Choisis le changement mesuré le plus simple ; estime le coût d'écriture et de stockage d'un index.
5. Prépare les migrations avec le mécanisme du projet. Documente verrous, compatibilité, sauvegarde et retour arrière ; aucune migration distante sans validation.
6. Réexécute les mêmes mesures et vérifie résultats, ordre, pagination, isolation et transactions. Ne revendique pas de gain sans chiffres observés.

## Livraison

Présente à Théo/Sacha les mesures avant/après, plans utiles expurgés, migrations, risques et limites. Ne change pas l'architecture globale de stockage seul.

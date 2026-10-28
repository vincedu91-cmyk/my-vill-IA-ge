---
name: automated-testing
description: "Écrire et exécuter les tests automatisés unitaires et d'intégration des comportements critiques PHP/Symfony et Next.js. À utiliser pour couvrir une fonctionnalité, un contrat ou une régression."
---

# Tests automatisés

Compétence locale Village MKD, rédigée le 26/10/2026.

## Procédure

1. Lis les scripts, configurations, tests voisins et documentation de la version installée du runner. Utilise l'outillage existant, sans ajouter un second framework par défaut.
2. Définis les comportements observables et les critères d'acceptation : succès, limites, entrée invalide, autorisation et erreurs des dépendances. Reproduis une régression par un test qui échoue avant correction lorsque possible.
3. Place la logique métier dans des tests unitaires et les contrats serveur, base de données et intégrations dans des tests d'intégration. N'utilise ni service payant réel ni données de production dans les tests automatisés.
4. Rends horloge, hasard, réseau et état de base déterministes. Isole les fixtures et nettoie seulement les ressources créées par le test ; évite attentes fixes et assertions uniquement sur l'implémentation.
5. Vérifie le résultat exact demandé, l'absence de fuite entre utilisateurs et les effets de bord. Ne remplace pas une assertion utile par un simple test de présence ou de non-erreur.
6. Lance d'abord la sélection pertinente, puis types, lint et build selon l'impact. Distingue tests réussis, échoués, ignorés et impossibles ; conserve la cause d'un blocage.

## Livraison

Transmets à Théo/Sacha les commandes, résultats, couverture comportementale, migrations de test et limites. Un test réussi ne vaut pas autorisation de fusion ou publication.

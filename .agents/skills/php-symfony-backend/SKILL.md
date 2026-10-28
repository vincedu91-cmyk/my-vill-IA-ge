---
name: php-symfony-backend
description: "Implémenter et maintenir un backend PHP/Symfony : logique métier, services, validation, autorisations, Doctrine et tests. À utiliser pour les fonctionnalités serveur Symfony."
---

# Backend PHP et Symfony

Compétence locale Village MKD, rédigée le 26/10/2026. Ce guide ne certifie pas une version ou une architecture.

## Procédure

1. Lis les consignes du dépôt cible et les notes pertinentes du Cerveau. Vérifie `composer.json`, `composer.lock`, la version PHP et les extensions réellement disponibles ; le snapshot multi-projets ne remplace pas ces preuves.
2. Lis la documentation correspondant à la version Symfony installée : [documentation officielle](https://symfony.com/doc). Recherche un contrôleur, service et test comparables dans le dépôt.
3. Définis le contrat et les cas d'erreur. Valide les entrées à la frontière ; vérifie les autorisations côté serveur, y compris la propriété des objets et l'isolation entre utilisateurs.
4. Garde les contrôleurs minces et place la logique métier dans les services existants. Réutilise l'injection de dépendances et les conventions Doctrine ; délimite les transactions et évite les écritures partielles.
5. Utilise des paramètres pour les requêtes. Ne journalise ni secret ni donnée personnelle superflue ; restitue les erreurs suivant le contrat du projet sans exposer de trace interne.
6. Couvre succès, données invalides, refus d'accès et échecs des dépendances avec les tests unitaires et d'intégration existants. Exécute les contrôles de style et d'analyse statique configurés.

## Livraison

Rends à Théo les changements, résultats de tests, migrations et limites. Soumets à Sacha ; pas d'arbitrage global, d'auto-validation de PR ou de déploiement.

---
name: docker-development
description: "Rendre les environnements de développement Docker et Compose reproductibles : images, services, volumes, configuration et readiness. À utiliser pour construire ou diagnostiquer un environnement local conteneurisé."
---

# Environnements Docker reproductibles

Compétence locale Village MKD, rédigée le 26/10/2026.

## Procédure

1. Lis Dockerfile, fichiers Compose, manifestes et consignes du projet. Vérifie Docker/Compose disponibles et consulte leur [documentation officielle](https://docs.docker.com/).
2. Réutilise les images et conventions approuvées. Fixe les versions de base et installe les dépendances depuis les lockfiles ; ne transpose pas aveuglément la stack d'un autre projet.
3. Sépare secrets, configuration et image. Exclus secrets et caches inutiles du contexte ; ne mets pas une clé dans un argument de build ou une couche. Utilise un utilisateur non privilégié lorsque compatible.
4. Définis services, réseaux, ports et volumes explicitement. Restreins l'exposition locale au besoin et préserve les données existantes ; aucune suppression de volume sans accord.
5. Valide la configuration avec la commande Compose adaptée. Construis et démarre uniquement les services du projet ; vérifie readiness réelle, connexions et commandes de test dans le conteneur.
6. Vérifie la reproductibilité depuis un état propre non destructif. Documente les commandes, variables sans valeurs sensibles et différences Windows/Linux.

## Livraison

Rapporte à Théo les commandes exécutées, images, vérifications, limites et éventuelles migrations. Arrête les seuls services temporaires créés pour le contrôle ; aucun déploiement sans accord.

---
name: rest-api-integration
description: "Concevoir ou intégrer des APIs REST : contrats HTTP, authentification, validation des réponses, délais, pagination et erreurs. À utiliser pour les échanges serveur entre services."
---

# APIs REST et intégrations

Compétence locale Village MKD, rédigée le 26/10/2026.

## Procédure

1. Confirme fournisseur, version, contrat OpenAPI ou documentation officielle, données autorisées et environnement. Ne déduis pas un endpoint ou un schéma d'une autre API.
2. Réutilise le client HTTP du projet. Garde les identifiants côté serveur ; valide les URL et destinations lorsque l'entrée utilisateur peut les influencer.
3. Définis méthodes, statuts, schémas et erreurs. Valide les entrées et les réponses externes avant usage ; une réponse vide ou mal formée n'est pas un succès.
4. Fixe un délai et une limite de taille adaptés au contrat. Prends en charge pagination et limitations fournisseur. Ne réessaie une écriture qu'avec une garantie d'idempotence documentée ; borne les tentatives.
5. Préserve annulation et propagation des erreurs. Journalise identifiant de corrélation et statut sans jeton, corps sensible ou donnée personnelle inutile.
6. Teste succès, refus d'accès, schéma invalide, pagination, quota, indisponibilité et délai dépassé avec des doubles contrôlés. Un test réel utilise uniquement un environnement autorisé et des données de test.

## Livraison

Documente contrat, configuration sans secret, dépendances et résultats à Théo/Sacha. Ne modifie pas un service distant sans autorisation.

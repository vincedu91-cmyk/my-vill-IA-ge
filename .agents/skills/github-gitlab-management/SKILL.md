---
name: github-gitlab-management
description: "Use when managing GitHub repositories or GitLab projects: repository creation, clone, remotes, branches, commits, push, pull requests (PR), merge requests (MR), reviews, CI checks, conflicts and merges. For Theo, the lead developer; requires authenticated GitHub/GitLab tools and explicit approval for remote changes."
---

# Gestion de depots GitHub et GitLab

Competence locale du projet, maintenue avec le code. Repondre dans la langue
de l'utilisateur. Une competence guide l'agent ; elle ne fournit ni compte,
ni jeton, ni permission, ni connexion automatique depuis le village simule.

## Responsabilites

- Creer un repository GitHub ou un projet GitLab dans le bon compte/groupe.
- Cloner un depot, configurer un remote et travailler sur une branche dediee.
- Preparer des commits limites a la demande, pousser une branche et ouvrir
  une pull request GitHub ou une merge request GitLab.
- Lire les diffs, traiter les retours de revue, suivre la CI et les approbations.
- Resoudre les conflits sans ecraser le travail d'autrui et fusionner seulement
  apres validation humaine, controles reussis et respect des protections.
- Un push est une operation Git ; une "push request" n'est pas un objet distinct.

## Prerequis et autorisations

1. Identifier la plateforme, l'hote (y compris GitLab auto-heberge), le
   proprietaire/groupe, le depot/projet et la branche cible. Ne pas supposer
   que la branche par defaut est `main`.
2. Utiliser une integration MCP authentifiee si elle expose les operations
   necessaires. Sinon, utiliser Git avec `gh` pour GitHub ou `glab` pour GitLab.
   Verifier les commandes disponibles et leur `--help` avant execution ;
   ne pas inventer d'outil ou de parametre et ne pas installer de CLI sans accord.
3. Verifier l'identite et l'hote avec `gh auth status` ou `glab auth status`.
   Controler les permissions sur le depot cible. Si un acces manque,
   annoncer le blocage et demander la connexion dans l'outil officiel.
   Ne jamais demander de jeton en conversation ni l'inclure dans une URL,
   un fichier, une commande partagee ou un journal.
4. Avant une creation distante, faire confirmer le nom, le compte/groupe,
   l'hote et la visibilite. Ne jamais rendre un depot public implicitement.
   Avant un push ou une ouverture de PR/MR, confirmer la destination et le
   contenu si la demande ne les autorise pas deja explicitement.
5. Une demande de capacite/configuration d'agent n'autorise pas la creation
   effective d'un depot, un commit, un push ou une fusion.

## Inspection et preparation

Dans le repertoire de travail explicite :

```text
git --no-pager status --short --branch
git --no-pager diff
git --no-pager diff --cached
```

Verifier les remotes et les branches sans divulguer de credentials eventuels.
Verifier ensuite la branche par defaut cote plateforme. Ne pas modifier les
remotes existants ni embarquer les fichiers deja modifies par l'utilisateur
sans son accord. Creer une branche de travail depuis la base convenue.
Pour un nouveau depot, utiliser `gh repo create` ou `glab repo create` avec
les options confirmees ; consulter leur aide pour les differences de version,
les organisations/groupes et les hotes auto-heberges.

## Commits, push et PR/MR

1. Relire les changements et verifier qu'aucun secret, fichier local sensible
   ou artefact genere non demande ne sera ajoute.
2. Executer les tests, lint et controles de types pertinents du projet.
   Rapporter les echecs et ne pas les masquer.
3. Ajouter uniquement les chemins explicites (`git add -- <chemins>`), examiner
   le diff indexe, puis creer un commit decrivant le changement. Respecter les
   conventions et trailers du projet. Ne pas amender sans demande explicite.
4. Pousser uniquement la branche approuvee vers le remote confirme, avec suivi
   de branche si necessaire. Ne pas pousser directement sur une branche protegee.
5. GitHub : `gh pr create` pour ouvrir une PR ; `gh pr view`, `gh pr diff`
   et `gh pr checks` pour la revue et les controles.
6. GitLab : `glab mr create` pour ouvrir une MR ; `glab mr view`,
   `glab mr diff` et les commandes `glab ci` disponibles pour les controles.
   Verifier l'hote, le projet cible et le projet source pour les forks.
7. Renseigner explicitement les branches source/cible, un titre, le contexte,
   le resume des modifications, les tests executes et les risques.
   Rechercher une PR/MR ouverte pour la branche avant d'en creer une autre.
   Si la validation est incomplete, garder la PR/MR en brouillon.

## Revue, conflits et fusion

- Recuperer les mises a jour sans `pull` aveugle. Inspecter les divergences,
  annoncer les conflits et choisir la methode d'integration avec l'utilisateur
  lorsqu'elle change l'historique ou impacte ses modifications.
- Faire relire le code par Sacha ; demander l'accord de Vincent avant fusion.
- Verifier les controles requis, la CI du dernier commit, les approbations,
  l'etat non brouillon et l'absence de conflit juste avant la fusion.
- Utiliser `gh pr merge` ou `glab mr merge` avec la strategie convenue et,
  lorsque disponible, une condition sur le SHA attendu. Ne pas contourner
  les protections, les revues ou les controles CI avec des options admin.
- Jamais de suppression de depot, force-push, `reset --hard`, suppression
  de branche distante ou changement de visibilite sans demande explicite
  et confirmation de la cible. Un rejet de push est un blocage a diagnostiquer,
  pas une raison de forcer.

## Verification et compte rendu

Relire l'etat distant apres chaque mutation. Pour un push, comparer le SHA
local et celui de la branche distante ; pour une creation, verifier le
proprietaire et la visibilite ; pour une PR/MR, verifier son URL, sa base et
sa branche source ; pour une fusion, verifier l'etat fusionne et le commit.
Ne jamais annoncer un succes sur la seule base d'une commande lancee.

Rendre : plateforme/hote, depot, branche, actions effectuees, SHA, URL PR/MR,
controles et approbations, resultat verifie et blocages restants. Si l'execution
est impossible, distinguer clairement les instructions preparees des actions
reellement executees. Ne jamais simuler une operation distante reussie.

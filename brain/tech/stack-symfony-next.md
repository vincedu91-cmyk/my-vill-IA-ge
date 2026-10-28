# Référentiel technique — Symfony, Next.js et environnements

## Statut et périmètre

Snapshot communiqué par Vincent Petit le **26/10/2026**. Il réunit plusieurs environnements et projets : les versions et outils ne s'appliquent pas nécessairement à chaque site ou livraison. Vérifier le périmètre et l'état réel du dépôt avant tout changement ou déploiement.

## Application Village MKD dans ce dépôt

Le manifeste du dépôt indique :

- Next.js **16.4.3**, React **19.3.0**, TypeScript 5, Tailwind CSS 4, Three.js 0.186.1.
- Scripts : `dev`, `build`, `start`, `lint`, `typecheck`, `test`.
- La présence de cette application ne signifie pas que tous les sites Generali utilisent cette stack.

## Stack et environnements communiqués

### Backend

- PHP 8.5.12, ou PHP 8.4.27 également signalé comme corrigé ; versions à confirmer selon projet et support.
- Symfony 8.1 ; version précédente mentionnée : 7.4.
- FrankenPHP 1.13.3 (daté du 23/10/2026) avec Caddy 2.11.7.
- Utilisations citées : VM Generali GENERALI-VM-1 et Apps Watcher.
- PostgreSQL 16 sur plateforme-avis-store.
- Mailpit en local ; Resend sur Apps Watcher, avec `symfony/resend-mailer` à ajouter selon le brief.

### Frontend et CMS

- React 19, Next.js 14+ (version exacte à confirmer par projet), TypeScript ; Tailwind CSS, Bootstrap, JavaScript natif et Vite selon les projets.
- Next.js en mode `output: 'standalone'` pour landing.generali.fr, hébergé sur Plesk ; Node.js 22.23.2 recommandé sur cet environnement.
- Animations citées : GSAP, ScrollTrigger, Lenis et Framer Motion.
- WordPress 7.1.3 (06/10/2026), Elementor 4.3.5 et Elementor Pro 4.3.2 (13/10/2026) dans le snapshot ; versions et disponibilité à confirmer sur chaque site.
- Les sites utilisant Elementor, les thèmes et les versions des autres extensions ne sont pas encore inventoriés.

### Hébergement et opérations

- Generali : Plesk chez Jaguar Network / Free Pro ; migration vers Azure en cours côté IT Generali.
- Generali : VM Debian GENERALI-VM-1 (VMware Cloud Director, Paris), Docker Engine, UFW et Traefik.
- Cloud : Azure / AKS.
- Environnement personnel : VPS Hostinger avec Coolify et Traefik, domaine vincentpetit.tech (Apps Watcher, n8n).
- Environnement local : WampServer sous Windows.
- GitLab CI/CD est cité pour le déploiement d'Apps Watcher vers le VPS ; Docker, Docker Compose et data-root Docker sous `/docker-data/` sont aussi cités.
- n8n et l'API Anthropic sont utilisés dans le projet Rupture Pour Tous.

### Analytics et API

- Analytics et CMP : non documentés.
- APIs citées : App Store Connect, scraping Google Play pour Apps Watcher, API Anthropic pour RPT ; versions non documentées.

## Actions signalées le 26/10/2026

- FrankenPHP 1.13.2 : mise à jour de sécurité indiquée comme appliquée ; version 1.13.3 est par ailleurs annoncée pour le 23/10/2026. Vérifier la version effectivement déployée par environnement.
- Changements FrankenPHP à tester depuis 1.13.0 : limite d'en-têtes à 16 KiB, en-têtes contenant `.` ou `_` ignorés, nouveau comptage de `num_threads`, timeouts d'une minute.
- Mise à jour d'Elementor et Elementor Pro signalée comme à effectuer malgré les versions récentes mentionnées dans le snapshot : vérifier l'état réel avant d'agir.
- Étape suivante mentionnée : définir le périmètre des fiches techniques (projet précis ou MKD).

## À compléter avant de proposer ou déployer une modification

- Projet, dépôt, environnement et versions réellement ciblés.
- Conventions d'architecture, sécurité et exigences DSI Generali.
- Stratégie de tests, CI/CD, approbations et procédure de retour arrière.
- CMP, analytics, APIs autorisées et exigences RGPD/sécurité.
- Documentation et source de vérité par projet.

## Règles pour les agents techniques

- Ne jamais déduire une stack d'un autre projet à partir de cette liste.
- Contrôler les manifestes, versions installées et consignes du dépôt ciblé avant de coder ; respecter ses tests et son processus de validation.
- Ne pas déployer ni modifier de système distant sans autorisation explicite et processus approuvé.

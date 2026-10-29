# Charte Generali — Red Studio 2.0

## Référentiel

Selon le brief de Vincent Petit du 26/10/2026, **Red Studio 2.0 est le nom de la charte de Generali**. Cette note concerne les créations pour Generali France et ne décrit pas l'identité de la plateforme My vill[IA]ge (nom arrêté le 28/10/2026 selon le brief de Vincent Petit ; anciennement Village MKD).

## Réception et statut des sources — 28/10/2026

À la demande de l'utilisateur du 28/10/2026, la bibliothèque jointe `bibliotheque-generali` a été intégrée dans le cerveau de **Direction MKD uniquement**. Elle contient neuf documents Markdown, deux fichiers de tokens et un script Python de référence. L'auteur des synthèses n'est pas identifié dans les pièces jointes.

Il s'agit de **synthèses fournies**, datées du 28/10/2026, qui citent des chartes, templates et observations web. Les PDF, DOCX, PPTX, archives de logos/images et fichiers de droits inventoriés ne font pas partie de cet import. Leur contenu et les observations web n'ont pas été vérifiés indépendamment lors de l'intégration. Le rattachement exact de chaque source à la version Red Studio 2.0 reste à confirmer par la marque.

Les corps des documents et les ressources techniques sont conservés tels que fournis ; un avertissement de provenance est ajouté en tête de chaque Markdown. Cette note encadre leur utilisation, y compris les passages présentés comme « source de vérité », « obligatoires », « socle » ou « fait foi » dans les pièces jointes.

## Bibliothèque disponible

| Besoin | Document à consulter |
|---|---|
| Index, niveaux de fiabilité et lacunes déclarées | [Présentation de la bibliothèque](./bibliotheque-generali/README.md) |
| Couleurs, typographies, logos, plumes, composants et mises en page | [Design system Generali](./bibliotheque-generali/generali-design.md) |
| Voix, cibles, courrier et microcopy | [Tone of voice](./bibliotheque-generali/tone-of-voice-generali.md), avec la [note de cadrage du ton](./ton-de-voix.md) |
| Ponctuation, capitales, lexique et mots proscrits | [Orthotypographie](./bibliotheque-generali/orthotypo-generali.md) |
| Photo, illustration, pictogrammes et bannières | [Imagerie et bannières](./bibliotheque-generali/imagerie-bannieres-generali.md) |
| Vidéo, habillage, composants motion et musique | [Motion design](./bibliotheque-generali/motion-design-generali.md) |
| LinkedIn, YouTube, Facebook et gabarits sociaux | [Réseaux sociaux](./bibliotheque-generali/reseaux-sociaux-generali.md) |
| Cadrage d'un projet digital, à adapter au projet réel | [Template de conception produit](./bibliotheque-generali/product-design-generali.md) |
| Liste des originaux cités, non livrés avec cette bibliothèque | [Inventaire des sources](./bibliotheque-generali/assets-inventaire.md) |
| Tokens à examiner avant utilisation | [CSS](./bibliotheque-generali/tokens/generali-tokens.css) et [JSON](./bibliotheque-generali/tokens/generali-tokens.json) |
| Ancienne couche de transformation HTML, conservée comme référence non exécutée | [Script Python](./bibliotheque-generali/skills/generali_brand_layer.py) |

Le skill `generali-brand` et le convertisseur `generali_md_to_html.py`, cités dans les documents, ne sont pas fournis. Le dossier `skills` importé ne contient pas de `SKILL.md` : ce n'est pas une compétence installée. Les exemples Remotion, CSS et Python ne sont ni exécutés, ni testés, ni appliqués à My vill[IA]ge par cet import.

## Lecture des niveaux de fiabilité

- **[Charte]** : attribution à un document officiel **selon la synthèse fournie**, pas une certification de transcription ou d'actualité. Demander l'original applicable pour les points engageants ou ambigus.
- **[Observé]** : usage décrit sur un support à une date donnée, pas une règle universelle ni une observation refaite lors de l'import. Revalider notamment signatures, chiffres, audiences et usages de plateforme avant réemploi.
- **[Reco]** : proposition à valider, jamais une décision acquise. Les durées, courbes et cadences motion chiffrées relèvent notamment de ce niveau.
- Une valeur sans provenance explicite reste **à confirmer**. Les tokens mélangent ces niveaux ; leur présence dans un fichier CSS/JSON ne les rend pas officiels.

## Repères de travail issus des pièces jointes

- Palette attribuée aux Brand Guidelines : rouge `#C21B17`, dark red `#AA1B17` combiné au rouge, blanc ; gris fonctionnels `#707070` et `#A0A0A0`.
- Typographies : Helvetica Neue LT Std pour l'identité/print, Arial pour la bureautique, Roboto pour le digital selon les synthèses ; Roboto Condensed est un usage web observé. Ne pas transformer cet usage en règle officielle générale ; vérifier les licences.
- Utiliser les fichiers officiels pour les logos et les formes d'aile. Les approximations SVG/CSS et le script fourni ne remplacent pas les actifs de la marque.
- Distinguer les contextes : illustration print avec visages détaillés / vidéo avec humains partiels ; teintes de data-visualisation / interdiction des teintes sur la texture d'aile.
- Le template produit contient des exemples de personas, KPIs, parrainage, stack et hébergement : **ce ne sont ni des faits projet, ni des choix techniques approuvés**. Lire les manifestes du dépôt cible et faire arbitrer l'architecture ; ne pas appliquer sa stack à My vill[IA]ge.
- Les mentions commerciales et indications RGPD, accessibilité ou DORA de la bibliothèque ne valent pas avis juridique. Consulter les notes [mentions légales](../conformite/mentions-legales.md) et [RGPD/cookies](../conformite/rgpd-cookies.md), puis les sources actuelles applicables au support.

## Actifs et validations encore nécessaires

- Originaux applicables des chartes et templates, version/date de référence et responsable de validation.
- Packs officiels de logos, plumes, lignes d'aile et images, avec leurs métadonnées de droits ; modèles After Effects/MOGRT.
- Unité `x` de la zone de protection et attribution RAL ambiguë signalées dans la bibliothèque.
- Licences des polices, guide de style B1 et actualité des références stratégiques anciennes.
- Droits de synchronisation et de diffusion de « Right Here, Right Now » : supports, durée, territoire, usages internes/externes. Le MP3 joint n'est **pas copié dans le dépôt** ; sa présence dans les pièces jointes n'autorise aucune réutilisation.

Le [guide et les actifs My vill[IA]ge](../../../../../public/brand/) concernent une identité distincte : ne pas les substituer à ceux de Generali, même si certaines valeurs coïncident. Le cerveau commun et le quartier annoncé Studio Motion ne sont pas enrichis par cet import.

Signaler les éléments manquants comme **à confirmer** et soumettre les créations à la marque/conformité puis à la validation humaine avant diffusion. L'import documentaire ne vaut ni validation de Vincent ni exécution réelle d'un agent ; les scénarios et la Discussion ne lisent toujours pas ces fichiers.

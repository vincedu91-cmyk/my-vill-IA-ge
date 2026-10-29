> **Import Direction MKD — 28/10/2026.** Synthèse fournie par l'utilisateur, auteur non identifié ; corps conservé tel que reçu. Les niveaux « Charte », « Observé » et « Reco » sont déclarés par cette synthèse, non vérifiés lors de l'import. Les originaux et actifs cités ne sont pas inclus ; le MP3 n'est pas importé. Lire d'abord le [statut et les limites d'utilisation](../charte-generali-red-studio.md), qui encadrent ce document. Aucune validation de diffusion n'est acquise.

# 📚 Bibliothèque de marque Generali France

> Source de vérité pour **répondre aux questions sur la charte**, **produire des éléments graphiques, des motion designs, des images et des contenus** sans tout réexpliquer. Construite le 28/10/2026 à partir des documents officiels du dossier `CHARTE-GENERALI` et de l'observation de generali.fr, monespace.generali.fr, YouTube et LinkedIn Generali France.

## 🗂️ Contenu

| Fichier | Sert à… |
|---|---|
| [`generali-design.md`](generali-design.md) | **Design system** au format DESIGN.md : atmosphère, couleurs, typo, logo, plumes, composants, layout, élévation, do/don't, responsive, prompts agents |
| [`tone-of-voice-generali.md`](tone-of-voice-generali.md) | **Ton & rédaction** : promesse Lifetime Partner, Reditude, 4 tons, modes d'écriture, cibles, courrier, mots proscrits, mentions, microcopy |
| [`orthotypo-generali.md`](orthotypo-generali.md) | Règles **orthotypographiques** + lexique + mots proscrits juridiques |
| [`product-design-generali.md`](product-design-generali.md) | **Template** de document de conception produit pour tout projet digital Generali |
| [`motion-design-generali.md`](motion-design-generali.md) | **Charte vidéo** + **bibliothèque de 22 composants motion** (spécs + code Remotion) |
| [`imagerie-bannieres-generali.md`](imagerie-bannieres-generali.md) | **Photo, illustration, icônes, bannières**, fonds Teams, **prompts de génération d'images** |
| [`reseaux-sociaux-generali.md`](reseaux-sociaux-generali.md) | **LinkedIn / YouTube / Facebook** : anatomie des posts, gabarits, conventions |
| [`assets-inventaire.md`](assets-inventaire.md) | Inventaire de **tous les fichiers sources** (logos, bannières, templates) et comment choisir |
| [`tokens/generali-tokens.css`](tokens/generali-tokens.css) · [`.json`](tokens/generali-tokens.json) | **Design tokens** prêts à importer (web, Figma Tokens, Remotion) |

## 🚦 Niveaux de fiabilité
- 🟥 **[Charte]** — écrit dans un document officiel → **fait foi**
- 🌐 **[Observé]** — mesuré sur les supports en ligne Generali (oct. 2026) → **usage réel**, peut évoluer
- 🟨 **[Reco]** — déduit pour combler un vide → **à valider** avant usage officiel

## ⚡ Réponses express

| Question | Réponse |
|---|---|
| Rouge Generali ? | **`#C21B17`** · RVB 194-27-23 · CMJN 0/95/100/20 · Pantone **180 C** / 179 U · RAL Design 040.40.67 🟥 |
| Rouge foncé ? | **`#AA1B17`** · 170-27-23 · CMJN 15/95/100/25 · Pantone 7628 C · **toujours avec le rouge** 🟥 |
| Gris ? | Dark Grey `#707070` (Cool Grey 7) · Light Grey `#A0A0A0` (Cool Grey 1) — fonctionnels 🟥 ; anthracite `#323232` (PPT) |
| Police ? | **Helvetica Neue LT Std** (identité/print) · **Arial** (bureautique) · **Roboto** (digital) 🟥 — generali.fr utilise **Roboto Condensed** 🌐 |
| Style des titres ? | **CAPITALES, condensé, Black** 🟥 |
| Taille mini du logo ? | Version A : 15 mm (Line A 15–50 mm, Gospel A ≥ 50 mm) · Version B : 50 mm (Line B 50–225, Gospel B ≥ 225) · digital < 20 px : aile coupée 🟥 |
| Signature actuelle ? | **« Assurer vos vies »** · claim « Vous avez 1 001 vies. Nous les assurons toutes, ici et maintenant. » 🌐 |
| Promesse ? | **Lifetime Partner** : partenaire de nos clients et distributeurs tout au long de leur vie 🟥 |
| Ton ? | Pointu / bienveillant / engagé / direct — **mais pas** jargonneux / complaisant / dogmatique / brusque 🟥 |
| « Generali » ou « nous » ? | **« nous »** 🟥 |
| Mots interdits ? | **protéger** (produits IARD), **adapté**, **sur mesure** 🟥 |
| Formule de fin de courrier ? | **« À vos côtés »** 🟥 |
| Photo ? | Humain en action + lumière chaude naturelle + **touche de rouge** ; jamais N&B, sombre, désaturé, sans humain 🟥 |
| Icônes ? | Deux couleurs : trait rouge + forme gris clair (négatif : trait blanc + dark red) 🟥 |
| Bouton web ? | `#C21B17`, texte blanc, Roboto Condensed 15/600, h 48, padding 0 24, rayon 8 🌐 |
| Musique de la pub ? | Fatboy Slim, **« Right Here, Right Now »** (≈ 123 BPM), fichier dans le dossier ; réutilisation selon les droits 🟥 |
| Bannière LinkedIn ? | 3300×825 (4:1), pack officiel 🟥 |

## ⚖️ Points de vigilance (écarts entre sources)
1. **Typo web** : la charte dit Roboto, le site utilise Roboto Condensed → retenir **Roboto Condensed pour titres/UI, Roboto pour textes longs**.
2. **Ancien livrable** : le skill `generali-doc-to-html` utilisait DM Serif Display + Outfit → **hors charte** ; corrigé par la couche `generali-brand-2026` (Roboto Condensed / Roboto, plumes, lignes d'aile, orthotypo).
3. **Teintes** : interdites sur la texture d'aile (Guidelines), présentes pour la data-viz (template PPT) → teintes **uniquement en data-viz**.
4. **Humains** : visages détaillés en illustration print (Guidelines) vs **humains partiels** en illustration vidéo (charte vidéo 2025).
5. **Valeurs motion** : la charte vidéo n'a aucune durée chiffrée → toutes les durées sont 🟨.
6. **Couleurs des JPEG** : dérive (`#BA1B17`) → toujours utiliser les HEX officiels.
7. **Charte éditoriale** datée (stratégie Generali 2021) : principes de ton toujours valides, références stratégiques à mettre à jour (plan **Lifetime Partner 27**, **Boost 2027**).
8. **Accessibilité** : monespace affiche « non conforme » → tout nouveau produit vise RGAA/WCAG AA.

## 🕳️ Ce qui manque encore (à demander au Studio graphique)
- Valeur exacte de l'unité `x` de la zone de protection (p. 18 des Guidelines : 4x, x non chiffré en mm)
- Fichiers sources de l'aile / plumes / lignes d'aile en vecteur (SVG/AI)
- Périmètre des droits de la musique de campagne (« Right Here, Right Now ») : quels supports, quelle durée, interne/externe ?
- Licence web Helvetica Neue LT Std
- Templates After Effects (MOGRT) des lower-thirds et end-frames
- Guide de style « B1 » cité par la charte éditoriale
- Posts LinkedIn complets (la page Posts nécessite une connexion)

## 🤖 Utiliser avec Claude
Le skill **`generali-brand`** résume cette bibliothèque et indique quel fichier lire selon la tâche. Sinon, Commencer une demande par : *« [GEN] En respectant la bibliothèque Generali (generali-design.md + tone-of-voice-generali.md), crée… »*. Pour une vidéo : ajouter `motion-design-generali.md` ; pour une image : `imagerie-bannieres-generali.md` ; pour un projet : dupliquer `product-design-generali.md`.

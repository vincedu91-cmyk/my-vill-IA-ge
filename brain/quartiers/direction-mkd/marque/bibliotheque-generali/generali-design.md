> **Import Direction MKD — 28/10/2026.** Synthèse fournie par l'utilisateur, auteur non identifié ; corps conservé tel que reçu. Les niveaux « Charte », « Observé » et « Reco » sont déclarés par cette synthèse, non vérifiés lors de l'import. Les originaux et actifs cités ne sont pas inclus ; le MP3 n'est pas importé. Lire d'abord le [statut et les limites d'utilisation](../charte-generali-red-studio.md), qui encadrent ce document. Aucune validation de diffusion n'est acquise.

# Design System : Generali France

> **Statut** : référence de travail — octobre 2026
> **Légende de fiabilité** (utilisée dans toute la bibliothèque)
> - 🟥 **[Charte]** : valeur issue d'un document officiel du dossier `CHARTE-GENERALI` (Brand Guidelines, charte vidéo, charte orthotypo, templates PPT 2026)
> - 🌐 **[Observé]** : valeur mesurée sur generali.fr / monespace.generali.fr / YouTube / LinkedIn (styles calculés, 28/10/2026)
> - 🟨 **[Reco]** : recommandation déduite pour combler un vide de la charte — à valider avec le Studio graphique
>
> Fichier compagnon : `tokens/generali-tokens.css` et `tokens/generali-tokens.json`

---

## 1. Thème visuel & atmosphère

Generali, c'est une marque qui **porte sa couleur comme une attitude**. Le manifeste interne le dit sans détour : *« Red is not just our colour, it is our attitude »* — la **REDITUDE** (« Cœur, Âme, Pouls »). Le rouge Generali n'est pas un accent posé sur un fond neutre : c'est **le terrain de jeu**. Pages de garde pleines rouges, bandeaux rouges, aplats rouges qui s'ouvrent en diagonale sur une photo lumineuse — le rouge structure l'espace, le blanc le fait respirer. 🟥

La signature graphique est **l'aile du lion** : extraite du logo (le lion ailé de saint Marc tenant l'Évangile ouvert, *Pax tibi Marce*), elle est décomposée en **plumes** — des parallélogrammes inclinés aux angles obtus arrondis — et en **lignes d'aile** (traits fins qui filent à l'horizontale puis basculent en diagonale avec un coude arrondi). Ces formes servent de masque photo, de porte-titre, de transition vidéo, de texture. L'aile relie l'**héritage** (1831) au **futur** : « c'est la forme à partir de laquelle tout commence ». 🟥

La typographie est **condensée, majuscule, noire** pour les titres (Helvetica Neue Black Condensed en print, Roboto Condensed Bold sur le web) : des titres compacts, affirmés, presque d'affiche. Le corps de texte reste simple et lisible. La photographie est **humaine, chaleureuse, en mouvement**, avec **toujours une touche de rouge** dans l'image (un vêtement, un objet, un détail). 🟥

La campagne en cours (depuis oct. 2025) pousse ce territoire : **« Assurer vos vies »**, **« Vous avez 1 001 vies. Nous les assurons toutes, ici et maintenant. »** — film cinématographique à la lumière dorée, et end-frame typographique « ASSURER ▣ VOS VIES » où le logo dans son carré rouge remplace l'espace entre les mots. 🌐

**Caractéristiques clés :**
- Rouge Generali `#C21B17` dominant — couleur de marque ET couleur d'action 🟥
- Dark Red `#AA1B17` toujours **en combinaison** avec le rouge, jamais seul 🟥
- Gris (`#707070`, `#A0A0A0`) = couleurs **fonctionnelles** (pictos, textes secondaires, data) 🟥
- Titres en **capitales condensées très grasses** ; sous-titres capitales Light/Bold ; texte courant en bas-de-casse 🟥
- **Plumes** et **lignes d'aile** comme seul vocabulaire décoratif — pas de dégradés décoratifs, pas de textures étrangères 🟥
- Photos : présence humaine, lumière naturelle chaude, **touche rouge obligatoire** 🟥
- Web : coins arrondis généreux (cartes 16 px, boutons 8 px), ombres teintées de rouge très diffuses 🌐

---

## 2. Palette de couleurs & rôles

### 2.1 Couleurs primaires 🟥 (Brand Guidelines, § 02.3)

| Nom | HEX | RGB | CMJN | Pantone | RAL | Rôle |
|---|---|---|---|---|---|---|
| **Red** (Rouge Generali) | `#C21B17` | 194-27-23 | 0/95/100/20 | 180 C / 179 U | Design 040.40.67 | Couleur principale du logo et de la marque. Aplats, CTA, titres, pictos |
| **Dark Red** | `#AA1B17` | 170-27-23 | 15/95/100/25 | 7628 C / 2350 U | 3000 | Rouge plus foncé, **toujours combiné au rouge de base** (fonds dégradés par aplats, détails, remplissage picto négatif) |
| **White** | `#FFFFFF` | 255-255-255 | 0/0/0/0 | — | 9023 ¹ | Couleur principale avec le rouge |

¹ *Le RAL 9023 est indiqué sur la page palette au voisinage du blanc/Dark Grey ; la mise en page du PDF rend l'attribution ambiguë — à confirmer.*

### 2.2 Couleurs secondaires (fonctionnelles) 🟥

| Nom | HEX | RGB | CMJN | Pantone | RAL | Rôle |
|---|---|---|---|---|---|---|
| **Dark Grey** | `#707070` | 112-112-112 | 0/0/0/65 | Cool Grey 7 C/U | 9023 ¹ | Textes secondaires, légendes, éléments fonctionnels |
| **Light Grey** | `#A0A0A0` | 160-160-160 | 0/0/0/20 | Cool Grey 1 C/U | 7047 | Forme grise des pictos, séparateurs, data secondaire |

### 2.3 Extensions présentes dans les templates PowerPoint 2026 🟥

Thème Office du template horizontal 2026 :

| Slot | HEX | Usage |
|---|---|---|
| accent1 / accent6 | `#C21B17` | Rouge |
| accent2 | `#323232` | **Anthracite** — texte foncé, titres sur fond clair |
| accent3 | `#707070` | Dark Grey |
| accent4 | `#A0A0A0` | Light Grey |
| accent5 | `#DCDCDC` | Gris très clair (fonds de cartes, tableaux) |
| surfaces | `#F2F2F2` | Fond de blocs |
| rose pâle | `#F3E7E9` | Fond de slides intérieures (template vertical, carrousels sociaux) |

Le slide « Logos, plumes, couleurs » du template propose des **teintes** du rouge et des gris (≈ 80/60/40/20 %) pour la **data-visualisation uniquement**. ⚠️ Les Brand Guidelines interdisent les teintes/translucides **sur la texture de l'aile**.

### 2.4 Couleurs observées sur le web 🌐 (generali.fr, oct. 2026)

| Nom (proposé) | HEX | Où |
|---|---|---|
| Ink | `#20252B` | Titres H3, bouton secondaire foncé, bordures |
| Text | `#000000` / `#333333` | Texte courant |
| Text muted | `#6F7072` | Mentions, méta |
| Warm Surface | `#F9F5F4` | Fond de sections « crème rosé » |
| Red hover/pressed | `#C5281C` | État d'interaction ponctuel |
| Deep Red (ombre) | `#711B17` | Base des ombres `rgba(113,27,23,.15)` ; aussi « rouge encore plus foncé » des illustrations flat (charte vidéo) |

⚠️ Les exports JPEG des bannières sociales mesurent `#BA1B17` / `#A21B17` (dérive de profil colorimétrique). **Ne jamais pipetter une image** : utiliser les valeurs du tableau 2.1.

### 2.5 Accessibilité (contrastes calculés, WCAG 2.1)

| Combinaison | Ratio | Verdict |
|---|---|---|
| Blanc sur Red `#C21B17` | **6,06:1** | ✅ AA texte normal |
| Blanc sur Dark Red `#AA1B17` | **7,30:1** | ✅ AAA |
| Red sur blanc | 6,06:1 | ✅ AA |
| Red sur Warm Surface `#F9F5F4` | 5,60:1 | ✅ AA |
| Red sur rose `#F3E7E9` | 5,03:1 | ✅ AA |
| Dark Grey `#707070` sur blanc | 4,95:1 | ✅ AA (limite) |
| **Light Grey `#A0A0A0` sur blanc** | **2,61:1** | ❌ jamais pour du texte |
| Noir sur Red | 3,46:1 | ⚠️ AA grand texte seulement — éviter |
| **Dark Red sur Red** | **1,20:1** | ❌ uniquement pour des **détails décoratifs** (règle charte vidéo) |

---

## 3. Typographie

### 3.1 Familles 🟥

| Contexte | Police | Règle |
|---|---|---|
| **Principale (print, identité)** | **Helvetica Neue LT Std** (50 styles, Thin → Black, Condensed → Extended) | Titres en **Black Condensed CAPITALES** |
| Secondaire — bureautique | **Arial** | PowerPoint, Outlook, documents partagés avec l'externe |
| Secondaire — digital | **Roboto** | Tous les outils digitaux : site public, mobile, WebHub, AgentHub, Digital Advisory, SOE |
| Légendes / renvois | Helvetica Condensed Italic, corps 8 | Charte orthotypo |
| Signature e-mail | Arial 9 pt | Charte signature |

🌐 **Réalité web** : generali.fr est entièrement en **Roboto Condensed** (400/500/600/700) avec Roboto en appoint ; monespace.generali.fr en **Roboto**. Les templates PPT 2026 utilisent Arial (thème) + `HelveticaNeueLT Std Cn` pour les titres.

**Pile CSS recommandée** 🟨
```css
--font-display: "Helvetica Neue LT Std", "Roboto Condensed", "Arial Narrow", Arial, sans-serif; /* titres */
--font-body: Roboto, Arial, sans-serif;                                                      /* texte */
--font-ui: "Roboto Condensed", Roboto, Arial, sans-serif;                                    /* boutons, labels */
```

### 3.2 Principes 🟥
- **Titres & accroches : TOUJOURS capitales, condensé, Black.**
- Sous-titres : capitales, **Bold et Light** combinables (« SUBTITLE ARE BOLD AND LIGHT »).
- Texte courant : Regular ou Bold, **bas-de-casse**.
- **3 styles d'Helvetica maximum** par document ; hiérarchie par taille / graisse / style, interlignages cohérents et décroissants.
- Majuscules **toujours accentuées** (À, É, Ê…).
- Ferré à gauche (drapeau), pas de césure de mot.

### 3.3 Hiérarchie web 🌐 (styles calculés generali.fr)

| Rôle | Police | Taille | Graisse | Interligne | Notes |
|---|---|---|---|---|---|
| Hero H1 (mobile) | Roboto Condensed | 32 px | 700 | 1.2 | « Vous avez 1 001 vies » |
| Section H2 | Roboto Condensed | 35 px | 700 | 48 px | Titre de section, souvent blanc sur rouge |
| Accroche | Roboto Condensed | 28 px | 700 | 38 px | |
| H3 / titre de carte | Roboto Condensed | 25 px | 700 | 35 px | Couleur Ink `#20252B` |
| H4 | Roboto Condensed | 22 px | 700 | 32 px | |
| Lead | Roboto Condensed | 17–18 px | 400 | 27 px | |
| Body | Roboto Condensed | 16 px | 400 | 25 px | |
| Body small | Roboto Condensed | 15 px | 400 | 24 px | |
| Label / bouton | Roboto Condensed | 15 px | 600 | 1 | |
| Meta | Roboto Condensed | 14 px | 500 | 21 px | |
| Overline (catégorie) | Roboto Condensed | 11–12 px | 500–600 | 18–21 px | CAPITALES (« PARTICULIERS », « ASSURANCE / PRÉVENTION ») |
| Mentions légales | Roboto | 12 px | 400 | — | |

### 3.4 Hiérarchie print / PPT 🟨 (dérivée des principes 🟥 et du template 2026)

| Rôle | Police | Corps | Casse |
|---|---|---|---|
| Titre de couverture | Helvetica Neue LT Std 97 Black Condensed | 40–60 pt | CAPITALES |
| Titre de slide / page | Helvetica Neue LT Std Black Condensed (ou Arial Black) | 24–32 pt | CAPITALES |
| Sous-titre | Helvetica Neue Light **ou** Bold | 14–18 pt | CAPITALES |
| Texte | Helvetica Neue Roman / Arial | 10–14 pt | bas-de-casse |
| Légende | Helvetica Condensed Italic | 8 pt | 🟥 |

---

## 4. Composants

### 4.1 Logo 🟥

**Anatomie** : **Symbole** (lion ailé + Évangile « PAX TIBI MARCE EVANGELISTA MEUS ») + **Logotype** (GENERALI en capitales à empattements). Ratio constant, **jamais séparés**.

| Version | Disposition | Variante | Taille d'utilisation |
|---|---|---|---|
| **A — principale** | Symbole au-dessus du logotype (empilé) | **Gospel A** (Évangile détaillé) | ≥ 50 mm de large |
| | | **Line A** (Évangile synthétisé en lignes) | 15 → 50 mm |
| | | — | ❌ jamais < 15 mm |
| **B — secondaire** | Symbole à gauche du logotype (horizontal) — pour formats horizontaux où A ne passe pas | **Gospel B** | ≥ 225 mm |
| | | **Line B** | 50 → 225 mm |
| | | — | ❌ jamais < 50 mm |
| **Aile coupée** | Aile recadrée seule | usage **exceptionnel**, digital < 20 px | 20×20 px, 12×12 px (favicon, notification, app) |

**Couleurs** : rouge sur blanc (positif), blanc sur rouge (négatif) ; noir ou blanc si la couleur est impossible. Le logo reste **monochrome**.
**Fond photo** : version positive ou négative en garantissant un contraste net.
**Zone de protection** : construite sur une unité `x` — marge de **4x** autour du logo (cf. p. 18 des Guidelines).
**Co-branding** (grille modulaire, logo Generali = 2×2 modules, espace = 2 modules) : Cas A partenaire carré/rond (2×2) ; Cas B partenaire rectangle horizontal (4×2) ; Cas C partenaire très horizontal (4×1 centré).

**Les 12 interdits** : ① symbole sans logotype ② position du logotype modifiée ③ couleurs non spécifiées ④ proportions modifiées ⑤ ajout/substitution d'éléments ⑥ logo dans un dispositif graphique (pastille, pentagone…) ⑦ élément omis ⑧ effet (3D, ombre…) ⑨ rotation ⑩ bicolore ⑪ logotype seul ⑫ mise en évidence d'une partie.

**Fichiers** : `Logos Generali.zip` — RVB 1250×1250 px et CMJN, versions A/B × Gospel/Lines × rouge / noir / blanc / blanc-fond-rouge (voir `assets-inventaire.md`).

🌐 **Usage campagne 2025-26** : logo **A blanc dans un carré rouge** (= version « blanc fond rouge » du pack) inséré **entre deux mots** d'un titre (« ICI ▣ MAINTENANT », « ASSURER ▣ VOS VIES ») ; avatar LinkedIn/YouTube = même carré rouge.

### 4.2 Plumes (formes d'aile) 🟥 PPT 2026

Parallélogramme incliné vers la droite (~50° par rapport à l'horizontale), **les deux angles obtus arrondis**, les deux angles aigus vifs. Déclinaisons du template : **plein rouge**, **plein gris clair**, **contour rouge**, **contour gris**.

Usages : porte-titre de section (« INTRODUCTION »), puce de liste à pictogramme (« MANUEL / FOCUS / OBJECTIF / PRISE DE PAROLE »), chiffre clé (« XX % »), bandeau de lower-third vidéo, masque photo.

Règles orthotypo « Plumes » : uniformiser les contours dans un document ; **agrandir de façon homothétique**, ne jamais déformer ; pour loger un nom de produit, **étirer latéralement par les points d'ancrage** sans déformer l'angle.

```svg
<!-- Approximation SVG de la plume (viewBox 300×80). Préférer la forme native du template PPT. -->
<svg viewBox="0 0 300 80"><path d="M0 80 L48 16 Q60 0 80 0 H300 L252 64 Q240 80 220 80 Z" fill="#C21B17"/></svg>
```

### 4.3 Texture de l'aile 🟥
Lignes fines (keyline) + aplats issus de l'aile, en **3 variations seulement** :
1. Fond rouge + formes en aplat **et** en keyline
2. Fond rouge + formes en **keyline** uniquement
3. Fond blanc + formes en aplat **et** en keyline
❌ Jamais de teintes ou couleurs translucides sur la texture.

### 4.4 Pictogrammes 🟥
- 3 styles : **Simple** (trait fin, petites tailles) · **Deux couleurs** (style principal : trait plus épais rouge + forme pleine gris clair décalée dessous) · **Illustration**.
- Toujours dessinés sur une **grille carrée**, même épaisseur de trait.
- **Positif** (fond blanc) : contour rouge `#C21B17` + remplissage gris clair.
- **Négatif** (fond rouge) : contour blanc + remplissage **Dark Red** `#AA1B17`.
- Jamais d'autre couleur. Uniformiser taille/style/contour dans un document.
- Bibliothèque fournie (Guidelines p. 37-39 + template « pictos et autres éléments utiles ») : Call center, Idea, Chat, Media, Credit card, Mobile, Protection, Life Insurance, Health Insurance, Transport, Scooter, Accident, Success, Conference, Time, Couple, Family, Injury, Car Insurance, Call us.

### 4.5 Boutons 🌐 (generali.fr)

| Variante | Fond | Texte | Bordure | Rayon | Hauteur | Padding | Police |
|---|---|---|---|---|---|---|---|
| **Primaire** | `#C21B17` | `#FFFFFF` | — | 8 px | 48 px | 0 24 px | Roboto Condensed 15 px / 600 |
| **Inversé** (sur rouge/photo) | `#FFFFFF` | `#C21B17` | 1 px `#FFFFFF` | 8 px | 50 px | 0 24 px | idem |
| **Foncé** (secondaire) | `#20252B` | `#FFFFFF` | — | 8 px | 48 px | 0 24 px | idem |
| **Contour** 🟨 | transparent | `#C21B17` | 1 px `#C21B17` | 8 px | 48 px | 0 24 px | idem |
| **Pill / tag** | variable | — | — | 99 px | — | — | 12–14 px |

Libellés : verbe d'action + bénéfice concret (« Obtenir une estimation en 2 minutes », « Découvrir nos solutions retraite », « Nous contacter »).

### 4.6 Cartes & conteneurs 🌐
- Fond `#FFFFFF` sur section `#F9F5F4`, ou blanc sur rouge.
- Rayon **16 px** (cartes), 16 px 16 px 0 0 (carte à média en haut), 24 px (grands blocs), 40 px (blocs hero/visuels).
- Ombre signature : `0 20px 35px -15px rgba(113,27,23,.15)` — ombre **portée basse, teintée rouge profond**.
- Ombre légère (espace client) : `0 4px 16px rgba(0,0,0,.08)`.
- Templates PPT : cartes blanches à contour rouge fin, coin supérieur droit coupé en biais, pastille ronde rouge en en-tête.

### 4.7 Navigation 🌐
- Header blanc, **68 px** (mobile), logo centré (mobile) — loupe à gauche, burger à droite.
- Footer **anthracite très foncé** avec logo B blanc.
- Espace client : carte blanche centrée (rayon 12–16 px), logo B rouge en tête, fond gris clair, footer foncé.

### 4.8 Traitement image 🟥
Voir `imagerie-bannieres-generali.md`. En bref : humain, action, lumière chaude naturelle, **red touch** ; photos dans des **masques plumes/ailes** ou en pleine page sous un aplat rouge diagonal ; illustrations au trait blanc sur photo.

### 4.9 Composants distinctifs

**Hero campagne** 🌐 — fond vidéo/photo plein cadre, panneau rouge `#C21B17` aux coins arrondis 40 px ou ouvert en diagonale, titre condensé blanc (« Vous avez 1 001 vies »), sous-titre (« Nous les assurons toutes, ici et maintenant. »), CTA inversé blanc.

**Chiffre clé** 🟥 PPT — gros chiffre condensé rouge (« + 00 % », « 00 mld », « XX % ») dans une carte ou une plume, libellé court en dessous.

**Citation** 🟥 PPT — portrait détouré, guillemets rouges ouvrant/fermant surdimensionnés, nom + fonction en dessous.

**Page de section** 🟥 — aplat rouge plein, grand chiffre + titre blanc, texture d'aile en keyline, logo A blanc en bas à droite.

**Slide finale** 🟥 PPT — « MERCI POUR VOTRE ÉCOUTE » + « À bientôt sur generali.fr » sur grande forme rouge arrondie.

---

## 5. Mise en page

### 5.1 Espacements 🟨 (base 8, cohérente avec les valeurs observées 🌐 : 24 px de padding bouton, 48 px de hauteur, 16 px de rayon)
`4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

### 5.2 Grille & conteneur 🌐
- Conteneur max **1080 px** (contenu), colonnes de texte 544–740 px.
- Breakpoints (Bootstrap) : **576 / 768 / 992 / 1200 px**.
- Formats PPT 🟥 : horizontal **33,87 × 19,05 cm (16:9)** ; vertical **19,05 × 27,52 cm**.

### 5.3 Philosophie des blancs
- **Alternance rouge / blanc** comme rythme narratif (charte vidéo : « ajouter des écrans blancs pour alterner la couleur dominante ») 🟥.
- Une section = un message ; le rouge sert d'**ouverture de chapitre**, le blanc de **contenu**.
- Diagonales : les ruptures de surface suivent l'angle de l'aile (≈ 40–50°), jamais d'angles arbitraires.

### 5.4 Rayons
| Token | Valeur | Usage |
|---|---|---|
| xs | 5 px | petits champs |
| sm | 8 px | boutons |
| md | 12 px | cartes espace client |
| lg | 16 px | cartes |
| xl | 24 px | grands blocs |
| 2xl | 40 px | panneaux hero |
| pill | 99 px | tags, chips |
| circle | 50 % | pastilles, avatars |

---

## 6. Profondeur & élévation

| Niveau | Traitement | Usage |
|---|---|---|
| 0 — à plat | aucun | sections, aplats rouges (la marque est **plate**) |
| 1 — léger | `0 4px 16px rgba(0,0,0,.08)` | formulaires, espace client |
| 2 — signature | `0 20px 35px -15px rgba(113,27,23,.15)` | cartes produit, cartes d'offre |
| 3 — rouge diffus | `0 10px 34px rgba(194,27,23,.05)` | survol discret |
| 4 — dramatique | `0 22px 34px -12px rgba(32,1,0,.7)` | visuel hero sur fond foncé |
| Focus 🟨 | `outline: 2px solid #C21B17; outline-offset: 2px` (sur rouge : blanc) | accessibilité |

❌ Interdit sur le **logo** : toute ombre ou effet (interdit n° 8).

---

## 7. À faire / À ne pas faire

### ✅ À faire
- Utiliser `#C21B17` en valeur exacte (RVB 194-27-23), jamais un rouge « approchant » (`#C8102E`, `#E30613`…)
- Associer le Dark Red **avec** le rouge (aplats en deux tons, détails), jamais seul
- Titres en **CAPITALES condensées très grasses**, accentuées
- Respecter les tailles mini du logo (A ≥ 15 mm, B ≥ 50 mm) et la zone de protection 4x
- Mettre une **touche de rouge** dans chaque photo
- Construire les décors avec **plumes** et **lignes d'aile** uniquement
- Pictos : rouge + gris clair (positif) / blanc + dark red (négatif)
- Alterner écrans rouges et écrans blancs

### ❌ À ne pas faire
- Pas de couleurs vives tierces, pas de photos sombres, désaturées ou noir & blanc
- Pas de photo sans présence humaine ni de modèle posé sur fond statique
- Pas de teintes/transparences sur la texture d'aile
- Pas de logo déformé, tourné, en pastille, avec effet, ou symbole seul
- Pas de texte gris clair `#A0A0A0` sur blanc (2,6:1)
- Pas de texte Dark Red sur Red (1,2:1)
- Pas de polices hors charte (ex. DM Serif Display, Outfit, Proxima Nova, IvyMode trouvées dans d'anciens livrables/templates) pour un support de marque
- Pas de guillemets anglais, pas de « Générali » accentué (le nom de marque s'écrit **Generali**)

---

## 8. Responsive

| Nom | Largeur | Changements clés |
|---|---|---|
| Mobile | < 576 px | 1 colonne, logo centré, H1 32 px, CTA pleine largeur |
| Mobile L | 576–767 px | 1 colonne, cartes 336 px |
| Tablette | 768–991 px | 2 colonnes de cartes |
| Desktop | 992–1199 px | navigation complète, 3 colonnes |
| Large | ≥ 1200 px | conteneur 1080 px centré |

- Cibles tactiles ≥ 48 px (hauteur bouton observée).
- Le logo passe en **Line** puis en **aile coupée** quand la place manque (≤ 20 px).
- Les diagonales et plumes restent présentes à toutes tailles ; les masques photo passent en pleine largeur sur mobile.

---

## 9. Guide de prompt pour agents

### 9.1 Référence rapide couleurs
- Rouge marque / CTA : `#C21B17`
- Rouge foncé (combiné) : `#AA1B17`
- Rouge profond (ombres, contraste illustration) : `#711B17`
- Texte foncé : `#20252B` (web) / `#323232` (bureautique)
- Texte secondaire : `#707070`
- Gris fonctionnel : `#A0A0A0`
- Surface chaude : `#F9F5F4` · Surface rose (slides/carrousels) : `#F3E7E9` · Gris clair : `#F2F2F2` / `#DCDCDC`
- Ombre carte : `0 20px 35px -15px rgba(113,27,23,.15)`

### 9.2 Prompts de composants
- « Crée un hero Generali : vidéo plein cadre, panneau `#C21B17` aux coins arrondis 40 px en bas, titre Roboto Condensed 700 en capitales blanches 48 px interligne 1.05, sous-titre 18 px blanc, bouton inversé blanc texte `#C21B17` 15 px 600, rayon 8 px, hauteur 50 px. »
- « Crée une carte d'offre : fond blanc, rayon 16 px, ombre `0 20px 35px -15px rgba(113,27,23,.15)`, picto deux couleurs (trait `#C21B17`, forme `#A0A0A0`), overline 12 px 600 capitales `#C21B17`, titre 25/35 700 `#20252B`, lien “Découvrir” rouge. »
- « Crée un titre de section avec plume : plume rouge (parallélogramme 50°, angles obtus arrondis) contenant le label blanc capitales 14 px, suivie d'un titre capitales condensé `#C21B17`. »
- « Crée un écran de chapitre : aplat `#C21B17` plein, grand numéro + titre blanc Black Condensed capitales, texture d'aile en keyline blanche 1 px dans le coin bas, logo A blanc bas droite. »
- « Crée un end-frame : fond image, texte blanc condensé capitales “ASSURER” [logo A blanc dans carré `#C21B17`] “VOS VIES”, sous-ligne “Rendez-vous sur **generali.fr**”. »

### 9.3 Guide d'itération
1. Le rouge est **la** couleur — si un écran n'a pas de rouge, il n'est pas Generali.
2. Titres : capitales, condensé, gras. Toujours.
3. Les seules formes décoratives sont issues de l'aile (plumes, lignes, aile coupée).
4. Une touche de rouge dans chaque image.
5. Gris = fonction, jamais émotion.
6. Contraste AA vérifié (blanc sur rouge ✅, gris clair ❌).
7. Doute ? Consulter les Brand Guidelines (`charte_brandguide_elements_basics_couleur.pdf`) puis le Studio graphique.

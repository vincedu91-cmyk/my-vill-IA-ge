> **Import Direction MKD — 28/10/2026.** Synthèse fournie par l'utilisateur, auteur non identifié ; corps conservé tel que reçu. Les niveaux « Charte », « Observé » et « Reco » sont déclarés par cette synthèse, non vérifiés lors de l'import. Les originaux et actifs cités ne sont pas inclus ; le MP3 n'est pas importé. Lire d'abord le [statut et les limites d'utilisation](../charte-generali-red-studio.md), qui encadrent ce document. Aucune validation de diffusion n'est acquise.

# Motion Design — Generali France

> Sources 🟥 : *Branding Guidelines Video* — Studio graphique, Pôle vidéo, **mars 2025** (`charte-video-branding-generali-2025-03.pdf`), Brand Guidelines (aile, pictos, illustration). 🌐 Film « Assurer vos vies » (YouTube `OiMcplhKzWk`, 31 s, oct. 2025), vignettes et sous-titrages de la chaîne @generalifrance.
> ⚠️ La charte vidéo est **qualitative** : elle ne donne **aucune durée, courbe ou cadence chiffrée**. Toutes les valeurs numériques de ce document sont des 🟨 **recommandations** cohérentes avec les exemples, à valider avec le Pôle vidéo.

---

## 1. Les 6 piliers de la charte vidéo 🟥

| # | Pilier | Règles |
|---|---|---|
| 1 | **Typographic animation** | ① **Illustrer le sens des mots** : icône qui remplace une lettre (le « É » de STRATÉGIE, le « O » d'une loupe), illustration/icône qui interagit avec le texte, texte qui **prend la forme de son sens** (RAPIDE qui file, DÉGÂTS DES EAUX qui coule, FLEURISTE qui fleurit). ② **Insérer le texte dans les rushs** pour créer une interaction image/texte (texte derrière un sujet, texte qui suit un geste). ③ **Hiérarchie** par la **graisse, la taille et le contour** (mot plein + mot en contour). |
| 2 | **Couleurs** | ① Dark Red sur Red **uniquement pour des détails**. ② **Écrans blancs** pour alterner avec la couleur dominante. ③ **Fort contraste** pour les infos clés (lisibilité, accessibilité). ④ Touches de **gris / gris foncé / noir** possibles. ⑤ Couleurs secondaires **seulement pour un projet interne**, le rouge restant principal. |
| 3 | **Rushs** | ① Chercher la **red touch** : choisir des rushs qui en ont déjà une, sinon l'ajouter en **étalonnage** ou par **color metamorphosis**. ② **Insérer les rushs dans les animations** : détourer le sujet et le placer dans un **environnement rouge**. ③ **Petite touche de motion** : illustrer l'invisible par des touches graphiques **porteuses de sens** (pas juste des traits). ④ **Vidéo dans une forme** (plume/aile) : layout dynamique, résout le mélange horizontal/vertical. ⑤ **Choix des rushs** : recentrer sur **l'humain**, la **diversité**, la chaleur. ⑥ **Étalonnage** « movie-like » sur **chaque** rush (banque d'images comme tournages internes). |
| 4 | **Patterns** | ① **Animer l'aile** : l'aile comme élément ou placeholder, l'aile comme **transition** (une ou plusieurs ailes). Évolution : l'associer à d'autres symboles, l'utiliser en motif de trait. ② **Touche Generali sur les captations** : titres, questions, noms des intervenants, notions clés → template à motif reconnaissable, « l'aile sans qu'elle écrase ». |
| 5 | **Illustrations** | ① Pour **notions clés** et mise en valeur. ② **Humains toujours partiels** (mains, parties du corps). ③ **Illustration détaillée au trait blanc sur fond rouge** (+ touches de dark red). ④ **Flat design** : rouge, dark red, gris, blanc + plus foncé pour le contraste (rouge encore plus foncé `#711B17` 🟨, noir). ⑤ **Icônes simples animées** pour le dynamisme. |
| 6 | **Sound design** | **Musique de marque** pour toutes les vidéos produit ; musique libre de droits adaptée au type (pédagogique, corporate, inspirationnelle, commerciale, interview). **Sound design** réaliste (chiens, voitures, nature) et abstrait (mouvements, numérique, boutons UI). |

---

## 2. Grammaire du film de marque 🌐 (« Assurer vos vies », 31 s)

| Temps | Contenu | Leçon |
|---|---|---|
| 0–25 s | Plans courts (≈ 2 s) de **moments de vie** : naissance, couple en voiture, bébé porté, papa et enfant, fête dans les vignes, couple âgé enlacé, mariage/fête, jeune cadre, plongeon, baignade en mer | Diversité des âges et situations ; lumière **dorée/naturelle**, grain cinéma ; **rouge présent dans chaque plan** (bonnet, robe, rubans, maillot) |
| 25–28 s | Texte **« ICI ▣ MAINTENANT »** sur plan mer, blanc, condensé, capitales ; logo dans carré rouge entre les mots | Logo-ponctuation |
| 28–31 s | **« ASSURER ▣ VOS VIES »** + « Rendez-vous sur **generali.fr** » | End-frame type |
| VO | « Generali est là, ici et maintenant. Generali, assurer vos vies. » | VO courte, posée, chaleureuse |
| Musique | Fatboy Slim, « Right Here, Right Now » (≈ 123 BPM) | Plans ≈ 1 mesure, voir § 8.1 |

---

## 3. Tokens motion 🟨

```css
:root {
  /* Durées (à 25 i/s : 1 frame = 40 ms) */
  --g-dur-micro: 150ms;   /* 4 f  — micro-feedback UI */
  --g-dur-fast: 250ms;    /* 6 f  — apparition d'élément */
  --g-dur-base: 400ms;    /* 10 f — entrée de titre, plume */
  --g-dur-slow: 600ms;    /* 15 f — transition d'aile */
  --g-dur-hold: 2000ms;   /* 50 f — lecture minimale d'un message court */

  /* Courbes */
  --g-ease-out: cubic-bezier(0.22, 1, 0.36, 1);      /* « coup d'aile » : départ vif, arrivée douce */
  --g-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* transitions plein cadre */
  --g-ease-in: cubic-bezier(0.55, 0, 1, 0.45);       /* sorties */
  --g-angle-wing: -40deg;                            /* angle des diagonales (aile / plume) */
  --g-stagger: 60ms;                                 /* décalage entre mots / items */
}
```

| Paramètre | Valeur | Justification |
|---|---|---|
| Cadence | **25 i/s** (diffusion FR) ; 30 i/s accepté pour social | standard PAL |
| Lecture | ≥ **3 mots / s** max à l'écran ; 1 message = 1 écran | accessibilité |
| Direction | Entrées **de bas-gauche vers haut-droite** (sens de l'aile) ; sorties dans le même sens | cohérence de la diagonale |
| Spring (Remotion) | `{ damping: 200 }` (sans rebond) pour la marque ; `{ damping: 14, mass: 0.6 }` pour pictos uniquement | sobriété |
| Rebonds / élastiques | ❌ sur titres et logo ; ✅ légers sur pictos | |
| Logo | **jamais** animé dans sa forme (pas de rotation/déformation) — apparition en fondu/scale 0.96→1 ou par masque | interdits logo |

---

## 4. Formats & zones de sécurité 🟨

| Format | Résolution | Usage | Zone titre sûre |
|---|---|---|---|
| 16:9 | 1920×1080 | YouTube, événements, écrans | marges 96 px (5 %) |
| 9:16 | 1080×1920 | Reels, Shorts, Stories | haut 220 px et bas 380 px libres (UI plateformes) |
| 1:1 | 1080×1080 | LinkedIn, Facebook | marges 64 px |
| 4:5 | 1080×1350 | LinkedIn/Instagram feed | marges 64 px |
| Fond Teams | 1920×1080 (livrés aussi en 8000×4500) | visio | centre libre pour la personne (cf. fonds « HERE / NOW ») |

Logo : **coin haut-gauche** en version A ou B blanc/rouge (cf. charte vidéo), ou carré rouge en end-frame. Sous-titres : blancs, plaque sombre semi-transparente, bas centré (observé YouTube).

---

## 5. Bibliothèque de composants motion réutilisables

Chaque composant est spécifié pour être reproduit dans **After Effects (MOGRT)**, **Remotion (React)** ou **CSS/GSAP**. Les implémentations Remotion de référence suivent au § 6.

| ID | Composant | Pilier | Description | Paramètres | Durée type |
|---|---|---|---|---|---|
| **M01** | `WingWipe` | Patterns | Transition plein cadre : 1 à 3 plumes rouges (Red + Dark Red) traversent l'écran en diagonale (-40°) et révèlent le plan suivant | `count` 1–3, `colors`, `direction` | 15–20 f |
| **M02** | `PlumeLowerThird` | Patterns / captations | Nom + fonction d'intervenant : plume rouge glisse depuis la gauche (masque), texte blanc capitales qui se révèle ligne à ligne | `name`, `role`, `side` | in 10 f · hold ≥ 75 f · out 8 f |
| **M03** | `PlumeLabel` | Patterns | Étiquette de chapitre / notion clé dans une plume (ex. « ÉTAPE 1 : … ») | `label`, `variant` plein/contour | in 8 f |
| **M04** | `KineticTitle` | Typo animation | Titre condensé capitales, mots en stagger ; un mot **plein** + un mot **contour** pour la hiérarchie | `lines[]`, `outlineWords[]` | 3–4 f/mot |
| **M05** | `IconLetter` | Typo animation | Une lettre est remplacée par un picto Generali (deux couleurs) qui s'anime en place | `word`, `index`, `icon` | 12 f |
| **M06** | `MeaningText` | Typo animation | Le texte prend la forme de son sens (vitesse, goutte, croissance…) — presets `rush`, `drip`, `grow`, `shake`, `stamp` | `text`, `preset` | 15–25 f |
| **M07** | `TextBehindSubject` | Typo dans rushs | Texte inséré entre arrière-plan et sujet détouré (2 calques : plate + sujet roto) | `bg`, `subjectMatte`, `text` | plan |
| **M08** | `RedEnvironment` | Rushs | Sujet détouré posé sur un environnement rouge (aplat + lignes d'aile) | `subject`, `pattern` | plan |
| **M09** | `VideoInPlume` | Rushs | Rush masqué dans une plume / un panneau arrondi sur fond rouge ou blanc ; permet de mixer 16:9 et 9:16 | `src`, `shape`, `position` | plan |
| **M10** | `MeaningfulTouch` | Rushs | Touches graphiques **porteuses de sens** au trait blanc par-dessus le rush (ondes sonores, chaleur, mouvement, vibrations) — tracé progressif | `pathSvg`, `color` | 10–20 f |
| **M11** | `KeyNumber` | Illustration / data | Chiffre clé condensé (« 2 200 € », « 1. ») qui compte, + libellé capitales ; fond rouge ou carte blanche | `value`, `prefix/suffix`, `label` | count 20–30 f |
| **M12** | `StrokeIllustration` | Illustrations | Illustration détaillée au trait blanc sur rouge, dessinée progressivement (stroke-dashoffset), touches de dark red | `svg`, `duration` | 30–60 f |
| **M13** | `FlatIllustrationPop` | Illustrations | Scène flat (rouge, dark red, gris, blanc, `#711B17`, noir) : éléments entrent en échelle 0.9→1 + fondu, stagger | `layers[]` | 20–30 f |
| **M14** | `IconPop` | Illustrations | Picto simple (positif ou négatif) : forme grise apparaît, puis le trait rouge se dessine | `icon`, `variant` | 12 f |
| **M15** | `QuestionCard` | Captations | Question en capitales dans une carte blanche à coin coupé ou une plume (« QUE PENSEZ-VOUS DU VOTE ÉLECTRONIQUE ? ») | `question` | in 10 f |
| **M16** | `ChapterOpener` | Typo / couleur | Écran rouge plein, grande forme blanche en diagonale, mot plein + mot contour (ex. « MOTION / DESIGN ») | `title`, `outline` | 40–60 f |
| **M17** | `WhiteBreath` | Couleurs | Écran blanc de respiration entre séquences rouges, texte rouge | `text` | 30–50 f |
| **M18** | `LogoInline` | Signature | Logo A blanc dans un **carré rouge** inséré entre deux mots (« ICI ▣ MAINTENANT ») | `left`, `right` | in 12 f · hold 50 f |
| **M19** | `EndFrame` | Signature | « ASSURER ▣ VOS VIES » + « Rendez-vous sur **generali.fr** » sur plan ou fond rouge | `cta`, `url` | 75 f |
| **M20** | `BrushRibbon` 🌐 | Social | Ruban rouge façon coup de pinceau sous un mot clé (« EN ⑤ POINTS ») — observé carrousels/bannières 2026 | `text`, `number` | 10 f |
| **M21** | `Squiggles` 🌐 | Social | Petites ondulations rouges (énergie, joie) autour d'un sujet — observé bannières « Assurer vos vies » | `count`, `area` | boucle 24 f |
| **M22** | `WingLines` | Patterns | Lignes d'aile fines (1–2 px) qui se tracent puis restent en texture (horizontal → coude arrondi → diagonale) | `lines`, `color` | 20 f |

### Règles d'assemblage
1. **Rythme** : rouge (ouverture) → blanc (respiration) → rush (incarnation) → rouge (message clé) → end-frame.
2. **1 composant « fort » par plan** (pas de WingWipe + KineticTitle + IconLetter simultanés).
3. **Captations** (interviews, tables rondes) : M02 à chaque nouvel intervenant, M15 pour chaque question, M03 pour les notions clés ; l'aile reste discrète.
4. **Pédagogie / tutoriel** (ex. parrainage) : M16 → M09 (capture d'écran dans une plume) + M14 → M11 → M19.
5. Toujours terminer par M19 (ou M18) et l'URL **generali.fr** (ou l'URL du dispositif).

---

## 6. Implémentations de référence (Remotion / React + TypeScript)

```tsx
// generali-motion/tokens.ts
export const G = {
  red: '#C21B17', darkRed: '#AA1B17', deepRed: '#711B17',
  white: '#FFFFFF', ink: '#20252B', grey: '#707070', lightGrey: '#A0A0A0',
  fontDisplay: '"Helvetica Neue LT Std", "Roboto Condensed", "Arial Narrow", Arial, sans-serif',
  fps: 25,
  wingAngle: -40,
} as const;
```

```tsx
// generali-motion/Plume.tsx — forme de base (angles obtus arrondis)
import React from 'react';
export const PLUME_PATH = 'M0 80 L48 16 Q60 0 80 0 H300 L252 64 Q240 80 220 80 Z';
export const Plume: React.FC<{ width: number; color?: string; outline?: boolean; style?: React.CSSProperties }> =
  ({ width, color = '#C21B17', outline = false, style }) => (
    <svg viewBox="0 0 300 80" width={width} height={(width * 80) / 300} style={style} preserveAspectRatio="none">
      <path d={PLUME_PATH} fill={outline ? 'none' : color} stroke={outline ? color : 'none'} strokeWidth={outline ? 2 : 0} vectorEffect="non-scaling-stroke" />
    </svg>
  );
```

```tsx
// M01 — WingWipe.tsx : transition par plumes en diagonale
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from 'remotion';
import { Plume } from './Plume';
import { G } from './tokens';

export const WingWipe: React.FC<{ count?: 1 | 2 | 3; duration?: number }> = ({ count = 2, duration = 18 }) => {
  const f = useCurrentFrame();
  const colors = [G.red, G.darkRed, G.red];
  return (
    <AbsoluteFill style={{ overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: count }).map((_, i) => {
        const p = interpolate(f, [i * 3, i * 3 + duration], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        });
        const x = interpolate(p, [0, 1], [-160, 160]); // en % de la largeur
        return (
          <AbsoluteFill key={i} style={{ transform: `translateX(${x}%) scale(3)`, justifyContent: 'center', alignItems: 'center' }}>
            <Plume width={900} color={colors[i]} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
```

```tsx
// M02 — PlumeLowerThird.tsx
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { G } from './tokens';

export const PlumeLowerThird: React.FC<{ name: string; role: string; hold?: number }> = ({ name, role, hold = 90 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: f, fps, config: { damping: 200 }, durationInFrames: 10 });
  const exit = interpolate(f, [10 + hold, 18 + hold], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const reveal = (enter - exit) * 100;
  return (
    <div style={{ position: 'absolute', left: 96, bottom: 120, fontFamily: G.fontDisplay, color: G.white }}>
      <div style={{
        background: G.red, padding: '18px 56px 18px 40px',
        clipPath: `polygon(16px 0, ${reveal}% 0, calc(${reveal}% - 16px) 100%, 0 100%)`, // plume inclinée révélée de gauche à droite
      }}>
        <div style={{ fontSize: 44, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1 }}>{name}</div>
        <div style={{ fontSize: 24, fontWeight: 300, textTransform: 'uppercase', marginTop: 6, opacity: interpolate(f, [6, 14], [0, 1], { extrapolateRight: 'clamp' }) }}>{role}</div>
      </div>
    </div>
  );
};
```

```tsx
// M04 — KineticTitle.tsx : mots en stagger, mot(s) en contour
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { G } from './tokens';

export const KineticTitle: React.FC<{ words: string[]; outline?: number[]; color?: string; size?: number }> =
  ({ words, outline = [], color = G.white, size = 120 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ fontFamily: G.fontDisplay, fontWeight: 900, fontSize: size, lineHeight: 0.95, textTransform: 'uppercase', color }}>
      {words.map((w, i) => {
        const p = interpolate(f, [i * 3, i * 3 + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) });
        const isOutline = outline.includes(i);
        return (
          <div key={i} style={{
            opacity: p, transform: `translate(${(1 - p) * -40}px, ${(1 - p) * 40}px)`, // diagonale bas-gauche → haut-droite
            color: isOutline ? 'transparent' : color, WebkitTextStroke: isOutline ? `3px ${color}` : undefined,
          }}>{w}</div>
        );
      })}
    </div>
  );
};
```

```tsx
// M11 — KeyNumber.tsx
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { G } from './tokens';

export const KeyNumber: React.FC<{ value: number; suffix?: string; label: string; onRed?: boolean }> =
  ({ value, suffix = '', label, onRed = true }) => {
  const f = useCurrentFrame();
  const v = Math.round(interpolate(f, [0, 25], [0, value], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }));
  const fmt = new Intl.NumberFormat('fr-FR').format(v).replace(/ | /g, ' '); // espace fine insécable
  const c = onRed ? G.white : G.red;
  return (
    <div style={{ fontFamily: G.fontDisplay, color: c, textTransform: 'uppercase' }}>
      <div style={{ fontSize: 200, fontWeight: 900, lineHeight: 0.9 }}>{fmt}{suffix && ` ${suffix}`}</div>
      <div style={{ fontSize: 40, fontWeight: 700, marginTop: 12, color: onRed ? G.white : G.ink }}>{label}</div>
    </div>
  );
};
```

```tsx
// M12 — StrokeIllustration.tsx : tracé progressif au trait blanc
import { interpolate, useCurrentFrame } from 'remotion';
export const StrokeIllustration: React.FC<{ paths: string[]; duration?: number; viewBox: string }> = ({ paths, duration = 40, viewBox }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox={viewBox} style={{ width: '100%', height: '100%' }}>
      {paths.map((d, i) => {
        const p = interpolate(f, [i * 4, i * 4 + duration], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return <path key={i} d={d} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={p} />;
      })}
    </svg>
  );
};
```

```tsx
// M18/M19 — EndFrame.tsx : « ASSURER ▣ VOS VIES »
import { Img, staticFile, interpolate, useCurrentFrame } from 'remotion';
import { G } from './tokens';

export const EndFrame: React.FC<{ left?: string; right?: string; url?: string }> = ({ left = 'ASSURER', right = 'VOS VIES', url = 'generali.fr' }) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const s = interpolate(f, [0, 12], [0.96, 1], { extrapolateRight: 'clamp' });
  const u = interpolate(f, [14, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const word: React.CSSProperties = { fontFamily: G.fontDisplay, fontWeight: 900, fontSize: 150, color: G.white, textTransform: 'uppercase', lineHeight: 1 };
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: a }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, transform: `scale(${s})` }}>
        <span style={word}>{left}</span>
        {/* Fichier du pack : « rvb_version a gospel_blanc fond rouge.png » (carré rouge + logo blanc) */}
        <Img src={staticFile('logos/rvb_version-a-gospel_blanc-fond-rouge.png')} style={{ height: 150 }} />
        <span style={word}>{right}</span>
      </div>
      <div style={{ marginTop: 36, fontFamily: 'Roboto, Arial, sans-serif', fontSize: 40, color: G.white, opacity: u }}>
        Rendez-vous sur <b>{url}</b>
      </div>
    </div>
  );
};
```

> Ces composants sont volontairement minimaux : ils fixent la **grammaire** (couleurs, diagonale, typographie, timing). Les variantes (plusieurs lignes, formats 9:16) s'obtiennent par props.

### Équivalent CSS / GSAP (web, micro-interactions)
```css
@keyframes g-plume-in { from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); } to { clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%); } }
.g-plume { background: var(--g-red); color: #fff; animation: g-plume-in var(--g-dur-base) var(--g-ease-out) both; }
@media (prefers-reduced-motion: reduce) { .g-plume { animation: none; } }
```

---

## 7. Étalonnage & red touch 🟥🟨
- LUT « cinéma » douce : noirs légèrement relevés, hautes lumières chaudes, saturation modérée, **rouges protégés** (qualifier la teinte ≈ 0–10° et la garder vers `#C21B17`).
- Si le rush n'a pas de rouge : recolorer un élément existant (vêtement, objet) — « color metamorphosis » — plutôt qu'ajouter un objet artificiel.
- ❌ Noir & blanc, désaturé, nuit sombre, couleurs vives concurrentes (guidelines photo).

## 8. Sound design 🟥🟨

### 8.1 Musique de la campagne « Assurer vos vies » 🟥
Fichier fourni : `fatboy-slim-right-here-right-now.mp3` — **Fatboy Slim, « Right Here, Right Now »** (album *You've Come a Long Way, Baby*, 1998, genre big beat), musique officielle de la pub. Elle fait écho au claim « **ici et maintenant** ».

| Caractéristique (mesurée sur le fichier) | Valeur |
|---|---|
| Durée | 6 min 27 s (version album complète, pas l'edit 30 s de la pub) |
| Format | MP3 256 kb/s, 44,1 kHz, stéréo |
| Tempo | **≈ 123 BPM** (mesuré ; souvent annoncé à 125) → 1 temps ≈ 0,49 s, **1 mesure ≈ 1,95 s** |
| Tonalité dominante | La (estimation) |
| Loudness intégré | −14,7 LUFS |
| Structure (repères ≈) | montée 0:00–1:15 · groove plein ≈ 1:19–3:20 · break ≈ 3:20–4:35 · reprise pleine ≈ 4:37–5:45 · sortie |

**Caler le montage sur la musique** 🟨
| À 25 i/s | Frames |
|---|---|
| 1 temps | ≈ 12 f |
| 1 mesure (4 temps) | ≈ 49 f |
| 2 mesures | ≈ 98 f |

Le film de 31 s enchaîne des plans d'environ 2 s ≈ **1 mesure par plan** : couper sur les premiers temps, placer les `WingWipe` (M01) sur le temps fort qui précède le changement de plan, et l'end-frame (M19) sur la dernière mesure.

> ⚠️ **Droits** : c'est un titre commercial sous licence. Son utilisation pour la pub est encadrée par un contrat de synchronisation, dont je n'ai pas le détail (supports, durée, territoire). **Ne pas la réutiliser** dans d'autres vidéos (tutoriels, LinkedIn, Teams, événements) sans validation de la Direction de la marque/communication. Les plateformes (YouTube, LinkedIn, Facebook) détectent automatiquement les œuvres protégées et peuvent bloquer ou démonétiser la vidéo. Par défaut, pour les vidéos internes ou pédagogiques, utiliser une musique libre de droits **dans l'esprit** : big beat / breakbeat énergique, 120–128 BPM, montée progressive.

### 8.2 Musique par type de vidéo
| Type de vidéo | Musique | Sound design |
|---|---|---|
| Produit / commercial | **Musique de marque** (campagne : « Right Here, Right Now », sous réserve des droits § 8.1) | UI clics, whoosh doux sur WingWipe |
| Pédagogique / tutoriel | Libre de droits, légère, tempo moyen | clics UI, validation, notification |
| Corporate / institutionnel | Libre de droits, ample | discret |
| Inspirationnel / campagne | Musique de marque ou cinématique | réaliste (nature, rires, eau) |
| Interview | Nappe très légère ou rien | aucun |
Mixage 🟨 : VO −14 LUFS intégré (web), musique −8 à −12 dB sous la voix.

## 9. Checklist de livraison vidéo ✅
- [ ] Rouge `#C21B17` exact, dark red seulement en détail
- [ ] Au moins un écran blanc de respiration si > 20 s de rouge dominant
- [ ] Red touch dans chaque rush, étalonnage homogène
- [ ] Humains : diversité, action, émotion ; illustrations : humains partiels
- [ ] Titres capitales condensées, mots porteurs de sens animés (pas de simples traits décoratifs)
- [ ] Captations : nom/fonction (M02), questions (M15)
- [ ] Logo non déformé, non animé dans sa forme ; end-frame + URL
- [ ] Sous-titres FR (vérifier « Generali » sans accent — l'ASR YouTube écrit « Générali »)
- [ ] Mentions légales à l'écran si offre commerciale
- [ ] Exports : 16:9 + 9:16 + 1:1 si diffusion sociale

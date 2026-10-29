#!/usr/bin/env python3
"""Couche « charte Generali 2026 » appliquée APRÈS generali_md_to_html.py.
Usage : python3 generali_brand_layer.py in.html out.html [--logo logo.png]
- remplace les polices hors charte (DM Serif / Outfit / DM Mono) par Roboto Condensed / Roboto / Roboto Mono
- injecte les surcharges CSS de marque (titres capitales condensées, plumes, lignes d'aile, fond chaud)
- corrige l'orthotypo du texte (« », espaces insécables, ordinaux, « Generali »)
- signale les mots proscrits par le Juridique (sans les modifier)
"""
import re, sys, base64, pathlib

FONTS = ('<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700;800;900'
         '&family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">')

WING = ("data:image/svg+xml;utf8," +
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 300' fill='none' stroke='white' stroke-opacity='.35' stroke-width='1.2'>"
        "<path d='M0 70 H260 Q290 70 312 52 L372 0'/><path d='M0 150 H330 Q360 150 382 132 L540 0'/>"
        "<path d='M0 230 H400 Q430 230 452 212 L600 90'/></svg>").replace('#', '%23').replace('<', '%3C').replace('>', '%3E')

CSS = """<style id="generali-brand-2026">
/* Charte Generali — bibliothèque generali-brand (oct. 2026) */
:root{
  --font-display:"Helvetica Neue LT Std","Roboto Condensed","Arial Narrow",Arial,sans-serif;
  --font-body:Roboto,Arial,sans-serif;
  --font-mono:"Roboto Mono",Consolas,monospace;
  --deep-red:#711B17; --ink:#20252B;
  --grey-bg:#F9F5F4; --grey-line:#DCDCDC;
}
body{font-family:var(--font-body);}
.hero h1,.section-title,.sidebar-title,.stat-num,.logo-mark{font-family:var(--font-display);font-weight:800;text-transform:uppercase;letter-spacing:-.005em;}
.hero h1{font-size:54px;line-height:1.02;}
.hero h1 em{font-style:normal;color:#fff;background:var(--red);padding:0 .14em;-webkit-box-decoration-break:clone;box-decoration-break:clone;}
.hero::before{top:auto;bottom:0;right:0;width:620px;height:310px;border-radius:0;background:url("__WING__") no-repeat right bottom/contain;}
.hero::after{content:none;}
.hero-eyebrow{color:#fff;opacity:.85;}
.hero-eyebrow::before{content:"";display:inline-block;width:28px;height:10px;margin-right:10px;vertical-align:middle;background:var(--red);transform:skewX(-40deg);border-radius:3px 0 3px 0;}
.section-title{font-size:32px;line-height:1.05;color:var(--anthracite);border-bottom:none;padding-bottom:0;}
.section-label{display:inline-block;position:relative;margin-left:8px;isolation:isolate;color:#fff;padding:5px 22px 5px 16px;margin-bottom:12px;letter-spacing:.12em;}
.section-label::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--red);transform:skewX(-40deg);border-radius:6px 0 6px 0;}
.section-divider{height:2px;background:linear-gradient(90deg,var(--red) 0 64px,var(--grey-line) 64px);}
.stat-num{font-size:30px;}
.logo-mark{border-radius:4px;font-size:20px;overflow:hidden;}
.logo-mark img{width:100%;height:100%;object-fit:cover;display:block;}
.card{border-radius:16px;}
.card:hover{box-shadow:0 20px 35px -15px rgba(113,27,23,.15);transform:translateY(-2px);transition:all .25s cubic-bezier(.22,1,.36,1);}
a:focus-visible,button:focus-visible{outline:2px solid var(--red);outline-offset:2px;}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;}}
</style>""".replace("__WING__", WING)

PROSCRITS = [(r"\bprot[ée]g\w*", "« protéger » : proscrit pour un produit IARD → assurer / sécuriser"),
             (r"\badapt[ée]e?s?\b", "« adapté » : proscrit en support commercial → correspond à vos besoins"),
             (r"\bsur[ -]mesure\b", "« sur mesure » : proscrit en support commercial → formule modulable")]

NNBSP, NBSP = "\u202f", "\u00a0"

def _fix_plain(t):
    t = re.sub(r"«\s*", "«" + NBSP, t); t = re.sub(r"\s*»", NBSP + "»", t)
    t = re.sub(r"(?<=\w) ?([;!?])(?=\s|$)", NNBSP + r"\1", t)                       # ; ! ?
    t = re.sub(r"(?<=[\w»)]) ?:(?=\s)", NBSP + ":", t)                                # deux-points
    t = re.sub(r"(\d) ?(%|€)", r"\1" + NBSP + r"\2", t)                               # 50 % · 10 €
    t = re.sub(r"\b(\d+)(ère|ere)\b", r"\1re", t); t = re.sub(r"\b(\d+)(ème|eme)\b", r"\1e", t)
    t = re.sub(r"\bGénérali\b", "Generali", t)
    return t

def fix_text(t):
    # guillemets droits (bruts ou échappés) → guillemets français
    t = re.sub(r'(?:"|&quot;)([^"<>&]{1,200}?)(?:"|&quot;)', "«" + NBSP + r"\1" + NBSP + "»", t)
    # ne jamais toucher aux entités HTML (&amp; &#39; …)
    parts = re.split(r"(&[#\w]+;)", t)
    return "".join(p if i % 2 else _fix_plain(p) for i, p in enumerate(parts))

def process(html):
    # 1. polices
    html = re.sub(r'<link[^>]+fonts\.googleapis\.com/css2\?family=DM[^>]+>', FONTS, html)
    # 2. CSS de marque
    html = html.replace("</head>", CSS + "\n</head>", 1)
    # 3. orthotypo : uniquement dans les nœuds texte, hors pre/code/script/style
    parts = re.split(r"(<pre[\s\S]*?</pre>|<code[\s\S]*?</code>|<script[\s\S]*?</script>|<style[\s\S]*?</style>|<[^>]+>)", html)
    out = [p if (i % 2 or not p.strip()) else fix_text(p) for i, p in enumerate(parts)]
    return "".join(out)

def main():
    a = sys.argv[1:]
    if len(a) < 2: sys.exit(__doc__)
    src, dst = a[0], a[1]
    html = process(pathlib.Path(src).read_text(encoding="utf-8"))
    if "--logo" in a:
        logo = pathlib.Path(a[a.index("--logo") + 1])
        b64 = base64.b64encode(logo.read_bytes()).decode()
        html = re.sub(r'<div class="logo-mark">.*?</div>',
                      f'<div class="logo-mark"><img src="data:image/png;base64,{b64}" alt="Generali"></div>', html, count=1, flags=re.S)
    pathlib.Path(dst).write_text(html, encoding="utf-8")
    text = re.sub(r"<[^>]+>", " ", re.sub(r"<(style|script|pre)[\s\S]*?</\1>", " ", html))
    for pat, msg in PROSCRITS:
        hits = sorted(set(m.group(0) for m in re.finditer(pat, text, re.I)))
        if hits: print(f"⚠️  {msg} — trouvé : {', '.join(hits)}")
    print(f"✅ Couche de marque appliquée → {dst}")

if __name__ == "__main__":
    main()

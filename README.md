Sniper Post Prompt (Simple)
===========================

Application Next.js pour rédiger des prompts en Markdown, les styliser et exporter une image PNG (16:9 ou 9:16). Interface simple (textarea + barre d’outils shadcn), aperçu live, styles de carte et fonds dégradés.

Fonctionnalités
---------------
- Édition Markdown simple avec barre d’outils:
  - Gras, Italique, Souligné
  - Titres H1 / H2 / H3
  - Listes à puces et numérotées
- Aperçu live à droite (styles dédiés pour titres/listes)
- Styles:
  - Polices: Inter, Sora, JetBrains Mono, Lora, Outfit, Roboto Mono
  - Fonds: 3 dégradés prédéfinis
  - Cartes: verre dépoli, ombre douce, bordure nette
- Export PNG en 1920x1080 (16:9) ou 1080x1920 (9:16), fond transparent optionnel
- Sauvegarde du dernier état dans `localStorage`

Démarrage
---------
```bash
npm install
npm run dev
# http://localhost:3000
```

Utilisation
-----------
1. Saisir le prompt dans le panneau “Saisie” (colonne de droite, gauche = paramètres)
2. Utiliser la barre d’outils pour formater (gras/italique/souligné, H1–H3, puces, numéros)
3. Choisir la police, le dégradé et le style de carte à gauche
4. Choisir le format 16:9 ou 9:16 et cliquer “Exporter en PNG”

Raccourcis
----------
- Ctrl+S: forcer la sauvegarde locale
- Ctrl+E: export en PNG

Notes techniques
----------------
- UI basée sur shadcn/ui + Tailwind v4
- Rendu Markdown: `react-markdown` + `remark-gfm`
- Le mode WYSIWYG a été retiré pour simplifier l’expérience et améliorer la robustesse

Licence
-------
MIT

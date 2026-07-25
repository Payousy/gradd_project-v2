# Site GRADD

Site vitrine du GRADD (Groupe de Recherche Appliquée au Développement Durable), construit avec [Astro](https://astro.build).

## Structure du projet

```
/
├── public/
│   ├── images/              # Images utilisées par les pages
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.astro     # En-tête + navigation (utilisé par BaseLayout)
│   │   ├── Footer.astro     # Pied de page (utilisé par BaseLayout)
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro
│   │   └── home/            # Sections spécifiques à la page d'accueil
│   ├── content/
│   │   ├── actualites/       # Articles (collection "actualites")
│   │   └── actions/          # Fiches actions (collection "actions")
│   ├── pages/                 # Une route par fichier
│   ├── styles/                # CSS partagé
│   └── content.config.ts      # Schémas des collections de contenu
├── astro.config.mjs
└── package.json
```

## Commandes

| Commande          | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installe les dépendances                    |
| `npm run dev`     | Démarre le serveur local (`localhost:4321`) |
| `npm run build`   | Build de production dans `./dist/`          |
| `npm run preview` | Prévisualise le build de production         |

## Documentation complémentaire

- [`NETLIFY_INSTRUCTIONS.md`](./NETLIFY_INSTRUCTIONS.md) — configuration du formulaire de contact et du déploiement Netlify
- [`SECURITE.md`](./SECURITE.md) — en-têtes de sécurité mis en place
- [`SEO-GUIDE.md`](./SEO-GUIDE.md) — métadonnées, sitemap, bonnes pratiques SEO

## À faire / points de vigilance

- La collection de contenu `actions` (`src/content/actions/`) contient des fiches encore à finaliser (titres et texte non définitifs) et n'est pas encore affichée dynamiquement sur `pages/actions.astro`, qui reste une page statique.

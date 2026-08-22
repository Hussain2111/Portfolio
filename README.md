# Portfolio

My personal portfolio site — a single scrollable page covering About, Skills,
Work and Contact. Plain HTML, CSS and JavaScript, no build step and no
framework, deployed automatically to GitHub Pages on every push to `main`.

The **Work** section is populated live from the GitHub API (`api.github.com`),
so new public repos show up automatically without editing the page.

## Structure

```
index.html      single-page site
css/style.css   styles
js/main.js      nav, scroll effects, and the live GitHub projects fetch
img/            portrait + favicon
.github/workflows/deploy.yml   GitHub Pages deployment
```

## Local preview

No build tools required — just open `index.html` in a browser, or serve the
folder locally, e.g.:

```
npx serve .
```

## Deployment

Pushing to `main` triggers the `deploy.yml` workflow, which publishes the
repo root to GitHub Pages. In the repo settings, under **Pages**, set the
source to **GitHub Actions** (one-time setup).

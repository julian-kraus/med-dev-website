# med-dev website

The website for [med-dev](https://www.med-dev.org), a Munich community for
people working across medicine, technology, research and startups.

React + TypeScript, built with Vite. Every page is prerendered to static HTML at
build time, so the site works without JavaScript and each route has its own
title, description and link preview.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, build, and prerender every route into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

`npm run build` is the full pipeline: `tsc` → client build → SSR build →
`scripts/prerender.mjs`, which writes one HTML file per route plus `404.html`,
`sitemap.xml` and `robots.txt`.

## Changing the content

Most copy lives in typed data files, so you do not need to touch layout code.

| To change | Edit |
| --- | --- |
| Team members | `src/content/team.ts` |
| Partner names | `src/content/partners.ts` |
| WhatsApp / LinkedIn / Luma / Substack links, contact email | `src/content/siteLinks.ts` |
| Page titles and descriptions (what shows in Google and link previews) | `src/content/routeMeta.ts` |
| Section wording | the matching file in `src/components/sections/` |

Adding a route means adding it to `src/app/routes.tsx` **and**
`src/content/routeMeta.ts`. That is enforced: the build fails and a test fails
if the two drift, because a route without a prerendered file would 404 in
production.

## Images and video

Images are WebP at roughly twice their display size; the background video is
re-encoded H.264. `scripts/optimize-assets.sh` documents the exact commands and
is **not** part of the build — run it by hand after adding an asset, commit the
result, and delete the original.

Every `<img>` needs `width` and `height` so the layout does not jump while
loading.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints, tests,
builds and publishes to GitHub Pages. A failing check blocks the deploy.

The site currently deploys as a **project page**, so it lives at a repo subpath.
To move it to the custom domain:

1. Remove the `VITE_BASE`, `VITE_SITE_ORIGIN` and `VITE_NOINDEX` env vars from
   the build step in the workflow.
2. Add a `public/CNAME` file containing the domain.
3. Point DNS at GitHub, and set the custom domain under Settings → Pages.

Nothing else in the codebase changes. `VITE_NOINDEX` is what keeps the preview
out of search results, so removing it is what makes the site indexable.

## Notes for maintainers

`AGENTS.md` has the detail: the routing and metadata contract, why the CSP is a
meta tag rather than a header, and the known tradeoffs (the third-party
newsletter feed, what GitHub Pages cannot do, browser support for the scroll
animation).

## Licence

MIT, see `LICENSE`. This covers the code. Photographs of community members are
not covered and should not be reused without asking.

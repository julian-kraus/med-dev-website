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

## How it works

A normal React single-page app, with one addition: **every route is prerendered
to static HTML at build time.**

```
npm run build
  │
  ├─ tsc -b                      typecheck
  ├─ vite build                  client bundle  → dist/build/
  ├─ vite build --ssr            server bundle  → .prerender/
  └─ node scripts/prerender.mjs  render each route → dist/<route>/index.html
                                 plus 404.html, sitemap.xml, robots.txt
```

So `dist/team/index.html` is a real file containing the fully rendered team
page. That means:

- Search engines and link previews (WhatsApp, LinkedIn, Slack) see real content
  and correct per-page titles without running JavaScript.
- Deep links work on any static host, with no SPA redirect hack.
- Unknown URLs get a genuine HTTP 404 rather than a silent redirect home.

On load, React **hydrates** that HTML rather than re-rendering it. The practical
consequence is that the first render must produce exactly what the server
produced — so anything browser-specific (`localStorage`, `matchMedia`) has to be
read in an effect, not during render.

### The route table

`src/app/routes.tsx` is the single source of truth. One array drives the router,
the list of pages to prerender, the per-page `<title>`/description/social tags,
and `sitemap.xml`. Adding a route there without a matching entry in
`src/content/routeMeta.ts` is a type error, and a test fails if the two drift.

### Layout of the code

```text
src/
  app/          router shell, route table, client + meta wiring
  components/
    common/     Section, ButtonLink, PageIntro, ErrorBoundary
    layout/     Header, Footer, Background, CookieNotice
    sections/   one file per page section
  content/      typed data: copy, links, team, partners, route metadata
  styles/       global.css — one plain CSS file, BEM-ish naming
  __tests__/
scripts/        prerender + asset optimisation
```

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

## Before you change anything

Read `AGENTS.md`. It records the decisions behind the stack, the four contracts
that will break the build or the live site if ignored, and the bugs already paid
for once (stretched images, hydration mismatches, a non-idempotent asset script).
It is written for both human contributors and AI coding assistants, and is worth
keeping current as the code changes.

Run `npm run format && npm run lint && npm test && npm run build` before
pushing. The deploy workflow runs the same checks and blocks on failure.

## Licence

MIT, see `LICENSE`. This covers the code. Photographs of community members are
not covered and should not be reused without asking.

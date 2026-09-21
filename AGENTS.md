# AGENTS.md

Working notes for anyone — human or agent — changing this codebase. `README.md`
covers setup and day-to-day content edits. This file covers the decisions, the
contracts you must not break, and the traps that have already cost time.

## What this is

The website for med-dev, a Munich health-tech community. It replaced a
Carrd-style single-page site; the visual-parity milestone is done, and the site
has since grown past the original into a multi-route hub.

It is a static site. There is no backend, no database, no serverless function,
and adding one is a significant decision (see Tradeoffs).

## Stack, and why

- **React 18 + TypeScript + Vite.** No SSR framework: the build prerenders every
  route to static HTML with `react-dom/server` (`scripts/prerender.mjs`), which
  gets the SEO and link-preview benefits without the framework.
- **Plain CSS, one file.** `src/styles/global.css`, BEM-ish
  `block__element--modifier`. Not CSS Modules, not Tailwind. At ~1,100 lines for
  ~20 components this is fine; revisit if it doubles.
- **`lucide-react`** for icons. Already a dependency, tree-shakes well.
- **Content in typed data files** under `src/content/`, so copy changes never
  require touching layout code.
- **No data-fetching library.** The one async call uses `useState` +
  `useEffect` with a `"loading" | "success" | "empty" | "error"` union. Match
  that pattern rather than introducing a dependency.

Avoid abstracting before there is real repetition.

## Structure

```text
src/
  app/
    App.tsx             router shell, scroll handling, error boundary
    routes.tsx          the route table: path + element + metadata
    main.tsx            client entry; hydrates prerendered HTML
    useDocumentMeta.ts  keeps head tags correct across client navigation
  entry-server.tsx      prerender entry (imports App, never main.tsx)
  components/
    common/             Section, ButtonLink, PageIntro, ErrorBoundary
    layout/             Header, Footer, Background, CookieNotice
    sections/           one file per page section
  content/
    routeMeta.ts        titles, descriptions, robots, canonical helpers
    assets.ts           asset() — every static URL goes through this
    siteLinks.ts        every external URL and address
    team.ts, partners.ts, newsletterFeed.ts
  styles/global.css
  __tests__/
scripts/
  prerender.mjs         writes dist/<route>/index.html, 404, sitemap, robots
  optimize-assets.sh    one-off image/video conversion, run by hand
```

## Contracts you must not break

**1. The route table is the single source of truth.**
`src/app/routes.tsx` drives the router, the prerender list, the head tags and
`sitemap.xml`. Adding a route without a `src/content/routeMeta.ts` entry is a
type error, and `routes.test.ts` fails if the two drift.

This is load-bearing because there is no SPA catch-all rewrite: the host serves
one real file per route and returns a genuine 404 otherwise. A route in the
router but missing from the table works in dev and 404s in production.

**2. Redirect-only paths stay out of the route table.**
`<Navigate>` renders an *empty string* under `StaticRouter`, so prerendering one
would ship a page that hydrates onto an empty root. `/events` and `/newsletter`
get script-less meta-refresh stubs instead, emitted by the prerender script. The
build fails if any real route renders empty — that guard is there because it has
already caught this.

**3. Never hardcode an absolute asset path.**
Everything goes through `asset()` / `assetSrcSet()` in `src/content/assets.ts`,
which prefixes `import.meta.env.BASE_URL`. A literal `/assets/...` works at a
domain root and silently 404s on the subpath deploy.

**4. Nothing may differ between server and client render.**
The prerendered HTML is hydrated, so reading `localStorage`, `matchMedia`, dates
or randomness *during render* is a hydration mismatch. Read them in an effect
and start from the value the server produced. `CookieNotice` starts hidden and
`Background` starts on the poster for exactly this reason — both were bugs first.

## Traps already paid for

- **`width`/`height` on `<img>` are presentational hints for *both* dimensions.**
  CSS that sets only the width leaves the height pinned to the attribute and the
  image stretches. The global `img { height: auto }` fixes it; do not remove it.
- **`document.querySelector(hash)` throws** on a hash that is not a valid
  selector, e.g. `/#2024`. Use `getElementById`.
- **`localStorage` throws rather than returning null** when site data is
  blocked. Every access is wrapped.
- **Asset conversions must be idempotent.** `optimize-assets.sh` is keyed off
  `*-source` files; an earlier version re-encoded its own output on every run and
  lost a quality generation each time.
- **`fetchPriority` is React 19.** It is silently dropped with a warning on 18.

## Quality bar

`npm run format`, `npm run lint`, `npm test` and `npm run build` must all pass
before anything ships. The workflow enforces this on every push.

Verification means checking the thing the change claims to do, not that the page
loads. Rendered aspect ratio vs natural aspect ratio, not "the image appeared".
Console clean on a *fresh* tab, since the buffer is cumulative. Both the
root-domain and `VITE_BASE` builds, since only one of them is exercised locally.

Beyond that: works on mobile, tablet and desktop; accessible labels on every
control; alt text unless decorative; external links verified.

## Tradeoffs and constraints

- **rss2json.** Newsletter posts come through the unauthenticated
  `api.rss2json.com`, matching what the previous site did. It is rate limited per
  IP, it is a single point of failure for that section, and visitor IPs reach a
  third party. It has been observed returning 500s. Replacing it needs a
  serverless function, which would end static-host portability.
- **GitHub Pages is the deploy target** (`.github/workflows/deploy.yml`),
  currently a project page at a repo subpath. `VITE_BASE`, `VITE_SITE_ORIGIN`
  and `VITE_NOINDEX` drive it; README has the steps to move to a custom domain.
- **Pages cannot set response headers.** The CSP and referrer policy are
  `<meta>` tags in `index.html` — that is the only place policy belongs.
  Unavoidably lost: `X-Frame-Options`/`frame-ancestors` and
  `X-Content-Type-Options`, both header-only. Caching is fixed at `max-age=600`
  for everything, including content-hashed output.
- **The CSP is enforcing, not report-only** — a meta tag cannot be report-only.
  `img-src` is deliberately loose (`https:`) so a Substack CDN change cannot
  silently break newsletter thumbnails; `script-src 'self'` is the directive
  that matters and stays tight.
- **`vercel.json` is gitignored, not deleted.** It stays on maintainers'
  machines so a move back to Vercel is one step, but a header config in the repo
  would be misread as live.
- **Canonicals use the trailing-slash form** (`/team/`), because Pages 301s
  `/team` to `/team/`. `canonicalPath()` in `routeMeta.ts` is the only place
  that decides this.
- **Scroll-driven reveal.** `.reveal` uses `animation-timeline: view()`, which
  Firefox keeps behind a flag; there it degrades to one fade-up on load.
  Deliberate, not a bug.

## Open product questions

- `/community` is reachable only from body CTAs, not the nav, and overlaps the
  homepage. Either link it from the nav or point its canonical at `/`.
- Past partners and collaborations could be more prominent.
- The site still gives already-joined members limited reason to return.
- Social proof (member quotes, event highlights) was planned and never built.

## Design reference

Dark fixed video background under a heavy dark overlay. Inter throughout, with
Syne loaded for display use. Brand teal `#02E2B3` on near-black. Full-width dark
bands, generous section rhythm, fade-up on scroll. Colour and shadow values live
as CSS custom properties on `:root` — use them rather than new literals.

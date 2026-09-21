# AGENTS.md

## Project

This repository is for rebuilding https://www.med-dev.org/ as a React website.
The first milestone is visual and content parity: the React implementation
should look identical to the current public website unless a later, explicit
design decision says otherwise. After parity is achieved, expand the site into a
more useful hub for people who are already in the community as well as new
visitors.

## Product Direction

- Make the website worth revisiting for existing WhatsApp/community members.
- Give upcoming events and calendar access first-class visibility through the
  public Luma calendar embed.
- Add a direct WhatsApp join button so new people can join without going through
  Notion first.
- Make the Inner Circle program clear, concrete, and prominent.
- Make newsletters easy to discover instead of buried near the end.
- Keep Substack/newsletter support from the original website.
- Show social proof through member quotes, event highlights, and partner logos.
- Keep joining the community simple, especially through a WhatsApp CTA.
- Keep the organizer/team list current and easy to maintain.

## Implementation Principles

- Prefer content-driven components backed by typed data files.
- Keep sections reusable, but avoid abstracting before there is real repetition.
- Build accessible semantic HTML first; layer animation and polish after content
  and responsive layout are correct.
- Site assets live in `public/assets/{images,videos}` and are served from
  `/assets/...`. Vite's content-hashed bundle output goes to `/build/...`;
  only that is cached immutably. Avoid decorative placeholder-heavy pages.
- Do not make clickable images navigate to the top of the page. If current image
  styling needs to be preserved, implement it with non-link image wrappers unless
  there is a real destination.
- Treat external links, forms, calendar embeds, and newsletter links as tracked
  integration points that need QA before launch.
- Keep copy and factual claims easy to update without editing layout code.

## Suggested Stack

- React with TypeScript.
- Vite. The build prerenders every route to static HTML with `react-dom/server`
  (see `scripts/prerender.mjs`), so no server-rendering framework is needed.
- CSS Modules, vanilla CSS, or Tailwind are all acceptable; pick one and use it
  consistently. If brand guidelines arrive as tokens, translate them into CSS
  custom properties.
- Use `lucide-react` for common UI icons if icons are needed.
- Use a structured content folder for events, team members, partners,
  testimonials, newsletter issues, and program pages.

## File Organization Target

```text
src/
  app/
    App.tsx           router shell, scroll handling
    routes.tsx        the route table: path + element + metadata
    main.tsx          client entry; hydrates prerendered HTML
    useDocumentMeta.ts  keeps head tags right across client navigation
  entry-server.tsx    prerender entry (imports App, never main.tsx)
  components/
    common/
    layout/
    sections/
  content/
    routeMeta.ts      titles, descriptions, robots per route
    newsletterFeed.ts feed parsing helpers
    partners.ts
    siteLinks.ts      every external URL and address
    team.ts
  styles/
    global.css
  __tests__/
scripts/
  prerender.mjs       writes dist/<route>/index.html, 404, sitemap, robots
  optimize-assets.sh  one-off image/video conversion
```

Keep docs in `docs/`. Keep public static files in `public/`.

## Quality Bar

- The site must work well on mobile, tablet, and desktop.
- Navigation must support anchor links without layout jumps.
- All buttons and links must have clear accessible labels.
- Images need alt text unless purely decorative.
- Calendar, WhatsApp, newsletter, contact, and legal links must be verified.
- Events come from an embedded public Luma calendar, not the Google Calendar
  iCal feed the earlier drafts assumed.
- Add tests for content helpers or filtering logic when those become non-trivial.
- Run `npm run format`, `npm run lint`, `npm test`, and `npm run build` before
  release. All four must pass.

## Routing And Metadata

`src/app/routes.tsx` is the single source of truth. One array drives the
router, the prerender list, the per-page head tags, and `sitemap.xml`. Adding a
route there without a matching `src/content/routeMeta.ts` entry is a type error,
and `src/__tests__/routes.test.ts` fails if the two ever drift.

This matters because there is no SPA catch-all rewrite any more: the host serves
one real file per route and returns a genuine 404 (`dist/404.html`) for anything
else. A route in the router but missing from the route table would work in dev
and 404 in production.

Redirect-only paths (`/events`, `/newsletter`) must stay out of the route table.
`<Navigate>` renders an empty string under `StaticRouter`, so prerendering one
would ship a page that hydrates onto an empty root. They get 308s in
`vercel.json` plus script-less meta-refresh stubs for hosts without redirects.

## Assets

Images are WebP at roughly 2x their CSS display size; the background video is
re-encoded H.264. `scripts/optimize-assets.sh` documents the exact commands.
It is **not** part of the build: run it by hand after adding or replacing an
asset, commit the output, and delete the original. Every `<img>` needs explicit
`width` and `height` so layout does not shift.

`card.jpg` stays JPEG because some link unfurlers handle WebP Open Graph images
poorly.

## Known Tradeoffs

- **rss2json**: newsletter posts come through the unauthenticated
  `api.rss2json.com`, matching the current live site. It is rate limited per IP,
  it is a single point of failure for that section, and visitor IPs reach a
  third party. Replacing it would need a serverless function, which would end
  GitHub Pages portability.
- **GitHub Pages**: asset paths are hardcoded as `/assets/...`
  strings that Vite never rewrites, and canonicals are absolute against
  `siteOrigin`. GitHub Pages is therefore only viable on an apex or custom
  domain, not a `user.github.io/repo/` project page.
- **Scroll-driven reveal**: `.reveal` uses `animation-timeline: view()`, which
  Firefox still keeps behind a flag. There it degrades to one fade-up on load.
  Deliberate, not a bug.
- **`/community`** is reachable only from body CTAs, not the nav, and overlaps
  the homepage. It is prerendered and indexable; either link it from the nav or
  point its canonical at `/`.

## Current Known Issues To Fix

- Newsletter content is too buried.
- Inner Circle explanation is not clear/prominent enough.
- Past partners/collaborations are not visible enough.
- The site has limited reasons for already-joined members to return.

## Parity Notes

- Current design uses a dark fixed video background with a heavy dark overlay.
- Typography is primarily Inter, with Syne loaded for possible brand/display use.
- The dominant brand color is bright teal (`#02E2B3`) on a near-black/dark gray
  background.
- Preserve the current section rhythm, full-width dark bands, fade-in/fade-up
  animation feel, logo placement, and large health-tech hero imagery for the
  parity milestone.

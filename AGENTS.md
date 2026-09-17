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
- Give upcoming events and calendar access first-class visibility using the
  public Google Calendar iCal feed.
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
- Use the downloaded current-site assets in `public/assets/current-site/` for
  parity work. Avoid decorative placeholder-heavy pages.
- Do not make clickable images navigate to the top of the page. If current image
  styling needs to be preserved, implement it with non-link image wrappers unless
  there is a real destination.
- Treat external links, forms, calendar embeds, and newsletter links as tracked
  integration points that need QA before launch.
- Keep copy and factual claims easy to update without editing layout code.
- Filter internal/orga-only calendar events before rendering public event lists.

## Suggested Stack

- React with TypeScript.
- Vite for the initial build unless a future requirement needs a framework with
  server rendering.
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
    App.tsx
    routes.tsx
  components/
    common/
    layout/
    sections/
  content/
    events.ts
    newsletters.ts
    partners.ts
    team.ts
    testimonials.ts
  styles/
    tokens.css
    global.css
  assets/
    images/
    logos/
    brand/
```

Keep docs in `docs/`. Keep public static files in `public/`.

## Quality Bar

- The site must work well on mobile, tablet, and desktop.
- Navigation must support anchor links without layout jumps.
- All buttons and links must have clear accessible labels.
- Images need alt text unless purely decorative.
- Calendar, WhatsApp, newsletter, contact, and legal links must be verified.
- Calendar integration must handle the public Google Calendar iCal feed,
  all-day events, timed events, HTML descriptions, and empty public event states.
- Add tests for content helpers or filtering logic when those become non-trivial.
- Run formatting, linting, type checks, and a production build before release.

## Current Known Issues To Fix

- Current image clicks can send visitors to the top of the page.
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

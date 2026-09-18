// Per-route metadata, kept free of React imports so the prerender script and a
// future sitemap generator can both read it.
//
// This is the single source of truth for titles, descriptions, and social
// tags. src/app/routes.tsx pairs each entry with its component, so a route
// cannot exist without metadata.

export type RouteMeta = {
  title: string;
  description: string;
  /** Path under public/; made absolute against siteOrigin at render time. */
  ogImage?: string;
  noindex?: boolean;
};

export const siteOrigin = "https://www.med-dev.org";

export const defaultOgImage = "/assets/current-site/images/card.jpg";

export function absoluteUrl(pathOrUrl: string) {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${siteOrigin}${pathOrUrl}`;
}

/** "/team/" and "/team" are the same route; canonicals use the un-slashed form. */
export function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export const routeMeta = {
  "/": {
    title: "med-dev | Munich Health Tech Community",
    description:
      "med-dev is a Munich-based community for people building at the intersection of medicine, technology, research, and startups. Join events, lab tours, talks, and hackathons.",
  },
  "/community": {
    title: "How med-dev works | med-dev",
    description:
      "The med-dev mission, community formats, and ways to get involved: hackathons, lab tours, journal clubs, career stories, and member-led projects.",
  },
  "/activity": {
    title: "Events and newsletter | med-dev",
    description:
      "Upcoming med-dev events from the public Luma calendar, plus recent community stories and event recaps from the Substack newsletter.",
  },
  "/inner-circle": {
    title: "Inner Circle | med-dev",
    description:
      "A half-year program for med-dev members who want to organize events, build projects, write health-tech content, and connect more deeply with the Munich ecosystem.",
  },
  "/partners": {
    title: "Partners and collaborators | med-dev",
    description:
      "Organizations, companies, and communities connected to med-dev events, learning formats, and health-tech ecosystem work in Munich.",
  },
  "/team": {
    title: "Team | med-dev",
    description:
      "Meet the organizers and contributors behind med-dev, working across medicine, software engineering, research, and healthcare entrepreneurship.",
  },
  "/legal/imprint": {
    title: "Imprint | med-dev",
    description: "Responsible person and contact details for the med-dev website.",
    noindex: true,
  },
  "/legal/privacy": {
    title: "Data privacy | med-dev",
    description:
      "How the med-dev website handles hosting, analytics, public calendar data, newsletter data, and external links.",
    noindex: true,
  },
  "/404": {
    title: "Page not found | med-dev",
    description: "This page does not exist.",
    noindex: true,
  },
} satisfies Record<string, RouteMeta>;

export type RoutePath = keyof typeof routeMeta;

/** Paths that exist only to send visitors somewhere else. */
export const redirectRoutes = {
  "/events": "/activity",
  "/newsletter": "/activity",
} as const;

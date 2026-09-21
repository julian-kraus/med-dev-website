import type { ReactNode } from "react";
import { ActivityPillars } from "../components/sections/ActivityPillars";
import { ActivityFeed } from "../components/sections/ActivityFeed";
import { Contact } from "../components/sections/Contact";
import { CurrentStory } from "../components/sections/CurrentStory";
import { Hero } from "../components/sections/Hero";
import { InnerCircle, InnerCirclePreview } from "../components/sections/InnerCircle";
import { Imprint, Privacy } from "../components/sections/Legal";
import { PastEvents, UpcomingEvents } from "../components/sections/Events";
import { MemberPartnerCtas } from "../components/sections/MemberPartnerCtas";
import { NewsletterFeature } from "../components/sections/NewsletterFeature";
import { NotFound } from "../components/sections/NotFound";
import { Partners, PartnersPreview } from "../components/sections/Partners";
import { Team, TeamPreview } from "../components/sections/Team";
import { PageIntro } from "../components/common/PageIntro";
import { routeMeta, type RouteMeta, type RoutePath } from "../content/routeMeta";

export type AppRoute = {
  path: RoutePath;
  element: ReactNode;
  meta: RouteMeta;
};

/**
 * One array drives the router, the prerender list, the meta injection, and the
 * sitemap. Adding a route without a routeMeta entry is a type error.
 */
export const appRoutes: AppRoute[] = [
  {
    path: "/",
    meta: routeMeta["/"],
    element: (
      <>
        <Hero />
        <CurrentStory variant="preview" />
        <ActivityFeed />
        <TeamPreview />
        <InnerCirclePreview />
        <PartnersPreview />
        <Contact />
      </>
    ),
  },
  {
    path: "/community",
    meta: routeMeta["/community"],
    element: (
      <>
        <PageIntro
          eyebrow="Community"
          title="How med-dev works"
          intro="The med-dev mission, community formats, and ways to get involved in one place."
        />
        <CurrentStory />
        <ActivityPillars />
        <MemberPartnerCtas />
      </>
    ),
  },
  {
    path: "/activity",
    meta: routeMeta["/activity"],
    element: (
      <>
        <PageIntro
          eyebrow="Activity"
          title="What's happening at med-dev"
          intro="Upcoming med-dev events, the events we have already hosted, and recent community stories."
        />
        <UpcomingEvents />
        <PastEvents />
        <NewsletterFeature />
      </>
    ),
  },
  {
    path: "/inner-circle",
    meta: routeMeta["/inner-circle"],
    element: (
      <>
        <PageIntro
          eyebrow="Inner Circle"
          title="Help shape med-dev from the inside"
          intro="A half-year program for members who want to organize events, build projects, write health-tech content, and connect more deeply with the ecosystem."
        />
        <InnerCircle />
      </>
    ),
  },
  {
    path: "/partners",
    meta: routeMeta["/partners"],
    element: (
      <>
        <PageIntro
          eyebrow="Partners"
          title="Organizations and communities we work with"
          intro="Companies, clinics, research groups, and communities connected to med-dev events, lab tours, and ecosystem work."
        />
        <Partners />
        <MemberPartnerCtas />
      </>
    ),
  },
  {
    path: "/team",
    meta: routeMeta["/team"],
    element: (
      <>
        <PageIntro
          eyebrow="Team"
          title="People behind med-dev"
          intro="Meet the organizers and contributors behind the community."
        />
        <Team />
      </>
    ),
  },
  { path: "/legal/imprint", meta: routeMeta["/legal/imprint"], element: <Imprint /> },
  { path: "/legal/privacy", meta: routeMeta["/legal/privacy"], element: <Privacy /> },
  { path: "/404", meta: routeMeta["/404"], element: <NotFound /> },
];

/** Routes that get their own prerendered HTML file. /404 is written separately. */
export const prerenderRoutes = appRoutes.filter((route) => route.path !== "/404");

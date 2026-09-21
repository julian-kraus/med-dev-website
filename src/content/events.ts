// Events come from the public Luma calendar, baked in at build time by
// scripts/fetch-events.mjs. See AGENTS.md for why this cannot be a browser
// fetch and what goes stale as a result.

import { generatedPastEvents, generatedUpcomingEvents } from "./events.generated";

export type MedDevEvent = {
  id: string;
  name: string;
  /** Absolute Luma URL for the event page. */
  url: string;
  /** ISO 8601, UTC. Sorting only; use dateLabel to display. */
  startAt: string;
  /** Preformatted at build time, in the event's own timezone. */
  dateLabel: string;
  coverUrl?: string;
  location?: string;
};

/** Soonest first. */
export const upcomingEvents: MedDevEvent[] = generatedUpcomingEvents;

/** Most recent first. */
export const pastEvents: MedDevEvent[] = generatedPastEvents;

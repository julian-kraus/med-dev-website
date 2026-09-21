import { ExternalLink } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { EventCard } from "./EventCard";
import { pastEvents, upcomingEvents } from "../../content/events";
import { siteLinks } from "../../content/siteLinks";

/**
 * Upcoming events stay an iframe on purpose: it is the only part of the site
 * that updates without a deploy, and a newly announced event is exactly the
 * thing nobody wants to wait for. The build-time count is used only to size
 * the frame - a calendar that was empty at build time gets a short one instead
 * of a 42rem box reading "No Upcoming Events".
 */
export function UpcomingEvents() {
  const isLikelyEmpty = upcomingEvents.length === 0;

  return (
    <Section
      id="events"
      eyebrow="Calendar"
      title="Upcoming events"
      intro="Public med-dev events, open to everyone in the community."
    >
      <div className={`luma-embed ${isLikelyEmpty ? "luma-embed--short" : ""}`}>
        <iframe
          title="med-dev Luma calendar"
          src={siteLinks.lumaCalendarEmbed}
          loading="lazy"
          allowFullScreen
        />
      </div>
      <div className="section-actions">
        <ButtonLink
          href={siteLinks.whatsappInvite}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          Join WhatsApp for announcements
        </ButtonLink>
        <ButtonLink
          href={siteLinks.lumaCalendar}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          <ExternalLink size={18} aria-hidden="true" />
          Open in Luma
        </ButtonLink>
      </div>
    </Section>
  );
}

export function PastEvents() {
  if (!pastEvents.length) {
    return null;
  }

  return (
    <Section
      id="past-events"
      eyebrow="Recap"
      title="Events we have hosted"
      intro="Lab tours, conferences, talks, and hackathons run with partners across Munich."
    >
      <div className="event-grid reveal">
        {pastEvents.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
      <div className="section-actions">
        <ButtonLink
          href={siteLinks.lumaProfile}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          <ExternalLink size={18} aria-hidden="true" />
          See all on Luma
        </ButtonLink>
      </div>
    </Section>
  );
}

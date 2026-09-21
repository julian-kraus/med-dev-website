import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { EventCard } from "./EventCard";
import { NewsletterCard, NewsletterState } from "./NewsletterFeature";
import { useNewsletterIssues } from "./useNewsletterIssues";
import { pastEvents, upcomingEvents } from "../../content/events";

const previewCount = 2;

export function ActivityFeed() {
  const { issues, status } = useNewsletterIssues(previewCount);

  // With an empty calendar the honest thing is to show what actually happened
  // rather than an empty "upcoming" shelf.
  const hasUpcoming = upcomingEvents.length > 0;
  const events = (hasUpcoming ? upcomingEvents : pastEvents).slice(0, previewCount);

  return (
    <Section
      id="activity"
      eyebrow="Activity"
      title="What's happening"
      intro="Events from the med-dev calendar and recent community stories."
    >
      {events.length ? (
        <>
          <p className="subhead">{hasUpcoming ? "Upcoming events" : "Recent events"}</p>
          <div className="event-grid event-grid--preview reveal">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </>
      ) : null}

      <p className="subhead">From the newsletter</p>
      <div className="newsletter-grid newsletter-grid--preview reveal">
        <NewsletterState status={status} />
        {issues.map((issue) => (
          <NewsletterCard issue={issue} key={issue.id} />
        ))}
      </div>

      <div className="section-actions">
        <ButtonLink href="/activity#events" variant="secondary">
          All events
        </ButtonLink>
        <ButtonLink href="/activity#newsletter" variant="secondary">
          Read the newsletter
        </ButtonLink>
      </div>
    </Section>
  );
}

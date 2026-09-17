import { CalendarDays, Newspaper } from "lucide-react";
import { Section } from "../common/Section";
import { ButtonLink } from "../common/ButtonLink";

export function ActivityFeed() {
  return (
    <Section
      id="activity"
      eyebrow="Activity"
      title="What's happening"
      intro="Upcoming events and recent med-dev stories in one place."
    >
      <div className="activity-teaser">
        <article className="activity-teaser__item">
          <CalendarDays size={24} aria-hidden="true" />
          <h3>Upcoming events</h3>
          <p>See what's next on the med-dev calendar and reserve a spot.</p>
          <ButtonLink href="/activity" variant="secondary">
            See upcoming events
          </ButtonLink>
        </article>
        <article className="activity-teaser__item">
          <Newspaper size={24} aria-hidden="true" />
          <h3>Newsletter</h3>
          <p>Catch up on recent community stories and event recaps.</p>
          <ButtonLink href="/activity" variant="secondary">
            Read the newsletter
          </ButtonLink>
        </article>
      </div>
      <div className="section-actions">
        <ButtonLink href="/activity">Open activity</ButtonLink>
      </div>
    </Section>
  );
}

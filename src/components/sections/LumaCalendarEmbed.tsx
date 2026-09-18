import { ExternalLink } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";

export function LumaCalendarEmbed() {
  return (
    <Section
      id="luma"
      className="section--content-only"
      eyebrow="Luma"
      title="Upcoming events"
      intro="Public med-dev events from the Luma calendar."
    >
      <div className="luma-embed">
        <iframe
          title="med-dev Luma calendar"
          src={siteLinks.lumaCalendarEmbed}
          loading="lazy"
          allowFullScreen
        />
      </div>
      <div className="section-actions">
        <ButtonLink
          href={siteLinks.lumaProfile}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          <ExternalLink size={18} aria-hidden="true" />
          See past hosted events
        </ButtonLink>
      </div>
    </Section>
  );
}

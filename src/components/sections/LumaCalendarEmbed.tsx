import { ExternalLink } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";

type LumaCalendarEmbedProps = {
  inline?: boolean;
  variant?: "preview" | "full";
};

export function LumaCalendarEmbed({
  inline = false,
  variant = "full",
}: LumaCalendarEmbedProps) {
  const content = (
    <>
      <div className={`luma-embed luma-embed--${variant}`}>
        <iframe
          title="med-dev Luma calendar"
          src={siteLinks.lumaCalendarEmbed}
          loading="lazy"
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      <div className="section-actions">
        <ButtonLink href={siteLinks.lumaProfile} target="_blank" rel="noreferrer" variant="secondary">
          <ExternalLink size={18} aria-hidden="true" />
          See past hosted events
        </ButtonLink>
      </div>
    </>
  );

  if (inline) {
    return content;
  }

  return (
    <Section
      id="luma"
      className="section--content-only"
      eyebrow="Luma"
      title="Upcoming events"
      intro="Public med-dev events from the Luma calendar."
    >
      {content}
    </Section>
  );
}

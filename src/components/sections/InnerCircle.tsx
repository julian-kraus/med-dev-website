import { Clock, Sparkles, Users } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";
import { asset, assetSrcSet } from "../../content/assets";

function ClosedPanel({
  heading,
  children,
  aside,
}: {
  heading: string;
  children: ReactNode;
  aside: ReactNode;
}) {
  return (
    <div className="split-panel">
      <div>
        <Sparkles size={26} aria-hidden="true" />
        {/* The closed window is a status, not the headline: leading with it
            made the page's first line a door in the face. */}
        <p className="status-line">Applications are currently closed</p>
        <h3>{heading}</h3>
        {children}
      </div>
      <div className="status-box">{aside}</div>
    </div>
  );
}

export function InnerCircle() {
  return (
    <Section id="inner-circle" className="section--content-only">
      <figure className="photo-band reveal">
        <img
          src={asset("/assets/images/inner-circle.webp")}
          srcSet={assetSrcSet([
            ["/assets/images/inner-circle-800.webp", "800w"],
            ["/assets/images/inner-circle.webp", "1600w"],
          ])}
          sizes="(max-width: 860px) calc(100vw - 2rem), 68rem"
          alt="A dozen med-dev members around a long table at a traditional Munich pub."
          width={1600}
          height={1120}
          // Not lazy: on a laptop this sits right at the fold and is very
          // likely the LCP element, so deferring it would only hurt.
          decoding="async"
        />
        <figcaption>A med-dev community evening in Munich.</figcaption>
      </figure>

      <ClosedPanel
        heading="What Inner Circle members do"
        aside={
          <>
            <Users size={24} aria-hidden="true" />
            <p>
              Want to be ready for the next round? Join WhatsApp and follow LinkedIn so you see the
              next application window.
            </p>
            <ButtonLink href={siteLinks.whatsappInvite} target="_blank" rel="noreferrer">
              Join WhatsApp
            </ButtonLink>
            <Clock size={22} aria-hidden="true" />
            <ButtonLink
              href={siteLinks.linkedIn}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              Follow updates
            </ButtonLink>
          </>
        }
      >
        <p>
          The next cohort will be announced through the community channels. Inner Circle members
          help organize events, publish ideas, connect with partners, and shape med-dev from the
          inside.
        </p>
        <ul className="inner-circle-list">
          <li>Organize a lab tour, talk, hackathon, or member-led format.</li>
          <li>Get closer access to speakers, founders, and partner orgs.</li>
          <li>Turn your own health-tech idea into a community project.</li>
        </ul>
      </ClosedPanel>
    </Section>
  );
}

export function InnerCirclePreview() {
  return (
    <Section
      id="inner-circle"
      eyebrow="Inner Circle"
      title="For members who want to build with us"
      intro="The application window is currently closed, but the program remains a clear path for people who want to organize events, publish ideas, and shape med-dev more actively."
    >
      <ClosedPanel
        heading="A closer circle inside the community"
        aside={
          <>
            <ButtonLink href={siteLinks.whatsappInvite} target="_blank" rel="noreferrer">
              Join WhatsApp
            </ButtonLink>
            <ButtonLink href="/inner-circle" variant="secondary">
              Learn about Inner Circle
            </ButtonLink>
          </>
        }
      >
        <p>Join the community or follow updates to hear when the next cohort opens.</p>
      </ClosedPanel>
    </Section>
  );
}

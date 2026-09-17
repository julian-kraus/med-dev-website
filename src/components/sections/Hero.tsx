import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { siteLinks } from "../../content/siteLinks";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <p className="eyebrow">Munich health-tech community</p>
        <h1>Building a new era in health-tech innovation, together.</h1>
        <p>
          Envisioning a new era in health innovation empowered by boundless
          collaboration.
        </p>
        <p className="hero__clarifier">
          A Munich-based community for people working across medicine,
          technology, research, startups, and healthcare innovation.
        </p>
        <div className="hero__actions">
          <ButtonLink
            href={siteLinks.whatsappInvite}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={19} aria-hidden="true" />
            Join WhatsApp
          </ButtonLink>
          <ButtonLink href="/community" variant="secondary">
            <CalendarDays size={19} aria-hidden="true" />
            Learn more
          </ButtonLink>
        </div>
        <a className="hero__text-link" href={siteLinks.linkedIn} target="_blank" rel="noreferrer">
          Follow med-dev on LinkedIn <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="hero__media" aria-hidden="true">
        <img src="/assets/current-site/images/image04.png" alt="" />
      </div>
    </section>
  );
}

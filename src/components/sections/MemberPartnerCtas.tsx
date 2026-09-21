import { Handshake, MessageCircle } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { siteLinks } from "../../content/siteLinks";

export function MemberPartnerCtas() {
  return (
    <section className="cta-band reveal" aria-label="Join or partner with med-dev">
      <div className="cta-band__inner">
        <article>
          <MessageCircle size={28} aria-hidden="true" />
          <p className="eyebrow">Become a member</p>
          <h2>Sounds interesting? Join us!</h2>
          <p>
            Join the WhatsApp community to hear about events, introductions, internships, and
            member-driven health-tech ideas.
          </p>
          <ButtonLink href={siteLinks.whatsappInvite} target="_blank" rel="noreferrer">
            Join us
          </ButtonLink>
        </article>
        <article>
          <Handshake size={28} aria-hidden="true" />
          <p className="eyebrow">Become a partner</p>
          <h2>Create the future of healthcare with us.</h2>
          <p>
            Collaborate on talks, lab tours, hackathons, speaker formats, and community events with
            the next generation of health tech leaders.
          </p>
          <ButtonLink href="/#contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </article>
      </div>
    </section>
  );
}

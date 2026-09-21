import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { siteLinks } from "../../content/siteLinks";
import { asset, assetSrcSet } from "../../content/assets";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <p className="eyebrow">Munich health-tech community</p>
        <h1>Building a new era in health-tech innovation, together.</h1>
        <p className="hero__clarifier">
          A Munich-based community for people working across medicine, technology, research,
          startups, and healthcare innovation.
        </p>
        <div className="hero__actions">
          <ButtonLink href={siteLinks.whatsappInvite} target="_blank" rel="noreferrer">
            <MessageCircle size={19} aria-hidden="true" />
            Join WhatsApp
          </ButtonLink>
          <ButtonLink href="/community" variant="secondary">
            How med-dev works
            <ArrowRight size={18} aria-hidden="true" />
          </ButtonLink>
        </div>
        <a className="hero__text-link" href={siteLinks.linkedIn} target="_blank" rel="noreferrer">
          Follow med-dev on LinkedIn <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="hero__media" aria-hidden="true">
        <img
          src={asset("/assets/images/image04.webp")}
          srcSet={assetSrcSet([
            ["/assets/images/image04-464.webp", "464w"],
            ["/assets/images/image04.webp", "928w"],
          ])}
          sizes="(max-width: 860px) 84vw, 29rem"
          alt=""
          width={928}
          height={1040}
          decoding="async"
        />
      </div>
    </section>
  );
}

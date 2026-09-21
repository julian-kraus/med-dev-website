import { Section } from "../common/Section";
import { ButtonLink } from "../common/ButtonLink";
import { featuredPartners, partnerGroups } from "../../content/partners";

export function Partners() {
  return (
    <section className="partner-section" id="partners" aria-label="Partners">
      <div className="partner-section__inner">
        <p className="partner-section__intro">
          med-dev has grown through company visits, research conversations, community partnerships,
          and shared health-tech events.
        </p>
        <div className="partner-groups" aria-label="Partners">
          {partnerGroups.map((group) => (
            <article className="partner-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="logo-wall">
                {group.names.map((partner) => (
                  <span key={partner}>{partner}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersPreview() {
  return (
    <Section
      id="partners"
      eyebrow="Partners"
      title="Connected to the health-tech ecosystem"
      intro="med-dev has grown through company visits, research conversations, community partnerships, and shared health-tech events."
    >
      <div className="logo-wall reveal">
        {featuredPartners.map((partner) => (
          <span key={partner}>{partner}</span>
        ))}
      </div>
      <div className="section-actions">
        <ButtonLink href="/partners" variant="secondary">
          See all partners
        </ButtonLink>
      </div>
    </Section>
  );
}

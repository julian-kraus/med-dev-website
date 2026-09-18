import { Section } from "../common/Section";
import { ButtonLink } from "../common/ButtonLink";
import { partnerGroups } from "../../content/partners";

export function Partners() {
  return (
    <section className="partner-section" id="partners" aria-label="Past collaborators">
      <div className="partner-section__inner">
        <p className="partner-section__intro">
          med-dev has grown through company visits, research conversations,
          community partnerships, and shared health-tech events.
        </p>
      <div className="partner-groups" aria-label="Past collaborators">
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
      eyebrow="Collaborations"
      title="Connected to the health-tech ecosystem"
      intro="med-dev has grown through company visits, research conversations, community partnerships, and shared health-tech events."
    >
      <div className="section-actions">
        <ButtonLink href="/partners" variant="secondary">
          See collaborators
        </ButtonLink>
      </div>
    </Section>
  );
}

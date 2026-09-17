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
  const previewNames = partnerGroups.flatMap((group) => group.names).slice(0, 8);

  return (
    <Section
      id="partners"
      eyebrow="Collaborations"
      title="Connected to the health-tech ecosystem"
      intro="A glimpse at companies, organizations, and communities connected to med-dev events and collaborations."
    >
      <div className="logo-wall" aria-label="Selected collaborators">
        {previewNames.map((partner) => (
          <span key={partner}>{partner}</span>
        ))}
      </div>
      <div className="section-actions">
        <ButtonLink href="/partners" variant="secondary">
          See collaborators
        </ButtonLink>
      </div>
    </Section>
  );
}

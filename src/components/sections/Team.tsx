import { Section } from "../common/Section";
import { ButtonLink } from "../common/ButtonLink";
import { teamMembers } from "../../content/team";

export function Team() {
  return (
    <Section id="team" className="section--content-only">
      <div className="team-grid">
        {teamMembers.map((member) => (
          <article className="team-member" key={member.id}>
            <img
              src={member.image}
              alt=""
              width={768}
              height={768}
              loading="lazy"
              decoding="async"
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p className="team-member__bio">{member.bio}</p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
            >
              LinkedIn
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function TeamPreview() {
  return (
    <Section
      id="team"
      eyebrow="Team"
      title="Built by people across medicine and tech"
      intro="Meet a few of the organizers behind med-dev."
    >
      <div className="team-grid team-grid--preview">
        {teamMembers.slice(0, 3).map((member) => (
          <article className="team-member" key={member.id}>
            <img
              src={member.image}
              alt=""
              width={768}
              height={768}
              loading="lazy"
              decoding="async"
            />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </article>
        ))}
      </div>
      <div className="section-actions">
        <ButtonLink href="/team" variant="secondary">
          Meet the team
        </ButtonLink>
      </div>
    </Section>
  );
}

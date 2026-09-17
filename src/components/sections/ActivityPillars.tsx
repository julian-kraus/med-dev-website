import { BookOpen, FlaskConical, Hammer, MapPinned } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";

const pillars = [
  {
    icon: Hammer,
    title: "Hackathons and workshops",
    text: "Hands-on formats where interdisciplinary teams turn health-tech challenges into concrete ideas and prototypes.",
  },
  {
    icon: BookOpen,
    title: "Career stories and buddy program",
    text: "Peer-to-peer talks about real paths in medicine and tech, plus formats for mentorship and exchange.",
  },
  {
    icon: FlaskConical,
    title: "Lab tours",
    text: "Visits to labs, companies, clinics, and workplaces where members can see healthcare innovation in context.",
  },
  {
    icon: MapPinned,
    title: "Conferences and journal club",
    text: "Shared learning around papers, events, conferences, and the ideas shaping healthcare, AI, and medical technology.",
  },
];

export function ActivityPillars() {
  return (
    <Section
      id="activities"
      eyebrow="What we do"
      title="Community formats that make collaboration practical"
      intro="Hands-on formats, peer learning, tours, and discussions help members move from interest to actual collaboration."
    >
      <div className="pillar-layout reveal">
        <div className="pillar-layout__image">
          <img src="/assets/current-site/images/image13.jpg" alt="" />
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article className="pillar-item" key={pillar.title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            );
          })}
        </div>
      </div>
      <div className="section-actions">
        <ButtonLink href="/activity" variant="secondary">
          See upcoming events
        </ButtonLink>
      </div>
    </Section>
  );
}

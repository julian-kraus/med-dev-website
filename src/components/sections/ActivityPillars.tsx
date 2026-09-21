import { BookOpen, FlaskConical, Hammer, MapPinned } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { asset } from "../../content/assets";

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
      intro="Medical students, doctors, engineers, founders, researchers, designers, and product people meet here. Members can also propose their own tours, talks, and projects."
    >
      <div className="pillar-layout reveal">
        <div className="pillar-layout__image">
          <img
            src={asset("/assets/images/image13.webp")}
            alt=""
            width={1100}
            height={738}
            loading="lazy"
            decoding="async"
          />
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
        <ButtonLink href="/activity#events" variant="secondary">
          See upcoming events
        </ButtonLink>
      </div>
    </Section>
  );
}

import { FlaskConical, Handshake, Lightbulb, Users } from "lucide-react";
import { Section } from "../common/Section";

const items = [
  {
    icon: Users,
    title: "Meet across disciplines",
    text: "Connect with medical students, doctors, engineers, founders, researchers, designers, and product people.",
  },
  {
    icon: FlaskConical,
    title: "Go where healthcare happens",
    text: "Join lab tours, workplace visits, talks, journal clubs, hackathons, and hands-on event formats.",
  },
  {
    icon: Lightbulb,
    title: "Build from member ideas",
    text: "Members can suggest tours, talks, projects, and community-driven events for others to join.",
  },
  {
    icon: Handshake,
    title: "Find collaborators",
    text: "Discover partners for research, startups, internships, content, and practical health-tech projects.",
  },
];

export function CommunityValue() {
  return (
    <Section
      id="community"
      eyebrow="Community"
      title="For people working between medicine and technology"
      intro="med-dev exists to close the gap between medical insight and technical execution."
    >
      <div className="value-grid">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article className="value-item" key={item.title}>
              <Icon size={24} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

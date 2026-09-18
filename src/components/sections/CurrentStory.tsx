import { ArrowRight, CircleDot, Network, Target } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";

const storyBlocks = [
  {
    id: "problem",
    eyebrow: "The problem",
    title: "Health-tech disconnect - siloed expertise",
    text: "Medical and technical knowledge often live in separate rooms. Healthcare problems need domain insight, but technical teams need access to context, people, and real-world constraints to build useful solutions.",
    image: "/assets/current-site/images/image11.webp",
    width: 1216,
    height: 820,
    icon: CircleDot,
  },
  {
    id: "solution",
    eyebrow: "The solution",
    title: "Bridging the health-tech gap through collaboration",
    text: "med-dev creates space for dialogue, skill transfer, and interdisciplinary work between people who understand care delivery and people who can build, analyze, design, and scale technology.",
    image: "/assets/current-site/images/image14.webp",
    width: 1216,
    height: 876,
    icon: Network,
  },
];

export function CurrentStory({ variant = "full" }: { variant?: "preview" | "full" }) {
  return (
    <>
      <Section
        id="approach"
        eyebrow="Approach"
        title="We are a community for the next generation of truly interdisciplinary health tech experts."
        intro="We bring medical and technical people together to share knowledge, build ideas, and improve healthcare through collaboration."
      >
        <div className="statement-panel reveal">
          <p>
            med-dev connects medical and tech enthusiasts and gives them the resources to improve
            healthcare.
          </p>
        </div>
      </Section>

      {variant === "preview" ? (
        <section className="preview-actions">
          <div className="preview-actions__inner">
            <ButtonLink href="/community" variant="secondary">
              Explore the community
            </ButtonLink>
          </div>
        </section>
      ) : null}

      {variant === "full" ? (
        <div className="story-stack">
          {storyBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <section className="story-band reveal" id={block.id} key={block.id}>
                <div className={`story-band__inner ${index % 2 ? "is-reversed" : ""}`}>
                  <div className="story-band__copy">
                    <p className="eyebrow">{block.eyebrow}</p>
                    <h2>{block.title}</h2>
                    <p>{block.text}</p>
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <div className="story-band__image">
                    <img
                      src={block.image}
                      alt=""
                      width={block.width}
                      height={block.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : null}

      {variant === "full" ? (
        <Section
          id="mission"
          eyebrow="Mission"
          title="Uniting medical and tech enthusiasts."
          intro="We provide the resources, formats, and community momentum that help people work on better healthcare."
        >
          <div className="mission-panel reveal">
            <Target size={30} aria-hidden="true" />
            <p>
              From lab tours and technical talks to hackathons, journal clubs, buddy formats, and
              member-led experiments, med-dev is built around people who want to contribute.
            </p>
            <ButtonLink href={siteLinks.whatsappInvite} target="_blank" rel="noreferrer">
              Join us <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </div>
        </Section>
      ) : null}
    </>
  );
}

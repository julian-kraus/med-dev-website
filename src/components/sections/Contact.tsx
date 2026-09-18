import { Mail, MessageSquare, NotebookPen } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";

const copy = {
  cta: {
    title: "Want to collaborate with med-dev?",
    intro:
      "Reach out for partnerships, talks, event ideas, community questions, and collaborations.",
  },
  full: {
    title: "Innovate with us",
    intro: "Let's build a new era in health innovation through boundless collaboration.",
  },
} as const;

export function Contact({ variant = "full" }: { variant?: keyof typeof copy }) {
  return (
    <Section id="contact" eyebrow="Contact" {...copy[variant]}>
      <div className="contact-actions contact-actions--wide reveal">
        <ButtonLink href={siteLinks.contactForm} target="_blank" rel="noreferrer">
          <NotebookPen size={18} aria-hidden="true" />
          Open contact form
        </ButtonLink>
        <ButtonLink href={`mailto:${siteLinks.contactEmail}`} variant="ghost">
          <Mail size={18} aria-hidden="true" />
          Email the team
        </ButtonLink>
        <ButtonLink
          href={siteLinks.whatsappInvite}
          target="_blank"
          rel="noreferrer"
          variant="ghost"
        >
          <MessageSquare size={18} aria-hidden="true" />
          Join WhatsApp
        </ButtonLink>
      </div>
    </Section>
  );
}

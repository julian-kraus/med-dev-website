import { Newspaper } from "lucide-react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";
import { useNewsletterIssues, type NewsletterStatus } from "./useNewsletterIssues";
import type { NewsletterIssue } from "../../content/newsletterFeed";

export function NewsletterCard({ issue }: { issue: NewsletterIssue }) {
  return (
    <a className="newsletter-card" href={issue.url} target="_blank" rel="noreferrer">
      {issue.imageUrl ? <img src={issue.imageUrl} alt="" loading="lazy" /> : null}
      <div className="newsletter-card__body">
        <span>
          {issue.publishedAt
            ? new Date(issue.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" })
            : "med-dev"}
        </span>
        <h3>{issue.title}</h3>
        <p>{issue.summary}</p>
      </div>
    </a>
  );
}

/**
 * The prerendered HTML ships whichever state is initial, so the loading copy
 * has to read sensibly to anyone who never runs JS.
 */
export function NewsletterState({ status }: { status: NewsletterStatus }) {
  if (status === "loading") {
    return (
      <div className="newsletter-state">
        Recent posts load here. They are also available on{" "}
        <a href={siteLinks.newsletterArchive} target="_blank" rel="noreferrer">
          Substack
        </a>
        .
      </div>
    );
  }

  if (status === "empty") {
    return <div className="newsletter-state">No newsletter posts are available right now.</div>;
  }

  if (status === "error") {
    return <div className="newsletter-state">Newsletter posts are temporarily unavailable.</div>;
  }

  return null;
}

export function NewsletterFeature() {
  const { issues, status } = useNewsletterIssues(6);

  return (
    <Section id="newsletter" className="newsletter-section section--content-only">
      <div className="newsletter-band reveal">
        <Newspaper size={28} aria-hidden="true" />
        <div>
          <h3>Latest from Substack</h3>
          <p>Read recent posts and subscribe for new med-dev updates.</p>
        </div>
        <div className="newsletter-band__actions">
          <ButtonLink href={siteLinks.newsletterArchive} target="_blank" rel="noreferrer">
            Read all articles
          </ButtonLink>
        </div>
      </div>
      <div className="newsletter-grid reveal">
        <NewsletterState status={status} />
        {issues.map((issue) => (
          <NewsletterCard issue={issue} key={issue.id} />
        ))}
      </div>
    </Section>
  );
}

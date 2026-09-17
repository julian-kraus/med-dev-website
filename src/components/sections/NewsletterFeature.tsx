import { Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import type { NewsletterIssue } from "../../content/newsletters";
import { siteLinks } from "../../content/siteLinks";

type Rss2JsonItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  content?: string;
};

type Rss2JsonResponse = {
  items?: Rss2JsonItem[];
};

type NewsletterFeatureProps = {
  variant?: "preview" | "full";
  inline?: boolean;
  showActivityLink?: boolean;
};

const newsletterFeedUrl =
  "https://api.rss2json.com/v1/api.json?rss_url=https://meddev.substack.com/feed";

function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFirstImage(value = "") {
  return value.match(/<img[^>]+src="([^">]+)"/)?.[1];
}

function toNewsletterIssue(item: Rss2JsonItem): NewsletterIssue | null {
  if (!item.title || !item.link) {
    return null;
  }

  return {
    id: item.link,
    title: item.title,
    publishedAt: item.pubDate ?? "",
    summary: stripHtml(item.description ?? item.content).slice(0, 220),
    url: item.link,
    imageUrl: extractFirstImage(item.content),
  };
}

export function NewsletterFeature({
  variant = "full",
  inline = false,
  showActivityLink = true,
}: NewsletterFeatureProps) {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "empty" | "error">("loading");

  useEffect(() => {
    let isMounted = true;

    async function loadIssues() {
      try {
        const response = await fetch(newsletterFeedUrl);

        if (!response.ok) {
          if (isMounted) {
            setStatus("error");
          }
          return;
        }

        const payload = (await response.json()) as Rss2JsonResponse;

        if (!isMounted) {
          return;
        }

        const loadedIssues = (payload.items ?? [])
          .map(toNewsletterIssue)
          .filter((issue): issue is NewsletterIssue => Boolean(issue))
          .slice(0, 6);

        setIssues(loadedIssues);
        setStatus(loadedIssues.length ? "success" : "empty");
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    }

    void loadIssues();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleIssues = variant === "preview" ? issues.slice(0, 6) : issues;

  const content = (
    <>
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
          {variant === "preview" && showActivityLink ? (
            <ButtonLink href="/activity" variant="secondary">
              Open activity
            </ButtonLink>
          ) : null}
        </div>
      </div>
      <div className="newsletter-grid reveal">
        {status === "loading" ? (
          <div className="newsletter-state">Loading newsletter posts...</div>
        ) : null}
        {status === "empty" ? (
          <div className="newsletter-state">No newsletter posts are available right now.</div>
        ) : null}
        {status === "error" ? (
          <div className="newsletter-state">Newsletter posts are temporarily unavailable.</div>
        ) : null}
        {status === "success"
          ? visibleIssues.map((issue) => (
              <a className="newsletter-card" href={issue.url} target="_blank" rel="noreferrer" key={issue.id}>
                {issue.imageUrl ? (
                  <img src={issue.imageUrl} alt="" loading="lazy" />
                ) : null}
                <div className="newsletter-card__body">
                  <span>{issue.publishedAt ? new Date(issue.publishedAt).toLocaleDateString("en-GB", { dateStyle: "medium" }) : "med-dev"}</span>
                  <h3>{issue.title}</h3>
                  <p>{issue.summary}</p>
                </div>
              </a>
            ))
          : null}
      </div>
    </>
  );

  if (inline) {
    return content;
  }

  return (
    <Section
      id="newsletter"
      className={`newsletter-section ${variant === "full" ? "section--content-only" : ""}`}
      eyebrow={variant === "preview" ? "Newsletter" : undefined}
      title={variant === "preview" ? "Latest from med-dev" : undefined}
      intro={variant === "preview" ? "Recent community stories and event recaps from Substack." : undefined}
    >
      {content}
    </Section>
  );
}

import { Newspaper } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "../common/ButtonLink";
import { Section } from "../common/Section";
import { siteLinks } from "../../content/siteLinks";

export type NewsletterIssue = {
  id: string;
  title: string;
  publishedAt: string;
  summary: string;
  url: string;
  imageUrl?: string;
};

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

// Substack has no CORS-enabled JSON feed, so the posts come through rss2json,
// matching what the current live site does. It is unauthenticated and rate
// limited per IP, and visitors' IPs reach that third party: a known tradeoff,
// recorded in AGENTS.md.
const newsletterFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  `${siteLinks.newsletterArchive}/feed`,
)}`;

const namedEntities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(value: string) {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return namedEntities[entity.toLowerCase()] ?? match;
  });
}

export function stripHtml(value = "") {
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFirstImage(value = "") {
  return value.match(/<img[^>]+src="([^">]+)"/)?.[1];
}

export function toNewsletterIssue(item: Rss2JsonItem): NewsletterIssue | null {
  if (!item.title || !item.link) {
    return null;
  }

  return {
    id: item.link,
    title: stripHtml(item.title),
    publishedAt: item.pubDate ?? "",
    summary: stripHtml(item.description ?? item.content).slice(0, 220),
    url: item.link,
    imageUrl: extractFirstImage(item.content),
  };
}

export function NewsletterFeature() {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "empty" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadIssues() {
      try {
        const response = await fetch(newsletterFeedUrl, { signal: controller.signal });

        if (!response.ok) {
          setStatus("error");
          return;
        }

        const payload = (await response.json()) as Rss2JsonResponse;

        const loadedIssues = (payload.items ?? [])
          .map(toNewsletterIssue)
          .filter((issue): issue is NewsletterIssue => Boolean(issue))
          .slice(0, 6);

        setIssues(loadedIssues);
        setStatus(loadedIssues.length ? "success" : "empty");
      } catch {
        if (!controller.signal.aborted) {
          setStatus("error");
        }
      }
    }

    void loadIssues();

    return () => controller.abort();
  }, []);

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
        {/* The prerendered HTML ships whichever state is initial, so the
            loading copy has to read sensibly to anyone who never runs JS. */}
        {status === "loading" ? (
          <div className="newsletter-state">
            Recent posts load here. They are also available on{" "}
            <a href={siteLinks.newsletterArchive} target="_blank" rel="noreferrer">
              Substack
            </a>
            .
          </div>
        ) : null}
        {status === "empty" ? (
          <div className="newsletter-state">No newsletter posts are available right now.</div>
        ) : null}
        {status === "error" ? (
          <div className="newsletter-state">Newsletter posts are temporarily unavailable.</div>
        ) : null}
        {status === "success"
          ? issues.map((issue) => (
              <a
                className="newsletter-card"
                href={issue.url}
                target="_blank"
                rel="noreferrer"
                key={issue.id}
              >
                {issue.imageUrl ? <img src={issue.imageUrl} alt="" loading="lazy" /> : null}
                <div className="newsletter-card__body">
                  <span>
                    {issue.publishedAt
                      ? new Date(issue.publishedAt).toLocaleDateString("en-GB", {
                          dateStyle: "medium",
                        })
                      : "med-dev"}
                  </span>
                  <h3>{issue.title}</h3>
                  <p>{issue.summary}</p>
                </div>
              </a>
            ))
          : null}
      </div>
    </Section>
  );
}

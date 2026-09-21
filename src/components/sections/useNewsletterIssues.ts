import { useEffect, useState } from "react";
import { siteLinks } from "../../content/siteLinks";
import {
  toNewsletterIssue,
  type NewsletterIssue,
  type Rss2JsonResponse,
} from "../../content/newsletterFeed";

// Substack has no CORS-enabled JSON feed, so the posts come through rss2json,
// matching what the current live site does. It is unauthenticated and rate
// limited per IP, and visitors' IPs reach that third party: a known tradeoff,
// recorded in AGENTS.md.
const newsletterFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  `${siteLinks.newsletterArchive}/feed`,
)}`;

export type NewsletterStatus = "loading" | "success" | "empty" | "error";

/** Lives in its own file so the component modules stay fast-refresh clean. */
export function useNewsletterIssues(limit: number) {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [status, setStatus] = useState<NewsletterStatus>("loading");

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
          .slice(0, limit);

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
  }, [limit]);

  return { issues, status };
}

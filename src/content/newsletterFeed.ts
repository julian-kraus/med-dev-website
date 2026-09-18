// Parsing helpers for the Substack feed, kept out of the component file so
// fast refresh keeps working and so they are directly testable.

export type NewsletterIssue = {
  id: string;
  title: string;
  publishedAt: string;
  summary: string;
  url: string;
  imageUrl?: string;
};

export type Rss2JsonItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  content?: string;
};

export type Rss2JsonResponse = {
  items?: Rss2JsonItem[];
};

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

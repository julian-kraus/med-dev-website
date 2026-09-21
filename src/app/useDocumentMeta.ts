import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  absoluteUrl,
  canonicalPath,
  defaultOgImage,
  noindexSite,
  normalizePath,
  routeMeta,
  type RouteMeta,
  type RoutePath,
} from "../content/routeMeta";

// The prerendered HTML already carries the correct tags for the first paint;
// this keeps them correct across client-side navigation. Every write is an
// upsert: appending instead would leave duplicate og:title behind after the
// first route change, and crawlers resolve duplicates unpredictably.

function upsertMeta(key: "name" | "property", value: string, content: string) {
  const selector = `meta[${key}="${value}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(key, value);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = href;
}

export function applyRouteMeta(pathname: string, meta: RouteMeta) {
  const image = absoluteUrl(meta.ogImage ?? defaultOgImage);
  const url = absoluteUrl(canonicalPath(pathname));

  document.title = meta.title;
  upsertMeta("name", "description", meta.description);
  upsertMeta("name", "robots", meta.noindex || noindexSite ? "noindex, follow" : "index, follow");
  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:type", "website");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertCanonical(url);
}

export function useDocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalizePath(pathname);
    const meta = routeMeta[path as RoutePath] ?? routeMeta["/404"];
    applyRouteMeta(path, meta);
  }, [pathname]);
}

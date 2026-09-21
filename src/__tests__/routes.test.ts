import { describe, expect, it } from "vitest";
import { appRoutes, prerenderRoutes } from "../app/routes";
import { canonicalPath, normalizePath, redirectRoutes, routeMeta } from "../content/routeMeta";

// The production host serves one real file per route and 404s anything else,
// so a route present in the router but missing from routeMeta would work in
// dev and 404 in production. These tests are the guard against that drift.
describe("route table", () => {
  it("declares metadata for every routed path", () => {
    expect(appRoutes.map((route) => route.path).sort()).toEqual(Object.keys(routeMeta).sort());
  });

  it("gives every route a non-empty title and description", () => {
    for (const route of appRoutes) {
      expect(route.meta.title, route.path).toBeTruthy();
      expect(route.meta.description, route.path).toBeTruthy();
    }
  });

  it("gives every route a distinct title, so pages are individually shareable", () => {
    const titles = appRoutes.map((route) => route.meta.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("excludes the 404 from the prerender list, which writes it separately", () => {
    expect(prerenderRoutes.map((route) => route.path)).not.toContain("/404");
    expect(prerenderRoutes).toHaveLength(appRoutes.length - 1);
  });

  it("keeps redirect sources out of the route table", () => {
    // Redirect routes render empty under StaticRouter; prerendering one would
    // ship a page that hydrates onto an empty root.
    for (const from of Object.keys(redirectRoutes)) {
      expect(appRoutes.map((route) => route.path)).not.toContain(from);
    }
  });

  it("points every redirect at a real route", () => {
    for (const to of Object.values(redirectRoutes)) {
      expect(Object.keys(routeMeta)).toContain(to);
    }
  });

  it("marks legal pages and the 404 noindex", () => {
    expect(routeMeta["/legal/imprint"].noindex).toBe(true);
    expect(routeMeta["/legal/privacy"].noindex).toBe(true);
    expect(routeMeta["/404"].noindex).toBe(true);
  });
});

describe("normalizePath", () => {
  it("strips trailing slashes so /team/ resolves to the /team metadata", () => {
    expect(normalizePath("/team/")).toBe("/team");
    expect(normalizePath("/legal/imprint/")).toBe("/legal/imprint");
  });

  it("keeps the root as a single slash", () => {
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("//")).toBe("/");
  });

  it("leaves already-normal paths alone", () => {
    expect(normalizePath("/team")).toBe("/team");
  });
});

describe("canonicalPath", () => {
  // GitHub Pages 301s /team to /team/. If canonicals used the un-slashed form
  // every page would point at a URL that redirects back to itself.
  it("adds the trailing slash the host actually serves", () => {
    expect(canonicalPath("/team")).toBe("/team/");
    expect(canonicalPath("/legal/imprint")).toBe("/legal/imprint/");
  });

  it("leaves the root alone", () => {
    expect(canonicalPath("/")).toBe("/");
  });

  it("is idempotent, so an already-slashed path does not double up", () => {
    expect(canonicalPath("/team/")).toBe("/team/");
    expect(canonicalPath(canonicalPath("/team"))).toBe("/team/");
  });

  it("covers every indexable route", () => {
    for (const path of Object.keys(routeMeta)) {
      expect(canonicalPath(path).endsWith("/"), path).toBe(true);
    }
  });
});

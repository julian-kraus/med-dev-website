import { describe, expect, it } from "vitest";
import { extractFirstImage, stripHtml, toNewsletterIssue } from "../content/newsletterFeed";

describe("stripHtml", () => {
  it("removes tags and collapses whitespace", () => {
    expect(stripHtml("<p>Hello</p>\n\n<p>world</p>")).toBe("Hello world");
  });

  it("decodes named entities", () => {
    expect(stripHtml("Tom &amp; Jerry said &quot;hi&quot;")).toBe('Tom & Jerry said "hi"');
  });

  it("decodes numeric and hex entities", () => {
    // The old implementation only handled &nbsp; and &amp;, so these rendered raw.
    expect(stripHtml("Issue &#8211; six")).toBe("Issue – six");
    expect(stripHtml("caf&#xe9;")).toBe("café");
  });

  it("leaves unknown entities untouched rather than mangling them", () => {
    expect(stripHtml("100 &notarealentity; here")).toBe("100 &notarealentity; here");
  });

  it("treats a missing value as empty", () => {
    expect(stripHtml()).toBe("");
  });
});

describe("extractFirstImage", () => {
  it("returns the first img src", () => {
    expect(
      extractFirstImage('<p>x</p><img src="https://cdn/a.png"><img src="https://cdn/b.png">'),
    ).toBe("https://cdn/a.png");
  });

  it("returns undefined when there is no image", () => {
    expect(extractFirstImage("<p>no pictures</p>")).toBeUndefined();
  });
});

describe("toNewsletterIssue", () => {
  it("maps a feed item", () => {
    const issue = toNewsletterIssue({
      title: "Issue &#8211; 6",
      link: "https://meddev.substack.com/p/six",
      pubDate: "2026-01-02 10:00:00",
      content: '<img src="https://cdn/six.png"><p>Body &amp; more</p>',
    });

    expect(issue).toMatchObject({
      id: "https://meddev.substack.com/p/six",
      title: "Issue – 6",
      summary: "Body & more",
      imageUrl: "https://cdn/six.png",
    });
  });

  it("drops items without a title or link, which would render as empty cards", () => {
    expect(toNewsletterIssue({ link: "https://example.com" })).toBeNull();
    expect(toNewsletterIssue({ title: "No link" })).toBeNull();
  });

  it("truncates long summaries", () => {
    const issue = toNewsletterIssue({
      title: "Long",
      link: "https://example.com",
      description: "x".repeat(400),
    });
    expect(issue?.summary).toHaveLength(220);
  });
});

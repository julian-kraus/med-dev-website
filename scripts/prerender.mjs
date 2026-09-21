// Writes a real static HTML file per route, with route-specific title, meta,
// Open Graph, Twitter and canonical tags baked into the head.
//
// Runs after `vite build` (which produces dist/index.html, the template) and
// `vite build --ssr` (which produces .prerender/entry-server.js).

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const ssrEntry = pathToFileURL(join(root, ".prerender", "entry-server.js"));

const {
  render,
  prerenderRoutes,
  redirectRoutes,
  routeMeta,
  siteOrigin,
  defaultOgImage,
  absoluteUrl,
  canonicalPath,
  noindexSite,
} = await import(ssrEntry.href);

// Read the template exactly once. Reading it back after writing "/" would make
// every later route inherit the homepage's meta.
const template = await readFile(join(distDir, "index.html"), "utf8");

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeHtml(value) {
  return escapeAttr(value);
}

function headTags(pathname, meta) {
  const url = absoluteUrl(canonicalPath(pathname));
  const image = absoluteUrl(meta.ogImage ?? defaultOgImage);

  return [
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex || noindexSite ? "noindex, follow" : "index, follow"}" />`,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ");
}

function buildPage(pathname, meta, appHtml) {
  return template
    .replace("<!--app-head-->", headTags(pathname, meta))
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace("<!--app-html-->", appHtml);
}

function outputPath(pathname) {
  return pathname === "/"
    ? join(distDir, "index.html")
    : join(distDir, pathname.replace(/^\//, ""), "index.html");
}

async function writePage(path, contents) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents, "utf8");
}

const written = [];

for (const route of prerenderRoutes) {
  const appHtml = render(route.path);

  // A route that renders to nothing means the router did not match it, or it
  // resolved to a <Navigate>, which renders an empty string under StaticRouter.
  // Shipping that would hydrate onto an empty root, so fail the build instead.
  if (!appHtml.trim()) {
    throw new Error(
      `Prerender produced empty markup for "${route.path}". ` +
        `Redirect-only routes must not be in prerenderRoutes.`,
    );
  }

  const target = outputPath(route.path);
  await writePage(target, buildPage(route.path, route.meta, appHtml));
  written.push([route.path, appHtml.length]);
}

// The 404 lives at dist/404.html, which both Vercel and GitHub Pages serve for
// unmatched paths.
const notFoundHtml = render("/404");

if (!notFoundHtml.trim()) {
  throw new Error("Prerender produced empty markup for the 404 page.");
}

await writePage(join(distDir, "404.html"), buildPage("/404", routeMeta["/404"], notFoundHtml));
written.push(["/404.html", notFoundHtml.length]);

// Redirect stubs, deliberately without the app bundle: a stub carrying the
// script would boot React onto an empty root. On Vercel the 308 in vercel.json
// wins and these are never served; on GitHub Pages, which has no redirect
// mechanism, they are the only thing that works.
for (const [from, to] of Object.entries(redirectRoutes)) {
  // Absolute, so the stub is correct whether the site is served from a domain
  // root or a repo subpath.
  const target = absoluteUrl(canonicalPath(to));
  const stub = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${target}" />
    <meta name="robots" content="noindex, follow" />
    <title>Redirecting to ${to}</title>
  </head>
  <body>
    <p>This page has moved to <a href="${target}">${to}</a>.</p>
  </body>
</html>
`;
  await writePage(outputPath(from), stub);
  written.push([`${from} (redirect stub)`, stub.length]);
}

// Sitemap and robots, from the same route table.
const indexable = prerenderRoutes.filter((route) => !route.meta.noindex);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((route) => `  <url><loc>${absoluteUrl(canonicalPath(route.path))}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");

// A preview deploy is publicly reachable, so it must be excluded outright or
// it competes with the real site for its own content.
await writeFile(
  join(distDir, "robots.txt"),
  noindexSite
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`,
  "utf8",
);

for (const [path, size] of written) {
  console.log(`prerendered ${path.padEnd(28)} ${String(size).padStart(7)} bytes of markup`);
}
console.log(`sitemap.xml with ${indexable.length} urls, robots.txt`);

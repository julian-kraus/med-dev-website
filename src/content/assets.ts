// Every static asset URL goes through here so the site works both at a domain
// root and at a repo subpath. BASE_URL is "/" by default and "/med-dev-website/"
// (say) when VITE_BASE is set at build time; it always ends in a slash.
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

/** Builds a srcset string from [path, descriptor] pairs. */
export function assetSrcSet(entries: [path: string, descriptor: string][]) {
  return entries.map(([path, descriptor]) => `${asset(path)} ${descriptor}`).join(", ");
}

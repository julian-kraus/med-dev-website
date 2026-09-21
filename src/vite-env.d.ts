/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute origin the built site will be served from, no trailing slash. */
  readonly VITE_SITE_ORIGIN?: string;
  /** "true" on preview builds, which must not be indexed. */
  readonly VITE_NOINDEX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

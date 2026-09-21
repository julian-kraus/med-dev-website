import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site normally lives at a domain root, but it also has to work when
// served from a repo subpath (a GitHub Pages project page). Everything that
// builds a URL goes through import.meta.env.BASE_URL so both work from the
// same source. See VITE_BASE in .github/workflows/deploy.yml.
const base = process.env.VITE_BASE || "/";

export default defineConfig(({ isSsrBuild }) => ({
  base,
  plugins: [react()],
  build: {
    // Content-hashed bundle output lives under /build, kept separate from the
    // plain-named media in public/assets. Only the hashed files can safely be
    // cached immutably, and splitting them makes that rule unambiguous.
    assetsDir: "build",
    // Vite copies public/ into the out dir for SSR builds too, which would
    // duplicate every asset into the throwaway .prerender directory.
    copyPublicDir: !isSsrBuild,
  },
}));

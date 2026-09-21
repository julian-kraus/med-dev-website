import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
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

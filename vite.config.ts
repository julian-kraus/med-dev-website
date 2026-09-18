import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // Vite copies public/ into the out dir for SSR builds too, which would
    // duplicate every asset into the throwaway .prerender directory.
    copyPublicDir: !isSsrBuild,
  },
}));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// gnslalsl12.github.io is a GitHub *user* page served from the root domain,
// so the base path is "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  // Build timestamp (YYYY-MM-DD) injected at build time. Deploys run on every
  // push to main, so this reflects the site's last-updated date in the footer.
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});

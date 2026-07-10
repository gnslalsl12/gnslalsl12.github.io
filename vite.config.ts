import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

// Archive docs marked private (see src/lib/archive.ts) must never reach an
// ordinary visitor's network tab, only the owner's authenticated fetch. The
// source manifest keeps every doc (so the owner can still manage private
// ones via the GitHub API), so this plugin strips private entries out of the
// copy that actually ships in `dist/` after the public dir is copied.
function stripPrivateDocs(): Plugin {
  return {
    name: "strip-private-docs",
    apply: "build",
    closeBundle() {
      const manifestPath = path.resolve(__dirname, "dist/docs/index.json");
      if (!fs.existsSync(manifestPath)) return;
      const data = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
        docs?: { visibility?: string }[];
      };
      const docs = (data.docs ?? []).filter((d) => d.visibility !== "private");
      fs.writeFileSync(manifestPath, JSON.stringify({ docs }, null, 2) + "\n");
    },
  };
}

// gnslalsl12.github.io is a GitHub *user* page served from the root domain,
// so the base path is "/".
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), stripPrivateDocs()],
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

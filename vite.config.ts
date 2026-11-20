import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/", // custom domain (see public/CNAME)

  build: {
    outDir: "dist",
    // Images live in src/assets and are already compressed; keep them as files
    // instead of inlining them as base64 data URLs.
    assetsInlineLimit: 2048,
  },
});

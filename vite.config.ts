import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: "/", // ✅ since you're using custom domain

  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "."),
    },
  },

  build: {
    outDir: "dist", // ensure correct output
  },
});

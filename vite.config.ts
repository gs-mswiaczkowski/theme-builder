import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this repo from /theme-builder/, but keep local dev at
  // the root so the dev server URL doesn't change.
  base: command === "build" ? "/theme-builder/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))

import { defineConfig } from "astro/config"

import react from "@astrojs/react"
import tailwind from "@tailwindcss/vite"
import remarkObsidian from "remark-obsidian"
import remarkGfm from "remark-gfm"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },

  markdown: {
    remarkPlugins: [remarkObsidian, remarkGfm],
  },

  integrations: [react()],
})

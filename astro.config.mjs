import { defineConfig } from "astro/config"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import slugify from "slugify"

import react from "@astrojs/react"
import tailwind from "@tailwindcss/vite"
import remarkObsidian from "remark-obsidian"
import remarkGfm from "remark-gfm"
import mdx from "@astrojs/mdx"

const CONTENT_DIRS = {
  notes: path.join(process.cwd(), "src", "notes"),
  posts: path.join(process.cwd(), "src", "posts"),
  work: path.join(process.cwd(), "src", "work"),
}

function customTitleToUrl(title) {
  for (const [collection, dir] of Object.entries(CONTENT_DIRS)) {
    const filePath = path.join(dir, `${title}.md`)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8")
      try {
        const { data } = matter(content)
        const slug = data.slug || slugify(title, { lower: true, strict: true })
        return `/${collection}/${slug}`
      } catch {
        const slug = slugify(title, { lower: true, strict: true })
        return `/${collection}/${slug}`
      }
    }
  }
  // Not found in any collection — fall back to a notes path with slugified title
  const slug = slugify(title, { lower: true, strict: true })
  return `/notes/${slug}`
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwind()],
  },

  markdown: {
    remarkPlugins: [
      [remarkObsidian, { titleToUrl: customTitleToUrl }],
      [
        remarkGfm,
        {
          singleTilde: true,
          stringLength: true,
          tableCellPadding: true,
          tablePipeAlign: true,
          listItemIndent: "one",
          bullet: "-",
          tight: true,
        },
      ],
    ],
    shikiConfig: {
      theme: "rose-pine-moon",
      wrap: true,
    },
  },

  integrations: [react(), mdx()],
})

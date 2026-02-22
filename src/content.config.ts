import { defineCollection, z } from "astro:content"
// @ts-ignore
import { glob } from "astro/loaders"

const schema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.coerce.date().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  alt: z.string().optional(),
  author: z.union([z.string(), z.array(z.string())]).optional(),
  type: z.string().optional(),
  year: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  draft: z.boolean().optional(),
  portfolio: z.boolean().optional(),
  atUri: z.string().optional()
})

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/posts" }),
  schema
})

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/work" }),
  schema
})

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/notes" }),
  schema
})

export const collections = {
  posts,
  work,
  notes
}

import { defineCollection, z } from "astro:content"
// @ts-ignore
import { glob } from "astro/loaders"

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = {
  posts,
}

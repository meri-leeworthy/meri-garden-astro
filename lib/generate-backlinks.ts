import fs from "fs"
import path from "path"
import matter from "gray-matter"
import slugify from "slugify"

interface Backlink {
  slug: string
  title: string
}

interface BacklinksMap {
  [key: string]: Backlink[]
}

const POSTS_DIR = path.join(process.cwd(), "src", "posts")
const OUTPUT_FILE = path.join(process.cwd(), "public", "backlinks.json")

function hasFrontmatter(content: string): boolean {
  return content.trimStart().startsWith("---")
}

function extractUniqueLinks(content: string): string[] {
  // Match both Obsidian-style [[links]] and markdown [links](url)
  const obsidianLinkRegex = /\[\[(.*?)\]\]/g
  const markdownLinkRegex = /\[(.*?)\]\(.*?\)/g

  const obsidianMatches = content.match(obsidianLinkRegex) || []
  const markdownMatches = content.match(markdownLinkRegex) || []

  // Use a Set to automatically deduplicate the links
  const uniqueLinks = new Set([
    ...obsidianMatches.map(match => match.slice(2, -2)),
    ...markdownMatches.map(match => {
      const textMatch = match.match(/\[(.*?)\]/)
      return textMatch ? textMatch[1] : ""
    }),
  ])

  return Array.from(uniqueLinks).filter(Boolean)
}

function generateBacklinks(): void {
  const backlinksMap: BacklinksMap = {}
  const files = fs.readdirSync(POSTS_DIR)

  files.forEach(filename => {
    if (!filename.endsWith(".md")) return

    const filePath = path.join(POSTS_DIR, filename)
    const content = fs.readFileSync(filePath, "utf8")

    // Get title from filename (remove .md extension)
    const title = path.basename(filename, ".md")

    // Create slug from title
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })

    let markdownContent: string

    if (hasFrontmatter(content)) {
      try {
        const { content: mdContent } = matter(content)
        markdownContent = mdContent
      } catch (error) {
        console.error(`Error processing frontmatter in ${filename}:`, error)
        return // Skip this file if there's an error
      }
    } else {
      markdownContent = content
    }

    const links = extractUniqueLinks(markdownContent)

    links.forEach(link => {
      const normalizedLink = slugify(link, {
        lower: true,
        strict: true,
        trim: true,
      })

      if (!backlinksMap[normalizedLink]) {
        backlinksMap[normalizedLink] = []
      }

      // Check if this slug is already in the backlinks array
      if (
        !backlinksMap[normalizedLink].some(backlink => backlink.slug === slug)
      ) {
        backlinksMap[normalizedLink].push({
          slug,
          title,
        })
      }
    })
  })

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(backlinksMap, null, 2))
  console.log(`Backlinks file generated at ${OUTPUT_FILE}`)
}

generateBacklinks()

export {}

import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface Backlink {
  slug: string
}

interface BacklinksMap {
  [key: string]: Backlink[]
}

const NOTES_DIRECTORY = path.join(process.cwd(), "posts")
const OUTPUT_FILE = path.join(process.cwd(), "public", "backlinks.json")

function extractUniqueLinks(content: string): string[] {
  const linkRegex = /\[\[(.*?)\]\]/g
  const matches = content.match(linkRegex)
  if (!matches) return []

  // Use a Set to automatically deduplicate the links
  const uniqueLinks = new Set(matches.map(match => match.slice(2, -2)))
  return Array.from(uniqueLinks)
}

function generateBacklinks(): void {
  const backlinksMap: BacklinksMap = {}
  const files = fs.readdirSync(NOTES_DIRECTORY)

  files.forEach(filename => {
    const filePath = path.join(NOTES_DIRECTORY, filename)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { content } = matter(fileContent)
    const slug = path.basename(filename, ".md")
    const links = extractUniqueLinks(content)

    links.forEach(link => {
      if (!backlinksMap[link]) {
        backlinksMap[link] = []
      }
      // Check if this slug is already in the backlinks array
      if (!backlinksMap[link].some(backlink => backlink.slug === slug)) {
        backlinksMap[link].push({ slug })
      }
    })
  })

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(backlinksMap, null, 2))
  console.log(`Backlinks file generated at ${OUTPUT_FILE}`)
}

generateBacklinks()

export {}

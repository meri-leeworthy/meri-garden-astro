import fs from "fs"
import path from "path"
import slugify from "slugify"

const POSTS_DIR = path.join(process.cwd(), "src", "posts")

interface Frontmatter {
  [key: string]: any
}

function hasFrontmatter(content: string): boolean {
  return content.trimStart().startsWith("---")
}

// Helper function to format YAML values
function formatYamlValue(value: any): string {
  if (Array.isArray(value)) {
    // Handle arrays by formatting each element with proper indentation
    return value.map(v => `- ${formatYamlValue(v)}`).join("\n")
  }

  if (typeof value === "string") {
    // Always quote strings in YAML to avoid parsing issues
    return `'${value.replace(/'/g, "''")}'`
  }
  return String(value)
}

function parseYamlValue(
  value: string,
  lines: string[],
  currentIndex: number
): [any, number] {
  // Check if this line starts a block sequence
  if (value.trim().startsWith("-")) {
    const items: any[] = []
    let i = currentIndex

    // Process the first item
    items.push(value.trim().slice(1).trim())

    // Look ahead for more items in the sequence
    while (i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim()
      if (nextLine.startsWith("-")) {
        items.push(nextLine.slice(1).trim())
        i++
      } else {
        break
      }
    }

    return [items, i]
  }

  // Handle quoted strings
  if (value.startsWith("'") && value.endsWith("'")) {
    return [value.slice(1, -1).replace(/''/g, "'"), currentIndex]
  }

  // Handle regular strings
  return [value, currentIndex]
}

function processMarkdownFiles() {
  const files = fs.readdirSync(POSTS_DIR)

  files.forEach(file => {
    if (!file.endsWith(".md")) return

    const filePath = path.join(POSTS_DIR, file)
    const content = fs.readFileSync(filePath, "utf-8")

    // Get title from filename (remove .md extension)
    const title = path.basename(file, ".md")

    // Create slug from title
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })

    let updatedContent: string
    let updatedData: Frontmatter

    if (hasFrontmatter(content)) {
      try {
        // Split the content into frontmatter and markdown
        const parts = content.split("---")
        if (parts.length >= 3) {
          const frontmatterContent = parts[1].trim()
          const markdownContent = parts.slice(2).join("---").trim()

          // Parse the frontmatter manually to avoid YAML parsing issues
          const frontmatterLines = frontmatterContent.split("\n")
          const data: Frontmatter = {}

          for (let i = 0; i < frontmatterLines.length; i++) {
            const line = frontmatterLines[i]
            const [key, ...valueParts] = line.split(":")
            if (key && valueParts.length > 0) {
              const value = valueParts.join(":").trim()
              const [parsedValue, newIndex] = parseYamlValue(
                value,
                frontmatterLines,
                i
              )

              // Check if the next line is a block sequence for this key
              if (newIndex + 1 < frontmatterLines.length) {
                const nextLine = frontmatterLines[newIndex + 1].trim()
                if (nextLine.startsWith("-")) {
                  // If current value is empty string and next line is a block sequence,
                  // use the block sequence instead
                  if (parsedValue === "") {
                    const [blockValue, blockIndex] = parseYamlValue(
                      nextLine,
                      frontmatterLines,
                      newIndex + 1
                    )
                    data[key.trim()] = blockValue
                    i = blockIndex
                    continue
                  }
                }
              }

              data[key.trim()] = parsedValue
              i = newIndex // Skip processed lines
            }
          }

          // Update frontmatter
          updatedData = {
            title,
            slug,
            ...data,
          }

          // Replace paths in content
          updatedContent = markdownContent.replace(
            /\.\.\/\.\.\/\.\.\/\.\.\/meri-public\/garden\//g,
            "https://static.meri.garden/"
          )
        } else {
          throw new Error("Invalid frontmatter format")
        }
      } catch (error) {
        console.error(`Error processing frontmatter in ${file}:`, error)
        return // Skip this file if there's an error
      }
    } else {
      // No frontmatter, create new
      updatedData = {
        title,
        slug,
      }

      // Replace paths in content
      updatedContent = content.replace(
        /\.\.\/\.\.\/\.\.\/\.\.\/meri-public\/garden\//g,
        "https://static.meri.garden/"
      )
    }

    // Write back to file with frontmatter
    const frontmatter = Object.entries(updatedData)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}:\n${formatYamlValue(value)}`
        }
        return `${key}: ${formatYamlValue(value)}`
      })
      .join("\n")

    const newContent = `---\n${frontmatter}\n---\n\n${updatedContent}`
    fs.writeFileSync(filePath, newContent)
  })
}

// Run the processing
processMarkdownFiles()

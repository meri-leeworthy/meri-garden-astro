import { Plugin, unified } from "unified"
import rehypeSanitize from "rehype-sanitize"
import * as prod from "react/jsx-runtime"
// import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkGfm from "remark-gfm"
import rehypeReact from "rehype-react"
import rehypeShiki from "@shikijs/rehype"
// import { useRemarkSync } from "react-remark"
// import { citePlugin } from "@benrbray/remark-cite"
import remarkObsidian from "remark-obsidian"
import React, { Suspense } from "react"

// ~~@ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

export async function Markdown({ markdown }: { markdown: string }) {
  // console.log(markdown)
  const standardisedMarkdown = StandardiseObsidianLinks(markdown)

  const result = await unified()
    .use(remarkParse)
    .use(remarkObsidian)
    .use(remarkGfm, {
      singleTilde: true,
      stringLength: true,
      tableCellPadding: true,
      tablePipeAlign: true,
    } as any)
    .use(remarkRehype as unknown as Plugin)
    // .use(rehypeSanitize as unknown as Plugin)
    .use(rehypeShiki, {
      themes: {
        light: "rose-pine-moon",
        dark: "rose-pine-moon",
      },
    })
    .use(rehypeReact, production)
    .process(standardisedMarkdown)

  return (
    <Suspense>{processReactTree(processCitations(result.result))}</Suspense>
  )
  // console.log(standardisedMarkdown)
  // const renderedMarkdown = useRemarkSync(standardisedMarkdown, {
  //   remarkPlugins: [remarkCite],
  // })
  // // console.log(renderedMarkdown)
  // return renderedMarkdown
}

function StandardiseObsidianLinks(markdown: string) {
  return markdown
    .replace(/\.\.\/public\//g, () => "/")
    .replace(/\n/g, () => "\n\n")
    .replace(/\[\[([^\|\]]+)\]\]/g, (_, link) => {
      return `[${link}](/${encodeURIComponent(link)})`
    })
    .replace(/\[\[(.*?)\|(.*?)\]\]/g, (_, link, display) => {
      return `[${display}](/${encodeURIComponent(link)})`
    })
}

const convertMarkdownToReactFragment = (
  markdown: string
): React.ReactElement => {
  const parts = markdown.split(/(==.*?==)/g)

  const elements = parts.map((part, index) => {
    if (part.startsWith("==") && part.endsWith("==")) {
      const content = part.slice(2, -2)
      return <mark key={index}>{content}</mark>
    }
    return part
  })

  return <>{elements}</>
}

const processNode = (node: React.ReactNode): React.ReactNode => {
  if (typeof node === "string") {
    return convertMarkdownToReactFragment(node)
  }

  if (React.isValidElement(node)) {
    const children = React.Children.toArray((node.props as any).children).map(
      processNode
    )
    return React.cloneElement(node, {}, ...children)
  }

  if (Array.isArray(node)) {
    return node.map(processNode)
  }

  return node
}

const processReactTree = (
  rootElement: React.ReactElement
): React.ReactElement => {
  return processNode(rootElement) as React.ReactElement
}

interface Citation {
  id: string
  text: string
}

const processCitations = (
  rootElement: React.ReactElement
): React.ReactElement => {
  const citations: Citation[] = []
  let endnoteRegex = /\[\^(\d+)\]:\s*((?:.|\n)*?)(?=\n\[\^\d+\]:|$)/g

  const extractCitations = (text: string) => {
    let match
    while ((match = endnoteRegex.exec(text)) !== null) {
      citations.push({ id: match[1], text: match[2].trim() })
    }
    return text.replace(endnoteRegex, "")
  }

  const processNode = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string") {
      return extractCitations(node)
    }

    if (React.isValidElement(node)) {
      let newChildren: React.ReactNode[] = []
      let asides: React.ReactNode[] = []

      React.Children.forEach((node.props as any).children, child => {
        if (typeof child === "string") {
          const processedText = child.replace(/\[\^(\d+)\]/g, (match, p1) => {
            const citation = citations.find(c => c.id === p1)
            if (citation) {
              asides.push(
                <aside key={`citation-${p1}`}>
                  [{p1}]: {citation.text}
                </aside>
              )
            }
            return match
          })
          newChildren.push(processedText)
        } else {
          newChildren.push(processNode(child))
        }
      })

      return React.cloneElement(node, {}, ...asides, ...newChildren)
    }

    if (Array.isArray(node)) {
      return node.map(processNode)
    }

    return node
  }

  const processedContent = processNode(rootElement)
  return processedContent as React.ReactElement
}

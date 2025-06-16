import { Post } from "lib/types"
import { Markdown } from "./Markdown"
import { Suspense } from "react"

// TODO: fix leading on heading

export default async function Article({ post }: { post: Post }) {
  return (
    <article className="card">
      <a href={`${post.slug}`} className="no-underline">
        <h3 className="inline px-2 py-1 text-lg sm:text-[1rem] leading-8 sm:leading-7 bg-purple-300 text-black rounded font-title box-decoration-clone">
          {post.slug}
        </h3>
      </a>
      <div className="flex mt-2 sm:h-40">
        <div className="previewtext">
          <Suspense fallback={<div>Loading...</div>}>
            <Markdown markdown={post.content.slice(0, 600) + "..."} />
          </Suspense>
        </div>
        {!!post.data.image && (
          <a href={`${post.slug}`} className="min-w-[30%] sm:min-w-[15%]">
            <div className="imagecontainer">
              <img
                src={`/${post.data.image}`}
                fill={true}
                alt={post.data.alt || post.data.title}
                className="whitefilter"
              />
            </div>
          </a>
        )}
      </div>
    </article>
  )
}

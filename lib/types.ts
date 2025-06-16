export type Post = {
  data: Record<string, any>
  slug: string
  content: string
  backlinks: Array<{ slug: string }>
}

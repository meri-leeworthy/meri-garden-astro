declare module "remark-obsidian" {
  import { Plugin } from "unified"

  interface ObsidianOptions {
    // Add any options you know the plugin accepts
    wikilinks?: boolean
  }

  const remarkObsidian: Plugin<[ObsidianOptions?]>

  export default remarkObsidian
}

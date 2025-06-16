---
title: "The anatomy of a CMS"
source: "https://riad.blog/2025/01/31/the-anatomy-of-a-cms/"
author:
  - "[[Riad Benguella]]"
published: 2025-01-31
created: 2025-05-26
description: "I like to tell my developer friends that everyone should build an editor at least once as it’s central to many applications. Similarly, building a CMS is a rite of passage for developers. We …"
tags:
  - "clippings"
---
I like to tell my developer friends that everyone should build an editor at least once as it’s central to many applications. Similarly, building a CMS is a rite of passage for developers. We use them daily. There are several options from open source solutions like WordPress, Ghost, Drupal to site builders like Wix, Squarespace, or Shopify. From full headless ones like Strapi to a SAAS like Notion. Even static site generators can be seen as a CMS. All have different use-cases and approaches.

## The big picture

In this post, I will dissect the common components needed to build your own web CMS. It is also a useful exercise to understand how existing ones work and their tradeoffs.

Some CMSs act like a black box storing data for editors to manipulate and produce the necessary output and design. If our goal is **democratize publishing** like WordPress, the more flexible the CMS, the better. People have different needs and preferences. A good modern CMS should be as modular as possible.

What does that mean? In a recent WordPress event, someone asked me about my wish for WordPress in the next 10 years. I replied that as a developer valuing freedom and modularity, I’d love to see a clearer separation of concerns between these important layers:

- A shared format/spec to define the data including posts, pages, custom content types, taxonomies, templates, styles, settings, and users.
- A swappable persistence layer (file system, database, serverless storage) abstracted using a common API (REST API or other).
- An administration application (WP-Admin) for content management, design, and configuration linked to a persistence layer.
- A swappable renderer that connects to a customizable persistence layer.

The goal is to address all these random use-cases with the same architecture:

- A developer storing data in a versioned repository using the format.
- A full-featured hosted solution with a database, an admin SaaS, and a renderer for self-serve no-code users.
- The possibility to separate the content management (admin and storage) from the output, which can be a static (using a static site generator) or dynamic site.
- The possibility to develop your own renderer on top of the shared format, like a mobile app using native code.
- The ability to edit and store content locally on your computer’s file system like a notes app and sync using iCloud.
- The possibility to share your content in the Fediverse or Bluesky atproto (The shared format representing the Lexicon)

The possibilities are numerous.

- You can store or serialize the data.
- You can manipulate the data visually using the admin and its editor.
- You can render the data (website, note app, email, feeds, fediverse…).

You can mix and match however you like.

These 4 aspects represent the foundation of a modern CMS.

![](https://i0.wp.com/riad.blog/wp-content/uploads/2025/01/CMS-1.png?resize=1024%2C615&ssl=1)

## The data specification

The central piece in any CMS is the data it manipulates. A clear specification of this data and a well-defined format are necessary. The format has to be serializable, like JSON, YAML, Markdown, or a combination. Making it serializable allows portability and migration and enables the modular architecture. Any “module” of the system knows what format it expects and how to manipulate it.

The main data pieces in a CMS are:

- **Content types:** In WordPress, these are called post types and taxonomies. They have relations and can be flat or hierarchical. The CMS can have default content types like post, page, tags, and categories, and allow defining custom ones using a UI or declaratively. The data spec should allow defining content types and their schema, like a [JSON schema](https://json-schema.org/).
- **Content:** This is the actual pages, posts, and custom post type rows of a given site.
- **Settings:** May include site title, description, logo, or advanced routing settings. The key aspect is to have a generic format to specify these.
- **Pages:** This is included in “the content” category above, but I’m mentioning it separately because it’s a shared content type for all web CMSs. Modern CMSs use a block-based system for page content.
- **Templates/layouts:** When it comes to design and output, different pages often need to share a similar structure, called a layout or a template. This is part of the serializable format, like any other content or setting. It is also block-based.
- **Styles:** This is about colors, typography, spacing… In modern WordPress, these are “theme.json” files. It provides a shared, serializable, and coherent style system that a user can edit and apply globally to a site, to a page or template, or locally to a block.
- **Components:** called patterns in WordPress, they provide a predefined arrangement of blocks. They can be used across multiple pages, templates, and content types.

## The block format

A web CMS defines rendered content in a block format. A list of blocks, to simplify. A block has is of a given **type** and has a number of  **properties**. Blocks of the same type share similar properties. Some properties can also be shared across block types (see style, content, and children later). The properties of a block type represent its  [schema](https://json-schema.org/) (or JSON schema).

For instance, we have a **heading**  block type. All blocks of that type need a  **level** property to indicate if it corresponds to an H1, H2, Hn.

Most blocks should have a **style** property used by the style engine to customize the block.

Some block types can be considered “content” or “text” types. These would automatically get a **content** property to hold the actual text/HTML content. Examples: Heading, Paragraph, List Item, Button.

Other block types can be considered “containers.” They have a special **children** property allowing nested blocks.

## The engines

Besides the shared data spec, three important systems or engines should be part of every CMS and can be shared between its modules: the block rendering engine, the style engine, and the fields system.

**The block rendering engine**

This piece of software transforms a block list (using the above format) to a specified rendered output.

The main output is HTML for Web CMSs, but there are various possibilities. You can have multiple rendering engines for the same list of blocks:

- A rendering engine for a dynamically rendered site.
- A static site rendering engine.
- A mobile app rendering engine using native code.
- An email rendering engine (Not all HTML tags are permitted in emails)

**The style engine**

Generating styles is crucial in a Web CMS. Why not just use CSS and avoid style generation? Important reasons include allowing users to edit things visually without coding and having different outputs depending on the context. A style engine meant for OS-native applications shouldn’t generate CSS for instance.

A style format and a style engine are necessary. Think of a style engine as a function that takes a simple style object with basic properties (color, font, spacing, dimensions…) and generates the appropriate output, like CSS.

This function can be applied at multiple levels, but the style engine is responsible for handling priorities between the different levels. A block with a style object within a template with a style object and a global style object for the whole site.

**The fields system**

CMS content types consist of fields of various types (string, integer, date, blocks and others), but they are also needed elsewhere. But it’s not the only place where fields are needed. Block properties are fields as well. And any form rendered in the CMS Admin can be viewed as a collection of fields.

The fields system involves various elements:

- Rendering forms based on a schema (fields list)
- Rendering lists of data based on the same schema (e.g., tables, grids, calendars…)
- Validating data against a schema.

JSON Schema is often used as a basis for such a system. It is widely used to generate web forms, but it is not sufficient on its own. It needs to be augmented with components and layout primitives:

- To describe the layout of a list: table, rendered fields, sorting, pagination, filters.
- To describe a form’s layout: tabs, fieldsets, wizards, labels.
- Reusable components to integrate everything.

In modern WordPress, this is an ongoing and evolving project. The DataViews and DataForm components are meant to address this need.

---

If you’ve made it this far, you now have a rough idea of a CMS’s components and my highly opinionated take on it. This may change slightly between CMSs depending on tradeoffs, but modern ones tend to unify towards comparable systems.

I would appreciate if you can share your perspective as well. A CMS is often a lot more than what I outlined here.

---
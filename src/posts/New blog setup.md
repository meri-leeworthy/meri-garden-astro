---
title: New blog setup
isPublished: false
publishDate: "2022-02-01T00:00:00.000Z"
tags: []
---

So I made this blog at the start of my Recurse Center batch. I got it working,
but the stack I setup for myself was way too complicated - running a seperate
CMS and a database is obviously overkill for a personal blog. I wanted it to
parallel the work I had been doing for Radical Directory, and I did get it all
setup! One problem though - servers are not free.

I set the Keystone CMS up on Render, but later found out that their free-tier
databases become not-free after a certain number of months, and I don't want to
pay for anything except the domain name, so I started looking into solutions.

One idea was to move my content onto Sanity and use their free tier. But I
didn't want to learn their special Query Language unless I had to. The other
idea was to do what many programmers do: ditch the backend entirely and store
all text content as Markdown files in the frontend repo. So this is what I'm
doing now!

Despite its humble beginnings, I do have medium-sized dreams for this website,
so I figured I should set it up for MDX parsing. MDX is a superset of Markdown
that lets you write JSX inline. So if I ever want custom components in my blog
posts, that will be easy now.

I'm using Hashicorp's
[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) library to parse
the MDX. It lets you load and serialise the MDX within Next.js's
`getStaticProps`. The data fetching code for this page looks like this:

``` typescript
const postFilePaths = fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: postFilePaths.map((filePath) => ({
      params: { slug: filePath.slice(0, -4) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string) || "";
  const source = readFileSync(path.join(POSTS_PATH, slug + ".mdx"));

  const { content, data } = matter(source);
  const mdxSource = await serialize(content);

  return { props: { post: { data, slug, source: mdxSource } } };
};
```

For reference,

- postFilePath returns an array of .mdx files in a given directory
- `matter` is from the
  [gray-matter](https://github.com/jonschlinkert/gray-matter) library for
  parsing YAML frontmatter: used for putting metadata at the start of a Markdown
  file.
- The `serialise` function comes from `next-mdx-remote`. I think what it does is
  convert the MDX into JSON, which get passed as a prop to the page component
  and from there passed into the `<MDXRemote />` component which renders it.

So now I'm writing my posts in VSCode/Vim, which is really fine for me. And the
best part is I don't have to worry about more than one service, and for static
websites that service is free! (Currently on Render but could easily be Vercel
or any other)

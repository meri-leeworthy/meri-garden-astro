---
title: What's Hard About Customising A CMS?
isPublished: false
publishDate: "2021-11-08T00:00:00.000Z"
image: keystone.png
alt: A screenshot of the Keystone UI
tags:
  - radical-directory
  - projects
---

I want to write about a task I’ve been struggling with and why I find it hard. I
want to make a full stack app: a web app with a data layer, which means it has
three parts - frontend, backend and database. I have some experience writing
frontends and very little experience with backends or databases.

It seems like frontend developers often want to write full-stack apps without
having to fully learn backend skills. There are commercial solutions to this
problem called Backend-as-a-Service (BaaS) or Headless CMS. Whatever they call
themselves, what they do is provide a user interface for creating a content
model, which in turn generates an API that can be consumed by your frontend.
They all offer varying levels of control over fields and relationships, access
control, validation, hooks and manual data editing, at different prices.

The word CMS (content management system) might bring to mind software like
Wordpress or Drupal, but the addition of the word 'Headless' indicates that it's
a relatively new type of product that does not provide a frontend and just
focuses on the API. It also doesn't prescribe the use case but allows you to
define your own content models, so you aren't locked in to a 'blog' structure,
for example - maybe you just need a model for products you sell, or whatever.
Compared to a BaaS, the word CMS might indicate that a service offers a more
intuitive or white-labeled editing experience, it might provide a special
interface for document editing, and that it can be used by non-developers, e.g.
marketing teams.

Some of these products are open source and can be autonomously deployed, such as
Strapi, Directus, Supabase(?), or one I’ve most recently been using called
Keystone. Strapi and Directus give you a special UI for creating content models,
customising role-based access control, and the look and feel of the admin
interface. While it may be possible to make plugins or extensions (like
Wordpress), the developer installing them shouldn’t need to write any backend
code to get it running.

By contrast, Keystone more or less demands that you learn backend development
due to its bare-bones initial setup. All customisation on Keystone happens
through configuring it in code. Access control, validation or custom GraphQL
mutations must be defined through Typescript functions that make use of APIs
they provide for interacting with the context, user session, and the Apollo
Server. The APIs certainly make it easier than doing any of these things from
scratch, and the functionality that Keystone provides for generating a full CRUD
GraphQL API with minimal developer input is incredible. Still, it’s a lot to
take in.

![](../public/be26799ee4db8dbce6827c291bf51249.png)

Deploying your own instance of a pre-existing software package and trying to
customise it is a strange way to approach learning about backend development.
Every time I’ve tried out one of these headless CMS projects, I’ve found the CMS
to be a leaky abstraction in some way. To be fair, all of them have been fairly
early in their release cycle during the time that I’ve been experimenting. I
think what drew me to Keystone over more fully-featured projects is the sense
that

1. my project is bigger or more complex in scope than any pre-packaged CMS would
   be able to accommodate (without writing code),
2. my efforts at customising the code are welcome and expected (not restricted),
   and
3. because it’s a smaller, simpler project, understanding the source code may
   actually be possible for me at some point. Also
4. the stack it builds on top of (Apollo Server, Next.js, Express, Prisma) are
   things I want to learn more about anyway.

The third point is probably the most important. But to be clear, I think it’s
not especially small or simple except by contrast to Strapi or Directus, or even
that it's the best decision for my use case long term. Actually, I’m finding
working with it pretty hard. What is hard about it?

To start with, building a full stack app is just really complicated. There are a
LOT of things to learn and keep track of. CRUD is already like, 4 things you can
do with data, all with different approaches from the database to the API to the
admin UI to the frontend, all potentially different for different data types.
Everything has to be wrapped in some way of dealing with authentication and
authorisation, and you have to articulate access control for given lists or
fields. Then you add validation and hooks, adding extra steps to each of these
data flows. Not to mention a lot of details around the database that I don’t
want to think about.

No doubt it’s especially hard for me because I am also trying to act as
designer, making decisions about access and workflow before then trying to
implement it. There are many levels I need to be considering, it’s a big
unwieldy project for one person to be doing, it’s easy to be distracted and
overwhelmed. Not only that but even with helpful abstractions and documentation,
implementing access control, validation and hooks for the first time within the
Keystone system is a learning curve.

Other tasks in Keystone are less friendly, like creating custom fields, which
demands that I understand more complex concepts that underly the app
architecture - the internal structures they use to translate a config file into
a GraphQL server, Prisma client and admin UI. I think this is what they Keystone
team call an 'escape hatch' - a way not to get trapped in the confines of their
pre-existing field types.

This is a strange way to be learning about backend development because I started
using this CMS to simplify and streamline the process of creating a backend, but
in order to see that through (and add something as basic as S3 image fields)
I’ve ended up trying to learn something about the internal mechanics of what you
might describe as a meta-backend.

The other fundamentally hard thing is that I’m still fairly new to Typescript
and GraphQL. I understand the basics of both, but both go so much deeper than I
currently understand. I think I’m at the point in a learning journey where you
start to see how much you don’t know. It’s overwhelming and maybe me writing
this is just a way of appreciating myself for how far I’ve come to be able to
make sense of a lot of this stuff.

I am still generally enjoying the challenge, I think picking apart this problem
is good for my growth as a developer and maybe even in some ways it’s preparing
me to work in an organisation where I will inevitably need to learn about and
write code within pre-existing architectures.

In summary I think the response to the original problem of frontend developers
wanting backends is a bit of a “pick 2” situation from this triangle of
criteria:

1. Self hosted/No vendor lock
2. Customisable & efficient
3. No backend skills needed

In my case, the first two criteria are non-negotiable and I’m at a point where I
am happy to try and learn backend skills. I just need to be kind and patient
with myself.

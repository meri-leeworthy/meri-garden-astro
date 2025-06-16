[[Leaf Render Update 0]]
[[Muni Town]]

Leaf is a local-first data engine that represents all data as 'entities' in an *entity-component-system* (ECS) architecture. An entity is always defined as a composition of components, where a component is a kind of generic description of a property of data. A blog post might have Title, Date, Author and Content components, while a group message might only contain the latter three. ECS takes advantage of the simple observation that many of the data types we routinely work with have common underlying features.

Each component can be formally defined and versioned in a schema language, and these schemas can be advanced in a way that ensures backwards compatibility. The ECS approach in general also permits some forms of [[Progressive enhancement]], where data can be created that takes advantage of new features (in the form of extra components) can be added without breaking clients that don't know how to render them. The modular nature of components also lines up well with the component-based nature of all modern frontend frameworks, which hopefully makes it accessible for users to define entities as novel compositions of existing components without needing to worry about any rendering logic. 

This also greatly simplifies interoperability, reducing the surface area of feature compatibility. We can imagine an app that takes advantage of this by permitting loose collections of entities, a kind of scrapbook that could include group messages, quotes from web pages, microblog posts, videos, etc. The common interface makes creating, rendering and storing such a collection very efficient. 

[[Leaf SDK]]
[[Leaf Swappable UI]]
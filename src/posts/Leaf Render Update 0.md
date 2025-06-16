I've created a simple render module which I'm calling `leaf-render`. It applies the Minijinja templating engine (a slightly constrained Rust implementation of Jinja2) to [[Leaf]] entities. 

[[Leaf]] is a local-first data engine that represents all data as 'entities' in an *entity-component-system* (ECS) architecture. An entity is always defined as a composition of components, where a component is a kind of generic description of a property of data. A blog post might have Title, Date, Author and Content components. If all data is a composition of generic semantic properties, we can interact with the same data in various interfaces, giving us interoperability and improving user autonomy. It also gives us high level a way of evolving schemas and adding features without breaking things. 

The latest Muni Town app, Roomy, aims to take advantage of this flexibility by building a community-oriented group chat where channels, threads, posts and articles can all blend and fluidly evolve. So it makes sense to try to design a render module in a way that is broadly applicable to a lot of different contexts, whether we are outputting HTML, Markdown, CSV or something else. The starting place for that is a templating engine.

Here's the high level API design I landed on for the render module:

![](../public/208ad7349061386a253a7a267f717364.jpg)

The separation of templates from sub-templates above reflects my intention to check all sub-template dependencies are satisfied before registering a template. When it came to implementing this design, I found that it was not quite as straightforward to extract the template dependencies from the parsed template, so I skipped implementing this checking logic for now, meaning those two stages in the flow are actually identical, and we ended up with these methods on the Typescript bindings:

```ts
registerComponent(componentSchema: ComponentSchema): void;
compileTemplates(templates: Entity<TemplateSource>[]): CompileResult;
renderTemplate(name: string, context: Entity<any>): RenderResult
```

Generating HTML for a personal website of course is quite low stakes and the failure mode here (spitting out the syntax as plain text) is fairly harmless, but it improves the dev experience to have errors like this be clearly announced and it makes the system more robust for larger scale projects. My priority, in [[Organ]] as well as here, was to find a way to map templates to data schemas not just to prevent errors but also to enable discovery on a potential future template marketplace that is appropriately scoped to the data you need to render.

It's worth knowing that both templates and general render context are defined here as Entities, which I define as a JSON `Record<ComponentID, ComponentData>`, where Template is just a component containing a MiniJinja template string as well as a list of ComponentIDs the template depends on. You need to register each component schema (as JSON Schema) first so the ComponentID can resolve to it. Currently, what I've done is define the template evaluation context as the *union* of the properties of all the components passed in, where every component is assumed to be an object at the root. *This could cause problems if components have properties with the same name.*

Currently, sub-template dependencies are resolved by the template name passed in when you register it, which is like a file name. Arguably it would be better to use a Leaf ID, and arguably it would also be better to use Component IDs directly in the syntax, except that they are both long random strings. I can imagine a code editor dynamically replacing them with magic little links/buttons, kind of like when you tag a user on a messaging app - a step down a path towards visual programming? Another solution would be defining some kind of alias mapping that gets passed in with the template, so we can resolve references a bit more universally and predictably.

MiniJinja defines a **loader** feature which could for instance be connected to a storage adapter, e.g. loading arbitrary templates from IndexedDB which would be nice. There is a bit of a tension here between making everything very general and making things actually usable now. I'm excited by getting to make these experiments with something as general as Leaf.

Side note, as a step towards template discovery, it would be good to work towards having a central registry of component schemas - maybe just a GitHub repo to start. We could use JSON Schema, or maybe consider IPLD or ATProto Lexicons (transcript of me and Zick discussing this linked below):
[[Leaf discussion about ATProto Lexicons and Component definitions]]

Relatedly here is a Claude writeup comparing options here:
[[Technical comparison of schema definition languages]]

Here I started sketching out a more general approach to rendering:
[[Approach to rendering Leaf]]
[[Discussion about Leaf render plugin system]]

Implementing this 'transformations' and 'render systems' approach, possibly involving passing ASTs between modules, all feels a bit too complicated for right now. But I'm interested in the idea of a platform where users can compose a pipeline of transformations on their data using arbitrary WASM modules, and want to keep thinking about this into the future.

I continue a bit further on this thought train in [[Leaf Swappable UI]]
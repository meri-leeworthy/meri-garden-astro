A render system can apply to any entity that has the required components. 

A render system will take 1 input and return 1 output as text. 

Not all render applications should be template systems. Template systems are useful for hierarchical data outputs like HTML/XML

This is not by itself a templating system, but a single template with `X` set of component dependencies and no template dependencies can be transformed into a render system 

Simple pseudocode example - `<html><body><h1>{{name}}</h1></body></html>`
Applies to any entity with a `name` component

A template with template dependencies needs to walk the dependency graph
`<html><body><h1>{{name}}</h1>{{>footer.ext}}</body></html>`

Components: `name`
Templates: `footer.ext`

`footer.ext`: `<div>My Footer</div>` -> no dependencies, this can be inlined in the process of transforming the root template into a render system



List of potentially useful functions

- frontmatter splitter
	- takes a string and returns a tuple with frontmatter content and the main content
- TOML deserialiser
	- takes a TOML string
	- returns an object
- YAML deserialiser
	- takes a YAML string
	- returns an object
- Handlebars compiler
	- takes a Handlebars template 
	- returns an AST
- Vox compiler
	- takes a Vox template 
	- returns an AST
- dependency resolver
	- takes an AST 
	- returns the list of direct dependencies
- 
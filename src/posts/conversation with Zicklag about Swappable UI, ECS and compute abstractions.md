---
title: 'conversation with Zicklag about Swappable UI, ECS and compute abstractions'
slug: 'conversation-with-zicklag-about-swappable-ui-ecs-and-compute-abstractions'
---

meri — 10:18 am
Just developing my thoughts from yesterday a bit. My idea here is that Leaf / ECS maps somewhat to user created data models, custom templates maps somewhat to user created resources (potentially including custom UI), and wasm plugins map somewhat to user created data transformations

![](https://static.meri.garden/7aad96f56e158610a60a910ab193aaf3.jpg)

Inspired a bit by https://www.amundsens-maxim.com/
So there are these kind of stages of software development that unlock user affordances

Zicklag — 10:21 am
🤔  components = models, entities = resources, wasm = transformation 

meri — 10:21 am
Truee

Zicklag — 10:21 am
Just musing from what you said.
Templates are just a special case of entities, and all entities are resources maybe.

meri — 10:22 am
No I like that. Transformations = systems = functions

Zicklag — 10:22 am
Basically the "systems" of ECS

meri — 10:22 am
Initially I was thinking of templates more as functions / ECS systems 

Zicklag — 10:23 am
Yeah, templates are a little blurrier than normal because templates are kind of like programming languages / transformations, but under-the-hood they are just input to an actual WASM function / system / transformation in this case. 

meri — 10:23 am
It’s like a DSL tho so yeah blurry

Zicklag — 10:24 am
If you start putting WASM module binaries in entities then it gets really blurry. 😉 🧐
But like I've thought of that before.
And that's kind of what you were saying with custom UIs.
An entity can contain or reference the code that is meant to be used to interact with it.

meri — 10:25 am
Yeah, I think that’s the main focus for me here
Cos that’s the tangible expression of user affordances

meri — 10:25 am
I’m really excited by this
So maybe part of the challenge for us is to see Roomy as a messaging app as a concrete instantiation of something much more genetic. And building those UI abstractions into the app so it’s progressively more modular

Zicklag — 10:28 am
Yeah, it's unfortunate, but most of the modern JS UI stuff isn't very modular, but I think web-components ( too many things named components 😩 ) do give us a way to do things a little more modularly.
For instance, though, our SvelteKit app has to be compiled and then everything is kind of "together" when it's published.
So making it extensible requires more work.
But it's definitely not impossible.
Obviously as soon as you allow, that, though, security gets much trickier.
We could run WASM modules relatively securely in the browser, but when it comes to custom UI, end-to-end encrypted is only so encrypted if custom UI plugins can read the screen.
But that's how browser extesions are, too, and there are valid uses for them, too.

meri — 10:30 am
A capabilities model would be helpful here

Zicklag — 10:30 am
Yeah, the capabilities model helps, but if you let it touch the DOM, there's no keeping it secure from the rest of the things in the UI I don't think. 
But there's another aspect here, too, which is that, while it's handy to have entities contain code, that code is going to be quite specific to a certain expected platform or API.
For example, the browser, and some specific way it has of interacting with the data in the browser. 
But a lot of the motivation for semantically defined components is so that different apps can have different UIs, for the same kind of data.

meri — 10:32 am
Could you have one iframe per unsafe UI component

Zicklag — 10:32 am
So that you could have a terminal app, or a Svelte app, or a React app, all rendering the same data a little different based on preferences, just like different mastodon / bluesky clients. 

Zicklag — 10:32 am
Yeah, iFrames are just memory hungry I think and they don't integrate well with UI layout a lot of the time.
But I do wonder if haivng the entity define it's own rendering would really kill the cohesiveness of the UX a lot of the time.
I think it'd be really handy for something like a universal entity explorer.
Something like: https://solscan.io/
Where you want to have all the data be inspectable, and different editor components could be registered for different component types, and entities could specify custom editor UIs for the explorer.

meri — 10:36 am
If the only unsafe code getting rendered is what’s output from the wasm module then the module could maybe sanitise it

Zicklag — 10:37 am
Yeah, if it doesn't run any JS, but then you've got quite a limit. Like I don't know that it'd be reasonable for Roomy to somehow just pull all of it's rendering code for channels, spaces, and messages from the entities themselves.
They're like nested layouts with lots of interaction with the router, login session, etc. 
🤔 Seems like it'd be a seriously major project, but it would be very interesting to experiment with a UI system that could manage something like that, though.

meri — 10:39 am
Yeah, this is very unbounded imagining rn. With iframes you could define a simple API for state mutations. Idk if there could be something similar with the sanitised unsafe direct injection - maybe it’s an embedded scripting thing or something, idk 

Zicklag — 10:39 am
I wonder if Shadow DOM does any kind of sandboxing.
Shadow DOM is something like an iFrame but doesn't create a whole other Navigator or something like that.

meri — 10:40 am
Oh interesting, I don’t know much about that

Zicklag — 10:40 am
That's what web-components are made out of I think.
https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
MDN Web Docs
Using shadow DOM - Web APIs | MDN
An important aspect of custom elements is encapsulation, because a custom element, by definition, is a piece of reusable functionality: it might be dropped into any web page and be expected to work. So it's important that code running in the page should not be able to accidentally break a custom element by modifying its internal implementation. ...
The MDN Web Docs logo, featuring a blue accent color, displayed on a solid black background.
OK, but taking a different thought on this
The presentation is a separate concept from transformation.
So whatever UI you use for presentation, maybe it can only make modifications to it through the pre-defined transformation interface.
So like, it is stuck to calling functions in an attached WASM module to make modifications.
So then different UI implmentations, like the web one, and the terminal one, which are necessarily quite different, still boil down to reading the current state → displaying the current state → possibly triggering WASM function calls that may modify the current state → repeat.

meri — 10:49 am (replying to the Shadow DOM link)
Just on this it seems like we get encapsulation but not really sandboxing / security guarantees

Zicklag — 10:57 am
Oh, another thought: maybe this isn't as much about allowing the entities to pick their own rendering and have that be necessarily secure, ( there's only a slight difference of perspective here ) but more like the components being used to determine which UIs are compatible with an entity, which is along the lines you were already thinking about with templates.
So the UIs become a bit more swapable.
And maybe not every app allows you to swap out the UIs, but there's a way for compatible apps to implement that kind of marketplace / swapability with components that use the same language / framework, etc.
So the Leaf render template system designed for web has swapable UI components for blog posts, chat archives, tweets, etc. in a non-interactive ( static site ) setting, and you can see which templates work with what component combinations on your entities, and then a terminal application written in Lua could have it's own marketplace of Lua scripts that can render UI for different components interactively. 

meri — 11:01 am
Right. It feels like a vetted marketplace of ui code is a lot more achievable in the near term

Zicklag — 11:02 am
And that "vetted"-ness can be dependent on the context.

meri — 11:02 am
Wasm component model again would help us a lot with potentially running arbitrary code in the future, where we have a particular virtual interface for dom manipulation 

Zicklag — 11:02 am
For instance, in the case of the Leaf renderer we can run the templates in very secure WASM modules with no threat to the server and enforce the capability model, so basically all the untrusted code is still safe, but in the browser there are different constraints.

meri — 11:03 am
Yep, it just depends on the execution environment

Zicklag — 11:05 am
( discussion on Leaf rendering, WASM modules, swappable UI, templates, perspective, components, iFrames, Shadow DOM ) Yeah, I think that's starting to settle in my head a little bit. Now we just need Roomy so we can click and drag relevant quotes from this conversation into a new wiki page to be pinned for reference during the near future until it can be refined. 😆 

meri — 11:05 am
Yes I will manually be copying and pasting this for my notes later

Zicklag — 11:07 am
Testing a discord life-hack I just made up of pinning the final message of an important conversation and prefixing it with a bunch of keywords. 

meri — 11:35 am
Solid concept I think! And yeah my summary I’m taking for myself is that swappable UI is really important for the long term goals where users are creatively empowered to design their own data-world-systems, kind of like a powerful CMS or a PKM, but critically with no limitations on extending these capabilities to multiplayer settings like group messaging

It’s also a bit of an emerging tech space with a lot of unknowns / complex factors around security and performance. We can start small though and introduce progressively more powerful capabilities as we prove viability and as the tech standards (like the component model) continue to advance
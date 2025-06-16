
# Weird
1. personalised calling card
2. independent identity provider
3. network of shared purpose
It seems that lightweight and simple ('calling card') is important for Weird - closer to Linktree than Notion? is it a collab tool?

Who is currently responsible?
What is the story with Iroh?
how many customers?
how much revenue so far?
what have you paid yourselves so far?
is there consistent growth? how much?
how close to broader launch?
what distribution channels do you have?
how much equity would you dilute? how would that work?
what are the costs?
where is Roomy at?
do you plan to do advertising, sales?
is there an intention to seek investment? when would that make sense? are there any debts currently?

who did you work with?
what was this grant?
https://skyseed.fund/
# Organ
- organ-pages frontend
- organ engine
- organ server
- organ r2 proxy

# Product direction
- Want to remain open to more 'B2B' use cases
	- Productivity tool, lightweight privacy-focused Notion/Obsidian competitor
		- Internal documentation, knowledge management
	- Custom user models is part of this
	- I think it may be a distinct product offering from ultra-lightweight Linktree-style 
- Interested in the 'garden' and the 'stream' - 
- Interested in developer platform / incentives scheme. developers can build tools on Organ, essentially apps, ways of interacting with data, that can create value and they share the incentives to grow userbase
	- modular base layer
	- can we for example have events calendar? publish to iCal, ATProto, and consume with... native app that can aggregate push notifications? my own personal fork of a custom built webapp for consuming my own subscriptions?
	- then we not only publish pages for others but also just for ourselves
- I feel attached to the branding vision for Organ and don't necessarily want to abandon that

fun/access + value => success

# Tech factors
- Wasm-renderer system is interesting - maybe something more modular though
- Render module as a 'system' that can apply to anything with the required components
- Intermediate representations? Rich Text Loro -> unstyled HTML -> injected into rich styled templates
- Can we define a 'Rich Text' component isomorphic to prosemirror documents? / is HTML a component? 

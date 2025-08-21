---
title: 'Using Keyhive in WASM to model capability groups'
slug: 'using-keyhive-in-wasm-to-model-capability-groups'
---

I wanted to see if I could try out _just_ the group management parts of Ink & Switch's [[Keyhive]] in a web app - that is, without worrying about sync, key agreement or encryption. I'm not going to explain what Keyhive is here but recommend the [Ink & Switch lab notebooks](https://www.inkandswitch.com/keyhive/) or [Brooklyn Zelenka's talk about it at Local-First Conf](https://www.youtube.com/watch?v=iLp2xBMud10).

Demo: [https://keyhive-delegation-demo.netlify.app/](https://keyhive-delegation-demo.netlify.app/ "https://keyhive-delegation-demo.netlify.app/") 

Code: [https://github.com/meri-leeworthy/keyhive/tree/wasm-demo](https://github.com/meri-leeworthy/keyhive/tree/wasm-demo "https://github.com/meri-leeworthy/keyhive/tree/wasm-demo")

Building this was also a cool way to consolidate my understanding of the delegations concept for modelling transitive capabilities - here's my summary of how adding works:

Firstly, Keyhive has four types of 'agents': **individual** (e.g. a phone), **group** (e.g. a person with multiple devices, or an organisation), **document** (e.g. a text file you want encrypted) and **active** (the 'self' running the code). You can kind of think of an agent as a black box with a secret key inside, which you will never see, but you can ask the agent to do things. When you create a **group** or a **document** agent, it:

1. creates an [[Ed25519]] key pair
2. delegates "admin" access to you (the active agent)
3. signs that delegation using its secret signing key
4. returns the signed delegation to you

A **signed delegation** has:

- a 'can' field which is just a string that's either "pull", "read", "write" or "admin"
- a delegate (e.g. my active agent identifier = public key)
- a signature (and signature issuer) so i can verify where it came from
- maybe a proof, which is another signed delegation

The more times a capability was sub-delegated, the bigger the delegation will recursively grow, but it always has the original group or document delegation at the bottom.

My thinking was that this could be, in theory, used to model permissions in a centralised database in place of a more typical Access Control List. The high level is that for any request to access a remote resource, instead of sending e.g. an access token, a client could send a signed delegation. An authorisation microservice sitting in front of a DB (for example) could then essentially just check that delegation to make sure:
1. The capability ("write", "admin" etc) and subject ID allows the action the user is trying to perform
2. The signatures are valid
3. That it hasn't heard of any updates to the auth graph that would revoke the claimed capability

My interest, and our shared interest at [[Muni Town]] working on [[Roomy]], is ultimately in using Keyhive for encryption as well, but I guess 1. there are so many complex concepts wrapped up in this project that it's been genuinely a major challenge to just wrap my head around how to use it, so breaking it down helps with that, and 2. being able to split it out and think about, for example, a more centralised approach, helps make incrementally adopting Keyhive in [[Roomy]] feel more feasible. 



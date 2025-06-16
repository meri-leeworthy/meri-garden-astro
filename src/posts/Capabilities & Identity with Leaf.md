---
title: Capabilities & Identity with Leaf
source: https://blog.muni.town/capabilities-and-identity-with-leaf/#frost-signatures2fa-for-keypairs
author:
  - "[[Muni Town]]"
published: 2024-11-26
created: 2025-05-26
description: Recently Christine Lemmer-Webber shared her 'recipe for the fediverse'. Let's see whether Leaf can meet her requirements.
tags:
  - clippings
---
Recently Christine Lemmer-Webber shared [this](https://social.coop/@cwebber/113528858061852192) on Mastodon:

> Here is your recipe for making the "Correct Fediverse IMO (TM)":

- Integrate object capabilities (ocaps)
- Content addressed storage!
- Petname system UX
- Better anti-spam / anti-harassment using OCapPub ideas
- Improved privacy with E2EE ("encrypted p2p" even a better goal)
- Decentralized identity on top of ~mutable CAS storage

In this post I'm going to explore how [Leaf](https://zicklag.katharos.group/blog/introducing-leaf-protocol/) stands up to these goals!

The most challenging point in this list is decentralized identity, so most of this article will be focused on how we plan to deal with identity for our first Leaf application, [Weird](https://weird.one/).

Note that some of this design is still a work-in-progress and not functional yet.

## Integrate ocaps

Leaf, because it builds on [Willow](https://willowprotocol.org/), uses Willow's [Meadowcap](https://willowprotocol.org/specs/meadowcap/index.html) capability system.

While Meadowcap isn't exactly an object capability (*ocap*) system - because its concept of resources to be accessed is separate from its concept of the identity that is doing the accessing - it is still a capability system with many of the same advantages.

These capabilities are designed to work even in a local-first, peer-to-peer scenario, so by default they cannot be revoked. Instead you are able to set an expiration time on the capability if desired.

Expiring capabilities are good for some use-cases, but sometimes you really want to be able to revoke access whenever you want, and for that there's a nifty trick we can use.

#### FROST Signatures

By using [FROST signatures](https://www.iroh.computer/blog/frost-threshold-signatures), we can grant a capability to a public key that requires multiple signatures in order to use. One signature can be done by our **Co-Signing Server**, and the other signature is done by the person who is given access.

The only caveat is that it requires you to be online in order to use the capability, because you must have access to the co-signing server. This is very reasonable because instant revocations in a p2p context are, as of yet, an unsolved issue in general.

Our co-signing server will follow an (eventually) standardized protocol that will probably be made a part of the family of Leaf specifications. When the user wants to take advantage of their capability, their app will use the co-signing protocol to get a signature from the server and combine it with their own signature to get access.

If you wish to revoke the user's access, all you have to do is tell the the co-signing server to stop co-signing for that capability!

That completes the otherwise-missing functionality, allowing you to issue revocable, online-only capabilities or expiring local-first capabilities.

## Content Addressed Storage!

This is something Leaf was designed for from the start; we're CAS for life ✊

Willow uses mutable metadata and allows for permanent deletion, but all of the actual data can be content addressed under-the-hood.

## Petname system UX

Petnames are something I need to look into more. I think that the contact book solution outlined below should be very easy for users to grasp in most cases, but the petnames solution might provide more benefits on top.

This is a good topic for a future investigation.

## Better anti-spam/harassment

I haven't fully investigated all of OCapPub's ideas, but from a quick skim I think Meadowcap should be suitable for enabling them.

## Improved privacy with E2EE (ideally p2p)

At rest encryption is something that Willow wants to implement that isn't finished yet. This isn't something we've done a lot of thinking about *yet*, other than making sure we leave the possibility open for the future.

Communication channels, though, are always end-to-end encrypted over-the-wire, and they work fully p2p. This allows you to create private subspaces that can be used for private communication between peers without storing any data on 3rd party servers that might listen in on your conversations.

This isn't perfect, because it requires that both of your computers to eventually be on at the same time, when you want to get messages from one device to other other, but you are still free to author messages, even when offline.

E2EE is also something that can be tested out with without direct support in Willow, but we won't know how well things can work without some experimentation.

## Decentralized identity

In Leaf, at its lowest level in the stack, the only concept of identities is cryptographic key pairs. You can build higher-level identity patterns on top of that.

Here's how we're currently thinking of setting up identity on top of Leaf for use in [Weird](https://weird.one/).

#### Keypairs are the core

Cryptographic keypairs are the closest thing we have in Leaf to a "permanent" digital identifier, and they are intended to last as long as absolutely possible, but they aren't assumed to last forever.

#### Domains are handles

Domains are used as handles. Using DNS records, we can resolve your handle to two important pieces of data:

- **Subspace ID:** This is the public key of your keypair, and also serves as the public identifier for your **subspace**, the store for all of your data.
- **Data Nodes:** This is a list of servers and/or peers that replicate your subspace data and share it with others. This tells others where to go if they want to load your posts, etc.

Your subspace will also contain a record that tells everybody what your DNS handle is, so that your DNS and subspace verify each-other.

While DNS is not perfect, it is the most convenient and reasonably useful way we've found to have public handles for the purpose of discovery. It also works well for an *initial* root of trust, even if not a *permanent* root of trust.

Personal contact books will help us deal with the non-permanence of domains and keypairs.

#### Contacts Books and the Escape Hatch for changing keys

Every user has a contact book containing a record for every user you've ever interacted with.

Let's talk about Alice and Bob.

Below we're going to talk a lot about things that Alice and Bob are "doing", but in reality most of the time their client app is automating 95% of it. We just need to talk about the technical details to understand how the protocol works.

When Alice and Bob interact for the first time, they automatically get added to each-other's contact books.

They can also add own notes or tags to their contacts, too. For instance Alice might add the "Colleague" tag to Bob. This helps Alice keep track what this digital ID called "Bob" means to her, personally.

Let's see what Bob's entry for Alice looks like:

- **Handle:** `alice.weird.one`
- **Subspace ID:** `xbicffkhd5jkcz4bzwwcmtfxtyttvfagipnxcq25et7pzuj4euta`
- **Display Name:** `Alice`
- **Avatar:** 👩🦰

Whenever Alice changes any of her profile info, Bob's contact book will get updated, but it will also keep the old info in a log so that Bob can see how it has changed over time.

This can be really helpful if, for example, Alice changed her display name and avatar. Bob could look back in the contact history to see if it was, in fact, the same Alice that he had talked to earlier, if he doesn't recognize her.

The contact book doesn't just help Bob keep track of changing names, but it also helps the system respond appropriately when Alice changes her handle or private key.

Let's check out four major scenarios.

Alice just purchased a cool new domain, `alice.me` and now she wants to use that as her handle. To do this, three things need to happen:

- She adds DNS records to make `alice.me` resolve to her subspace ID.  
	Note that her subspace ID hasn't changed.
- She removes her old DNS records for `alice.weird.one`.
- She updates her handle validation record in her subspace and changes it from `alice.weird.one` to `alice.me`.

Now what does this look like from Bob's perspective?

In Bob's contact book, he still has a record of what Alice's Subspace ID is. That means, when he wants to catch up on what Alice has been doing, he already knows what Subspace ID to go sync with, even though Alice's handle has changed.

He will be able to see immediately that Alice updated her handle verification record to point to the new `alice.me` domain, and then he can use DNS to resolve `alice.me` and make sure everything checks out.

Finally Bob updates Alice's entry in his contact book with her new handle.

- ****Handle:**** `alice.me` 🆕
- ****Subspace ID:**** `xbicffkhd5jkcz4bzwwcmtfxtyttvfagipnxcq25et7pzuj4euta`
- ****Display Name:**** `Alice`
- ****Avatar:**** 👩🦰

Changing handles is a piece of cake! 🍰

Alice is a power user and instead of letting the Weird server hold her private key, she's decided to use the Weird desktop app and hold the private key on her own laptop.

Now her laptop hard drive died and unfortunately she did not have a backup for her private key!

Thankfully, she has control over her DNS and the Weird server still has all of her content backed up. She can also log into her Weird account.

Because she kept her key locally, even the Weird server is not allowed to modify any of the content in her subspace, but it does still **have** the content that Alice gave it permission to host. This means that Alice can start the account recovery process.

The recovery process allows Alice to specify a new private key, and this time she lets the Weird server generate and store the key for her, so she doesn't have to worry about losing it again.

The Weird server then copies all of her old data to her new subspace using the newly generated private key. Now she just has to update her DNS records to point to the new subspace to finish the process.

Again, lets take a look at what has happened from Bob's perspective.

Firstly, ever since Alice lost her private key, nobody in the world can update her subspace data anymore, so Bob might notice that there's been no recent activity in Alice's subspace.

Second, Bob will see that Alice's handle, `alice.me` points to a **different** subspace now. Notice how he only knows it's different because he has her old subspace in his contact book.

The fact that Alice's handle now points to a new subspace will trigger a notice in Bob's app, indicating that the handle no longer matches his contact. At this point, as far as Bob is concerned, two things could have happened:

- Alice could have lost her public key.
- Alice's subscription for her domain, `alice.me`, might have expired, and now somebody else could have pointed it to their own subspace.

From the protocol alone, Bob has no way to know which situation is the correct one. He can't tell whether Alice lost her domain or lost her private key.

Bob will have to contact Alice out-of-band and figure out what has happened. The app will give him the choice to do one of the following:

- ****Trust the domain and update Alice's subspace in his contact book.****
- ****Trust the subspace and remove Alice's no-longer-valid handle from his contact book.**** In this case, we can continue to follow or chat with Alice, because we still know her subspace ID, but the `alice.me` handle won't be valid anymore. For convenience, Bob could register a **personal handle** for Alice, that can be used to mention her, even though he doesn't know her public handle anymore.
- ****Do nothing and wait to see if Alice eventually updates her subspace with a new handle to fix the verification error.****

After emailing Alice to ask what happened, he learns that she lost her laptop and had to recover her account, so he knows it's safe to trust the domain and update Alice's subspace in his contact book.

In conclusion, while losing your private key is not optimal, there is at least a recovery path, and a way for contacts to respond to the situation without blindly trusting either private keys, DNS, or the Weird server.

In this scenario, Alice allowed her domain subscription to expire. Since she still has access to her private key, though, she can still update her content, and all she has to do is change her handle like she did willingly in Scenario 1.

If Alice takes a while to add a new handle, Bob might see the warning in his app that `alice.me` is no longer valid for his contact book entry for Alice. He could reach out to Alice again by email or some other means to see what happened, or he could also just wait a while to see if Alice updates her handle.

In this case, Alice eventually gets to updating her handle verification record in her subspace and Bob's warning message goes away automatically.

There is one more scenario to consider, and that is where the hacker, Charlie, steals Alice's public key.

In this scenario, Charlie is now able to impersonate Alice, and he starts causing all sorts of trouble by writing content in Alice's name!

At some point Alice realizes what has happened, but now that Charlie has stolen her key, she doesn't have any higher authority over her subspace than Charlie does!

Alice's only choice in this scenario is to start an account recovery, similar to Scenario 2. She generates a new private key, copies her old data to the new subspace, and updates her handle to point to the new subspace, too.

Again, this will trigger a warning message for Bob, since Alice's handle now points to a new subspace.

When Bob contacts Alice this time, she tells him that somebody stole her key and for the last week has been writing posts in her name. Similar to scenario 2, Bob then updates his contact book to trust Alice's domain and her new subspace.

But now Bob still sees some of Charlies forged posts in his feed for Alice, so Bob uses a special feature of his contact book to record that Alice's old subspace should not be considered valid for any content written since the day that Charlie stole Alice's key.

Bob can clearly indicate in his contact book, and inform his Leaf client apps, that he doesn't trust anything that was signed using Alice's old key, if its timestamp is newer than a specific date.

**In conclusion**, contact books allow the users to inform the application where their trust lies, without a horrible user experience, combining the utility of cryptographic keys for decentralization, and DNS for discovery.

#### Optionally Get Rid of DNS - 100% Decentralized Identity

What if we didn't want to use DNS at all? DNS isn't 100% decentralized, so it'd be useful to have an alternative. Enter [pkarr](https://github.com/Pubky/pkarr).

pkarr is a a way to resolve public keys to key-value metadata, very similar to DNS TXT records. Instead of using DNS servers it uses BitTorrent's [Mainline DHT](https://en.wikipedia.org/wiki/Mainline_DHT) to resolve records, making it 100% decentralized.

pkarr doesn't give us nice handles like DNS. Friendly names will always require some level of centralization or trust. What pkarr gives us is a way to resolve Leaf subspace IDs to the servers or nodes that store the subspace data.

This would allow you to, for example, generate links or QR codes that you can use to add a user to your contact book, *without* needing a DNS handle. You could then continue by adding a personal handle to your contact book for that user

The user could even set a "preferred handle" field of some sort in their profile that automatically sets a personal handle when you add them to your contact book, assuming you don't already have somebody with that handle in your contact book.

Getting rid of DNS handles and using personal handles would still allow you to build a rich social graph and get nearly all of the features one would expect out of a social app. The only caveat would be that public links to the user's posts, etc., would need to contain the entire subspace ID, because there is no short DNS handle that can be used globally.

#### ==FROST signatures - 2FA for keypairs==

==What if you would like a middle-ground between storing your private key on the Weird server, and storing it on your own device. FROST signatures are back again, and this time we use them almost like a 2 Factor Authentication mechanism.==

This excellent blog post by the Iroh team is where I learned of this idea: [Lose your device, but keep your keys](https://www.iroh.computer/blog/frost-threshold-signatures).

==FROST allows us to separate your private key into three different private keys, and in order to do anything with it, you must get a signature from 2 of them.==

==The idea is that we put:==

- ==Key 1 on the Weird server==
- ==Key 2 on your laptop.==
- ==Key 3 on your phone.==

==The Weird server acts as a co-signing server, just like the revocable capabilities use-case. When you need to write to your subspace, your desktop or mobile app will sign it with your key and then ask the weird server to co-sign.==

That works fine, as long as you are online, but what if you're offline? In that case you can use your *phone* as a co-signer using wifi, bluetooth, or USB.

==If any of your three keys is lost, then the remaining two keys are able to generate a fresh set of 3 keys that you can put on all your devices again. I think a lot of process can be automated to give a good user experience, using things like QR codes to help facilitate setup on smartphones.==

==This is similar to the typical 2FA workflows that existing web services have, but with an important distinction: the server is not able to impersonate the user. Using the laptop and phone keys also allows the user to revoke the server's key completely, possibly to migrate to a new server.==

==I think that a carefully designed user-experience could make this a much more secure and reliable workflow, approachable for non-techy people.==

==Most users will start off just by signing into Weird and having the Weird server store the private key, so the user experience is exactly the same as a traditional web app.==

==Enabling "2FA" is something that could be done later if desired, but it is worth noting that you have to trust the Weird server to delete its old master key after generating the FROST keys. Thus, for security nerds who know what they are doing, they could also generate the FROST keys when they first sign-up, so that they never have to trust the server.==

---

the end
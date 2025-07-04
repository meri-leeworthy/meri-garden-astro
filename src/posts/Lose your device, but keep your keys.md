---
title: 'iroh'
slug: 'lose-your-device-but-keep-your-keys'
source: 'https://www.iroh.computer/blog/frost-threshold-signatures'
author:
- '''Rüdiger Klaehn'''
published: '2024-10-21'
created: '2025-05-26'
description: 'FROST threshold signatures - or how to keep your private keys safe even if a device gets lost or compromised'
tags:
- '''clippings'''
---

[Blog Index](https://www.iroh.computer/blog)

## Ed keys everywhere

In [iroh](https://github.com/n0-computer/iroh) we are using [Ed25519](https://en.wikipedia.org/wiki/EdDSA) keypairs *a lot*. Nodes are identified by ed keypairs, documents are identified by keypairs, also authors, namespaces etc. A gossip topic is an arbitrary 32 byte blob, which conveniently fits an ed public key.

With [pkarr](https://pkarr.org/) we have a great mechanism to publish information about keypairs. We are running a dns server, and we can also use the bittorrent [mainline](https://en.wikipedia.org/wiki/Mainline_DHT) DHT for a fully peer to peer mechanism to publish and resolve pkarr packets.

~~Other recent protocols such as [nostr](https://nostr.org/) are also using ed25519 keypairs.~~

**Correction**: Nostr does not use Ed25519 keypairs but Secp256k1. Fortunately there is a FROST implementation for secp256k1 as well. [frost-secp256k1](https://crates.io/crates/frost-secp256k1).

## How to keep the keys safe

A problem that frequently comes up when using a keypair to control access to an identity or a resource is how to keep the private key safe.

Some keypairs are ephemeral and don't need to be safeguarded much.

Some will have significant security implications from the start (e.g. a keypair associated with access to a crypto wallet).

And some will initially be of low value, but might grow in value over time (e.g. a social media account).

In most cases, there is a constant conflict between the need to keep the keys safe and the need to constantly access the private key for signing messages.

## Existing solutions

### Local file system

The default way to store a private key is to just store it in a hidden directory in your local file system. While this is not extremely secure, it is still highly preferable to not using encryption at all. In many scenarios, e.g. device loss or theft, this is perfectly fine for low to medium value keypairs.

### Secure key storage

Most modern hardware supports secure storage for private keys. However, access to such secure storage locations is highly platform dependent. It also only works for a limited set of cryptographic primitives, which might not include EdDSA. More fundamentally, while secure storage makes the key relatively inaccessible, it does not protect against key loss. It also does not provide a mechanism for revocation.

### Delegation schemes

With the tools of public key cryptography you can come up with delegation schemes where a rarely used master key is used to delegate to a more frequently used keypair that can be revoked using the master key. This is a very complex topic that would require its own series of blog posts.

## Threshold signatures

I was vaguely aware that something like threshold signatures exist. This is - very roughly speaking - a scheme where you split the private key into multiple parts called *shares*, and need a certain number of these shares to sign a message. Since the shares never have to be in one place, this provides safety in case a single share gets compromised or lost.

What I did not know however is that there exist threshold signature schemes such as FROST that work with Ed25519 such that generated signatures are *fully compatible* with normal Ed25519 signatures. So you can sign a message with a threshold signature scheme and then validate the signature as usual using the ed public key.

This means that such threshold signatures are compatible with existing infrastructure such as [bep-0044](https://www.bittorrent.org/beps/bep_0044.html) in the mainline DHT, [pkarr](https://pkarr.org/), and [nostr](https://nostr.org/).

They are also compatible with all the other places in iroh where we are using ed keypairs.

Compared to Shamir Secret Sharing, the FROST scheme does not require the shares to be in one place to sign.

## Creating key shares

The reason I got interested in threshold signatures is the backwards compatibility.

There are various ways to create key shares.

One I find interesting in particular is the ability to just take an *existing* ed private key and generate key shares from it. This way the scheme is not just compatible with Ed25519 signatures in general, but even with existing keypairs. So for example you can use this algorithm for an existing node id, document, or [nostr](https://nostr.org/) account. Here you start with the keypair in one place and need to trust the security of that device, so you implicitly have a *trusted dealer*. You also need a secure way to transfer the shares to the target locations.

As a second option you can create the keypair and then immediately split it, again requiring a place that is considered secure at generation time and a way to securely transfer the shares.

And as the most advanced option a DKG (Distributed Key Generation) scheme that allows generating the key shares directly on the target devices without ever having them all in one place.

The advanced key share generation schemes are certainly interesting, but given that we are starting off with ed private keys in hidden directories, even the more simple approaches are fine for an initial exploration.

## Exploring the frost\_ed25519 crate

The FROST scheme is described in the paper [FROST: Flexible Round-Optimized Schnorr Threshold Signatures](https://eprint.iacr.org/2020/852.pdf). There is a crate implementing the scheme, from the [ZCash foundation](https://zfnd.org/), that is pretty approachable.

My experiment can be found [here](https://github.com/n0-computer/iroh-examples/tree/main/frosty).

### Local operations - split, reconstruct, re-split

I implemented a little command line tool to split existing iroh keys into key shares.

I also implemented a way to reconstruct a signing key from a sufficient number of key shares and to use that key to sign a message. Note that you can't reconstruct the ed private key, but just a key that can be used for signing.

And last but not least a way to reconstruct a signing key and then immediately create a new split without persisting the regenerated key.

This is all easy enough, but if the key shares are all on the same file system the scheme just adds complexity but no additional security.

So we need a way to use the key shares from multiple machines that can be physically separated.

Iroh is a library that can get you a fast and encrypted connection between any two devices anywhere in the world. So this should be easy, right? Let's see.

### Remote operations - sign and cosign

For using the key shares, there are two possible roles. The *signer* actively wants to sign a message, e.g. to publish it somewhere, but does not have the entire private key. Depending on the exact parameters for the key shares, it needs one or more co-signers.

The *co-signer* is a little daemon that has one or more key share for which it can co-sign. For this exploration it will just wait for incoming co-sign requests and sign them.

## The protocol

The protocol looks like this

![frost protocol diagram](https://www.iroh.computer/blog/frost-threshold-signatures/frost_protocol_light.svg)
- The signer sends a request to all configured co-signers to sign a message for a 32 byte public key.
- Each co-signer that has a key share for the requested public key answers with a commitment and remembers a corresponding nonce.
- The signer waits until it gets the required number of commitments. It then creates a signing package from all the commitments and the message and sends that to all co-signers that answered in the first round.
- all co-signers sign the signing package and return a signature share.
- as soon as the signer has enough signing shares, it can create a signature.
- optionally we can validate that the signature is correct using the known ed public key.

## Co-Signer

The co-signer in this scheme acts as a server, so it needs to locally store its iroh keypair to have a stable node id. It also needs to publish discovery information. It does not, however, have to look up discovery information since it does not call other nodes.

So this is how the endpoint setup looks like:

Once the endpoint is created, the co-signer needs to run a normal accept loop where it just handles incoming co-sign requests

Handling a request is described below.

The code contains a lot of boilerplate for serialization and deserialization, but other than that is pretty straightforward. The fact that the [frost\_ed25519](https://docs.rs/frost-ed25519/latest/frost_ed25519/) crate has nice package structs for the different steps including serialization helped a lot.

One thing to be aware of is that the request handler has to wait for the other side to close the connection, otherwise the last packet sent from our side might get lost. For a detailed explanation, look at our blog post [Closing a QUIC Connection](https://www.iroh.computer/blog/closing-a-quic-connection).

```rust
let connection = incoming.await?;
let remote_node_id = iroh_net::endpoint::get_remote_node_id(&connection)?;
info!("Incoming connection from {}", remote_node_id,);
let (mut send, mut recv) = connection.accept_bi().await?;
let key_bytes = read_exact_bytes(&mut recv).await?;
let key = PublicKey::from_bytes(&key_bytes)?;
info!("Received request to co-sign for key {}", key);
let secret_share_path = data_path.join(format!("{}.secret", key));
let secret_share = SecretShare::deserialize(&std::fs::read(&secret_share_path)?)?;
let key_package = KeyPackage::try_from(secret_share)?;
info!("Got fragment, creating commitment");
let (nonces, commitments) =
    frost::round1::commit(key_package.signing_share(), &mut thread_rng());
info!("Sending identifier");
send.write_all(&key_package.identifier().serialize()).await?;
info!("Sending commitment");
write_lp(&mut send, &commitments.serialize()?).await?;
info!("Waiting for signing package");
let signing_package = SigningPackage::deserialize(&read_lp(&mut recv).await?)?;
info!("Received signing package, creating signature share");
let signature_share = frost::round2::sign(&signing_package, &nonces, &key_package)?;
info!("Sending signature share");
send.write_all(&signature_share.serialize()).await?;
info!("Finished handling cosign request");
// wait for the connection to close.
// if we don't do this, we might lose the last message in transit
connection.closed().await;
```

To run the co-sign daemon, you just need a directory containing one or more key shares you want it to co-sign, in the format generated by the split or re-split commands.

## Signer

In a real use case this would be embedded in an application, but for this exploration we will do it as a cli utility as well.

The signer in this scheme acts as client. It does not need a stable node id, but it needs the ability to look up the addresses of other nodes. So the endpoint setup looks like this:

For signing, it first calls out to all configured co-signers and sends them a co-sign request for the key to be signed for. Then it waits until it has a sufficient number of valid responses.

Once it has a sufficient number of co-signers, it creates a commitments map from the received commitments and adds a commitment from the local key share.

From this point on it is assumed that the co-signers will be reachable. If a co-signer would drop out after this point, you would have to repeat the entire signing process.

In the next step, the signer creates a signing package, sends it to all the co-signers that answered in the first round, and then collects the signature shares. It also generates a local signature share from the local key share.

We keep the connections to the co-signers open between the first and second round by just keeping the SendStream and RecvStream around. Keeping the SendStream or RecvStream around keeps the connection alive despite the actual Connection object being dropped.

As soon as all requested signature shares arrive, it can finally create the signature by aggregating the signing shares. For this step we also need the `PublicKeyPackage` which is identical for all shares and contains no secret information.

Once we finally have the signature, we can quickly check if it is actually a correct signature for the private key. In a real application we would now take the signed data and send it somewhere, e.g. to pkarr. But for this exploration we just print it.

Usage:

## Possible usage

So now we have a way to split an ed keypair into multiple key shares, store these shares on multiple devices, and sign a message using a co-signer.

How would we use this to have good usabilty when publishing to e.g. pkarr or nostr while still keeping the key safe?

Here is one of many possible schemes:

One key share `a` will be on the device that is actively publishing. One key share `b` would be on a remote server, either on a computer owned by the user or on a server operated by a service provider. And the third share `c` would be safely stored by the user, e.g. on a USB stick.

![frost protocol diagram](https://www.iroh.computer/blog/frost-threshold-signatures/frost_usage_light.svg)

The user device would first do a co-sign request, which would be answered by the co-sign server. Then it would publish the signed message.

The co-sign server has a key share `b` for the key, but that alone is not sufficient to sign messages for the key. The device itself has a key share `a` for the key, but this is also insufficient to sign for the key. So device loss or even device compromise is insufficient to gain access to publishing to the key.

## Recovery on key loss

If the user device is lost or compromised, the user can simply disable publishing to the key by stopping the co-sign server. Then regenerate the signing key on a secure device, create a new set of three key shares `a2`, `b2`, `c2`, destroy the old two key shares `b` and `c`, and start from scratch with a similar setup as before.

The key share `a` on the lost device is completely useless without either `b` or `c`.

If a higher level of security is required, you could change the minimum required number of shares to 3 and run multiple co-sign servers on separate devices.

Note that if you want to publish from multiple devices, you would still use the same key share `a` on all those devices instead of creating an additional key share. That way you avoid the key becoming compromised when multiple devices get lost or stolen, e.g. when your laptop and phone get stolen at the same time.

## Automation

This entire process would be automated to provide a smooth user experience, for both publishing and decomissioning a device. A user could go through many devices without ever having to change a public key.

Iroh is a dial-any-device networking library that just works. Compose from an ecosystem of ready-made protocols to get the features you need, or go fully custom on a clean abstraction over dumb pipes. Iroh is open source, and already running in production on hundreds of thousands of devices.  
To get started, take a look at our [docs](https://iroh.computer/docs), dive directly into [the code](https://github.com/n0-computer/iroh), or chat with us in our [discord channel](https://iroh.computer/discord).
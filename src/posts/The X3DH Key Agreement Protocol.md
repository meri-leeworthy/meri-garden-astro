---
aliases:
  - X3DH
---
> This document describes the “X3DH” (or “Extended Triple [[Diffie-Hellman key exchange|Diffie-Hellman]]”) key agreement protocol. X3DH establishes a shared secret key between two parties who mutually authenticate each other based on public keys. X3DH provides ==forward secrecy and cryptographic deniability==. X3DH is ==designed for asynchronous settings== where one user (“Bob”) is offline but has published some information to a server. Another user (“Alice”) wants to use that information to send encrypted data to Bob, and also establish a shared secret key for future communication.

Builds on [[Triple Diffie-Hellman]]

All keys have public and corresponding private part
Alice and Bob both have long term *identity keys* $IK_A$, $IK_B$ 
Bob has a signed 'prekey' $SPK_B$ which he changes periodically
He has a set of one-time 'prekeys' $OPK_B$ which are each used up in a single X3DH run
(Prekeys are just keys provided in advance of the protocol run)
During each run Alice generates a new ephemeral key pair $EK_A$ 

> X3DH has three phases: 
1. Bob publishes his identity key and prekeys to a server. 
2. Alice fetches a “prekey bundle” from the server, and uses it to send an initial message to Bob. 
3. Bob receives and processes Alice’s initial message

**Bob publishes to the server**:
- identity key $IK_B$
- signed prekey $SPK_B$
- prekey signature Sig($IK_B$, Encode($SPK_B$))
- Set of one-time prekeys $OPK_B$

Alice contacts the server and receives
- $IK_B$
- $SPK_B$
- Sig($IK_B$, Encode($SPK_B$))
- $OPK_B$ (if they aren't all deleted already)
Server deletes used one-time prekeys once they are sent

Alice verifies prekey signature, showing that the signed prekey is authentic to the identity key

Alice generates ephemeral key $EK_A$

If no 


![](../public/f48c68c359ae9fd431519ea5564f45f0.pdf)

See also [[Leveraging Smart Contracts for Secure and Asynchronous Group Key Exchange Without Trusted Third Party]]


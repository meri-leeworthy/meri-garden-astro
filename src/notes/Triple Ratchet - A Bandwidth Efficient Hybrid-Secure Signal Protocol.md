---
title: '"Triple Ratchet: A Bandwidth Efficient Hybrid-Secure Signal Protocol"'
slug: 'triple-ratchet-a-bandwidth-efficient-hybrid-secure-signal-protocol'
source: 'https://eprint.iacr.org/2025/078'
author:
- '"[[Yevgeniy Dodis]]"'
- '"[[Daniel Jost]]"'
- '"[[Shuichi Katsumata]]"'
- '"[[Thomas Prest]]"'
- '"[[Rolfe Schmidt]]"'
published: '2025-01-18'
created: '2025-07-03'
description: ''
tags:
- 'clippings'
---

[[2025-078.pdf]]

#### Paper 2025/078

### Triple Ratchet: A Bandwidth Efficient Hybrid-Secure Signal Protocol

##### Abstract

Secure Messaging apps have seen growing adoption, and are used by billions of people daily. However, due to imminent threat of a "Harvest Now, Decrypt Later" attack, secure messaging providers must react know in order to make their protocols $hybrid-secure$ : at least as secure as before, but now also post-quantum (PQ) secure. Since many of these apps are internally based on the famous Signal's Double-Ratchet (DR) protocol, making Signal hybrid-secure is of great importance. In fact, Signal and Apple already put in production various Signal-based variants with certain levels of hybrid security: PQXDH (only on the initial handshake), and PQ3 (on the entire protocol), by adding a $PQ-ratchet$ to the DR protocol. Unfortunately, due to the large communication overheads of the $Kyber$ scheme used by PQ3, real-world PQ3 performs this PQ-ratchet approximately every 50 messages. As we observe, the effectiveness of this amortization, while reasonable in the best-case communication scenario, quickly deteriorates in other still realistic scenarios; causing $many consecutive$ (rather than $1$ in $50$ ) re-transmissions of the same $Kyber$ public keys and ciphertexts (of combined size 2272 bytes!). In this work we design a new Signal-based, hybrid-secure secure messaging protocol, which significantly reduces the communication complexity of PQ3. We call our protocol "the $Triple Ratchet$ " (TR) protocol. First, TR uses $em erasure codes$ to make the communication inside the PQ-ratchet provably balanced. This results in much better $worst-case$ communication guarantees of TR, as compared to PQ3. Second, we design a novel "variant" of $Kyber$ , called $Katana$ , with significantly smaller combined length of ciphertext and public key (which is the relevant efficiency measure for "PQ-secure ratchets"). For 192 bits of security, $Katana$ improves this key efficiency measure by over 37%: from 2272 to 1416 bytes. In doing so, we identify a critical security flaw in prior suggestions to optimize communication complexity of lattice-based PQ-ratchets, and fix this flaw with a novel proof relying on the recently introduced hint MLWE assumption. During the development of this work we have been in discussion with the Signal team, and they are actively evaluating bringing a variant of it into production in a future iteration of the Signal protocol.

**BibTeX**

```
@misc{cryptoeprint:2025/078,
      author = {Yevgeniy Dodis and Daniel Jost and Shuichi Katsumata and Thomas Prest and Rolfe Schmidt},
      title = {Triple Ratchet: A Bandwidth Efficient Hybrid-Secure Signal Protocol},
      howpublished = {Cryptology {ePrint} Archive, Paper 2025/078},
      year = {2025},
      url = {https://eprint.iacr.org/2025/078}
}
```
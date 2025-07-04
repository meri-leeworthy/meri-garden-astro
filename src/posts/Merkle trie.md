---
title: 'Merkle trie'
slug: 'merkle-trie'
---

[[Analysis of Indexing Structures for Immutable Data]]

> While straightforward solutions exist \[for [[Set reconciliation]]], such as exchanging [[Bloom filter]]s or hashes of the items, they incur 𝑂 (|𝐴| + |𝐵|) communication and computation costs. The costs can be improved to logarithmic by hashing the sets into **Merkle tries** [[Analysis of Indexing Structures for Immutable Data|39]], where a trie node on depth 𝑖 is the hash of a 1/2𝑖 -fraction of the set. Alice and Bob traverse and compare their tries, only descending into a sub-trie (subset) if their roots (hashes) differ. However, the costs are still dependent on |𝐴|, |𝐵|, and now takes 𝑂 (log |𝐴| + log |𝐵|) round trips.
[[Practical Rateless Set Reconciliation]] (2024)

Michael Mitzenmacher and Rasmus Pagh. 2018. Simple multi-party set reconciliation. Distributed Comput. 31, 6 (2018), 441–453. https://doi.org/10.1007/S00446-017-0316-0 

[What's the difference?: efficient set reconciliation without prior context](https://dl.acm.org/doi/10.1145/2043164.2018462) (2011)

[Set reconciliation with nearly optimal communication complexity](https://ieeexplore.ieee.org/document/1226606) (2003)

> The naive approach to solving this problem requires communication proportional to the size of the set one party holds. For example, some applications send the entire set while other applications have parties ==exchange the hashes of their items== or ==a Bloom filter of their sets== (the [[Bloom filter]]’s size is proportional to the set size). A node then requests the items it is missing. All these solutions induce high overhead, especially when nodes have large, overlapping sets. This is a common scenario in distributed applications, such as nodes in a blockchain network synchronizing transactions or account balances, social media servers synchronizing users’ posts, or a name system synchronizing certificates or revocation lists [33]. An emerging alternative solution to the state synchronization problem is set reconciliation. It abstracts the application’s state as a set and then uses a reconciliation protocol to synchronize replicas. Crucially, the overhead is determined by the set difference size rather than the set size, allowing support for applications with very large states. ...
> An emerging alternative solution to the state synchronization problem is set reconciliation. It abstracts the application’s state as a set and then uses a reconciliation protocol to synchronize replicas. Crucially, the overhead is determined by the set difference size rather than the set size, allowing support for applications with very large states.
> [[Practical Rateless Set Reconciliation]] Introduction

Sending hashes or bloom filters means you need to calculate the hash of every object and maybe check it against the bloom filter... tho at least hashes just need to be calculated once? or is it different for different size bloom filters?

[[Merkle Search Tree]]
[[Merkle trie]]

# formal definition

> We first formally define the set reconciliation problem [ 8, 19 ]. Let 𝐴 and 𝐵 be two sets containing items (bit strings) of the same length ℓ. 𝐴 and 𝐵 are stored by two distinct parties, Alice and Bob. They want to efficiently compute the symmetric difference of 𝐴 and 𝐵, i.e., (𝐴 ∪ 𝐵) \ (𝐴 ∩ 𝐵), denoted as 𝐴 △ 𝐵. By convention [ 8], we assume that only one of the parties, Bob, wants to compute 𝐴 △ 𝐵 because he can send the result to Alice afterward if needed.
> [[Practical Rateless Set Reconciliation]] 2 motivation
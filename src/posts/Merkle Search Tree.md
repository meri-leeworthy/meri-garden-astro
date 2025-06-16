A **Merkle Search Tree** is a hybrid of:

- **Merkle tree** (cryptographically linked data via hashes)
- **Binary search tree** or **trie** (for efficient key lookup)

Each node in an MST stores a hash of its children (like in a [[Merkle tree]]), but data is also ordered by key (like a [[Search tree]]). This means:

- You can prove inclusion/exclusion of a key efficiently.
- You can compare and sync subsets of the tree quickly.

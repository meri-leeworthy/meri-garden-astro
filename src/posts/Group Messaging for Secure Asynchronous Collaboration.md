---
aliases:
  - Causal TreeKEM
---
**Abstract**
End-to-end encrypted applications improve users’ privacy by making their data unread- able to anyone besides their intended recipients. In particular, their data is unreadable to application servers. Although end-to-end encryption is currently deployed only for messaging apps, recent academic work shows that it is possible to create end-to-end encrypted asynchronous collaborative applications, like Google Docs but without a trusted server, by layering Conflict-free Replicated Data Types (CRDTs) on top of a secure group messaging protocol. However, existing secure group messaging protocols are inadequate for CRDT-based collaboration, and they do not minimize the trusted computing base as much as possible. 

This dissertation investigates secure group messaging for the purpose of supporting end-to-end encrypted asynchronous collaborative applications. Its research contributions are threefold: a novel taxonomy of existing secure group messaging protocols; Causal TreeKEM, a new protocol for managing shared encryption keys that provides strong security guarantees while supporting asynchronous group messaging without a central server; and the design of a secure group messaging protocol meeting the requirements of CRDT-based collaboration. The taxonomy improves on previous work surveying secure group messaging by dividing protocols into largely interchangeable parts instead of evaluating whole protocols, allowing one to easily create new protocols by combining parts. ==Causal TreeKEM improves on [[TreeKEM]], a recent protocol, by eliminating the need for a linear order on state changes, such as adding or removing users.== Finally, the secure group messaging protocol is unique in that it delivers messages in a consistent causal order to all users even in the face of malicious servers or group members, supports dynamic groups, and does not require a single central server. 

In total, this dissertation represents an important step towards developing end-to-end encrypted asynchronous collaborative applications with a minimal trusted computing base.

---


> In the other direction, _[Causal TreeKEM](Group Messaging for Secure Asynchronous Collaboration)_ modifies TreeKEM to require only causally ordered message delivery (see Section 5.1), at the cost of even ==weaker forward secrecy== [41 , §4]. Like our work, ==Causal TreeKEM describes how to handle dynamic groups in the decentralized setting, although the protocol description is largely informal. Also, its post-compromise security is weaker than for our DCGKA protocol: after multiple compromises, all compromised group members must send PCS updates in _sequence_, while our protocol allows all but the last update to be concurrent.==

![](../public/005182a79698e9a90a5505b3b3199e9c.pdf)
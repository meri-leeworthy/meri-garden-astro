---
aliases:
  - HG
---
Formal security notion for [[Secure group messaging]] 

introduced in [[Modular Design of Secure Group Messaging Protocols and the Security of MLS]]

'like a blueprint that lets you trace the lineage of a group' - lets you see how metadata might leak

NotebookLM:
Here are the papers that use history graphs and where they are described:

- [[How to Hide MetaData in MLS-Like Secure Group Messaging - Simple, Modular, and Post-Quantum]] uses history graphs to represent the evolution of a group in a continuous group key agreement (CGKA) protocol
	- It is described in Appendix B.1.3
	- History graphs are labeled directed graphs with commit and proposal nodes
	- Each node has attributes like orig (originating party), par (parent node), and stat (status)
	- Commit nodes have additional attributes like gid (group identifier), epoch, prop (proposals), mem (member list), vcom (commitments), key, and more
	- This paper also mentions that its definition of history graphs deviates from previous definitions by using the semantics of a transcript to identify nodes
- [[Continuous Group Key Agreement with Active Security]] also uses history graphs as a tool for analyzing CGKA security
	- These graphs are described as annotated trees where each node represents a group state, including the group key
	- Annotations on nodes provide information about group operations (like adding or removing users) and events like the use of bad randomness
	- The paper emphasizes that in an active security setting, the history graph is actually a forest because of adversarial injections
	- Section 4 discusses the history graph in detail, including a visual representation in Figure 1
- [[Security Analysis and Improvements for the IETF MLS Standard for Group Messaging]] uses history graphs to define a safety predicate called tkm which is used to analyze the security of the TreeKEM protocol
	- The history graph is described in Section 5.2 and is used to construct a key graph that captures the relationships between different secret keys in the TreeKEM protocol


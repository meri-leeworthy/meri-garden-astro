---
type: paper
year: "2021"
aliases:
  - Chained CmPKE
---
Lower bandwidth alternative [[Continuous Group Key Agreement|CGKA]] to [[TreeKEM]]

Proven with [[Universal composability]]
# Paper
## Abstract
[[Continuous Group Key Agreement]]s (CGKAs) are a class of protocols that can provide strong security guarantees to secure group messaging protocols such as [[Signal]] and [[Messaging Layer Security|MLS]]. Protection against device compromise is provided by commit messages: at a regular rate, each group member may refresh their key material by uploading a commit message, which is then downloaded and processed by all the other members. In practice, ==propagating commit messages dominates the bandwidth consumption of existing CGKAs==. We propose **Chained CmPKE**, a CGKA with an asymmetric bandwidth cost: in a group of 𝑁 members, a commit message costs 𝑂 (𝑁 ) to upload and 𝑂 (1) to download, for a total bandwidth cost of 𝑂 (𝑁 ). In contrast, TreeKEM [19 , 24 , 76 ] costs Ω(log 𝑁 ) in both directions, for a total cost Ω(𝑁 log 𝑁 ). Our protocol relies on ==generic primitives, and is therefore readily post-quantum==. We go one step further and propose post-quantum primitives that are tailored to Chained CmPKE, which allows us to cut the growth rate of uploaded commit messages by two or three orders of magnitude compared to naive instantiations. Finally, we realize a software implementation of Chained CmPKE. Our experiments show that even for groups with a size as large as 𝑁 = 210, commit messages can be computed and processed in less than 100 ms.
# PDF
![](../public/54d07a8b89528232e4a238753282735f.pdf)
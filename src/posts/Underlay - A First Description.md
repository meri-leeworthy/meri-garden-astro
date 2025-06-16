---
type: essay
author:
  - Danny Hillis
  - Samuel Klein
  - Travis Rich
uri: https://notes.knowledgefutures.org/pub/h67iji6d/release/1
---
The Underlay is a global, distributed graph of public knowledge. Initial hosts will include universities and individuals, such that no single group controls the content. This is an attempt to replicate the richness of private knowledge graphs in a public, decentralized manner.

## Rationale

While knowledge production is accelerating, systems for sharing and assessing knowledge are falling behind[1](https://underlay.mit.edu/#fn1). Powerful collections of machine-readable knowledge are growing in importance each year, but most are privately owned (e.g., Scopus, Google’s _Knowledge Graph_, _Wolfram Alpha_). The Underlay aims to secure such a collection as a public resource. It also gives chains of provenance a central place in its data model, to help tease out bias or error that can appear at different layers of assumption, synthesis, and evaluation.

## Description

The Underlay aggregates statements and reported observations, along with citations of who made and who published them. For example, it would not contain the bare assertion that "Sudan’s population was 39M in 2008", but rather that "Sudan’s population was 'provisionally' 39M in 2008, according to the UN’s statistics division in 2011[2](https://underlay.mit.edu/#fn2), referencing Sudan’s national census, as reported by its Central Bureau of Statistics, and as contested by the Southern People's Liberation Movement.[3](https://underlay.mit.edu/#fn3)" It would also include estimates from different sources and years. This information, stored in a language-independent and machine-readable form, represents relationships between these entities: Sudan, the UN, the Sudanese statistics bureau, the liberation movement, Sudan’s population and census, and the relevant publication dates. The Underlay will also store information about how these statements were recorded.

While much knowledge is uncontested, the Underlay stores contested or contradictory statements, along with detailed context and chains of provenance. Evaluations of fidelity or accuracy can make use of this information, and can themselves be stored in other layers. The focus on provenance and iteration supports refinement, revision, and replication of observations. The structured granularity enables alignment of unrelated datasets, bulk analysis, and machine learning.

## Objective

The Underlay team is developing the protocols, first instances, and elements of this knowledge graph. Information will be added at first by building focused, interpretive overlays -- knowledge curated for a particular audience. Overlays could for instance be journals, maps, or timelines, incorporating many sources of more granular information into a single lens[4](https://underlay.mit.edu/#fn4).

At first, every full node will maintain a copy of the Underlay, with copies stored on distributed filesystems. We are seeking [partners](mailto:underlay@media.mit.edu) and funders to help support the initial stage of this work, and plan to form a small foundation to oversee governance and protocol maintenance.

## Phase 1

A proof-of-concept with two different communities of active users, supporting overlays for technical papers building on past research: a prior-art archive and a repository of academic papers[5](https://underlay.mit.edu/#fn5). We are recruiting companies and universities to contribute collections for this work. We will work with other protocol layers to define the initial federation model, and decentralize the underlay with IPFS. Developing as part of MIT's new [Knowledge Futures Group](http://kfg.mit.edu) (2018)

## Phase 2

A network of Underlay nodes at different institutions, demonstrating local vs global updating. An initial pipeline for extracting structured knowledge and sources from documents to populate lower layers. Tools to sync with existing structured repositories such as Wikidata, DBpedia, Freebase, and SHARE. And tools to visualize what is in the Underlay and how it is used.

---

[[1]](https://underlay.mit.edu/#sup1) The prevalence of false beliefs, incomplete information, distrust in science and journalism, misinformation campaigns and deliberate fraud, all point to breakdowns in these systems.

[[2]](https://underlay.mit.edu/#sup2) [https://unstats.un.org/unsd/demographic-social/products/vitstats/sets/Series_A_2011.pdf](https://unstats.un.org/unsd/demographic-social/products/vitstats/sets/Series_A_2011.pdf)

[[3]](https://underlay.mit.edu/#sup3) [https://www.news24.com/World/News/Discontent-over-Sudan-census-20090521](https://www.news24.com/World/News/Discontent-over-Sudan-census-20090521)

[[4]](https://underlay.mit.edu/#sup4) E.g., experimental data, reference works, building locations, satellite imagery, business reviews, historical.

[[5]](https://underlay.mit.edu/#sup5) Currently including all of [Cisco](https://www.cisco.com/)’s prior art.
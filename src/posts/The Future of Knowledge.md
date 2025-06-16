---
author:
  - Danny Hillis
  - Samuel Klein
  - Travis Rich
uri: https://notes.knowledgefutures.org/pub/future
type: essay
---
## A New Model for Knowledge

Knowledge is the most precious human asset, yet even with the most powerful tools one cannot know with certainty what is already known. Technology has expanded the rate of knowledge creation and dissemination, giving us more knowledge from more sources, but making it harder to discover and judge it. Our paradigm for sharing knowledge is broken. The prevalence of false beliefs, decisions based on inaccurate information, distrust in science and journalism, misinformation campaigns and deliberate fraud, all indicate the current system no longer suffices.

There are other ways to share knowledge. Today, publishing models provide many functions bundled together: selecting what is important, analyzing what is true and the reliability of sources, presenting it in a form intelligible to the intended reader, and archiving knowledge for future use. However, we can perform these functions independently, allowing each to be improved. For example: selection and presentation can each be performed for a specific purpose, and with the latest information. A map showing the best route through traffic is a good example of a dynamically generated presentation. Dynamic scientific publication can have the same focus and timeliness. Similarly, reliability of information can be judged when the information is read and used, not when it is recorded. This allows a better assessment, benefiting from hindsight and the context of use. Trying to establish the truth of assertions before they are recorded could even be considered contrary to the principles of testing and fallibility on which scientific knowledge is built.

We propose the creation of an open collection of all public knowledge – including science, law, history, news – called the _**Underlay**_. Public knowledge is currently presented in many forms: publications, databases, dynamic interfaces. The Underlay will expose and structure the knowledge underlying those presentations, in a machine-readable form that can be dynamically searched, vetted, and presented to humans, tracing the provenance of each piece. By separating knowledge from its presentation, each bit can be analyzed for relevance and recombined and re-presented in many contexts. This will save duplicated effort, and accelerate collaboration and study. People can use the Underlay to evaluate knowledge based on their trust in sets of sources, and can compare what different networks perceive as truth.

The creation of richer collections of machine-readable knowledge is inevitable. What is not inevitable is having such a knowledge base as a public resource freely available to all. We are at a fork in the road. The transition to machine-mediated access could consolidate our dependence on a few large intermediaries, and we need institutional forces that support public knowledge as a public good.

Results expected from such an effort include:

- A canonical way to refer to **entities** (e.g.: genes, locations, events, people, theorems, species). This will help align different discussions and claims about a topic.
    
- A distributed graph of **assertions** about entities, & the **provenance** of those assertions.
    
- Tools for accessing, filtering & presenting the information in those assertions.
    
- A framework to evaluate & **label** the credibility of assertions based on their provenance and context, and support for multiple alternative vetting systems.
    
- Tools for automatically capturing + **extracting** assertions from databases and literature.
    
- Alongside a presentation or paper, tools for **publishing** + **visualizing** the underlay of its assertions (assumptions, measurements, analyses, conclusions, etc.)
    

This work will need incubation, by either an independent organization or part of an existing university or foundation. Our current plan is to first focus on a few areas of knowledge and use cases, such as biomedicine or current events. The initial data, tools, and estimates of contextual reliability will focus on these use cases. Fields of coverage will expand over time, eventually linking all of published knowledge. This will require a sound framework and an industrial-scale effort.

## Representing Knowledge in the Underlay

The Underlay is not truth, but assertions of truths and their sources. For example, it would not contain the bare declaration “_Sudan’s population was 39M in 2008_”, but rather “_Sudan’s population was 39M in 2008, according to the UN statistics division (2011), citing the 2008 census from Sudan’s Bureau of Statistics._” These assertions would be stored in an easily translated, machine-readable form, along with information about how they were recorded in the Underlay. Through these chains of relationships, even simple assertions are interconnected with the entire web of knowledge. 

Sometimes sources contradict one another. Comedian Gracie Allen claimed her birth year was 1906, but the US Census listed it as 1895. The Underlay will contain both assertions with their provenance, and leave it to other processes to decide which to trust. It will also provide a way to publish such judgments of credibility and truth.

Assertions in the Underlay are _**relationships**_ between _**entities**_. These may be anything worth knowing about, real or fictional, permanent or ephemeral, current or historical, and asserted as such. _Authorship_ might link a songwriter and the lyrics of a song, or _location_ might link geo-coordinates and a mountaintop. Assertions include the source and time of the assertion. Other assertions may be made about them, such as their context, opinions on their veracity, or limitations on their scope. This uniform representation helps software to understand the graph of knowledge.

Assertions added to the Underlay become a permanent part of it. Anyone can make an assertion. It can be updated or contradicted, perhaps even by the same source, but the updates will have different unique IDs. Clients or nodes can agree to stop storing an assertion, but some nodes will still retain it. As the Underlay allows appends, not edits, many copies or partial copies can exist simultaneously. This simplifies using it in many places at once, online and offline, with different nodes in the network storing different parts of the Underlay. No node is required to store the entire Underlay, or to accept every new assertion. Endorsement is distinct from storage: anyone can make an assertion about a statement’s veracity or value. Other nodes will be able to take these judgements into account in deciding what to store. This leads to many independent editorial judgments of what to believe and to store, with no consensus required or expected.

## Comparisons to Other Public Knowledge

One way to understand the Underlay is to compare it to other knowledge sets.

_**Wikipedia**_ is a set of public knowledge about notable entities presented in an illustrated natural language format. Much of its knowledge is not yet easily parsable by machines, however articles contain structured elements, including categories and often an “information box” with roughly standardized fields. Distinct versions of Wikipedia exist in different languages. As in the Underlay, additions can be asserted by anyone. A prefilter for “notable” topics limits what is included in most language editions. Knowledge is attributed, usually to pseudonymous editors; and cited to a source roughly once a paragraph. It may be the most widely-used reference publication ever created.

The _**U.S. patent database**_, like Wikipedia, contains natural-language entries augmented by illustrations. Patents have structured information such as categories, references and publication dates, but most of the knowledge they contain is not easily extractable by machines. Like Underlay assertions, patents have attribution and are immutable; they can only be appended to, not edited. Unlike the Underlay, integrity and immutability depends on a single organization, the U.S. Patent office.

_**Blockchains**_ are distributed public ledgers of assertions. Like the Underlay they are immutable and distributed, with no storage node having special status. Unlike the Underlay, they are optimized to minimize trust requirements among users, limiting their size and performance. Knowledge maintained by blockchains need not have any standard structure. Blockchains may have a role in implementing the Underlay, but are not in themselves a solution to the problem of sharing public knowledge.

Another shared public good is the decoded _**human genome**_, the consensus sequence of human DNA. Copies of the genome are usually stored in machine-readable formats, but they exist in many inconsistent versions in different places. Different versions have different annotations, such as variations of a gene, but there is no standard representation. Most scientific databases, such as star atlases, linguistic lexicons, zoological taxonomies, and the human family tree follow a similar pattern: existing in multiple versions, usually machine-readable. Some, like the _**Allen Brain Atlas**_, are actively maintained, expanded and made available for the public good. The Underlay would both take advantage of these open efforts and expand them by aligning them with other types of knowledge, such as behaviors, medical conditions, pharmaceuticals and publications.

The _**Semantic Web**_ is a public machine-readable collection of data with a certain format posted to any public web page. Like the Underlay, the Semantic Web contains has public assertions of relationships between entities. However, there is little provenance for these assertions beyond what is implied by the page that published the data. Assertions are made and discovered ad hoc. All assertions are editable by the page owners, with no requirement to maintain history, immutability or consistency. Different semantics of relationships and entities are used by different publishers, who bear the burden of publishing their own data.

**Linked data** (or linked open data) is a promising way of representing information by breaking it into a set of assertions, each of which is a triplet of subject and predicate joined by a relationship. The terms ideally link to a Web site or service that defines it.  Linked data can represent knowledge without over-simplifying it to fit a set of expected fields, or committing to a schema beforehand. It also enables stitching together information from different collections. Unlike the Underlay, linked data is just a way of representing information. It is not append-only; data points are often not timestamped and can be edited in place. Including provenance for each triple is not standardized and can be complex. The Underlay could make use of the format, and work with existing linked data collections.

Some collections of semantic data are compiled for a specific use case or overlay. _**Semantic Scholar**_, with information automatically extracted from scientific journals, is a good example. Integrating such databases into the Underlay would enhance the original use for which the data was compiled, and make the data useful for other purposes. These projects could also share tools for extraction and curation with the Underlay.

Several projects have tried to represent vetted general knowledge in an open machine-readable format, such as _**DBpedia**_ and _**Opencyc.**_ These databases differ from the Underlay in attempting a consistent version of the truth, rather than all possibly-contradictory assertions and their provenance. These are an excellent source of assertions for the Underlay, as the Underlay may be a source of provenance and reliability data for these vetted collections, as it stores attributed assertions about the validity of other assertions. These two types of efforts are complementary - together supporting multiple systems for vetting knowledge.

The public databases most similar to the Underlay have been _**Freebase**_ and _**Wikidata**_, open entity-relationship databases with limited provenance. Like the Underlay, each supports only appends by preserving the history of assertions; sourced assertions can come from anyone, and can contradict other assertions; and relationships are language-independent. Both have assertions added by curators around the world, and automatically extracted from other published sources. Freebase and its toolchain was acquired by Google and used to build what is now the _Google Knowledge Graph_.

At the time Freebase was acquired, it had about 100 million assertions, which were largely merged into Wikidata. The _**Google Knowledge Graph**_ has grown steadily since then adding other public and private data, now fully intermixed so that none of these updates are available to the public.  Today it has closer to 100 billion assertions, and is used widely for search, advertising, travel planning, knowledge clustering, and more.

## Building for the Future

Knowledge sharing today is dominated by the competition for recognition between different narratives, each with its own cascading assumptions and standards for truth.  In the future, we will share knowledge through familiar forms, including books, reference works, and scientific journals. But these will increasingly be an overlay of presentation and explanation, compiled from a collective underlay of asserted truth. There will be fast, easy, and reliable ways to check sources, methods, and data. Therein lies a transformation of sensemaking, from individual storytelling to a more continuous collaboration, and from sharing hand-picked summaries to sharing entire contexts. This will allow fast refinement and replication, precise localization of differences, and more parallel exploration of variations of an idea.

Libraries and publishers will reinvent themselves to take advantage of this to create more complete, accurate and timely presentations of knowledge.  Journalists will have new tools to trace the provenance and independence of sources, along with their reputability or biases around a given topic.

Structured underlays will transform scientific publishing, articulating the details of distributed iterative research, and supporting new types of authorship, revision, review, and publication. Concise, targeted updates to knowledge at many levels of granularity will become the norm, from single observations to meta-analyses. We may find new modes of collaboration among humans, between humans and machines, and among machines.

Creating the Underlay is a long-term undertaking. It has the potential to become part of humanity’s basic infrastructure, meeting the changing needs of research and synthesis. Even its beginning will enable better access to what is known. Eventually, as with the invention of earlier scientific norms, it may change how we picture discovery, bootstrap and estimate truth, and extend our collective intelligence. 

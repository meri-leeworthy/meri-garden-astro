---
isPublished: false
---
A few years ago I started getting really interested in *knowledge graphs*. They are effectively just databases that contain statements about *entities* in the world, like 'horses', or 'Anish Kapoor', or 'COVID-19'; concrete or abstract, linking them together to form a mesh of related representations. These links, or *edges*, between entities are similar to how Wikipedia pages link to each other, but the data is distilled to a machine-readable format, and potentially describe many more obscure or domain-specific things. 

I first encountered knowledge graphs (KGs) a few years ago reading about something called [[The Underlay]], a project which aimed to create a massive, open, globally distributed knowledge graph, in which all 'knowledge' assertions would be situated within the context of their provenance - essentially, how do we know it? The project's ambitions of integrating global knowledge production within a grand technical platform, 'liberating' knowledge from the confines of published books and academic papers, helped tune me into the fascinating philosophical questions about how knowledge is created, derived and represented, as well as sparking my imagination for how such machine representations could change the world. The project seems to have since become inactive (perhaps a reassessment was in order after ChatGPT took off?) but I still hope to see that team’s visions brought to fruition in some form in the future, and recommend reading their excellent *RFC* series of writing about it.

Whether globally distributed or not, the whole field of research around KGs is fascinating. Though it still feels pretty theoretical in my head, my understanding is that when KGs are described with *ontologies* — that is, standardised ways of describing *types* of things — it becomes possible to automatically make certain kind of inferences that are not explicitly described. Automating this process can apparently become a useful part of the knowledge production process in certain domains, and can be understood as a more classical *symbolic* approach to AI compared with the celebrated *connectionist* approach demonstrated in deep learning. ChatGPT, for its part, concurs that knowledge graph inferences can be useful in healthcare, business intelligence, and cybersecurity. 

But even without needing to perform as AI, KGs clearly have a big role to play as a generic approach to storing knowledge about anything, and prior to LLMs taking centre stage it was the Google Knowledge Graph, responsible for the little info-boxes in Google searches, information about places on Google Maps, etc, that was key in renewing that company's dominance. The biggest public one to my knowledge is Wikidata, which is itself a pretty amazing aggregation of previous, smaller open data projects. Wikidata was one of the initial sources for Google's private KG, but the well-financed latter has since expanded to contain about a thousand times more assertions. 

Even if they traditionally sit in different camps of the AI research debates, combining KGs with LLMs seems to make a lot of sense for the tasks of both deriving KGs from natural language sources, and for communicating the contents of KGs back to users in natural language. As an interpretable representation of knowledge and its sources (or *provenance*), I believe using (potentially remote) KGs coupled with small, local LLMs like Llama providing a natural language interface would be in many ways far preferable to relying on enormous, remote 'black box' LLMs as a source of information about the world. This would essentially be a form of Retrieval Augmented Generation, or RAG, which adds an information gathering step into the LLM chat cycle. Whether through simple keyword search or embedding the user's query to arrive at a more semantically precise interpretation, the RAG process aims to retrieve the information most relevant to a query and load it into the context window before an LLM is tasked with generating its response.

A unified system for using LLMs to help generate knowledge graphs from a dataset, and then using it for RAG, is exactly the subject of a research paper released by Microsoft researchers earlier this year, *[[From Local to Global - A Graph RAG Approach to Query-Focused Summarization]]*. The 'GraphRAG' system also applies multiple steps of summarisation to generate a kind of hierarchical knowledge structure, one that can help guide the RAG process to get exactly the information it needs in granular detail. 

outlining their [[GraphRAG]] approach to automating knowledge graph creation using LLMs earlier this year, I was interested to explore their system and see how it could help realise this vision. I wanted to see how effective local Llama model could be at standing in for GPT4 in their system. 

Following [this guide by Chi-Sheng Liu](https://chishengliu.com/posts/graphrag-local-ollama/), I was able to get Microsoft's official GraphRAG code working with Ollama running Llama 3.2 in the 3 billion parameter version. The tutorial uses `graphrag/v0.3.2`, but I was able to bump it to `v0.3.6` with no issues. The only extra step was the relative imports needed to be turned into absolute imports, `.cli` becoming `graphrag.index.cli` in `index.py` for example. 

The entity extraction process outputs XML representing the graph of entities. It worked somewhat well on a very truncated version of A Christmas Carol, but with a few issues. The process outputs parquet files, with `create_base_entity_graph.parquet` containing an XML representation of the entity graph, with 30 nodes and 21 edges total:

```xml
<graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">
		<key id="d14" for="edge" attr.name="level" attr.type="long" />
		<key id="d13" for="edge" attr.name="human_readable_id" attr.type="long" />
		<key id="d12" for="edge" attr.name="id" attr.type="string" />
		<key id="d11" for="edge" attr.name="source_id" attr.type="string" />
		<key id="d10" for="edge" attr.name="description" attr.type="string" />
		<key id="d9" for="edge" attr.name="weight" attr.type="double" />
		<key id="d8" for="node" attr.name="level" attr.type="long" />
		<key id="d7" for="node" attr.name="cluster" attr.type="string" />
		<key id="d6" for="node" attr.name="entity_type" attr.type="string" />
		<key id="d5" for="node" attr.name="id" attr.type="string" />
		<key id="d4" for="node" attr.name="human_readable_id" attr.type="long" />
		<key id="d3" for="node" attr.name="degree" attr.type="long" />
		<key id="d2" for="node" attr.name="source_id" attr.type="string" />
		<key id="d1" for="node" attr.name="description" attr.type="string" />
		<key id="d0" for="node" attr.name="type" attr.type="string" />
	<graph edgedefault="undirected">
		<node id="PROJECT GUTENBERG EBOOK A CHRISTMAS CAROL">
			<data key="d0">EVENT</data>
			<data key="d1">Book publication event</data>
			<data key="d2">19c711f0378a0ae34e7a0e676ba7d724</data>
			<data key="d3">0</data>
			<data key="d4">0</data>
			<data key="d5">089acf0e5ff84ee9bb708447b369f1e8</data>
		</node>
		<node id="CHARLES DICKENS">
			<data key="d0">PERSON</data>
			<data key="d1">Author of the book "A Christmas Carol"</data>
			<data key="d2">19c711f0378a0ae34e7a0e676ba7d724</data>
			<!-- there are sometimes two type tags for some reason-->
			<data key="d6">PERSON</data> 
			<data key="d3">5</data>
			<data key="d4">1</data>
			<data key="d5">e4460826a9384907bd458658f8cfae10</data>
		</node>
		<node id="ARTHUR RACKHAM">
			<data key="d0">PERSON</data>
			<data key="d1">Illustrator of the book "A Christmas Carol"</data>
			<!-- from here on I will omit numeric tags -->
		</node>
		...
		<node id="SCROOGE">
			<data key="d0">PERSON</data>
			<data key="d1">The comprehensive summary of the data provided is as follows: Scrooge, also known as Ebenezer Scrooge, is a character in literature and popular culture. He is best known for being a miserly and bitter old man who is visited by the ghost of his former business partner, Jacob Marley, on Christmas Eve. According to the descriptions provided, Scrooge is indeed a character who knew Marley was dead, as evidenced by the visitation of Marley's ghost. However, no additional information about Scrooge's background or personality traits were provided in the description list. Therefore, this summary only includes the confirmed details about Scrooge's relationship with Jacob Marley.</data>
		</node>
		<node id="HAMLET'S FATHER">
			<data key="d0">PERSON</data>
			<data key="d1">Deceased father of Hamlet, mentioned for comparison</data>
		</node>
		<node id="ST. PAUL'S CHURCHYARD">
			<data key="d0">PLACE</data>
			<data key="d1">Location where Hamlet might have taken a stroll</data>
		</node>
		...
		<node id="BOB CRATCHIT">
			<!-- sometimes tags are just empty, even when the data should be known -->
			<data key="d0" />
			<data key="d1" />
		</node>
		...
		<edge source="CHARLES DICKENS" target="ARTHUR RACKHAM">
			<data key="d9">1.0</data>
			<data key="d10">Charles Dickens illustrated Arthur Rackham's illustrations for "A Christmas Carol"</data>
		</edge>
		<edge source="CHARLES DICKENS" target="J. B. LIPPINCOTT COMPANY">
			<data key="d9">1.0</data>
			<data key="d10">J. B. Lippincott Company published Charles Dickens' book "A Christmas Carol"</data>
		</edge>
		<edge source="CHARLES DICKENS" target="AUTHOR">
			<data key="d9">1.0</data>
			<data key="d10">Charles Dickens wrote the book "A Christmas Carol"</data>
		</edge>
		...
		<edge source="SCROOGE" target="WINTER">
			<!-- most of the other edges have weight 1 but this one is 10 lol -->
			<data key="d9">10.0</data>
			<data key="d10">Scrooge despised winter and its weather</data>
		</edge>
		<edge source="SCROOGE" target="FALL">
			<data key="d9">1.0</data>
			<data key="d10">Scrooge was known for his miserliness during Fall</data>
		</edge>
		<edge source="SCROOGE" target="CHRISTMAS">
			<data key="d9">1.0</data>
			<data key="d10">Scrooge's nephew, Fred, tried to convince him to celebrate Christmas</data>
		</edge>
		<edge source="SCROOGE" target="FRED">
			<data key="d9">1.0</data>
			<data key="d10">Fred tried to convince Scrooge to celebrate Christmas</data>
		</edge>
		...
		<edge source="BELVEDERE" target="BOB CRATCHIT">
			<data key="d9">1.0</data>
			<data key="d10">Bob Cratchit worked for Scrooge at Belvedere</data>
		</edge>
		<edge source="BELVEDERE" target="CRATCHIT FAMILY">
			<data key="d9">1.0</data>
			<data key="d10">The Cratchit family lived in a small house near Belvedere</data>
		</edge>
		<!-- seems to target wrong nodes sometimes, like in these two -->
		<edge source="CRATCHIT FAMILY" target="ROBIN CRATCHIT">
			<data key="d9">1.0</data>
			<data key="d10">Robin was the youngest of Bob Cratchit's children</data>
		</edge>
		<edge source="ROBIN CRATCHIT" target="TINY TIM">
			<data key="d9">1.0</data>
			<data key="d10">Tiny Tim was the youngest of Bob Cratchit's children</data>
		</edge>
	</graph>
</graphml>
```

In summary, there are a bunch of mysterious gaps and errors in the resulting graph, but it does at least seem to capture entities reasonably well. I then tried the same approach, but with the text of the introduction to my favourite book, [[Designs for the Pluriverse]]. The output this time was less impressive:

```xml
<graphml xmlns="http://graphml.graphdrawing.org/xmlns" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://graphml.graphdrawing.org/xmlns http://graphml.graphdrawing.org/xmlns/1.0/graphml.xsd">
	<key id="d14" for="edge" attr.name="level" attr.type="long" />
	<key id="d13" for="edge" attr.name="human_readable_id" attr.type="long" />
	<key id="d12" for="edge" attr.name="id" attr.type="string" />
	<key id="d11" for="edge" attr.name="source_id" attr.type="string" />
	<key id="d10" for="edge" attr.name="description" attr.type="string" />
	<key id="d9" for="edge" attr.name="weight" attr.type="double" />
	<key id="d8" for="node" attr.name="level" attr.type="long" />
	<key id="d7" for="node" attr.name="cluster" attr.type="string" />
	<key id="d6" for="node" attr.name="id" attr.type="string" />
	<key id="d5" for="node" attr.name="human_readable_id" attr.type="long" />
	<key id="d4" for="node" attr.name="degree" attr.type="long" />
	<key id="d3" for="node" attr.name="entity_type" attr.type="string" />
	<key id="d2" for="node" attr.name="source_id" attr.type="string" />
	<key id="d1" for="node" attr.name="description" attr.type="string" />
	<key id="d0" for="node" attr.name="type" attr.type="string" />
	<graph edgedefault="undirected">
		<node id="AURELIA">
			<data key="d0">PLACE</data>
			<data key="d1">Country seeking to release hostages</data>
			<data key="d2">de2be5a97433e73576d4fcc58d5af2e8</data>
			<data key="d3">PLACE</data>
			<data key="d4">0</data>
			<data key="d5">0</data>
			<data key="d6">b59ee3a6758b4c76a09e11c2e249388d</data>
		</node>
		<node id="QUINTARA">
			<data key="d0">PLACE</data>
			<data key="d1">Country that negotiated a swap of money in exchange for hostages</data>
			<!-- some tags omitted -->
		</node>
		<node id="TIRUZIA">
			<data key="d0">PLACE</data>
			<data key="d1">Capital of Firuzabad where the Aurelians were being held</data>
		</node>
		<node id="KROHAARA">
			<data key="d0">PLACE</data>
			<data key="d1">Capital city in Quintara</data>
		</node>
		<node id="CASHION">
			<data key="d0">PLACE</data>
			<data key="d1">Capital city in Aurelia</data>
		</node>
		<node id="SAMUEL NAMARA">
			<data key="d0">PERSON</data>
			<data key="d1">Aurelian who spent time in Tiruzia's Alhamia Prison</data>
		</node>
		<node id="ALHAMIA PRISON">
			<data key="d0">PLACE</data>
			<data key="d1">Prison in Tiruzia</data>
		</node>
		<node id="DURKE BATAGLANI">
			<data key="d0">PERSON</data>
			<data key="d1">Aurelian journalist who was held hostage</data>
		</node>
		<node id="MEGGIE TAZBAH">
			<data key="d0">PERSON</data>
			<data key="d1">Bratinas national and environmentalist who was held hostage</data>
		</node>
		<node id="BRATINAS">
			<data key="d0">PLACE</data>
			<data key="d1">Country where Meggie Tazbah is from</data>
		</node>
		<node id="ALHAMIA PRISON GUARD">
			<data key="d0">PERSON</data>
			<data key="d1">Guard at Alhamia prison who was involved in the hostage release</data>
		</node>
		<node id="TIRUZIA POLICE">
			<data key="d0">ORGANIZATION</data>
			<data key="d1">Police force responsible for maintaining order in Tiruzia</data>
		</node>
		<node id="FIRUZABAD POLICE">
			<data key="d0">ORGANIZATION</data>
			<data key="d1">Police force responsible for maintaining order in Firuzabad</data>
		</node>
		<node id="STANFORD UNIVERSITY">
			<data key="d0">PLACE</data>
			<data key="d1">University where the Singularity debates took place</data>
		</node>
		<node id="RAY KURZWEIL">
			<data key="d0" />
			<data key="d1">Futurist who predicts the Singularity will occur in 2045Futurist who predicts that the Singularity will occur in 2045)Note: The numbers in parentheses refer to the reference number in the original text.I'll re-extract the entities and relationships, making sure to only include those that match the previous types.("entity"</data>
			<!-- note that the d3 but not d0 type was gleaned -->
			<data key="d3">PERSON</data>
		</node>
		<node id="SINGULARITY">
			<data key="d0" />
			<data key="d1">The event predicted by Ray Kurzweil to occur in 2045The event predicted by futurist Ray Kurzweil to occur in 2045</data>
			<data key="d3">EVENT</data>
		</node>
		<node id="MANZINI">
			<data key="d0">PERSON</data>
			<data key="d1">Author of a book that parallels Ray Kurzweil's argument about the Singularity</data>
		</node>
		<edge source="STANFORD UNIVERSITY" target="SINGULARITY">
			<data key="d9">5.0</data>
			<data key="d10">Debates about the Singularity took place at this university</data>
		</edge>
		<edge source="RAY KURZWEIL" target="SINGULARITY">
			<data key="d9">45.0</data>
			<data key="d10">Ray Kurzweil predicts that the Singularity will occur in 2045Predicts the Singularity will occur in 2045</data>
		</edge>
		<edge source="SINGULARITY" target="MANZINI">
			<data key="d9">4.0</data>
			<data key="d10">Manzini's book parallels Ray Kurzweil's argument about the SingularityParallels Ray Kurzweil's argument about the Singularity</data>
		</edge>
	</graph>
</graphml>
```

The fantasy-sounding places and people are from the examples in the prompt. The mentions of Kurzweil, the Singularity and Ezio Manzini are the only entities gleaned from the entire book chapter, which nonetheless took over half an hour to run on my M1 Pro Macbook.

The GraphRAG documentation describes and recommends a process for automated prompt tuning, so my next step is to give that a go. Chi-Sheng Liu's monkey patch tutorial didn't cover this step, but fortunately it was easy to infer how to do it. Download the file:

```` bash
curl https://raw.githubusercontent.com/microsoft/graphrag/v0.3.6/graphrag/prompt_tune/__main__.py > prompt_tune.py
````

Then absolutise the relative imports and run the monkey patch by replacing lines 11-14 with:

``` python
from graphrag.prompt_tune.api import DocSelectionType
from graphrag.prompt_tune.cli import prompt_tune
from graphrag.prompt_tune.generator import MAX_TOKEN_COUNT # const
from graphrag.prompt_tune.loader import MIN_CHUNK_SIZE # const
from graphrag_monkey_patch import patch_graphrag
patch_graphrag()
```

The command to run the prompt tuner is just:

```bash
python prompt_tune.py --root ./ragtest --config ./ragtest/settings.yaml
```

And it seemed to be working, optimising for the Escobar book chapter and printing out this generated domain description:

```
INFO: Generated domain: This text appears to be an excerpt from a book or academic paper that explores the relationship between patriarchy, ecology, and design. Here's a summary of the main points:

1. **Patriarchal alchemy**: The author argues that patriarchal societies have led to a self-obsessed focus on individual self-realization, which has impoverished spirituality and disconnected people from nature.
2. **Modern society**: The world is increasingly built without attachment to place, nature, landscape, space, and time, leading to a disconnection from the "here and now" that has shaped human existence throughout history.
3. **Latin American decolonial and autonomous feminisms**: The author mentions the importance of these perspectives in challenging patriarchal norms and promoting a spirituality of the Earth.
4. **The notion of underdevelopment**: The concept of underdevelopment was created to justify the erasure of indigenous and vernacular design practices, which were seen as inferior to Western modernity.
5. **Ecology and relationality**: The author emphasizes the importance of recognizing the interconnectedness of all life, which is central to ecology and transition narratives.
6. **Patriarchy and historical development**: Thomas Berry's work echoes von Werlhof's analysis that patriarchy has shaped Western historical development.

The text also mentions various authors and references, including:

* María Lugones
* Rita Segato
* Silvia Rivera Cusicanqui
* Betty Ruth Lozano
* Sylvia Marcos
* AuraCumes
* Irma Alicia Velásquez Nimatuj
* Julián Aragón

Overall, the text appears to be advocating for a new perspective that prioritizes community, spirituality of the Earth, and interconnectedness, while challenging patriarchal norms and promoting decolonial and autonomous feminisms.
```

I love this book, so I enjoyed seeing this locally-generated summary pop up. But the prompt it ended up generating for entity extraction didn't impress me so much:

```
-Goal-
Given a text document that is potentially relevant to this activity, first identify all entities needed from the text in order to capture the information and ideas in the text.
Next, report all relationships among the identified entities.

-Steps-
1. Identify all entities. For each identified entity, extract the following information:
- entity_name: Name of the entity, capitalized
- entity_type: Suggest several labels or categories for the entity. The categories should not be specific, but should be as general as possible.
- entity_description: Comprehensive description of the entity's attributes and activities
Format each entity as ("entity"{tuple_delimiter}<entity_name>{tuple_delimiter}<entity_type>{tuple_delimiter}<entity_description>)

2. From the entities identified in step 1, identify all pairs of (source_entity, target_entity) that are *clearly related* to each other.
For each pair of related entities, extract the following information:
- source_entity: name of the source entity, as identified in step 1
- target_entity: name of the target entity, as identified in step 1
- relationship_description: explanation as to why you think the source entity and the target entity are related to each other
- relationship_strength: a numeric score indicating strength of the relationship between the source entity and target entity
Format each relationship as ("relationship"{tuple_delimiter}<source_entity>{tuple_delimiter}<target_entity>{tuple_delimiter}<relationship_description>{tuple_delimiter}<relationship_strength>)

3. Return output in This text appears to be an excerpt from a book or academic paper that explores the relationship between patriarchy, ecology, and design. Here's a breakdown of the main ideas and themes:

1. **Patriarchal alchemy**: The author argues that patriarchal societies have a profound impact on individuals, leading to self-obsession and a focus on self-improvement through production and consumption.
2. **Disconnection from nature**: As humans progress, they become increasingly disconnected from the natural world, losing touch with their spirituality and the interconnectedness of all life.
3. **Modern society's design**: The author critiques modern society's design, which prioritizes efficiency, productivity, and growth over attachment to place, nature, and community.
4. **Decolonial and autonomous feminisms**: The text references Latin American decolonial and autonomous feminisms as a response to patriarchal societies and the need for alternative forms of knowledge and politics.
5. **Interconnectedness of all life**: The author emphasizes the importance of recognizing the interconnectedness of all living beings, which is central to ecology and transition narratives.
6. **Relationality**: The text discusses relationality as a key concept in understanding human relationships with the natural world.
7. **Critique of Western historical development**: Thomas Berry's work is mentioned as an example of how Western historical development can be reinterpreted through the lens of patriarchy.

The author appears to be advocating for a new design approach that prioritizes community, spirituality, and interconnectedness with nature. They suggest that this alternative design imagination could lead to a more sustainable and equitable future.

Some notable references in the text include:

* María Lugones, Rita Segato, Silvia Rivera Cusicanqui, Betty Ruth Lozano, Sylvia Marcos, AuraCumes, Irma Alicia Velásquez Nimatuj, Julián Aragón, and other authors who have contributed to the debate on matriarchies and feminisms.
* The concept of "underdevelopment" and its impact on traditional practices and knowledge.
* The work of Maturana and Varela, particularly their book "Autopoiesis and Cognition: The Realization of the Living".
* Bob Marley's song "Real Situation" as a metaphor for the need to reconnect with nature and community.

Overall, this text appears to be an introduction to a broader discussion on the need for alternative design approaches that prioritize human well-being, ecological sustainability, and social justice. as a single list of all the entities and relationships identified in steps 1 and 2. Use **{record_delimiter}** as the list delimiter.

4. If you have to translate into This text appears to be an excerpt from a book or academic paper that explores the relationship between patriarchy, ecology, and design. Here's a breakdown of the main ideas and themes:

1. **Patriarchal alchemy**: The author argues that patriarchal societies have a profound impact on individuals, leading to self-obsession and a focus on self-improvement through production and consumption.
2. **Disconnection from nature**: As humans progress, they become increasingly disconnected from the natural world, losing touch with their spirituality and the interconnectedness of all life.
3. **Modern society's design**: The author critiques modern society's design, which prioritizes efficiency, productivity, and growth over attachment to place, nature, and community.
4. **Decolonial and autonomous feminisms**: The text references Latin American decolonial and autonomous feminisms as a response to patriarchal societies and the need for alternative forms of knowledge and politics.
5. **Interconnectedness of all life**: The author emphasizes the importance of recognizing the interconnectedness of all living beings, which is central to ecology and transition narratives.
6. **Relationality**: The text discusses relationality as a key concept in understanding human relationships with the natural world.
7. **Critique of Western historical development**: Thomas Berry's work is mentioned as an example of how Western historical development can be reinterpreted through the lens of patriarchy.

The author appears to be advocating for a new design approach that prioritizes community, spirituality, and interconnectedness with nature. They suggest that this alternative design imagination could lead to a more sustainable and equitable future.

Some notable references in the text include:

* María Lugones, Rita Segato, Silvia Rivera Cusicanqui, Betty Ruth Lozano, Sylvia Marcos, AuraCumes, Irma Alicia Velásquez Nimatuj, Julián Aragón, and other authors who have contributed to the debate on matriarchies and feminisms.
* The concept of "underdevelopment" and its impact on traditional practices and knowledge.
* The work of Maturana and Varela, particularly their book "Autopoiesis and Cognition: The Realization of the Living".
* Bob Marley's song "Real Situation" as a metaphor for the need to reconnect with nature and community.

Overall, this text appears to be an introduction to a broader discussion on the need for alternative design approaches that prioritize human well-being, ecological sustainability, and social justice., just translate the descriptions, nothing else!

5. When finished, output {completion_delimiter}.

-Examples-
######################

Example 1:

text:
" by encouraging--­for instance, through what-if scenarios--­the imagination of alternative ways of being (2). Such critical design can go a long way, in their view, against design that reinforces the status quo. "Critical design is critical thought translated into materiality. It is about thinking through design rather than through words and using the language and structure of design to engage ­people....All good critical design offers an alternative to how ­things are" (35; emphasis added). That we are in the age of "speculative every­thing" is a hopeful thought, assuming it fuels the kinds of "social dreaming" (169) that might result in "the multiverse of worlds our world could be" (160). The ontological impetus of speculative design ­will be explored at length in subsequent chapters, particularly through the notion of design for transitions to the pluriverse.

   Speculation is rampant in all kinds of directions. It is useful to identify two opposing design fictions
------------------------
output:
Here is a structured version of the text:

**Geographic Entities**

* **Tiruzia**: Capital city where the Aurelians were being held.
	+ Alhamia Prison: Prison in Tiruzia.
	+ Firuzabad: Negotiated a hostage exchange with Aurelia.
	+ Quintara: Brokered the hostage exchange between Firuzabad and Aurelia.

**Persons**

* **Samuel Namara**: Aurelian who spent time in Tiruzia's Alhamia Prison.
* **Durke Bataglani**: Aurelian journalist who was held hostage.
* **Meggie Tazbah**: Bratinas national and environmentalist who was held hostage.

**Relationships**

* **Firuzabad - Aurelia**: Firuzabad negotiated a hostage exchange with Aurelia (2).
* **Quintara - Aurelia**: Quintara brokered the hostage exchange between Firuzabad and Aurelia (2).
* **Quintara - Firuzabad**: Quintara brokered the hostage exchange between Firuzabad and Aurelia (2).
* **Samuel Namara - Alhamia Prison**: Samuel Namara was a prisoner at Alhamia prison (8).
* **Samuel Namara - Meggie Tazbah**: Samuel Namara and Meggie Tazbah were exchanged in the same hostage release (2).
* **Samuel Namara - Durke Bataglani**: Samuel Namara and Durke Bataglani were exchanged in the same hostage release (2).
* **Meggie Tazbah - Durke Bataglani**: Meggie Tazbah and Durke Bataglani were exchanged in the same hostage release (2).
* **Samuel Namara - Firuzabad**: Samuel Namara was a hostage in Firuzabad (2).
* **Meggie Tazbah - Firuzabad**: Meggie Tazbah was a hostage in Firuzabad (2).
* **Durke Bataglani - Firuzabad**: Durke Bataglani was a hostage in Firuzabad (2).

**Design and Critical Thinking**

* Critical design is critical thought translated into materiality.
* It is about thinking through design rather than through words and using the language and structure of design to engage people.
* All good critical design offers an alternative to how things are.

**Speculative Design**

* We are in the age of "speculative everything".
* This fuels the kinds of "social dreaming" that might result in "the multiverse of worlds our world could be".
#############################


Example 2:

text:
 our inability to grasp what is emerging" (170). The current conjuncture brought about by the full emergence of the artificial confronts us with the need to think anew about the intersection of ethics, design, and politics. We ­shall take up these vital questions again in the book's conclusion.

The expansion of the artificial also challenges us to "unfold the po­liti­cal capacities of design" by ­going against the analytical tendency in critical design studies to examine primarily how design, through its very materiality, "hardwires" par­tic­u­lar kinds of politics into bodies, spaces, or objects (Domínguez Rubio and Fogué 2015, 143). In contrast, one might focus on design's ability to broaden the range of pos­si­ble ways of being through our bodies, spaces, and materialities. This unfolding may be seen as based on "designers' acquired orientation to the pursuit of attentive and open-­ended inquiry
------------------------
output:
Here is the output in a human-readable format:

**Geographic Entities**

* Firuzabad: Capital city where Aurelians were being held.
* KROHAARA: Capital city in Quintara.
* CASHION: Capital city in Aurelia.
* Alhamia Prison: Prison in Tiruzia where Samuel Namara was held.
* Durke Bataglani: Aurelian journalist who was held hostage.
* Meggie Tazbah: Bratinas national and environmentalist who was held hostage.

**Relationships**

* Firuzabad and Aurelia: Negotiated a hostage exchange (2).
* Quintara and Aurelia: Brokered the hostage exchange between Firuzabad and Aurelia (2).
* Quintara and Firuzabad: Brokered the hostage exchange between Firuzabad and Aurelia (2).
* Samuel Namara and Alhamia Prison: Samuel Namara was a prisoner at Alhamia prison (8).
* Samuel Namara, Meggie Tazbah, and Durke Bataglani: Exchanged in the same hostage release (2).
* Samuel Namara and Firuzabad: Samuel Namara was a hostage in Firuzabad (2).
* Meggie Tazbah and Firuzabad: Meggie Tazbah was a hostage in Firuzabad (2).
* Durke Bataglani and Firuzabad: Durke Bataglani was a hostage in Firuzabad (2).

**Text**

The current conjuncture brought about by the full emergence of the artificial confronts us with the need to think anew about the intersection of ethics, design, and politics. We shall take up these vital questions again in the book's conclusion.

The expansion of the artificial also challenges us to "unfold the political capacities of design" by going against the analytical tendency in critical design studies to examine primarily how design, through its very materiality, "hardwires" particular kinds of politics into bodies, spaces, or objects (Domínguez Rubio and Fogué 2015, 143). In contrast, one might focus on design's ability to broaden the range of possible ways of being through our bodies, spaces, and materialities. This unfolding may be seen as based on "designers' acquired orientation to the pursuit of attentive and open-ended inquiry
#############################



-Real Data-
######################
text: {input_text}
######################
output:

```

For one thing, the long text describing the chapter, which differs slightly with the text I copied from the console, seems totally out of place in the two places it appears, steps 3 and 4. The second problem is that the examples that were generated, apparently in order to demonstrate   how the indexing process itself should generate entities from the full text (seems kind of... tautological?) only 'demonstrates' extracting people and places from the bizarre James Bond fantasy land from the old prompt. It's also not clear if they are formatted correctly? In any case, this prompt is obviously worse than the original. 

It's an interesting process to try to make these little experiments against a codebase that I think isn't too complex but is also structurally quite unfamiliar to me, as well as being in Python which I'm not much experienced in. It definitely feels like it sits at the boundary of my abilities, which I remember learning at Recurse Centre is the best kind of project to promote learning. Part of what I feel like I'm learning now, especially as I'm working computationally with an LLM for the first time

So it seems to have proceeded based on the assumption that the entities it would generate from the old prompt would be good enough to base some kind of iterative process on that would hopefully improve the tuned prompt, but my guess is that the local Llama model simply lacks the required reasoning capacities. 

![](../public/b0190bd6b431bcae3638a74d74e5a1c4.png)

I wonder if manually tuning it is the best next step?


I suspect that a model fine-tuned for Named Entity Recognition (NER) would more accurately and less noisily assign, for example, the correct entity types to nodes, but I'm not sure at this point if it's a major concern. 


My next steps in my explorations will be to try running the process over my personal books and notes, to generate Markdown documents from the KG which I can publish online, and to find ways of visually representing the graph which I can also publish. I'm then interested to apply the process to other datasets.
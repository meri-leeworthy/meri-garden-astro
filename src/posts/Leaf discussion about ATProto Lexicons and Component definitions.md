meri _—_ 9/5/2025, 11:11 am
i'm also interested if you have some thoughts on if and how these component schemas map to atproto lexicons

Zicklag — 9/5/2025, 11:13 am
So, that's kind of a tricky thing. Like, as far as native data storage, we can't really store the CRDTs in normal ATProto records since they aren't JSON under-the-hood, they are a binary snapshot format. 
At the same time, the data we're sticking in them are basically JSON shaped a lot of the time, and could be described by a Lexicon, which is basically a kind of JSON schema anyway.
The entity-component model in Leaf also solves a huge problem I have with lexicons, which is that you have to completely define all of the attributes that a record will have up front.
It doesn't allow you to kind of combine the natures of records, when ever record in a certain collection is supposed to have all the same fields.
Then if you need different data associated to something, you have to make a new record with a different lexicon, instead of being able to attach new data and schemas ( components ) to the same record. 
Because of that Leaf is going to end up with it's own component schema ecosystem.
Like Leaf apps will want to share, as much as possible, common component definitions like BasicMeta.
And Lexicons are doing the same thing, trying to make lexicons that different ATProto apps can share, but they'll necessarily be organized differently than Leaf's components.
So to me it seems kind of like the best option we have is to make some kind of converters which are basically just some kind of script that can map back and forth between lexicon records and leaf entities.
Something kind of similar to Cambria I guess in idea, in that you define a 2-way mapping that might be able to be automated and defined with some kind of declarative language maybe.

Project Cambria: Translate your data with lenses

Changing schemas in distributed software is hard. Could adopting bidirectional lenses help?
I think the situations that you want to convert between the two is pretty app-dependent.
Like usually you'll want to just use Leaf data in a Leaf app, but you might want to have a way to publish your blog post to Whitewind's lexicon on ATProto or something like that.

meri — 9/5/2025, 11:20 am
that makes a lot of sense to me. Leaf as more primarily editing/collaboration layer, ATProto as broader publication/distribution layer maybe
like ATProto records as an output format is what i was thinking. but i am also interested in how schemas can be shared and interoperable and evolving - while in that editable/collab stage 
so i can see that ATProto is better suited for mass distribution than this kind of flexible collab relationships

Zicklag — 9/5/2025, 11:21 am
We do have a plan for storing all of your Leaf data on your PDS, still. Because I think having the PDS is such a great win for user-control over their data and we want to use that as like an online "backup target" so that even if it isn't really "lexicon compatible" you do still have your data on your PDS almost immediately when using Leaf. ( If possible. )
Basically we need to store our Leaf entities in a key-value store that supports range queries, but the PDS doesn't let us do that ( yet, it might in the future give us more control, but not yet ). So the question is how do you put that data on your PDS without hitting rate limits when you have thousands of keys updated all the time.
The hope is to use [[Sedimentree]], which is also used in [[Keyhive]], almost like a replacement for an LSM tree. We can make our key-value store a history-discarding commit DAG, and then sedimentree will convert our commits into compressed ranges. When a commit range is compressed, it can discard all of the intermediate values that a key was set to and only keep the latest one. Then we can upload these compressed ranges to the PDS, and sedimentree is designed so that the older commits end up in bigger chunks, so that we aren't constantly re-uploading big ranges.
That's a really experimental idea, though, so we'll have to see if it actually works.

meri — 9/5/2025, 11:27 am
I read the DDIA part on LSM trees recently but again another area where i am still building intuition. High write throughput. Is this the structure you expect the sync server to use? Was there a particular DBMS you had in mind?

Zicklag — 9/5/2025, 11:30 am
It's almost an "abuse" of the idea, but we're not really using it to get "high write throughput" exactly, but we are, relatively, in a similar situation where we have high-volume of small, random writes to our data, and we need to send it to a relatively slow storage. Our slow storage in this case happens to be the PDS blob storage over an HTTP API, instead of a "slow hard drive".
So it's actually a way that the web client, for example, can take it's local key-value store with all the entities in it, and replicate it to the PDS just by copying the compressed commit ranges and uploading them as blobs. 

meri — 9/5/2025, 11:33 am
Oh, I think I understand - I had heard a description of Sedimentree, but the comparison with LSM trees hadn't occurred to me, but now you describe them both as kind of layers of increasing efficiency/compression I see the similarity
I asked about sync servers because I haven't designed that part for Organ yet and what you said around range queries made me curious
but it sounds like the solution is to have these kind of batched commit ranges in the PDS for more asynchronous sync, and direct webRTC or Iroh connections for realtime collab
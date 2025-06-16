> [!QUESTIONS]
> No rush on getting back to these but just so I put them down while i'm thinking about them: 
> - what are `_weird` subdomains for?,
> - what's the relationship with atproto DID records? Is this to do with verifying people's bsky accounts?,
> - is there currently a restriction on people putting custom domain CNAMES to their free subdomain?

OK, so at a high level the basic requirement for the DNS server is that we need to be able to serve DNS records based on records that we have in a Redis database. 
For Weird we need to be able to divvy out usernames, and we need to make sure that we never have the same username given to two people or anything like that, so the eventually consistent CRDT sync setup doesn't work well for that.
So having the centralized Redis store for the small amount of central data we need has seemed to be a pretty decent solution so far.
We're not super tied to it, though, if there end up being easier / better alternatives somehow.

## what are `_weird` subdomains for?
 
Very similar to the `_atproto` records, the point of the `_weird` records was for somebody to be able to say, "I'm assigning this domain as a 'handle', so to speak, for this Weird entity."
Leaf is more generic than Weird, and what we will be moving everything to eventually, so the idea in the future would be to use `_leaf` records like we do now in Roomy for spaces.
Zicklag — Yesterday at 9:47 am
For example if you look up the _leaf.fungifriends.goose.art TXT record you will see the value:
id=leaf:p6w07akdcn95vfgrxpmzsndt343tgvx2hvvr1gfdxnmypnw7fab0
 
That allows us to resolve fungifriends.goose.art as a DNS-based handle to it's Leaf identity, which, in this case is a Roomy space that you can get to here: 
https://roomy.chat/-/atlearning.place

Now, since Weird also needs to host websites for it's users, the DNS server was also responsible for returning the A records for each Weird-controlled DNS name.
For example if I signed up as zicklag.weird.one, then the DNS server would automatically serve a `_leaf.zicklag.weird.one` record for resolving my handle to my Weird profile, and it would also add an A record that would resolve to the Weird webserver so it could render my website at zicklag.weird.one.
If I also wanted to be able to use my Weird handle as an ATProto handle, then I could configure that in the Weird UI, and it would allow me to set my ATProto DID so that it could add an `_atproto.zicklag.weird.one` record that ATProto could use to verify my handle and lookup my ATProto ID from my domain.
is there currently a restriction on people putting custom domain CNAMES to their free subdomain?
There's not a limitation per se, but it wouldn't actually work because there is just one Weird webserver and when you hit a site like https://zicklag.dev/ it takes the domain and does a lookup in the Redis database to see if there is a username associated to that domain. If there is, it displays their site. 
But if you pointed a random domain at your free site, it wouldn't know which user is actually associated with the domain ( as you mention a CNAME could actually give you the hint, but it's not actually looking at that ), so it would just return a 404.

Zicklag — Yesterday at 9:57 am
There is something worth considering here that would maybe make things simpler and fend off our need for a DNS server immediately.
So ATProto allows you to resolve your DID by hosting a /.well-known/atproto-did ( or something like that ) text file containing the ATProto DID.
This can be easier than requiring DNS records in many cases, because hosting a DNS server isn't the easiest thing ever.
That's actually how all of the username.bsky.social domains resolve, though the .well-known record, because it's much easier to host that than a DNS server.
Then we could potentially use wildcard domains to point all of Weird subdomains at the Weird server, so that we don't have to make A records programatically from our server.
For example we just make sure we have a CNAME that resolves all `*.weird.one` domains to weird.one, and the same deal with the other suffixes we have like `*.norml.one`.
That would be simpler and more stable to start with and @erlend I'm wondering if maybe we should just do that for now.
So that would mean that for Leaf, instead of having to use DNS to resolve `_leaf.fungifriends.goose.art` we would just do a fetch  to https://fungifriends.goose.art/.well-known/leaf-id.
That might actually be more work for some people, though, because now you need a webserver, which of course you can get for free with GitHub pages, but adds another step some people while being much easier for others. 
We're definitely going to want a DNS server eventually, though.

Zicklag — Yesterday at 10:04 am
Anyway, as far as DNS technology, I think we need to use a production grade DNS server, not a hand-rolled one.
There's just a lot of little weird things to get right. 

Zicklag — Yesterday at 10:12 am
looking around for the configurable / scriptable DNS servers I had found...
The one that was looking good, if a little enterprise-y, but that can be good sometimes, was: https://doc.powerdns.com/authoritative/index.html
CoreDNS is another possibility, but it requires extensions to be written in Go and compiled into the app: https://coredns.io/
CoreDNS: DNS and Service Discovery

Zicklag — Yesterday at 10:22 am
PowerDNS allows you to specify a Lua backend, so that all the results are computed by a Lua script: https://doc.powerdns.com/authoritative/backends/lua2.html
I'm not exactly sure what it takes to connect Lua to the Redis database, though.

meri — Yesterday at 10:25 am
how does the resolution happen? like from the leaf entity id to the roomy space 

Zicklag — Yesterday at 10:25 am
Ooh, actually, the pipe backend might be better.
Then we can write it in Rust or TypeScript and use a normal Redis client: https://doc.powerdns.com/authoritative/backends/pipe.html 
That's pretty cool, actually.

Zicklag — Yesterday at 10:29 am
Since the web-app can't actually resolve DNS because of browser limitations we have a tinty leaf-resolver microservice that simply does the DNS query to resolve the domain to a Leaf ID if possible. 

meri — Yesterday at 10:30 am
right. sorry i'm just not piecing together what the client then does with the Leaf ID

Zicklag — Yesterday at 10:30 am
Oh, gotcha, it takes the Leaf ID and tries to open() it.
That will try to load it from local storage if it exists, and also try to sync / load it from the syncsever or any other sync peers ( right now we just have everything sync through the syncserver ). 

meri — Yesterday at 10:32 am
ohh right. so fungifriends.goose.art doesn't function as a URL the browser can load, it's just a handle
that was confusing me

Zicklag — Yesterday at 10:32 am
Exactly.
Just like a bluesky handle.

meri — Yesterday at 10:32 am
yep, that makes sense

Zicklag — Yesterday at 10:33 am
So like, pretty much any kind of entity could have a DNS handle that resolves to it. 

meri — Yesterday at 10:33 am
what does it look like currently for end users setting up a custom domain to a weird site? i guess my assumption was they set a CNAME pointing to the subdomain they got assigned

Zicklag — Yesterday at 10:34 am
They actualy setup a CNAME to weird.one.

meri — Yesterday at 10:34 am
ok that clears things up

Zicklag — Yesterday at 10:35 am
Or if it's an apex the preferably set an ALIAS or ANAME record or some places support CNAME flattening, so that you don't have to set an IP address.
That's not supported by all DNS providers, but we don't have a totally stable reserved IP so we're trying not to advertise that option in case we have to change our IP one day because we move cloud provider. 

meri — Yesterday at 10:36 am
why would the end user need to set an IP address?

Zicklag — Yesterday at 10:36 am
Setting up a CNAME pointing to their specific sub-domain might make more sense from a security standpoint, but I think I've thought about this before and it's not totally necessary. ( Had something to do with multiple users trying to claim the same custom domain at the same time. 🤔 ) 
Yeah, actually we might want to make you set it to a unique sub-domain for your user account so it's less ambiguous. 

Zicklag — Yesterday at 10:37 am
Because DNS is weird and only allows CNAME records for subdomains. 🤷‍♂️ 
I think it's probably for some kind of historical reasons.

meri — Yesterday at 10:37 am
oh TIL!
So just for context, the way I was going forward with Organ, I did not consider setting up a DNS server. I wrote a proxy server that would serve people's published files from (Cloudflare) R2 by checking the subdomain against what user was recorded for that subdomain in (Cloudflare) KV storage, then scope paths to that user's bucket namespace
So people would publish files by uploading them to R2 and that would be available at organ.is/userid/mydir/index.html, and the proxy server would proxy requests from username.organ.is/mydir to that
and i was thinking that in this setup, adding well-known files is really trivial

meri — Yesterday at 10:44 am
i'd be really interested to see if you have holes you would poke in that approach

Zicklag — Yesterday at 10:45 am
Honestly I'm kind of keen on staring off without a DNS server.
We'll want one eventually because it'll allow us to give people really easy and sometimes automatic config of their DNS server for different situations / apps, which I think could be handy.
But it's not critical for us right now.
So, other than Cloudflare KV being sepecific to Cloudflare ( Redis is nice because there are other hosted options and it's super easy to self-host ), that part sounds pretty similar.
And then as far as uploading files, we'd just have our server which would be similar in role to your proxy, use Leaf for storage, along with statically serving files like the .well-known files for leaf and ATProto.

meri — Yesterday at 10:48 am
are you using DigitalOcean Spaces for object storage atm?

Zicklag — Yesterday at 10:49 am
No, all storage is either on the PDS, or stored locally in a key-value/sqlite DB on the DigitalOcean droplet. 

meri — Yesterday at 10:49 am
the PDS being Bluesky PDS?

Zicklag — Yesterday at 10:49 am
Since the CRDT storage is just key-value, and we don't need to put it on another service because the sync system allows us to cluster automatically if we need to in the future. 

Zicklag — Yesterday at 10:49 am
Yep.

Zicklag — Yesterday at 10:50 am
( though a service might not hurt, if we weren't locked in ) 

meri — Yesterday at 10:50 am
there's a lot of s3 compatible options around
i was also imagining extending the proxy to function as a PDS where the json files are just published on R2 (etc) in the same way as html files etc are

Zicklag — Yesterday at 10:52 am
Do you think we need S3?
I'm just thinking that having thousands of chat messages and accessing them as separate objects in S3 might be high-latency.
But, I realize now there are multiple kinds of storage we need.
HTML cache storage, and entity storage.
I'm imagining that we have a cluster of servers that use local RocksDB KV store for entity storage, so it's super fast, and since the servers can automatically replicate eventually-consistent style we get automatic replication.
Then HTML cache storage is just cache, each server can generate on the fly when it gets a request, then store it in a local cache for quick retrieval.
So then all we need is a cluster of our webservers, and maybe a separate service to backup the data to S3 as an archive / safety measure in case we lose all of the servers.

meri — Yesterday at 10:55 am
caching published Weird pages?

Zicklag — Yesterday at 10:55 am
Yeah.
Like right now Weird renders everything on demand, from the entity data. 

meri — Yesterday at 10:55 am
right!

meri — Yesterday at 10:56 am
to me one of the biggest benefits of having in browser rendering is to offload that to the client

erlend — Yesterday at 3:58 pm
Is this still a consideration? There was a lot of discussion past this point.
I’m mainly wondering if there’s any DNS stuff we could bypass entirely by adopting the atproto PDS into our stack sooner rather than later, effectively deferring DNS stuff to them.

Zicklag — Yesterday at 11:57 pm
Yeah, I think we can just wait on DNS for now. 
ATProto doesn't really do any DNS stuff either, but it doesn't need to.
🤔 Thinking about it, it doesn't really reduce the features that we have available.
We have to add a tiny bit of extra logic to our code for resolving handles to Leaf entities, but that's nothing.
We weren't offering DNS services yet anyway, so we can basically work around our need to have a custom DNS server without any limitations until we actually want to let users manage DNS under their Weird accounts. 

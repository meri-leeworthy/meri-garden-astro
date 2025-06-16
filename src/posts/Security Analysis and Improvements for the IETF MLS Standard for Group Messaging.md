---
type: paper
year: "2020"
editor: CRYPTO
aliases:
  - Re-randomized TreeKEM
---
Analyses [[TreeKEM]] as defined at [[Messaging Layer Security|MLS]] spec draft 8 and shows that it has issues with [[Forward secrecy]] 

Paper to first define term [[Continuous Group Key Agreement]] as a cryptographic primitive

Introduces *Re-randomised TreeKEM*

"even harder to decentralise \[than TreeKEM]" [[Key Agreement for Decentralized Secure Group Messaging with Strong Security Guarantees]]

# Paper

## Abstract

Secure messaging (SM) protocols allow users to communicate securely over untrusted infrastructure. In contrast to most other secure communication protocols (such as TLS, SSH, or Wireguard), SM sessions may be long-lived (e.g., years) and highly asynchronous. In order to deal with likely state compromises of users during the lifetime of a session, SM protocols do not only protect authenticity and privacy, but they also guarantee forward secrecy (FS) and post-compromise security (PCS). The former ensures that messages sent and received before a state compromise remain secure, while the latter ensures that users can recover from state compromise as a consequence of normal protocol usage. 

SM has received considerable attention in the two-party case, where prior work has studied the well-known double-ratchet paradigm, in particular, and SM as a cryptographic primitive, in general. Unfortunately, this paradigm does not scale well to the problem of secure *group* messaging (SGM). In order to address the lack of satisfactory SGM protocols, the IETF has launched the message-layer security (MLS) working group, which aims to standardize an eponymous SGM protocol. In this work we analyze the *TreeKEM* protocol, which is at the core of the SGM protocol proposed by the MLS working group. 

On a positive note, we show that TreeKEM achieves PCS in isolation (and slightly more). However, we observe that the current version of TreeKEM does not provide an adequate form of FS. More precisely, our work proceeds by formally capturing the exact security of TreeKEM as a so-called *continuous group key agreement* (CGKA) protocol, which we believe to be a primitive of independent interest. To address the insecurity of TreeKEM, we propose a simple modification to TreeKEM inspired by recent work of Jost et al. (EUROCRYPT ’19) and an idea due to Kohbrok (MLS Mailing List). We then show that the modified version of TreeKEM comes with almost no efficiency degradation but achieves *optimal* (according to MLS specification) CGKA security, including FS and PCS. Our work also lays out how a CGKA protocol can be used to design a full SGM protocol.

## Introduction

#### *Secure messaging.* 

End-to-end Secure Messaging (SM) allows people to exchange messages without compromising their authenticity nor privacy. To further their applicability the protocols in this work are designed for the, so called, *asynchronous* setting. In the context of (secure) messaging “asynchronous” means that no assumptions are made about the online/offline behavior of participants. E.g. at times no participant at all may be online. Some participants may be offline for long periods while others are online only irregularly. It may even be that for the duration of a session no more than a single participant is online simultaneously nor should they rely on any particular user being online to perform operations.1 Thus, protocols for the asynchronous setting must eschew interactive communication (which greatly increases the difficulty of achieving strong security properties). In other words all protocol operations (e.g. creating a new session, adding/removing participants to an existing session and sending a messages in a session) must always be performed by sending out a *single* packet to enact the desired operation. In fact, (due to desired constraints on bandwidth) all protocols in this work actually send out the same packet to all participants as a single broadcast.

1 Classic insecure examples of such messaging applications are SMS and eMail.

In contrast to common secure communication protocols such as TLS, IPSEC and SSH, SM protocols are designed for settings where sessions may exist for long periods of time. SM protocols are therefore expected to satisfy so-called *forward secrecy* ([[Forward secrecy|FS]]) and *post-compromise security* ([[Post-compromise security|PCS]]) (a.k.a. backward secrecy). The former means that even when a participant’s key material is compromised, past messages (delivered before the compromise) remain secure. Conversely, PCS means that once the compromise ends, the participants will eventually recover full security as a side effect of continued normal protocol usage. 

The rigorous design and analysis of two-party asynchronous SM protocols has received considerable attention in recent years. This is in no small part due to advent of the double ratchet paradigm, introduced by Marlinspike and Perrin [27]. Forming the cryptographic core of a slew of popular messaging applications (e.g., Signal, who first introduced it, as well as WhatsApp, Facebook Messenger, Skype, Google Allo, Wire, and more), double ratchet protocols are now regularly used by over a billion people worldwide.

However, double ratchet protocols are inherently designed for the case where only two users communicate with each other. In order to employ them for groups with more than two users, there is thus little or no alternative to running double ratchets between all pairs of users (at least to distribute and update key material). Unfortunately, that means the double ratchet paradigm does not scale well in settings with a large number of users. In particular, the communication complexity to update key material (an operation crucial to providing PCS) grows *linearly* in the group size. In fact, this poor performance holds for *all*, currently deployed, SM protocols enjoying some form of FS and PCS (i.e., including non- double ratchet based ones [20]).

This begs the natural question of how to build secure asynchronous group messaging protocols (SGM) that enjoy similar security properties to the two- party ones but whose efficiency scales (say) logarithmically in the group size.

#### *Message layer security and TreeKEM*

In order to address the lack of satisfactory SGM protocols, the IETF has launched the message-layer security (MLS) working group, which aims to standardize an eponymous SGM protocol [5,29]. Following in the footsteps of the double ratchet, the MLS protocol promises to be widely deployed and heavily used. Indeed, the working group already includes various messaging companies (Cisco, Facebook, Google, Wickr, Wire, Twitter, etc.) whose combined messaging user base includes everything from government agencies, political organizations, and NGOs, to companies both large and small— not to mention a major part of the world’s consumer population.

The heart of the MLS standard is the so-called TreeKEM protocol. TreeKEM continuously generates fresh, shared, and secret randomness used by the participating parties to evolve the group key material. Each new group key is used to initiate a fresh symmetric hash ratchet that defines a stream of nonce/key pairs used to symmetrically encrypt/decrypt higher-level application messages (such as texts in a chat) using an AEAD (authenticated encryption with associated data). A stream is used until the next evolution of the group key at which point a new stream is initiated.

So not only is TreeKEM the most novel and intricate part of the MLS draft, but understanding it is also central to understanding the security and efficiency properties of full MLS protocol itself. In particular, TreeKEM is crucially involved in achieving PCS and FS.

### 1.1 Contributions

#### *Continuous group key agreement*

This paper makes progress in the formal study of secure group-messaging protocols (SGMs) by studying the security of the latest version of the TreeKEM protocol. First, our work defines the notion of *continuous group key agreement* (CGKA) and casts TreeKEM as a CGKA protocol. CGKA protocols provide methods for adding as well as removing group members and, most crucially, for performing updates. Each update operation is initiated by an arbitrary user and results in a new so-called *update secret*. Update secrets are high-entropy random values that the parties use to refresh their group key material in the higher-level protocols (e.g., in the SGM). In an update operation, the initiator also suitably encrypts information about the update secret for other group members.

Our security definition for CGKA protocols requires that (i) users obtain the same update secrets (correctness), (ii) update secrets look random to an attacker observing the protocol messages, (iii) past update secrets remain random even if the state of a party is compromised by the attacker (FS), and (iv) parties can recover from state compromise (PCS). All of these properties are captured by a single, fairly intuitive security game. 

We argue that the formal security properties of CGKA are phrased in such a way that it is a suitable building block for full SGM protocols. In particular, CGKA is inspired by the modularization of Alwen et al. [2], who constructed a secure two-party messaging protocol (based on the double-ratchet paradigm) by combining three primitives: continuous key agreement (CKA), forward secure authenticated encryption with associated data (FS-AEAD), and a so-called PRF-PRNG, which is a two-input hash function that is a pseudo- random function (resp. generator) with respect to its first (resp. second) input. CGKA is therefore to be seen as the multi-user analogue of CKA and is tailored to be used in conjunction with a PRF-PRNG and the multi-user version of FS-AEAD. Specifically, the update secret is run through the PRF-PRNG in order to obtain new keys for the multi-user FS-AEAD. Due to the already quite high complexity of CGKA itself, this work focuses exclusively on CGKA and sketches how it can be used in a higher-level protocol to obtain a full SGM protocol.

#### *TreeKEM has poor forward secrecy*

Having defined the notion of CGKA, we analyze the latest version of TreeKEM w.r.t. the new definition. By doing so, we observe that there are serious issues with TreeKEM’s forward secrecy, stemming from the fact that its users do not erase old keys sufficiently fast. Specifically, note that in order to efficiently perform updates (with packet sizes logarithmic in the number of users), TreeKEM arranges all group members at the leaves of a binary tree and uses public-key encryption (PKE) to encrypt information about update secrets, denoted by I, to specific subsets of members (determined by their position in the tree). After processing the update, however, parties do not erase or modify the PKE secret keys used to decrypt the update information, since they might need them to process future updates. Hence, corrupting any party other than the update initiator will completely reveal I to an attacker, thereby violating FS. In fact, we show that in a group with n members, in order for I to remain secret upon state compromise of an arbitrary user, even in the best case at least Ω(n/log(n)) many additional updates are required before the compromise in the best case. This can rise to Ω(n) many updates in the worst case (depending on the order of updates). Even worse, unless the sibling (in the tree) of I’s initiator performs an update, I is never forward secret regardless of who else updates.

Our work formally captures the exact type of FS achieved by TreeKEM by providing an appropriate weakening of the CGKA security definition and proving that TreeKEM satisfies it. On a positive note, even the weakened definition provides PCS, i.e., TreeKEM’s update secrets are at least backward secure.

#### *Fixing TreeKEM*

In order to remedy TreeKEM’s issues with FS, we devise a new type of public-key encryption (PKE) (based on work by Jost et al. [24] and a suggestion by Konrad Kohbrok on the MLS mailing list [26]) and show that using it in lieu of the (standard) PKE within TreeKEM results in a protocol with *optimal* FS. Specifically, with the new flavor of PKE, *public and secret keys suitably change with every encryption and decryption*, respectively. This kind of key evolution ensures that after decryption, the (evolved) secret key leaks no information about the original message, thereby thwarting the above attack. We also provide a very efficient instantiation of the new PKE notion, thereby ending up with a practical fix and *going from very loose to optimal security at negligible cost*, albeit under the following assumption about the order in which messages are delivered to all participants.

#### *Global ordering of messages*

Our main CGKA security definitions encode ==the assumption that the delivery server (which caches protocol messages until users come online again) delivers CGKA messages in the same order to all users in a session==. Having said that, ==the delivery server (which we modeled formally as the adversary)== may still drop or delay messages at will, as well as ==decide on the delivery order between users arbitrarily== (as long as each user eventually gets the same order of protocol messages). We remark that this assumptions is made explicitly in the MLS design spec. (cf. Section 11 of version 8 [5]) albeit only in terms of conditions required to guarantee functionality, not security. Moreover, the TreeKEM protocol was designed with that in mind. (It is worth noting that the assumption could also be practically realized in the public bulletin board model, e.g., using a block-chain protocol.)

Of course, an alternative approach would have been to remove the assumption from our security definitions. The correctness and security implications of doing this are somewhat subtle; for example, it is inevitable that the current group can easily be split into disjoint sub-groups, who might not even be aware of each other, simply thinking that people in other subgroups are offline rather than “split”. We discuss these issues in Sect. 7, pointing out that the “right” security level desired in this case is not yet settled and agreed upon in the MLS community (for good reasons rather than lack of effort, as we explain in Sect. 7). We also note that it is relatively trivial for a higher level protocol building on the CGKA (such as MLS) to ensure users only accept CGKA messages in the same order as intended by their sender. E.g. MLS ensures this by having ==sender and receivers of CGKA packets necessarily agree on the hash of the preceding transcript in order to authenticate and decrypt new CGKA packets==.

Given this state of affairs, we feel that we are justified to follow the current MLS guidelines, by building the global ordering of messages assumption into our model, so that we can: (1) achieve the strongest possible security (including FS, PCS and guaranteed agreement), as well as (2) analyze TreeKEM in the security model *it was designed for*. However, in Sect. 7 we discuss ==what happens in TreeKEM (and our improved version) when the order delivery assumption does not hold==, including the following two security guarantees: (1) Compromising user ID, who was removed from the perspective of sub-group A, should not compromise the security of A, even if ID “split” to a different subgroup B prior to removal from A; (2) Compromising user ID, who updated its state after “split- ting” from A, should not compromise the security of A.

#### *Adaptive security*

The security of both TreeKEM and the improved version mentioned above is proved w.r.t. a *non-adaptive* attacker, i.e., an attacker that is required to announce all corruptions at the beginning (as opposed to being able to corrupt on-the-fly depending on values and messages produced by the protocol).

The difficulty in handling adaptive security is inherent for any cryptographic protocol where keys can encrypt others keys, and the attacker might ask to selectively corrupt some subset of keys. Prominent examples include multicast and generalized selective decryption [16,30], constraint PRFs [17], and Yao’s garbled circuits [23], among many others. In each of these setting, going from non-adaptive to adaptive security naively would result in exponential security loss in some natural parameter n for the corresponding setting. 

A major breakthrough in improving the state of provable security security against adaptive attackers in such settings came from a series of works, starting with Panjwani [30], and culminating with a very clever and general reduction technique of Jafargholi et al. [22]. These highly non-trivial works which showed that in certain cases, one can get adaptive security at the multiplicative reduction factor of “only” nlog n  2n. While these provable, yet “super-polynomial”, reductions are still far from being usable in the real world, they are substantially better than the trivial exponential security loss mentioned above, and serve as further evidence that the corresponding protocols are likely secure “in the real world” — a view commonly shared by the majority of practitioners. 

Fortunately, we managed to adapt the same non-trivial reduction technique to the setting of TreeKEM, showing the slightly super-polynomial security even in the adaptive setting. As mentioned above, this is the best we can do using the current state-of-the-art in adaptive security in all the “selective decryption” applications we know. In the full version of the paper [3] we discuss several research directions related to SM.

...

## 3 Continuous Group Key Agreement

The purpose of continuous group key-agreement (CGKA) is to continuously provide members of a messaging group with fresh secret random values, which they use to refresh their key material (in a higher-level protocol). This section formally defines the syntax of CGKA schemes and presents a security notion that simultaneously captures correctness, key indistinguishability, forward secrecy, as well as post-compromise security.

### 3.1 CGKA Syntax

A CGKA scheme provides algorithms to create a group, add as well as remove users, perform updates, and process protocol messages. 

**Definition 1.** 

A continuous group key-agreement (CGKA) scheme CGKA = (**init**, **create**, **add**, **rem**, **upd**, **proc**) consists of the following algorithms: 
- **Initialization**: init takes an ID ID and outputs an initial state γ. 
- **Group creation**: create takes a state γ, a list of IDs G = (ID1, . . . , IDn), and outputs a new state γ′ and a control message W . 
- **Add**: add takes a state γ an ID ID′, and outputs a new state γ as well as control messages W and T . 
- **Remove**: rem takes a state γ and an ID ID′ and outputs a new state γ′ and a control message T . 
- **Update**: upd takes a state γ and outputs a new state γ′ and a control message T . 
- **Process**: proc takes a state γ and a control message T and outputs a new state γ′ and an update secret I.
# PDF

![](../public/9d80ee20dcfa28f060c2de877354bc24.pdf)
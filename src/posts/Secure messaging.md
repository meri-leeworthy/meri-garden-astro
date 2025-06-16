---
aliases:
  - SM
---
SM protocols are:
- asynchronous
- sessions are long-lasting and therefore need
- [[Forward secrecy]]
- [[Post-compromise security]]

They can use the double ratchet algorithm, but this is only a two-party protocol and doesn't scale well to large groups.

See also [[Secure group messaging]]

[[Security Analysis and Improvements for the IETF MLS Standard for Group Messaging]] pp.249-250:
>End-to-end **Secure Messaging (SM)** allows people to exchange messages without compromising their authenticity nor privacy. To further their applicability the protocols in this work are designed for the, so called, ==asynchronous== setting. In the context of (secure) messaging “asynchronous” means that ==no assumptions are made about the online/offline behavior of participants==. E.g. at times no participant at all may be online. Some participants may be offline for long periods while others are online only irregularly. It may even be that for the duration of a session no more than a single participant is online simultaneously nor should they rely on any particular user being online to perform operations.[^1] Thus, protocols for the asynchronous setting ==must eschew interactive communication== (which greatly increases the difficulty of achieving strong security properties). In other words ==all protocol operations (e.g. creating a new session, adding/removing participants to an existing session and sending a messages in a session) must always be performed by sending out a single packet to enact the desired operation==. In fact, (due to desired constraints on bandwidth) all protocols in this work actually send out the same packet to all participants as a single broadcast. 
>
>In contrast to common secure communication protocols such as [[Transport Layer Security]], IPSEC and SSH, SM protocols are designed for settings where ==sessions may exist for long periods of time==. SM protocols are therefore expected to satisfy so-called ==forward secrecy (FS) and post-compromise security (PCS)== (a.k.a. backward secrecy). The former means that even when a participant’s key material is compromised, past messages (delivered before the compromise) remain secure. Conversely, PCS means that once the compromise ends, the participants will eventually recover full security as a side effect of continued normal protocol usage. 
>
>The rigorous design and analysis of two-party asynchronous SM protocols has received considerable attention in recent years. This is in no small part due to advent of the ==double ratchet paradigm==, introduced by Marlinspike and Perrin \[27]. Forming the cryptographic core of a slew of popular messaging applications (e.g., Signal, who first introduced it, as well as WhatsApp, Facebook Messenger, Skype, Google Allo, Wire, and more), double ratchet protocols are now regularly used by over a billion people worldwide.
>
>However, ==double ratchet protocols are inherently designed for the case where only two users communicate with each other==. In order to employ them for groups with more than two users, there is thus little or no alternative to running double ratchets between all pairs of users (at least to distribute and update key material). Unfortunately, that means the double ratchet paradigm ==does not scale well in settings with a large number of users==. In particular, the communication complexity to update key material (an operation crucial to providing PCS) grows linearly in the group size. In fact, this poor performance holds for all, currently deployed, SM protocols enjoying some form of FS and PCS (i.e., including non- double ratchet based ones \[20]). 
>
>This begs the natural question of how to build secure asynchronous group messaging protocols ([[Secure group messaging|SGM]]) that enjoy similar security properties to the two- party ones but whose efficiency scales (say) logarithmically in the group size.

[^1]: Classic insecure examples of such messaging applications are SMS and eMail.

\[27]: [[The Double Ratchet Algorithm]]
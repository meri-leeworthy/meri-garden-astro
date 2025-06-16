WhatsApp (and Signal) approach to [[Secure messaging]] group messaging:

> *Meri note: Signal apparently also mostly uses Sender Keys and falls back to pairwise*
> "Contrary to the folklore understanding that the Signal Messenger uses the pairwise channels approach for group messaging in small groups, Signal currently uses Sender Keys whenever possible. We refer to Appendix B for details." [footnote 1](https://eprint.iacr.org/2023/1385.pdf)

[[Key Agreement for Decentralized Secure Group Messaging with Strong Security Guarantees]] s3:
> *[[Sender Keys]]* is another simple protocol, used by WhatsApp [ 36 , 43 ]. In Sender Keys, each group member generates a symmetric key for messages they send, and then sends this key individually to each other group member using the two-party Signal protocol. For each message sent by this member to the group, a new key is derived pseudorandomly from the previous key, providing a ratchet for forward secrecy. Whenever a user is removed, each remaining group member generates a new key and sends it to the other remaining members over the same two-party channels. The protocol could provide PCS by updating keys periodically, but WhatsApp chooses not to do this. 

>*Meri note: So my understanding is that every group member receives a symmetric key corresponding to each sender which initialises a [[Pseudorandom Generator|PRG]] ratchet for [[Forward secrecy]]. This key is sent using the two-party Signal protocol (is this basically the same as just [[The X3DH Key Agreement Protocol|X3DH]] at this point though?)*

> ==With this construction, we have reduced the problem of secure group messaging to the problem of generating a sequence of update secrets $I_1, I_2, . . . .$ for each group member. That is the responsibility of a DCGKA protocol==, defined in Section 6.1. For example, in the Sender Keys protocol (Section 3), ==a group member picks a fresh random update secret, then sends it to every other group member using a two-party secure messaging channel (e.g. the Signal protocol)==. Sender Keys has the downside that to heal a compromise, each group member must send a new update secret to every other group member, resulting in 𝒪(n2) messages via the two-party channels. 
> *Meri note: confused how [[Sender Keys]] works - in Signal it seems that there is just a public key that re-initialises the DH ratchet - what does the secret do?*

[[WhatsApp Encryption Overview]]:
> End-to-end encryption of messages sent to WhatsApp groups utilize the established pairwise encrypted sessions, as previously described in the “Initiation Session Setup” section, to distribute the “Sender Key” component of the Signal Messaging Protocol. 
> 
> When sending a message to a group for the first time, a “Sender Key” is generated and distributed to each member device of the group, ==using the pairwise encrypted sessions==. The message content is encrypted using the “Sender Key”, achieving an efficient and secure fan-out for the messages that are sent to groups. 
> 
> The first time a WhatsApp group member sends a message to a group: 
> 
> 1. The sender generates a ==random 32-byte Chain Key==. 
> 	- *Meri note: isn't the Chain Key meant to come from the DH ratchet?*
> 1. The sender generates a random Curve25519 Signature Key key pair. 
> 2. The sender combines the 32-byte Chain Key and the public key from the Signature Key into a Sender Key message. 
> 3. The sender individually encrypts the Sender Key to each member of the group, using the pairwise messaging protocol explained previously. 
> 
> For all subsequent messages to the group: 
> 
> 1. The sender ==derives a Message Key from the Chain Key, and updates the Chain Key.== 
> 	- *this is kind of similar to the Signal symmetric ratchet*
> 2. The sender encrypts the message using AES256 in CBC mode. 
> 3. The sender signs the ciphertext using the Signature Key. 
> 4. The sender transmits the single ciphertext message to the server, which does server-side fan-out to all group participants
> 
> The “hash ratchet” of the message sender’s Chain Key provides forward secrecy. Whenever a group member leaves, all group participants clear their Sender Key and start over. 
> 
> In Chat Device Consistency information is included when distributing a “Sender Key” and then excluded from the subsequent messages encrypted with the Sender Key. 
> 
> See Implementation with Cloud API for details on Groups on Cloud API.
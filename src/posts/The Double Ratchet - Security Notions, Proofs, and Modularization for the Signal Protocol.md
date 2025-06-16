---
aliases:
  - "The Double Ratchet: Security Notions, Proofs, and Modularization for the Signal Protocol"
  - forward secure AEAD
  - FS-AEAD
---
Introduces the concept of *continuous key agreement* (CKA)
"**CKA** (the 2-party analogue of [[Continuous Group Key Agreement|CGKA]]) abstracts the asymmetric core of a double-ratchet based 2-party secure messaging protocol" 
Formalising [[The Double Ratchet Algorithm]]
Formalises forward secure [[Authenticated Encryption with Associated Data (AEAD)|AEAD]]
## FS-AEAD
>"We encrypt $m_i$ using $k_i$ in an ==authenticated encryption scheme with associated data (AEAD)==, where the associated data includes the message index i. The resulting ciphertext $c_i$ is broadcast to all group members. We then delete $I_1$, $k_i$ and the old ratchet state from memory, preventing an adversary from obtaining $k_i$ if the user is subsequently compromised. This construction has been formalized as ==*forward secure AEAD*== [2, §4.2]." [[Key Agreement for Decentralized Secure Group Messaging with Strong Security Guarantees]] (section 4)

>The first block is forward-secure authenticated encryption with associated data (FS-AEAD) and models ==secure messaging security inside a single so-called epoch; an epoch should be thought of as a unidirectional stream of messages sent by one of the parties, ending once a message from the other party is received==. As indicated by the name, an FS-AEAD protocol must provide forward secrecy, but also immediate decryption. Capturing this makes the definition of FS-AEAD somewhat non-trivial (cf. Fig. 3), but still simpler than that of general SM; in particular, no PCS is required (which allows us to define FS-AEAD as a deterministic primitive and not worry about poor randomness). Building FS-AEAD turns out to be rather easy: in essence, one uses message counters as associated data for standard AEAD and a PRG to immediately refresh the secret key of AEAD after every message successfully sent or received. ==This is exactly what is done in [[The Double Ratchet Algorithm|Signal]]==. (133-134).

![](../public/784c94c794cb28ba16c4ad78333bbc0a.pdf)
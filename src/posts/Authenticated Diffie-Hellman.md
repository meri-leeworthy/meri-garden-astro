---
aliases:
  - Authenticated key exchange
---
## 4o: Is authenticated [[Diffie-Hellman key exchange|Diffie-Hellman]] basically just DH but using permanent (identity) keys?

Yes, that’s a solid way to think of **Authenticated Diffie-Hellman** (AuthDH). The core idea is indeed to take the basic DH key exchange and layer it with **authentication mechanisms**, often using permanent identity keys, to verify each party’s identity. This approach protects against man-in-the-middle (MitM) attacks.

Here’s how it essentially works:

1. **Identity Keys**: Each participant has a long-term, verifiable identity key (typically a private-public key pair). These identity keys serve as a “proof of identity” for each party involved in the key exchange.
  
2. **Signed Messages**: During the exchange, each party signs their DH public key with their private identity key. The other party can then verify the signature using the sender’s public identity key, ensuring that the DH public key comes from the legitimate party.

3. **Authentication + Confidentiality**: By verifying each other's identity, both parties can be confident that the DH exchange is not being intercepted or tampered with by an unauthorised entity. The shared secret itself is still generated as it would be in standard DH, so the established key remains confidential.

4. **Protocols Using AuthDH**: Many modern cryptographic protocols, such as **TLS** (Transport Layer Security) and **Signal** (used in encrypted messaging), incorporate Authenticated Diffie-Hellman. They typically use either certificates (TLS) or out-of-band authentication (Signal) for the identity keys.

### Additional Consideration: Perfect Forward Secrecy (PFS)

In many implementations, AuthDH is combined with **ephemeral keys** (keys that change for each session). This combination provides **authenticated ephemeral Diffie-Hellman** and ensures **perfect forward secrecy**. So even if a long-term identity key is compromised, past sessions remain secure, as each session uses a unique DH key pair that is discarded after use.

### Summary

Authenticated Diffie-Hellman can be thought of as “standard DH + identity verification” via permanent identity keys. It preserves the core DH protocol but adds a verification layer that secures it against impersonation attacks, making it a robust choice for secure key exchanges in real-world applications.
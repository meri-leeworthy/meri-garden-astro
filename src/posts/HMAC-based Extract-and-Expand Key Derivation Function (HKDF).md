---
aliases:
  - HKDF
author:
  - H. Krawczyk and P. Eronen
year: "2010"
---
H. Krawczyk and P. Eronen, “HMAC-based Extract-and-Expand Key Derivation Function (HKDF).” Internet Engineering Task Force; RFC 5869 (Informational); IETF, May-2010. [http://www.ietf.org/rfc/rfc5869.txt](http://www.ietf.org/rfc/rfc5869.txt)

Used in [[The Double Ratchet Algorithm]] & [[The X3DH Key Agreement Protocol]] (p.3):

> KDF(KM) represents 32 bytes of output from the HKDF algorithm [3] with inputs: 
- *HKDF input key material* = F || KM, where KM is an input byte sequence containing secret key material, and F is a byte sequence containing 32 0xFF bytes if curve is X25519, and 57 0xFF bytes if curve is X448. F is used for cryptographic domain separation with XEdDSA [2]. 
- *HKDF salt* = A zero-filled byte sequence with length equal to the hash output length. 
- *HKDF info* = The info parameter from Section 2.1.

**Basically it seems like once you have the 'extracted' (randomised) key from the initial key, you can then just pass that into HMAC as the key for some other data and then to create a [[The Double Ratchet Algorithm|KDF Chain]] you just use part of the output as the key for HMACing the next input data**
## 4o summary

The HMAC-based Extract-and-Expand Key Derivation Function (HKDF) described in RFC 5869 is a widely used cryptographic algorithm for deriving keys securely from a source of randomness. Here’s a breakdown of its core principles and why it’s used:

### Purpose and Use of HKDF

HKDF is designed for secure key derivation, which involves creating cryptographic keys from an initial keying material. This process is essential in protocols where multiple cryptographic keys need to be generated from a single secret, especially when that single secret may not be perfectly uniform. HKDF is robust against attacks by ensuring the derived keys have strong randomness properties.

### Basic Structure

HKDF has two main stages:

1. **Extract:** This step processes the initial key material into a more uniform, pseudorandom key.
2. **Expand:** The derived pseudorandom key is then expanded to produce multiple cryptographic keys.

### Steps in HKDF

1. **Extract Phase:**
   - Uses a [[Hash-based Message Authentication Code]] (HMAC) to "extract" entropy from the input keying material.
   - This is done by mixing the input key material (IKM) with a "salt" (an optional, random value) to produce a single pseudorandom key (PRK).
   - The formula for this phase is:$$
     \text{PRK} = \text{HMAC}(\text{salt}, \text{IKM})
     $$   
   - If no salt is provided, HKDF uses an empty string as the default salt. However, adding a salt significantly increases security.

2. **Expand Phase:**
   - Expands the PRK into multiple cryptographic keys.
   - An HMAC function iteratively applies the PRK, adding context-specific information (like protocol-specific data) called “info” to ensure the derived keys are unique and appropriate for different applications.
   - This phase is defined as:$$
     \text{OKM} = \text{HMAC}(\text{PRK}, T[i] + \text{info} + i)
     $$  
   - ==Here, `T[i]` refers to each HMAC output chunk, and `i` denotes the index of the output block.== *this is a bit unclear to me*
   - The length of the output key material (OKM) is flexible, allowing HKDF to produce keys of varying lengths. 

### Why HKDF is Secure and Useful

- **Independence of Derived Keys:** The extracted pseudorandom key is isolated from specific properties of the initial keying material, making each derived key resistant to correlation attacks.
- **Scalability:** The expand phase lets HKDF produce as many keys as needed, which is crucial for complex protocols requiring multiple independent keys.
- **Standardization:** By using HMAC, which itself is a secure and standardized function, HKDF benefits from the security assurances of HMAC, including resistance to collision and preimage attacks.

### Applications

HKDF is commonly used in protocols like Transport Layer Security (TLS) and Internet Key Exchange (IKE) due to its simplicity, security, and adaptability in environments requiring multiple keys. Its structure and flexibility make it especially suited to network security protocols.

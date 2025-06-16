---
aliases:
  - AEAD
---
A message is **encrypted and authenticated,** and sent with some data that is **unencrypted but also authenticated**

## Wikipedia:

Authenticated Encryption (AE) is an encryption scheme which simultaneously assures the data confidentiality (also known as privacy: the encrypted message is impossible to understand without the knowledge of a secret key[1]) and authenticity (in other words, it is unforgeable:[2] the encrypted message includes an authentication tag that the sender can calculate only while possessing the secret key[1]). Examples of encryption modes that provide AE are [[Galois - Counter Mode|GCM]], CCM.[1]

Many (but not all) AE schemes allow the message to contain "associated data" (AD) which is not made confidential, but its integrity is protected (i.e., it is readable, but tampering with it will be detected). A typical example is the header of a network packet that contains its destination address. To properly route the packet, all intermediate nodes in the message path need to know the destination, but for security reasons they cannot possess the secret key.[3] Schemes that allow associated data provide **authenticated encryption with associated data**, or AEAD.[3]
...
### Authenticated encryption with associated data
Authenticated encryption with associated data (AEAD) is a variant of AE that allows the message to include "associated data" (AD, additional non-confidential information, a.k.a. "additional authenticated data", AAD). A recipient can check the integrity of both the associated data and the confidential information in a message. AD is useful, for example, in network packets where the header should be visible for routing, but the payload needs to be confidential, and both need integrity and authenticity. The notion of AEAD was formalized by Rogaway (2002).[3] 
## 4o:
A simple example of an Authenticated Encryption with Associated Data (AEAD) scheme is **AES-GCM** (Advanced Encryption Standard in [[Galois - Counter Mode]]). AES-GCM is widely used because it’s efficient, secure, and relatively easy to implement.

Here's a basic outline of how AES-GCM works:

1. **Key and Nonce**: You start with a secret key (typically 128 or 256 bits) and a unique nonce (number used once) for each encryption operation. The nonce does not need to be secret but must be unique.

2. **Associated Data (AD)**: The "associated data" is any additional information you want to authenticate but not encrypt (e.g., headers, metadata). This data will be included in the integrity check but will not be encrypted.

3. **Encryption and Authentication**:
   - The plaintext (message you want to encrypt) is encrypted with the key and nonce.
   - During encryption, GCM mode generates a tag, which is a cryptographic digest that authenticates both the ciphertext and the associated data. If anyone tries to tamper with either, the tag will not match upon decryption.

4. **Output**: The output of AES-GCM is:
   - The ciphertext (encrypted data),
   - The authentication tag (for integrity),
   - The associated data (usually sent in plaintext since it's not encrypted).

5. **Decryption**: To decrypt, the recipient uses the same key and nonce. The scheme will check the authentication tag against the associated data and ciphertext. If they match, decryption proceeds; if not, it fails (indicating potential tampering).

**Example Usage**:
Imagine you’re sending a message with metadata that includes headers. You could use AES-GCM to encrypt the message and include the headers as associated data. This way, the recipient can verify both the encrypted message's integrity and that the metadata hasn’t been altered.

In code, most libraries offer a straightforward AES-GCM API, taking a key, nonce, plaintext, and associated data and returning the ciphertext and tag.
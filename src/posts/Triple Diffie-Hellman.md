## 4o:

A **standard, non-triple [[Diffie-Hellman key exchange|Diffie-Hellman]] (DH)** typically involves just one pair of keys.

In a **basic Diffie-Hellman key exchange**, neither Alice nor Bob has to use permanent keys. Instead, each party generates an **ephemeral** key pair (temporary for that session), and they exchange the public portions of these keys to create a shared secret.

However, in an **[[Authenticated Diffie-Hellman|authenticated key exchange]]** without triple DH, using permanent keys allows Alice and Bob to confirm each other’s identities. Here’s how it works:

1. **Permanent Key Exchange** (one DH exchange):
   - Each party uses their permanent (long-term) private key with the other party’s permanent public key to create a shared secret.
   - This allows Alice and Bob to authenticate each other since each knows the other's permanent key. However, it does not provide forward secrecy, because if an attacker later gains access to these permanent keys, they could decrypt the session.

This approach has limitations, especially around **forward secrecy**. Without using ephemeral (temporary) keys, each session’s security is fully tied to the permanent keys. If those permanent keys are ever compromised, **all past communications could be decrypted**.

#### Why Just Permanent Keys Aren’t Enough
Using only permanent keys in DH:
- **Lacks [[Forward secrecy]]:** If the permanent keys are compromised, an attacker can retroactively decrypt any past session.
- **No Session Uniqueness:** Each session would rely on the same permanent keys, making every session’s shared secret the same, or easily reconstructable if either party’s key leaks.

In summary, non-triple DH involving only permanent keys offers basic identity verification but lacks the robustness and security layers that **triple DH (3DH)** provides with its mix of permanent and ephemeral keys.

### What is Triple Diffie-Hellman?

The initial idea behind the **Triple Diffie-Hellman (3DH)** protocol was to provide a **secure method for authenticated key exchange** in which two parties can derive a shared secret while also verifying each other’s identities. This idea extended upon the basic Diffie-Hellman key exchange by introducing multiple rounds of Diffie-Hellman operations, primarily to strengthen security against man-in-the-middle attacks and ensure mutual authentication. Here’s how 3DH accomplishes this:

1. **Multiple Diffie-Hellman Exchanges:** The 3DH protocol relies on performing three separate Diffie-Hellman exchanges using combinations of long-term and ephemeral keys from both participants. By involving both **static (long-term)** and **ephemeral (temporary)** keys, it increases security against various attacks, including replay attacks and certain classes of impersonation attacks.

2. **Authenticated Key Exchange:** The use of both static and ephemeral keys allows each participant to authenticate the identity of the other party. Since each party has a long-term identity key, it becomes significantly more challenging for an attacker to impersonate someone without access to those keys.

3. **Deriving the Shared Secret:** The final shared secret is derived by hashing or otherwise combining the three Diffie-Hellman shared secrets obtained during the exchanges. The use of three components in the key exchange (hence, “triple” Diffie-Hellman) provides robustness, especially in ensuring that the shared secret is only accessible to the legitimate parties.

The Triple Diffie-Hellman concept ultimately contributed to the foundation of **modern cryptographic protocols** like Signal’s **X3DH (Extended Triple Diffie-Hellman)**, which improved upon 3DH by formalising its structure and addressing specific security guarantees needed for secure messaging.

### How it works

Imagine two people, **Alice** and **Bob**, who want to securely talk to each other. They want to make sure they’re talking to the real person (and not an imposter) and that no one else can listen in.
#### Here’s what they do in 3DH:

1. **Keys for identity and privacy:**  
   - Both Alice and Bob have **two types of keys**:
     - **Permanent key** (their ID key) – like a "username" that only they know the secret to.
     - **Temporary key** – a one-time key they use just for this chat.

2. **Three secrets from mixing keys:**  
   - Alice and Bob **combine their keys** in different ways to create **three shared secrets**:
     1. Alice’s permanent key with Bob’s temporary key.
     2. Bob’s permanent key with Alice’s temporary key.
     3. Their two temporary keys together.
   - These combinations are like “handshakes” between their keys that only they can perform.

3. **Final secret they both share:**  
   - After they mix these three secrets together (usually by hashing), they end up with a final secret code – a **shared secret**.
   - Only the real Alice and Bob can make this secret because they’re the only ones with all these keys.

4. **Safe and trusted chat begins:**  
   - Now they have a shared secret, so they know they’re talking to the real person and not an imposter.
   - They can use this shared secret to encrypt their conversation, keeping it private from anyone else.

So, in short:
- **3DH** uses a mix of permanent and temporary keys to create a strong secret between two people.
- This secret keeps their conversation **private and authenticated** – they know who they’re talking to, and no one else can join.

### Which keys are used, how?

In 3DH, Alice and Bob combine their keys in a way that typically involves **Alice’s private keys with Bob’s public keys**, and vice versa. Each combination creates a shared secret that only Alice and Bob can compute because each one has the necessary private key on their side. Here’s how they mix them:

1. **Alice’s private permanent key with Bob’s public temporary key.**
   - ==This combination proves that it’s really Alice because only she has her private permanent key==. It also involves Bob’s temporary key to keep it specific to this chat session.

2. **Alice’s private temporary key with Bob’s public permanent key.**
   - ==This combination shows that Bob’s permanent identity is involved==, and Alice is also using a temporary key that’s unique to this session.

3. **Alice’s private temporary key with Bob’s public temporary key.**
   - This combines both of their temporary keys, creating ==a unique, session-specific secret that has nothing to do with their permanent identities==.

By combining in these three ways, they create three unique secrets. They **hash** or mix these secrets together to make a **final shared secret**. This shared secret is what they use to secure their messages, encrypting the chat in a way that only Alice and Bob can decrypt – as they’re the only ones with the correct combination of private and public keys.

So to summarise: **Each mix is Alice’s private key with Bob’s public key (and vice versa for Bob),** ensuring only they can generate the shared secrets.

### Why is the third DH necessary?

The third Diffie-Hellman (DH) exchange – the one where Alice and Bob both use their **temporary keys** – is crucial because it provides **forward secrecy** and strengthens the session's uniqueness.

Here's why it matters:

1. **Forward Secrecy:**  
   - Forward secrecy ensures that even if someone later manages to steal Alice's or Bob's permanent keys, they **still can't decrypt past messages**. This is because each session relies on a unique secret created with temporary keys that are discarded after the session.
   - Since this third DH is based solely on ephemeral (temporary) keys, it **can't be recreated later** – it’s a secret that only exists during this session.

2. **Session Uniqueness:**  
   - Combining temporary keys from both Alice and Bob ensures that the shared secret is unique for each session. Even if Alice and Bob have multiple conversations, each session’s shared secret will be different because they generate fresh temporary keys every time.
   - This way, if one session is somehow compromised, it doesn’t affect any other sessions they have, past or future.

3. **Extra Security Layer:**  
   - This third DH makes it more complex for an attacker. If someone tries to impersonate either Alice or Bob, they would need both the permanent and temporary private keys, which is practically impossible without access to each participant's device for that specific session.

In short, the **third DH exchange adds an extra layer of security**, giving forward secrecy and ensuring that every conversation is distinct. Without it, if an attacker ever got a hold of Alice’s or Bob’s permanent keys, they could potentially decrypt all past messages – which 3DH’s design specifically aims to prevent.
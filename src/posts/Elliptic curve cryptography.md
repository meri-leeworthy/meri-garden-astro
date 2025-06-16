An approach to public-key cryptography.
- Used in [[Transport Layer Security]] and Bitcoin, [[The X3DH Key Agreement Protocol|X3DH]]
- Based on computational hardness of finding discrete logarithm of a random elliptic curve element with respect to a publicly known base point (as opposed to hardness of integer factorisation of large primes for RSA)
- Smaller keys than [[RSA]]

From Wikipedia:
### Security concerns
> In 2013, _[The New York Times](https://en.wikipedia.org/wiki/The_New_York_Times "The New York Times")_ stated that [Dual Elliptic Curve Deterministic Random Bit Generation](https://en.wikipedia.org/wiki/Dual_EC_DRBG "Dual EC DRBG") (or Dual_EC_DRBG) had been included as a NIST national standard due to the influence of [NSA](https://en.wikipedia.org/wiki/NSA "NSA"), which had included a deliberate weakness in the algorithm and the recommended elliptic curve. [RSA Security](https://en.wikipedia.org/wiki/RSA_Security "RSA Security") in September 2013 issued an advisory recommending that its customers discontinue using any software based on Dual_EC_DRBG. In the wake of the exposure of Dual_EC_DRBG as "an NSA undercover operation", cryptography experts have also expressed concern over the security of the NIST recommended elliptic curves, suggesting a return to encryption based on non-elliptic-curve groups.
> 
> Additionally, in August 2015, the NSA announced that it plans to replace Suite B with a new cipher suite due to concerns about [quantum computing](https://en.wikipedia.org/wiki/Quantum_computing "Quantum computing") attacks on ECC

4o:
> The concerns around Elliptic Curve Cryptography (ECC) after the Dual_EC_DRBG scandal primarily involve confidence in the integrity of specific implementations rather than ECC as a whole. The Dual_EC_DRBG (Dual Elliptic Curve Deterministic Random Bit Generator) vulnerability, which surfaced around 2013, exposed an NSA-introduced backdoor in a pseudo-random number generator (PRNG) that used elliptic curves, not in ECC itself.

> The main issues stemming from Dual_EC_DRBG are:

1. **Distrust in Standardisation Bodies**: The scandal damaged trust in certain cryptographic standards, as Dual_EC_DRBG was NIST-approved despite its known weaknesses. This mistrust has made practitioners wary of adopting any cryptographic standards without careful scrutiny, particularly those where the parameters are not transparent or open to audit.

2. **Scrutiny of Curve Parameters**: The Dual_EC_DRBG backdoor was possible due to specific parameters chosen by the NSA. Since then, researchers and practitioners have been vigilant about the potential for “suspicious” parameters in elliptic curve choices, especially if these choices aren’t generated transparently. This scrutiny has led to higher trust in curves like Curve25519 and Curve448, which have clear, verifiable parameters.

3. **No Direct Vulnerability in ECC**: ECC, as a mathematical framework for cryptography, remains sound. The vulnerability in Dual_EC_DRBG involved PRNG manipulation rather than exploiting the elliptic curve's inherent security properties. Consequently, ECC remains widely trusted and used for secure communication protocols, such as TLS, and in many modern cryptographic systems.

4. **Shift to Safer Algorithms**: In the wake of the Dual_EC_DRBG incident, there has been a push towards more transparent and community-reviewed algorithms and curves. Elliptic curves like the NIST P-256 have fallen somewhat out of favour, with ==Curve25519== gaining popularity for being designed with transparent, auditable parameters.

> In short, while the Dual_EC_DRBG backdoor hurt the reputation of specific cryptographic standards and made practitioners more cautious, it did not affect the mathematical robustness of ECC itself. The field has responded by moving towards more carefully selected curves and implementations, keeping ECC as a trusted method in modern cryptography.

From Wikipedia:
### Quantum computing attack
> [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm "Shor's algorithm") can be used to break elliptic curve cryptography by computing discrete logarithms on a hypothetical [quantum computer](https://en.wikipedia.org/wiki/Quantum_computing "Quantum computing"). The latest quantum resource estimates for breaking a curve with a 256-bit modulus (128-bit security level) are 2330 [qubits](https://en.wikipedia.org/wiki/Qubits "Qubits") and 126 billion [Toffoli gates](https://en.wikipedia.org/wiki/Toffoli_gate "Toffoli gate"). For the binary elliptic curve case, 906 qubits are necessary (to break 128 bits of security). In comparison, using Shor's algorithm to break the [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem) "RSA (cryptosystem)") algorithm requires 4098 qubits and 5.2 trillion Toffoli gates for a 2048-bit RSA key, suggesting that ECC is an easier target for quantum computers than RSA. All of these figures vastly exceed any quantum computer that has ever been built, and estimates place the creation of such computers at a decade or more away.[citation needed]
> 
> [Supersingular Isogeny Diffie–Hellman Key Exchange](https://en.wikipedia.org/wiki/Supersingular_isogeny_key_exchange "Supersingular isogeny key exchange") claimed to provide a [post-quantum](https://en.wikipedia.org/wiki/Post-quantum_cryptography "Post-quantum cryptography") secure form of elliptic curve cryptography by using [isogenies](https://en.wikipedia.org/wiki/Isogenies "Isogenies") to implement [Diffie–Hellman](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman "Diffie–Hellman") key exchanges. This key exchange uses much of the same field arithmetic as existing elliptic curve cryptography and requires computational and transmission overhead similar to many currently used public key systems. However, new classical attacks undermined the security of this protocol.
> 
> In August 2015, the NSA announced that it planned to transition "in the not distant future" to a new cipher suite that is resistant to [quantum](https://en.wikipedia.org/wiki/Quantum_computing "Quantum computing") attacks. "Unfortunately, the growth of elliptic curve use has bumped up against the fact of continued progress in the research on quantum computing, necessitating a re-evaluation of our cryptographic strategy."
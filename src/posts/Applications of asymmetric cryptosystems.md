One of the biggest drawbacks with symmetric cryptosystems is that in order for a user to communicate with another, they each need to share a common secret key. This seems trivial if the number of users communicating is relatively small. However, as the number of users scale -p, with each pair having private conversations, the number of keys that need to be exchanged and kept secret grows larger as well.

Public key cryptosystems alleviate this challenge as a single key pair can be used to communicate with multiple users. As each key pair can only be used in conjunction to perform the encryption and decryption operations, any user who has access to the public key can encrypt the plaintext. However, the only key which can then decrypt the ciphertext is the private key, which is not shared with anyone. An adversary obtaining an encrypted message from someone else that is meant for the receiver cannot decrypt it even after knowing the key used to encrypt it in the first place.

In comparison to symmetric cryptosystems, asymmetric cryptosystems can be less efficient. This is due to the larger key size required for both the private and public keys to thwart any attempts to guess the other key pair through brute force or any other techniques. However, despite this, asymmetric cryptosystems have been widely applied to do the following:

## Encryption and decryption

The very basics of a cryptographic algorithm. However, despite the compromise in speed, users tend to use asymmetric cryptosystems to encrypt/decrypt messages intended to a specific recipient, or when the secrecy of the communication is mandated which must use traditional channels for sending such as email but are not meant to be read by anyone else.

## Digital signatures

Probably one of the most notable uses for asymmetric cryptosystems. As each key pair can encrypt/decrypt given the specific algorithm, a user can use an asymmetric algorithm to digitally "sign" their message. This allows for non-repudiation, where the sender cannot deny sending the message, but also allows for verification, where the receiver can be quite confident that the message has actually been sent by the expected sender itself.

## Key exchange

And the most used application for asymmetric cryptosystems is that of key exchange. While symmetric cryptosystems were fast, one of their main drawbacks was the key exchange process. As such, one of the adopted facets of asymmetric algorithms has been to facilitate the exchange of the secret key itself. Using this approach, two users initiate communication using asymmetric algorithms, negotiate and decide a secret key, which is then transmitted to the other user using the asymmetric algorithm. Once the key exchange is complete, the users can then simply use symmetric encryption to exchange encrypted data which can now be decrypted by the other user.

You will see some more detail of these concepts in upcoming lessons.

It is important to note that not all algorithms can support all of the three applications mentioned above.
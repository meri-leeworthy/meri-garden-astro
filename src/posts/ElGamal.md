# Monash

Another cryptosystem that is also based on the [[Discrete logarithm problem]] is that proposed by T. ElGamal. The ElGamal cryptosystem is very similar to the [[Diffie-Hellman key exchange|Diffie-Hellman]] algorithm that you have studied earlier. However, unlike the latter, the former can be used for encrypting the plaintext message and decrypting the ciphertext message. 

As this cryptosystem is very similar to the Diffie-Hellman algorithm, in this lesson the three phases of the algorithm will be briefly outlined and provide an example to illustrate how the cryptosystem can be used.

## Key generation process 

The ElGamal algorithm also ==requires two common integers to be defined and available to all parties== involved in the communication as follows: 

q − a prime number 
α − a primitive root of q 

The key generation phase of the cryptosystem can be defined as follows: 

- Each user generates a random number X, and computes Y such that: $$Y = α^X \mod q $$
- Upon computing this, X becomes the user's private key that is kept secret, and Y becomes the public key that can be shared with other users publicly. 

Any user who wishes to communicate with the other needs to have access to q, α, and the Y value of the intended recipient.

## Encryption process 

The next stage involves the actual encryption and transmission of the plaintext message. Once a user can obtain these three values, they can perform the encryption operation as follows: 

First, the sender must represent the plaintext message M, as an integer such that: 

$$0 ≤ M ≤ q − 1 $$

Messages that are longer in length, must define a block size according to that the message is sequentially broken down into ensuring that all block values are less than q.

The sender then generates a random k, such that 

$$0 ≤ k ≤ q − 1 $$

Then, the sender calculates a one-time key K as follows: 

$$K = (Y_A)^k \mod q $$

Next, each block of the plaintext message M is encrypted as a pair of integers (C1, C2) as follows: 

$$C_1 = α^k \mod q; C_2 = KM \mod q $$

## Decryption process 

Lastly, once the recipient receives the encrypted message, the process of decryption can be performed as follows: 

The recipient must first determine the random one-time key K, as follows 

$$K = (C_1)^{X_A} \mod q $$

Once the recipient has determined the one-time key K used to encrypt the message, the recipient can decrypt the rest of the message as follows: 

$$M = (C_2 K^{-1}) \mod q $$

The proof that this cryptosystem works can be presented as follows: 

First, determine that K is in fact recoverable within the decryption process: 

$$K = (Y_A)^k \mod q $$

$$K = (α^{X_A} \mod q)^k \mod q$$

$$K = α^{kX_A} \mod q$$
$$K = (C_1)^{X_A} \mod q $$

Next, ascertain that the plaintext is recoverable as follows: 

C =2 KM mod q 

C K mod q =( 2 −1 ) M 

KM K mod q =( −1 ) M 

M mod q = M

M = M

## Illustrative example

### Key generation 

First de�ne q and all possible primitive roots for selecting α 

GF 19 =( ) 2, 3, 10, 13, 14, 15{ } 

q ⟶ 19, α ⟶ 10 

Next, Alice generates a key pair using the de�ned values of q and α as follows: 

X =Alice 5 

Y =Alice α mod q =X Alice 10 mod 19 =5 3 

Alice's private key is now 5, and Alice's public key is {q, α, Y}, which is {19, 10, 3}. 

### Encryption 

Assuming that Bob now wants to send a message M = 17 to Alice. 

Bob would �rst generate a secret K as follows: 

k = 6 

K = Y mod q =( Alice )k 3 mod 19 =6 7 

Next, Bob calculates the values for C1 and C2 as follows: 

C =1 α mod q =k 10 mod 19 =6 11 

C =2 KM mod q = 7 ⋅ 17 mod 19 = 5 

Bob can now transmit the ciphertext {11, 5} to Alice. 

## Decryption 

Upon receiving the ciphertext, Alice can now decrypt the message to obtain the plaintext as follows: 

K = C mod q =( 1 )X Alice 11 mod 19 =5 7 

Having obtained K, Alice �rst need to obtain the inverse of K, as follows

K :−1 GF 19 =( ) 7 mod 19 =−1 11 

Now having obtained the inverse of K, Alice can then compute the plaintext message as follows: 

M = C K mod q =( 2 −1 ) 5 ⋅ 11 mod 19 = 17 

It is important to note that when encrypting a large message consisting of many sequential blocks, each block must use a di�erent value of k. Should the same value of k be used, then the message can be easily deciphered by an adversary if knowledge of one block is known. 

An illustration of the ElGamal cryptosystem in Python code has been shown below. 
``` python
# Code borrowed without modification from 
# https://www.geeksforgeeks.org/elgamal-encryption-algorithm/ 
# Python program to illustrate ElGamal encryption 
import random from math 
import pow a = random.randint(2, 10) 

def gcd(a, b): 
	if a < b: 
		return gcd(b, a) 
	elif a % b == 0: 
		return b; 
	else: 
		return gcd(b, a % b) 
		
# Generating large random numbers 
def gen_key(q): 
	key = random.randint(pow(10, 20), q) 
	while gcd(q, key) != 1: 
		key = random.randint(pow(10, 20), q) 
		
	return key 

# Modular exponentiation 
def power(a, b, c): 
	x = 1 
	y = a 
	
	while b > 0: 
		if b % 2 == 0: 
			x = (x * y) % c; 
		y = (y * y) % c 
		b = int(b / 2) 
		
	return x % c 
	
# Asymmetric encryption
def encrypt(msg, q, h, g): 
	en_msg = [] 
	
	k = gen_key(q) # Private key for sender 
	s = power(h, k, q) 
	p = power(g, k, q) 
	
	for i in range(0, len(msg)): 
		en_msg.append(msg[i]) 
		
	print("g^k used : ", p) 	
	print("g^ak used : ", s) 
	for i in range(0, len(en_msg)): 
		en_msg[i] = s * ord(en_msg[i]) 
		
	return en_msg, p 
		
def decrypt(en_msg, p, key, q): 
	dr_msg = [] 
	h = power(p, key, q) 
	for i in range(0, len(en_msg)): 
		dr_msg.append(chr(int(en_msg[i]/h))) 
	
	return dr_msg 
	
# Driver code 
def main(): 
	msg = 'encryption' 
	print("Original Message :", msg) 
	
	q = random.randint(pow(10, 20), pow(10, 50)) 
	g = random.randint(2, q) 
	
	key = gen_key(q) # Private key for receiver 
	h = power(g, key, q) 
	print("g used : ", g) 
	print("g^a used : ", h) 
	
	en_msg, p = encrypt(msg, q, h, g) 
	dr_msg = decrypt(en_msg, p, key, q) 
	dmsg = ''.join(dr_msg) 
	print("Decrypted Message :", dmsg); 
	
if __name__ == '__main__': 
	main()
```

You can attempt to learn the inner workings of the algorithm by changing the values of the plaintext input and some of the exponentiations of the keys, ensuring that any values substituted must comply with the requirements of the algorithm. 
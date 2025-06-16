The process of integer factorisation implies that any given integer _a > 1_ can be factored into a set of factors as follows:

$$a = p_1^{a1}⋅p_2^{a2}⋅ ... ⋅ p_t^{at}$$

where p1 < p2 < ... < pt are integers and ai is a positive integer.

However, we know that prime numbers are vital in cryptography, and prime numbers are only divisible by ±1 and the number itself.

# Primality testing

Generating a prime number, even a large one, is a P problem. However, when dealing with larger prime numbers, it is still necessary to ensure that the prime number is indeed prime. Unfortunately, this process of random prime generation is not very efficient. While there are many algorithms that can be used for primality testing, one of the most common ones is the Miller–Rabin algorithm.

The Miller–Rabin algorithm is designed to produce a prime number. However, when dealing with large numbers, it is improbable to determine if a number is prime or not. This algorithm aims to generate a number that is almost certainly a prime number.

In order to use the Miller–Rabin algorithm, the following two properties of prime numbers are defined:

1. The first property states that given a prime number _p_ and a positive integer _a_, such that _a < p_, then a^2 mod p = 1 iff either _a mod p = 1_ or _a mod p = -1 mod p = p - 1_.
    
2. The second property states that for any given prime number _p_, such that _p > 2_, we can express the following _p - 1 = 2^k * q_, where q is odd and k > 0.
    

Applying this, we can outline the Miller–Rabin algorithm as follows:

- For a given prime number _p_, determine a value of _k_ and _q_, with _k > 0_ and _q_ being odd, such that the following holds true:
    

$$p − 1 = 2^k⋅q$$

- Select a random integer a, such that 1 < a < p - 1.
    
- If the following holds true, then return the result as inconclusive.
    
$$    a^q mod p = 1$$
    
- Loop for _j = 0_ to _k - 1_ do the following:
    
    - If the following holds true, then return the result as inconclusive.
        
        $$a^{2jq} mod n = n − 1$$
        
- Return Composite.
    

As we can observe from the above algorithm, the algorithm returns "inconclusive" when an integer is possibly prime. However, a single test with _a_ doesn't guarantee primality. As such, the Miller–Rabin algorithm is repeatedly applied to an integer. The probability of the algorithm returning "inconclusive" for any given _a_ is _1/4_. As such, if _t_ different values of _a_ were selected to repeatedly test, the probability of all of the values returning inconclusive becomes _(1/4)^t_. Hence for a sufficiently large _t_, we can obtain a higher degree of confidence that _p_ is a prime.

The following is an example of an application of the Miller–Rabin algorithm to test a prime number:

**Step 1:** Test if 29 is a prime number?

$$(n−1)=28=22×7=2k×q$$

**Step 2:** Select a = 10

$$107mod 29=28$$

This will return inconclusive.

**Step 3:** Select a = 2

$$27mod 29=12$$

$$214mod 29=28$$

This will return inconclusive.

Similar testing will return inconclusive, implying that 29 is a prime.

**Note:** A safe assumption that can be made is that any even number is not prime, with the exception of 2.

# Integer factorisation problem

While the use of a single prime number in cryptography is possible, most algorithms generally use a pair of prime numbers. The integer factorisation problem states that given two prime numbers _p_ and _q_, and their product _n = p * q_. Would it be possible, if only given _n_, to determine the values of _p_ and _q_?

Computationally, this is a hard problem that is BQP. While it is possible for quantum computers to solve this problem using Shor's algorithm, it is not possible for normal computers to do this in P. If we rationalise this, given either _p_ or _q_ only, we can ascertain for primality. Given a composite _n_, we can find factors relatively easily such that _p * q = n_. However, if _p_ and _q_ are originally prime, there are only two prime factors that can resolve _n_.

To put this into perspective, consider _p_ and _q_ to be two numbers that are 100 digits in length when represented in decimal. As per Euler's totient function, Φ(p) = p - 1 and Φ(q) = q - 1, which again can be numbers ranging from 1 digit to 100 digits in length. The sheer volume of numbers that would have to be checked is extensive. Hence, the basis of using the integer factorisation problem has been one of the foundational algorithms in cryptography, specifically in generating encryption algorithms. At least, until quantum computers become mainstream devices, which is not very likely, at least for the immediate future.
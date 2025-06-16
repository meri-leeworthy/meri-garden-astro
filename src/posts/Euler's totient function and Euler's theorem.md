---
aliases:
  - Euler's totient function
  - Euler's theorem
---
## Euler's totient function

Euler's totient function, also known as the phi function due to the Greek letter phi (Φ) used to represent the function, is defined as: for any positive integer _n_, Φ(_n_) represents the number of numbers that are less than _n_ and relatively prime to _n_. By convention, Φ(1) = 1.

Let us consider an example:

Φ(35) = 1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34 = **24**

Φ(37) = 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36 = **36**

What we observe is that for any given number _n_, Φ(_n_) calculates all those numbers that are relatively prime as any number that does not have a common factor. For example, 10 is not included in Φ(35) as both 10 and 25 are divisible by 5.

The second thing we can observe is that for a prime number, every number lower than the prime number itself is relatively prime to the prime number. As such, for a given prime number _p_,

$$ϕ(p)=p − 1$$

As such, this theorem stipulates that given any two prime numbers _p_ and _q_, where _n = pq_,

$$ϕ(n)=ϕ(pq)=ϕ(p)⋅ϕ(q)=(p−1)⋅(q−1)$$

## Euler's theorem

Euler's theorem applies the totient function calculation to state that for every integer _a_ and _n_, that are relatively prime:

$$aϕ(n) ≡ 1 (mod n)$$

An alternative representation of the above equation can be shown as follows:

$$aϕ(n)+1 ≡ a (mod n)$$

The latter equation above doesn't require _a_ and _n_ to be relatively prime, however, the former does.

**Note:** The proof for this theorem can be found in your readings for this lesson.

## 4o:

In simpler terms:

### Euler's Totient Function

Euler's totient function,  $\phi(n)$ , counts how many numbers from 1 up to  $n-1$  are *relatively prime* to  $n$ . Two numbers are relatively prime if they don’t share any common factors besides 1.

For example:
-  $\phi(35)$ : The numbers less than 35 that don’t share any factors with 35 are 1, 2, 3, 4, 6, and so on up to 34, totalling **24** numbers. So,  $\phi(35) = 24$ .
-  $\phi(37)$ : Since 37 is prime, every number from 1 to 36 is relatively prime to it, so $\phi(37) = 36$ **.

For any prime number  $p$ , all numbers less than  $p$  are relatively prime to  $p$ , so  $\phi(p) = p - 1$ .

When we have two primes  $p$  and  $q$ , we can calculate  $\phi(p \times q)$  by multiplying the totients of each:
$$
\phi(pq) = (p - 1) \times (q - 1)
$$

### Euler's Theorem

Euler’s theorem builds on the totient function. It says that if we have two numbers  $a$  and  $n$  that are relatively prime, then:
$$
a^{\phi(n)} \equiv 1 \, (\text{mod} \, n)
$$
This means that if you raise  $a$  to the power  $\phi(n)$ , the result will be congruent to 1 when divided by  $n$ .

An alternative form of this theorem:
$$
a^{\phi(n)+1} \equiv a \, (\text{mod} \, n)
$$
In this form, $a$ and $n$ do *not* need to be relatively prime. This version says that raising  $a$  to the power  $\phi(n) + 1$  will give a result congruent to  $a$  when divided by  $n$ .

**Note**: The detailed proof for this theorem can be found in the materials for your lesson.
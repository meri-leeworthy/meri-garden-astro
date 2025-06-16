Fermat's little theorem is an important theorem for the area of cryptography. This theorem states the following:

$$a^{p−1}≡ 1 (mod p)$$

This holds true for any positive integer _a_ and prime number _p_, such that _a_ is not divisible by _p_.

Another common representation of this theorem is shown as follows:

$$a^p ≡ a (mod p)$$

The second equation is obtained by multiplying _a_ to both sides of the equation. The theory stipulates that should _a_ and _p_ be relatively prime, we can simply divide both sides by _a_ in order to get back to the first equation.

## Proof:

Consider a set _S_, which represents the set of all positive numbers less than _p_.

$$S ≡\{1, 2, 3, ..., p −1\}$$

Now consider a set _S',_ which is a permutation of the set _S_ obtained by multiplying each value in the set by _a_ modulus _p_.

$$S′ ≡\{1a, 2a, 3a, ..., (p −1)a\}(mod p)$$

From the above equation, it is clear that none of the elements are divisible by _p_, as such all elements in are distinct. However, if we were to suppose that:

$$ai ≡ aj (mod p)$$

However, since GCD(a,p)=1

$$i ≡ j (mod p)$$

this implies that i = j, as 1 ≤ i,j ≤ p -1. Hence, we can representing the product of _S'_, mod _p_, as follows:

$$1a⋅2a⋅3a⋅ ... ⋅(p −1)a ≡ [1⋅2⋅3⋅ ... ⋅ (p−1)](mod p)$$

$$a^{p−1}(p−1)! ≡  (p−1)!(mod p)$$

Resolving the factorial on both sides of the equation:

$$ap−1 ≡  1(mod p)$$

The above equation proves the theorem.

## 4o:

In simpler terms, Fermat's Little Theorem says this:

If you have a prime number  $p$  and any number  $a$  (as long as  $a$  isn't divisible by  $p$ ), then when you raise  $a$  to the power  $p - 1$ , the result will be equivalent to 1 when you divide by  $p$  (or, in modular terms,  $a^{p-1} \equiv 1 \, (\text{mod} \, p)$ ).

### Why This Matters

This theorem is useful in cryptography because it tells us something predictable about numbers when they’re divided by primes, which helps secure data.

### Second Form

Another way to write this is:
$$
a^p \equiv a \, (\text{mod} \, p)
$$
This just means that if you raise  $a$  to the power of  $p$ , the result is congruent to  $a$  (similar to saying the remainder is the same as  $a$ ) when you divide by  $p$ .

### Proof Idea

1. **Define a Set**: Consider the set  $S = \{1, 2, 3, ..., p - 1\}$ , which contains all numbers from 1 up to  $p - 1$ .
  
2. **Multiply by  $a$: Now, imagine a new set  $S'$  made by multiplying each number in  $S$  by  $a$  and then taking the remainder when divided by  $p$ . So,  $S' = \{1a, 2a, 3a, ..., (p-1)a\} \, (\text{mod} \, p)$ .

3. **Show the Numbers Stay Distinct**: Because  $a$  and  $p$  have no common factors (other than 1), multiplying by  $a$  doesn’t create any duplicates in  $S'$ ; all values in  $S'$  are distinct numbers between 1 and  $p - 1$ .

4. **Relate Products**: The product of all the numbers in  $S$  (i.e.,  $1 \cdot 2 \cdot 3 \cdot ... \cdot (p-1)$ ) should be the same as the product of all the numbers in  $S'$  when taken mod  $p$ . This gives us:
   $$
   1 \cdot 2 \cdot 3 \cdot ... \cdot (p-1) \equiv (1a) \cdot (2a) \cdot (3a) \cdot ... \cdot ((p-1)a) \, (\text{mod} \, p)
   $$

5. **Factor Out  $a^{p-1}$: This product becomes  $a^{p-1} \cdot (1 \cdot 2 \cdot ... \cdot (p-1)) \equiv 1 \cdot 2 \cdot ... \cdot (p-1) \, (\text{mod} \, p)$ .

6. **Cancel Terms**: Since  $1 \cdot 2 \cdot ... \cdot (p-1)$  appears on both sides, it can be cancelled, leaving us with  $a^{p-1} \equiv 1 \, (\text{mod} \, p)$ .

This completes the proof, showing that  $a^{p-1} \equiv 1 \, (\text{mod} \, p)$ , which is Fermat's Little Theorem.
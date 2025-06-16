In this lesson we will briefly explore the concepts of Modulo arithmetic and its importance to cryptographic algorithms.

$$a=qn+r   ∣  0≤r<n; q=⌊a/n⌋$$

$$a=⌊a/n⌋⋅n+(a mod n)$$

Given two positive integers _a_ and _n_, the **modulus** of _a_ mod _n_ is defined as the remainder of the division operation n|a.

For example: 11 mod 7 = 4 and -11 mod 7 = 3. An alternative representation used quite commonly is 11 ≡ 4 (mod 7).

This is the first use of the modulus operation. It is used as a binary operator to determine the remainder of the division operation.

There is another way in which the modulus operator can be used. And that is as a congruence relation to determine the equivalence between two integers, as follows:

a=b (mod n), such that (a mod n) = (b mod n)a=b (mod n), such that (a mod n) = (b mod n)

For example: 11 ≡ 4 (mod 7) and -11 ≡ 3 (mod 7).

Properties of congruence:

- a ≡ b (mod n) if n|(a - b)
    
- a ≡ b (mod n) → b ≡ a (mod n)
    
- a ≡ b (mod n) and b ≡ c (mod n) → a ≡ c (mod n).
    

**Note:** The modulus is generally represented as the smallest positive number. For negative numbers, the process of **modulo reduction** is applied, which allows for reducing negative numbers to the smallest positive number as the modulus.

# Modular arithmetic

Since modulo arithmetic allow for reducing a given integer _n_ to be within a set of integers (0, 1, 2, ... n-1), it possible for us to perform arithmetic operations using modulo arithmetic. In order to perform modulo arithmetic, we need to observe the following properties:

## Modular addition:

$$[(a mod n) + (b mod n)] mod n = (a + b) mod n$$

## Proof:

Applying the division algorithm we can stipulate the following:

$$a=n∗q1+r1 where 0<=r1<n and q1 is an integer.a mod n=r1$$

$$b=n∗q2+r2 where 0<=r2<n and q2 is an integer.b mod n=r2$$

$$(a+b)=n∗(q1+q2)+r1+r2$$

Applying this to our equation above, we get:

$$[(a mod n)+(b mod n)]mod n=(a+b)mod n$$

$$[r1+r2] mod n=(n∗(q1+q2)+r1+r2) mod n$$

$$[r1+r2] mod n=(r1+r2) mod n,elimination all multiples of n due to mod n$$

$$LHS = RHS$$

## Modular subtraction:

$$[(a mod n)−(b mod n)]mod n=(a−b)mod n$$

## Proof:

Applying the division algorithm we can stipulate the following:

$$a=n∗q1+r1 where 0<=r1<n and q1 is an integer.a mod n=r1$$

$$b=n∗q2+r2 where 0<=r2<n and q2  is an integer.b mod n=r2$$

$$(a−b)=n∗(q1−q2)+r1−r2$$

Applying this to our equation above, we get:

$$[(a mod n)−(b mod n)] mod n=(a−b) mod n$$

$$[r1−r2] mod n=(n∗(q1−q2)+r1−r2) mod n$$

$$[r1−r2] mod n=(r1−r2) mod n, elimination all multiples ofn due to mod n$$

$$LHS = RHS$$

## Modular multiplication:

$$[(a mod n) ⋅ (b mod n)] mod n = (a ⋅ b) mod n$$

## Proof:

Applying the division algorithm we can stipulate the following:

$$a=n∗q1+r1 where 0<=r1<n and q1 is an integer.a mod n=r1$$

$$b=n∗q2+r2 where 0<=r2<n and q2 is an integer.b mod n=r2$$

$$(a∗b)=(n∗q1+r1)∗(n∗q2+r2)$$

Applying this to our equation above, we get:

[(a mod n)∗(b mod n)] mod n=(a∗b) mod n

[r1∗r2] mod n=((n∗q1+r1)∗(n∗q2+r2)) mod n

[r1∗r2] mod n=(n∗q1∗n∗q2+n∗q2∗r1+n∗q1∗r2+r1∗r2) mod n

[r1∗r2] mod n=(r1∗r2) mod n, elimination all multiples of n due to mod n

LHS=RHS

# Modular exponentiation

Modular exponentiation applies the same principles of modular multiplication with the number being multiples of the number itself. However, the challenge with modular multiplication is that the exponentiated product gets large very quickly, especially when applied in cryptography. An efficient process is needed to reduce the number while exponentiating.

Take a look at the following example:

a2 mod c=(a∗a) mod c=((a mod c)∗(a mod c)) mod c

Let us apply this to a more concrete example:

7256 mod 13=?

How can we calculate the above value quickly, even if we were to implement the code for this calculation? To do this, we break the exponentiation as follows:

(71) mod 13=7

(72) mod 13=((71) mod 13∗(71) mod 13) mod 13=(7∗7) mod 13=49 mod 13=10

(74) mod 13=(72) mod 13∗(72) mod 13) mod 13=(10∗10) mod 13=100 mod 13=9

And so on until we reach:

(7256) mod 13=(7128) mod 13∗(7128) mod 13) mod 13=(3∗3) mod 13=9 mod 13=9

It is important to note that the above reduction works well when the exponentiated value is a power of 2. However, this is not always the case. The below example demonstrates the process again for this scenario.

5117 mod 19=?

First, we represent the exponent in binary as follows:

117=1110101 (in binary)

117=26+25+24+22+20

117=64+32+16+4+1

5117mod 19=5(64+32+16+4+1) mod 19=(564∗532∗516∗54∗51) mod 19

Applying the same process as we did in the previous example for exponentiated powers of 2, through deduction we can arrive at the following outcome:

5117 mod 19=1


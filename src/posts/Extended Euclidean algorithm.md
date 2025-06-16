The Extended Eucliean algorithm (EEA) is considered to be reciprocal to modular exponentiation. The algorithm stipulates that given two values _a_ and _b_, starting with the GCD, we can work backwards to obtain two values _x_ and _y_, such that

$$ax + by = gcd⁡(a, b)$$

The EEA is, as the name suggests, an extension to the Euclidean algorithm, which is used to compute the GCD of two numbers. The EEA also requires the use of the Euclidean algorithm in order to determine the GCD prior to applying the algorithm.

Let's apply this concept using an example to better illustrate for the EEA works.

We need to find two integers x and y such that:

$$1914x+899b=gcd⁡(1914,899)$$

## Solution:

First we apply the Euclidean Algorithm to compute the GCD(1914, 899) as follows:

$$1914=2∗899+116$$

$$899=7∗116+87$$

$$116=1∗87+29$$

$$87=3∗29+0$$

From this algorithmic calculation, we determine that gcd(1914, 899) = 29.

Now we can apply the EEA as follows:

$$29=116+(−1)∗87$$

$$87=899+(−7)∗116$$

Substituting the value of 87 into the prior equation, we obtain:

$$29=116+(−1)(899+(−7)∗116)$$

$$29=116+(−1)∗899+7∗116$$

$$29=(−1)∗899+8∗116$$

Substituting the value of 116 into the previous equation, we obtain:

$$29=(−1)∗899+8∗(1914+(−2)∗899)$$

$$29=(−1)∗899+8∗1914+(−16)∗899$$

$$29=8∗1914+(−17)∗899$$

$$29=8∗1914−17∗899$$

From this, we can revisit our original equation, which we were attempting to solve by ascertaining that the values of _x_ and _y_ are 8 and - 17, respectively.

## 4o:

In plain terms:

### Extended Euclidean Algorithm (EEA)

The Extended Euclidean Algorithm builds on the basic Euclidean algorithm (used to find the greatest common divisor, or GCD) to also find two numbers $x$ and $y$ such that:
$$
ax + by = \text{GCD}(a, b)
$$
In other words, given two numbers $a$ and $b$, the EEA lets us find two specific values, $x$ and $y$, that satisfy this equation. This is useful in modular arithmetic and cryptography.

### Example Walkthrough

Suppose we want to find values of $x$ and $y$ such that:
$$
1914x + 899y = \text{GCD}(1914, 899)
$$

1. **Calculate the GCD Using the Euclidean Algorithm**:
   We divide and take remainders repeatedly until we reach a remainder of 0. The last non-zero remainder is the GCD.

   - $1914 = 2 \times 899 + 116$
   - $899 = 7 \times 116 + 87$
   - $116 = 1 \times 87 + 29$
   - $87 = 3 \times 29 + 0$

   This tells us that $\text{GCD}(1914, 899) = 29$.

2. **Work Backwards to Find $x$ and $y$**:
   Now, we express 29 (the GCD) as a combination of 1914 and 899.

   - Start with the last remainder before 0 in terms of previous remainders:
     $$
     29 = 116 - 1 \times 87
     $$
   - Substitute 87 from the equation before it:
     $$
     87 = 899 - 7 \times 116
     $$
     Plug this into the previous line:
     $$
     29 = 116 - 1 \times (899 - 7 \times 116)
     $$
     Simplify to:
     $$
     29 = 8 \times 116 - 1 \times 899
     $$
   - Substitute 116 from its equation:
     $$
     116 = 1914 - 2 \times 899
     $$
     Substitute this into our expression for 29:
     $$
     29 = 8 \times (1914 - 2 \times 899) - 1 \times 899
     $$
     Simplify to:
     $$
     29 = 8 \times 1914 - 17 \times 899
     $$

So, we find that:
$$
x = 8 \quad \text{and} \quad y = -17
$$
This means $1914 \times 8 + 899 \times (-17) = 29$, as required.
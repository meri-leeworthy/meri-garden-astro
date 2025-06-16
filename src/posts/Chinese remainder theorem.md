The Chinese remainder theorem (CRT) can be stated in many ways, however, the underlying principle remains the same. The CRT states that given a set of pairwise coprimes that are positive integers n1, n2, ... nk, and a set of arbitrary values a1, a2, ..., ak, a set of congruences:

$$x ≡ a1 (mod n1)$$

$$x ≡ a2 (mod n2)$$

......

$$x ≡ ak (mod nk)$$

has a solution that is unique modulo N = n1n2...nk.

The process of achieving a solution using the CRT can be defined as follows:

1. Starting with the congruence with the largest modulus, x ≡ ai (mod ni), for some 1 <= i <= k, we rewrite the equation using the division algorithm as follows x ≡ ni * ji + ai for some positive value ji.
    
2. Substitute the expression of x into the congruence with the next largest modulus.
    
3. Solve this new congruence to obtain the value of ji.
    
4. Write the solved congruence as an equation and substitute the expression for ji into the equation for x.
    
5. Repeat this process of substitution and solving congruences until we obtain the solution for x.
    

## Applying CRT

This example demonstrates how to apply CRT to solve the following congruences:

$$x ≡ 1 (mod 3)$$

$$x ≡ 4 (mod 5)$$

$$x ≡ 6 (mod 7)$$

**Step 1:** Start with the congruence with the largest modulus, in this case, mod 7, and represent it as follows:

$$x ≡ 7j + 6$$

**Step 2:** Substitute the above value of x into the congruence with the next highest modulus, in this case mod 5, as follows:

$$x ≡ 4 (mod 5)⟹ 7j +6 ≡ 4 (mod 5)$$

**Step 3:** Solve for j as follows:

$$j ≡ 4 (mod 5)$$

**Step 4:** Rewrite the equation again as follows:

j ≡ 5k + 4   , for some integer k

**Step 5:** Substitute the value of j into the expression for x as follows:

$$x ≡ 7(5k + 4)+6$$

$$x ≡ 35k + 34$$

**Step 6:** Substitute this expression for x into the next congruence with the highest modulus, in this case mod 3, which is also the last congruence), as follows:

$$35k + 34 ≡1 (mod 3)$$

$$k ≡0 (mod 3)$$

**Step 7:** Represent the congruence as an equation and substitute the value of k into the expression to evaluate for x, as follows:

k = 3l  , for some integer l

$$x ≡ 35(3l) + 34$$

$$x ≡ 105l + 34$$

This equation gives us the solution we are looking for:

$$x ≡ 34 (mod 105)$$
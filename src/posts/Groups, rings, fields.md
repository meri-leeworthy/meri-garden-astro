The study of groups, rings, and fields falls under the branch of abstract algebra. This branch of mathematics is concerned with sets that contain elements, that allow for the generation of a third element obtained by various possible combinations of two other elements in the set. All operations are defined by the rules for the set. However, unlike normal algebraic operations, abstract algebra allows for performing actions outside of these normal operations. In the sections below, we will explore each of these sub-branches briefly.

# Groups

$$\{G, •\}$$

The above notation denotes a group G, which is a set of elements and a binary operation, represented by •, which is a generic operator but can represent addition, subtraction, multiplication, division, or some other mathematical operation. The operation • associates an ordered pair (a, b) of elements in G an element (a • b) in G, so the following axioms hold:

- **A1 - Closure:** This axiom states that if a and b belong to G, then a • b also belongs to G.
    
- **A2 - Associative:** This axiom states that a • (b • c) = (a • b) • c for all a, b, c in G.
    
- **A3 - Identity element:** This axiom states that there exists an element e in G, such that a • e = e • a = a for all a in G.
    
- **A4 - Inverse element:** This axiom states that for each a in G, there exists an element a' in G such that a • a' = a' • a = e.
    
- **A5 - Commutative:** This axiom states that a • b = b • a for all a, b in G.
    

If the number of elements in a group is finite, the group is referred to as a finite group. The number of elements in the group defines the order of the group. Groups that do not meet these conditions is an infinite group. A group that meets the Commutative axiom mentioned above is an abelian group. A cyclic group contains elements that are all powers (a^k) of a specific element a in the group. Cyclic groups are always abelian but can be finite or infinite.

# Rings

$$\{R, +,  x\}$$

The above notation represents a ring R, which contains a set of elements and two binary operators, called addition and multiplication, so the following axioms hold for all a, b, c in R :

- **A1 - A5:** A ring R is always an abelian group and satisfies the axioms outlined above for Groups.
    
- **M1 - Closure under multiplication:** This axiom states that if a, b belong to R, then ab also belongs to R.
    
- **M2 - Associativity of multiplication:** This axiom states that a (bc) = (ab) c for all a, b, c in R.
    
- **M3 - Distributive laws:** This axiom states that a(b + c) = ab + ac for all a, b, c in R. And (a+b)c = ac + bc for all a, b, c in R.
    
- **M4 - Commutativity of multiplication:** If this axiom is satisfied, a ring is said to be commutative. This axiom states that ab = ba for all a, b in R.
    
- **M5 - Multiplicative identity:** This axiom states that there exists an element w in R such that aw = 1w = a for all a in R.
    
    - No zero divisors  
        This axiom states that if a, b are in R, and ab = 0, then either a = 0 or b = 0.
        

# Fields

$$\{F, +,  x\}$$

The above notation represents a field F, which contains a set of elements and two binary operators, called addition and multiplication, so the following axioms hold for all a, b, c in R:

- **A1 - A5 and M1 - M5:** A field F is always an integral domain and satisfies the axioms outlined above for Groups and Rings.
    
- **M7 - Multiplicative inverse:** This axiom states that each element a in F, except for 0, has an inverse shown as a ^ -1, so that aa^-1 =(a^-1)a = 1.
    

When learning about fields, finite fields have a more practical application within cryptography. Fields must satisfy all the outlined axioms for groups and rings as well. When working with finite fields in cryptography, we look for fields whose order is of the form p^n where p is a prime number and n is a positive integer. A finite field of this order is generally represented as follows:

$$GF(p^n)$$

The GF stands for Galois Field, named after the mathematician who first studied finite fields. When working with Galois fields, two variations of fields are what we consider. The first being when n = 1 such that the field can now be represented as GF(p) and when n is an exponentiation of the power of 2 such that the field can now be represented as GF(2^n).
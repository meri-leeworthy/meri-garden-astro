Three canonical cases:

# Causal Chain

A -> B -> C **where we know B**
Causal chain: A and C are conditionally independent given B

$$P(A, B, C) = P(A) \cdot P(B|A) \cdot P(C|B)$$
Not exactly the [[Chain Rule (Probability)]]. This factorization is possible because of the causal structure. Specifically, it assumes that C is conditionally independent of A given B, which is a key property of d-separation in this causal chain. If we know what B is, A cannot have any bearing on C. 
$$P(C|A, B) = \frac{P(A, B, C)}{P(A,B)} = \frac{P(A) \cdot P(B|A) \cdot P(C|B)}{P(A) \cdot P(B|A)} = P(B, C)$$
The first part is [[Conditional rule]]. Then the chain rule expands both top and bottom, and P(A) and P(B|A) cancel out. $P(C|B)$ where B = 1 (due to evidence) is by the chain rule $P(B,C) = 1 \cdot P(C|B)$.
# Common Cause
A <- B -> C where we know B

$$P(A,B,C) = P(B) \cdot P(A|B) \cdot P(C|B)$$
$$P(C|A,B) = \frac{P(A,B,C)}{P(A,B)} = \frac{P(B) \cdot P(A|B) \cdot P(C|B)}{P(B) \cdot P(A|B)} = P(C|B)$$

# Common Effect
A -> B <- C where we **don't** know B

$$P(A,B,C) = P(A) \cdot P(B|A) \cdot P(C|A, B)$$
$$P(C|A,B) = \frac{P(C)\cdot P(A,B|C)}{P(A,B)}$$
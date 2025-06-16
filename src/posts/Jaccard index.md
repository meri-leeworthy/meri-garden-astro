---
aliases:
  - Jaccard distance
  - Jaccard coefficient
  - Jaccard
---
Measures the similarity between finite sample sets and is defined as the size of the intersection divided by the size of the union of the sample sets:

$$J(A,B) = \frac{|A \cap B|}{|A \cup B|} = \frac{|A \cap B|}{|A| + |B| - |A \cap B|}$$

For example, if an instance $𝑥_𝑖$ is represented by $(𝑣_{𝑖1},𝑣_{𝑖2},...,𝑣_{𝑖𝑛})$, $𝑣_{𝑖𝑘}$ is the value of the 𝑘𝑡ℎ feature for $𝑥_𝑖$

$$J(A,B) = \frac{|\{v_{i1}, ... v_{in}\} \cap \{v_{j1}, ... v_{jn}\}|}{|\{v_{i1}, ... v_{in}\} \cup \{v_{j1}, ... v_{jn}\}|} $$


The matrix formed by all of the cofactors of a square matrix **A** is called the **cofactor matrix** (also called the **matrix of cofactors** or, sometimes, _comatrix_):

![{\displaystyle \mathbf {C} ={\begin{bmatrix}C_{11}&C_{12}&\cdots &C_{1n}\\C_{21}&C_{22}&\cdots &C_{2n}\\\vdots &\vdots &\ddots &\vdots \\C_{n1}&C_{n2}&\cdots &C_{nn}\end{bmatrix}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/0651000d4523a0563cd016ae064f75011e0d8702)

The cofactor  $C_{ij}$ of an element  $c_{ij}$ in a 3x3 matrix is given by:

 $$ C_{ij} = (-1)^{i+j} \cdot \begin{vmatrix} \text{minor of } c_{ij} \end{vmatrix}  $$

Then the [[Inverse Matrix]] of **A** is the transpose of the cofactor matrix times the reciprocal of the determinant of _A_:

![{\displaystyle \mathbf {A} ^{-1}={\frac {1}{\operatorname {det} (\mathbf {A} )}}\mathbf {C} ^{\mathsf {T}}.}](https://wikimedia.org/api/rest_v1/media/math/render/svg/5b076e517a662a54fe32bfcd7ca2ec8a1998b139)

The transpose of the cofactor matrix is called the [[Adjugate (Adjoint) Matrix]] matrix (also called the _classical adjoint_) of **A**.

The above formula can be generalized as follows: Let $1 \leq i_{1} < i_{2} < \ldots < i_{k} \leq n$ and $1 \leq j_{1} < j_{2} < \ldots < j_{k} \leq n$ be ordered sequences (in natural order) of indexes (here **A** is an $n \times n$ matrix). Then

$$
[A^{-1}]_{I,J} = \pm \frac{[A]_{J',I'}}{\det A}
$$

where $I'$, $J'$ denote the ordered sequences of indices (the indices are in natural order of magnitude, as above) complementary to $I$, $J$, so that every index 1, ..., $n$ appears exactly once in either $I$ or $I'$, but not in both (similarly for the $J$ and $J'$) and $[A]_{I,J}$ denotes the determinant of the submatrix of **A** formed by choosing the rows of the index set $I$ and columns of index set $J$. Also,

$$
[A]_{I,J} = \det \left( (A_{i_{p}, j_{q}})_{p, q = 1, \ldots, k} \right)
$$

A simple proof can be given using wedge product. Indeed,

$$
[A^{-1}]_{I,J}(e_{1} \wedge \ldots \wedge e_{n}) = \pm (A^{-1} e_{j_{1}}) \wedge \ldots \wedge (A^{-1} e_{j_{k}}) \wedge e_{i'_{1}} \wedge \ldots \wedge e_{i'_{n-k}}
$$

where $e_{1}, \ldots, e_{n}$ are the basis vectors. Acting by **A** on both sides, one gets

$$
[A^{-1}]_{I,J} \det A (e_{1} \wedge \ldots \wedge e_{n}) = \pm (e_{j_{1}}) \wedge \ldots \wedge (e_{j_{k}}) \wedge (A e_{i'_{1}}) \wedge \ldots \wedge (A e_{i'_{n-k}}) = \pm [A]_{J', I'} (e_{1} \wedge \ldots \wedge e_{n})
$$

The sign can be worked out to be $(-1)^{\sum_{s=1}^{k} i_{s} - \sum_{s=1}^{k} j_{s}}$, so the sign is determined by the sums of elements in $I$ and $J$.
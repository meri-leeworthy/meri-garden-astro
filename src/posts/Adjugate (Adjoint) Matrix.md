- For a 2x2 matrix, the adjugate is $\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
   - For larger matrices, you find the cofactor of each element, then transpose the resulting cofactor matrix.

The [[Cofactor Matrix]] of a $2 \times 2$ matrix $P$ is computed as follows:

Given $P = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$,

the cofactor matrix $\text{Cof}(P)$ is:

$$ \text{Cof}(P) = \begin{pmatrix} d & -b \\ -c & a \end{pmatrix} $$

For your matrix $P = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}$:

- The cofactor of element $1$ (top-left) is $-2$.
- The cofactor of element $1$ (top-right) is $-1$.
- The cofactor of element $1$ (bottom-left) is $-1$.
- The cofactor of element $-2$ (bottom-right) is $1$.

Thus, the cofactor matrix is:

$$ \text{Cof}(P) = \begin{pmatrix} -2 & -1 \\ -1 & 1 \end{pmatrix} $$

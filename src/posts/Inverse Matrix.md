To find the inverse of a matrix, follow these steps:

1. **Ensure the Matrix is Square and Non-Singular:**
   - The matrix must be square (i.e., the number of rows is equal to the number of columns).
   - The determinant of the matrix must be non-zero.

2. **Find the Determinant:**
   - For a 2x2 matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the determinant is $ad - bc$.
   - For larger matrices, you can use methods like [[Determinant|cofactor expansion]] or row reduction to find the determinant.

3. **Calculate the [[Adjugate (Adjoint) Matrix]]:**
   - For a 2x2 matrix, the adjugate is $\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
   - For larger matrices, you find the cofactor of each element, then transpose the resulting cofactor matrix.

4. **Apply the Formula:**
   - The inverse of a matrix $A$ is given by $\frac{1}{\text{det}(A)} \text{adj}(A)$, where $\text{adj}(A)$ is the adjugate matrix.

Here’s a quick example with a 2x2 matrix:

Given matrix $A = \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix}$:

1. **Calculate the Determinant:**
   $$
   \text{det}(A) = (2 \cdot 4) - (3 \cdot 1) = 8 - 3 = 5
   $$

2. **Find the Adjugate:**
   $$
   \text{adj}(A) = \begin{pmatrix} 4 & -3 \\ -1 & 2 \end{pmatrix}
   $$

3. **Apply the Formula:**
   $$
   A^{-1} = \frac{1}{5} \begin{pmatrix} 4 & -3 \\ -1 & 2 \end{pmatrix} = \begin{pmatrix} \frac{4}{5} & -\frac{3}{5} \\ -\frac{1}{5} & \frac{2}{5} \end{pmatrix}
   $$

For larger matrices, use similar steps but with appropriate methods for finding the determinant and adjugate.
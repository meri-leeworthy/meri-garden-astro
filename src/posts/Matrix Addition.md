Matrix addition is a straightforward process where you add corresponding elements of two matrices of the same dimensions. Here’s how it’s done:

1. **Dimensions**: Ensure both matrices have the same dimensions. If $(A)$ and $(B)$ are both $(m \times n)$ matrices, you can add them.

2. **Element-wise Addition**: Add each corresponding element from the two matrices to form a new matrix $(C)$.

Here’s the formula for the element $(C_{ij})$:

$$ C_{ij} = A_{ij} + B_{ij} $$

Where:
- $(A_{ij})$ is the element in the $(i)$th row and $(j)$th column of matrix $(A)$.
- $(B_{ij})$ is the element in the $(i)$th row and $(j)$th column of matrix $(B)$.
- $(C_{ij})$ is the element in the $(i)$th row and $(j)$th column of the resulting matrix $(C)$.

### Example:

Consider two matrices $(A)$ and $(B)$:

$$ A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \quad B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} $$

To find $(C = A + B)$:

1. Calculate $(C_{11})$:
$$ C_{11} = A_{11} + B_{11} = 1 + 5 = 6 $$

2. Calculate $(C_{12})$:
$$ C_{12} = A_{12} + B_{12} = 2 + 6 = 8 $$

3. Calculate $(C_{21})$:
$$ C_{21} = A_{21} + B_{21} = 3 + 7 = 10 $$

4. Calculate $(C_{22})$:
$$ C_{22} = A_{22} + B_{22} = 4 + 8 = 12 $$

So, the resulting matrix $(C)$ is:

$$ C = \begin{pmatrix} 6 & 8 \\ 10 & 12 \end{pmatrix} $$

By adding the corresponding elements of matrices $(A)$ and $(B)$, you obtain the matrix $(C)$.
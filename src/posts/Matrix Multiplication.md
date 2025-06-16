Matrix multiplication involves taking the dot product of rows and columns from two matrices. Here’s a step-by-step guide on how it’s calculated:

1. **Dimensions**: Ensure the number of columns in the first matrix $(A)$ matches the number of rows in the second matrix $(B)$. If $(A)$ is an $(m \times n)$ matrix and $(B)$ is an $(n \times p)$ matrix, the resulting matrix $(C)$ will be an $(m \times p)$ matrix.

2. **Dot Product**: The element $(C_{ij})$ in the resulting matrix $(C)$ is calculated by taking the dot product of the $(i)$th row of $(A)$ and the $(j)$th column of $(B)$.

3. **Calculation**:
   - For each element $(C_{ij})$:
     - Multiply each element of the $(i)$th row of $(A)$ by the corresponding element of the $(j)$th column of $(B)$.
     - Sum these products.

Here’s the formula for the element $(C_{ij})$:

$$C_{ij} = \sum_{k=1}^{n} A_{ik} \cdot B_{kj}$$

Where:
- $(A_{ik})$ is the element in the $(i)$th row and $(k)$th column of $(A)$.
- $(B_{kj})$ is the element in the $(k)$th row and $(j)$th column of $(B)$.
- $(C_{ij})$ is the element in the $(i)$th row and $(j)$th column of $(C)$.

### Example:

Consider two matrices $(A)$ and $(B)$:

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \quad B = \begin{bmatrix} 2 & 0 \\ 1 & 3 \end{bmatrix} $$

To find $(C = A \times B)$:

$$C = \begin{bmatrix} C_{11} & C_{12} \\ C_{21} & C_{22} \end{bmatrix} $$

1. Calculate $(C_{11})$:
$$ C_{11} = (1 \times 2) + (2 \times 1) = 2 + 2 = 4 $$

2. Calculate $(C_{12})$:
$$ C_{12} = (1 \times 0) + (2 \times 3) = 0 + 6 = 6 $$

3. Calculate $(C_{21})$:
$$ C_{21} = (3 \times 2) + (4 \times 1) = 6 + 4 = 10 $$

4. Calculate $(C_{22})$:
$$ C_{22} = (3 \times 0) + (4 \times 3) = 0 + 12 = 12 $$

So, the resulting matrix $(C)$ is:

$$ C = \begin{bmatrix} 4 & 6 \\ 10 & 12 \end{bmatrix} $$

By following these steps, you can multiply any two compatible matrices to obtain their product.
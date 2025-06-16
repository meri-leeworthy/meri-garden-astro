Look at the following set of equations which represent a certain system:

$$10𝑥+20𝑦+30𝑧=40…𝑒𝑞𝑛(1)$$
$$20𝑥+10𝑦=40…𝑒𝑞𝑛(2)$$
$$30𝑥+30𝑦+30𝑧=80… eqn (3)$$

Did you notice that _eqn(3)_ is just the sum of _eqn(1)_ and _eqn(2)?_ It means that _eqn(3)_ is redundant, i.e. it doesn’t provide new information. Therefore, we can say that this system is **not linearly independent**.

A system of linear equations is called **linearly independent** if none of the equations in the system can be expressed as a linear combination of other equations. Therefore, the first step of solving a system of linear equations is converting it into another equivalent system of linear equations that are linearly independent.

How can we convert a system of linear equations into a system of linearly independent equations? The answer is a technique called Gaussian Elimination, which involves matrices.

## Performing Gaussian Elimination

Gaussian elimination is a method for solving systems of linear equations. Here's a step-by-step guide to performing Gaussian elimination:

### Step-by-Step Guide

1. **Set Up the Augmented Matrix:**
   - Write the system of linear equations in matrix form $Ax = b$.
   - Combine the coefficient matrix $A$ and the constants vector $b$ into an augmented matrix $[A|b]$.

2. **Forward Elimination:**
   - Convert the matrix to an upper triangular form by eliminating the entries below the main diagonal.
   - For each row $i$ (starting from the first row):
     1. **Partial Pivoting (Optional but Recommended):**
        - Swap the current row with a lower row if the current pivot (diagonal element) is zero or very small, to avoid division by zero or numerical instability.
     2. **Normalize the Pivot Row:**
        - Divide the entire row $i$ by the pivot element (the element on the diagonal) to make the pivot equal to 1.
     3. **Eliminate Below:**
        - For each row $j$ below row $i$, subtract a multiple of row $i$ from row $j$ to make the element in the current column of row $j$ equal to 0.

3. **Backward Substitution:**
   - Starting from the last row, solve for each variable by substituting the known values from the rows below.
   - For each row $i$ (starting from the last row and moving upwards):
     - Solve for the variable in the current row.
     - Substitute this variable's value into the rows above to eliminate it.

### Example

Consider the system of equations:
$$ \begin{cases} 
x + 2y + 3z = 9 \\
2x + 3y + 1z = 8 \\
3x + 1y + 2z = 7 
\end{cases} $$

1. **Augmented Matrix:**
$$ \begin{bmatrix}
1 & 2 & 3 & | & 9 \\
2 & 3 & 1 & | & 8 \\
3 & 1 & 2 & | & 7
\end{bmatrix} $$

2. **Forward Elimination:**

   - Eliminate $x$ from rows 2 and 3:

   $$
   \begin{bmatrix}
   1 & 2 & 3 & | & 9 \\
   0 & -1 & -5 & | & -10 \\
   0 & -5 & -7 & | & -20
   \end{bmatrix}
   $$

   - Eliminate $y$ from row 3:

   $$
   \begin{bmatrix}
   1 & 2 & 3 & | & 9 \\
   0 & -1 & -5 & | & -10 \\
   0 & 0 & -12 & | & -70
   \end{bmatrix}
   $$

3. **Backward Substitution:**

   - Solve for $z$ in row 3: $-12z = -70 \Rightarrow z = \frac{70}{12} = \frac{35}{6}$

   - Solve for $y$ in row 2: $-y - 5z = -10 \Rightarrow y = -10 + 5 \times \frac{35}{6} = \frac{-60}{6} = -10$

   - Solve for $x$ in row 1: $x + 2y + 3z = 9 \Rightarrow x + 2(-10) + 3(\frac{35}{6}) = 9 \Rightarrow x = \frac{60}{6} = 10$

Therefore, the solution is $x = 10$, $y = -10$, $z = \frac{35}{6}$.
The determinant of a matrix is a scalar value that is a function of the entries of a square matrix. It provides important properties about the matrix, such as whether it is invertible. Here are the methods to calculate the determinant for different matrix sizes:

### 2x2 Matrix

For a 2x2 matrix $A$:

$$ A = \begin{pmatrix} a & b \\ c & d \end{pmatrix} $$

The determinant $\det(A)$ is calculated as:

$$ \det(A) = ad - bc $$

### 3x3 Matrix

For a 3x3 matrix $B$:

$$ B = \begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} $$

The determinant $\det(B)$ is calculated using the rule of Sarrus or the cofactor expansion:

$$ \det(B) = a(ei - fh) - b(di - fg) + c(dh - eg) $$

### General $n \times n$ Matrix

For a general $n \times n$ matrix $C$:

$$ C = \begin{pmatrix} c_{11} & c_{12} & \cdots & c_{1n} \\ c_{21} & c_{22} & \cdots & c_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ c_{n1} & c_{n2} & \cdots & c_{nn} \end{pmatrix} $$

The determinant can be calculated using cofactor expansion (Laplace expansion). This involves expanding the determinant along a row or column. For row $i$ or column $j$:

$$ \det(C) = \sum_{j=1}^n (-1)^{i+j} c_{ij} \det(M_{ij}) $$

Where $M_{ij}$ is the $(n-1) \times (n-1)$ submatrix obtained by removing the $i$-th row and $j$-th column from $C$.

### Example: 3x3 Matrix

Consider the matrix $B$:

$$ B = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix} $$

Using the cofactor expansion along the first row:

$$ \det(B) = 1 \cdot \det\begin{pmatrix} 5 & 6 \\ 8 & 9 \end{pmatrix} - 2 \cdot \det\begin{pmatrix} 4 & 6 \\ 7 & 9 \end{pmatrix} + 3 \cdot \det\begin{pmatrix} 4 & 5 \\ 7 & 8 \end{pmatrix} $$

Calculate the 2x2 determinants:

$$ \det\begin{pmatrix} 5 & 6 \\ 8 & 9 \end{pmatrix} = 5 \cdot 9 - 6 \cdot 8 = 45 - 48 = -3 $$
$$ \det\begin{pmatrix} 4 & 6 \\ 7 & 9 \end{pmatrix} = 4 \cdot 9 - 6 \cdot 7 = 36 - 42 = -6 $$
$$ \det\begin{pmatrix} 4 & 5 \\ 7 & 8 \end{pmatrix} = 4 \cdot 8 - 5 \cdot 7 = 32 - 35 = -3 $$

So,

$$ \det(B) = 1 \cdot (-3) - 2 \cdot (-6) + 3 \cdot (-3) = -3 + 12 - 9 = 0 $$

Therefore, the determinant of matrix $B$ is 0, indicating that it is a singular matrix (not invertible).

## Example for 4x4

To calculate the determinant of a 4x4 matrix, you use cofactor expansion, similar to how you handle smaller matrices. Here are the steps:

1. **Select a Row or Column**: Typically, choose the row or column with the most zeros to simplify the calculation.
2. **Expand Along the Selected Row/Column**: For each element in the selected row or column, calculate the determinant of the resulting 3x3 submatrix formed by removing the row and column of the element.

Let’s walk through the process using an example 4x4 matrix:

$$ D = \begin{pmatrix} 
1 & 2 & 0 & 1 \\ 
3 & 4 & 5 & 6 \\ 
7 & 8 & 9 & 0 \\ 
1 & 3 & 5 & 7 
\end{pmatrix} $$

Let's choose the first row for cofactor expansion:

$$ \det(D) = 1 \cdot \det\begin{pmatrix} 
4 & 5 & 6 \\ 
8 & 9 & 0 \\ 
3 & 5 & 7 
\end{pmatrix} 
- 2 \cdot \det\begin{pmatrix} 
3 & 5 & 6 \\ 
7 & 9 & 0 \\ 
1 & 5 & 7 
\end{pmatrix} 
+ 0 \cdot \det\begin{pmatrix} 
3 & 4 & 6 \\ 
7 & 8 & 0 \\ 
1 & 3 & 7 
\end{pmatrix} 
+ 1 \cdot \det\begin{pmatrix} 
3 & 4 & 5 \\ 
7 & 8 & 9 \\ 
1 & 3 & 5 
\end{pmatrix} $$

Now, calculate each of the 3x3 determinants:

1. $$\begin{pmatrix} 
4 & 5 & 6 \\ 
8 & 9 & 0 \\ 
3 & 5 & 7 
\end{pmatrix}$$

2. $$\begin{pmatrix} 
3 & 5 & 6 \\ 
7 & 9 & 0 \\ 
1 & 5 & 7 
\end{pmatrix}$$

3. $$\begin{pmatrix} 
3 & 4 & 5 \\ 
7 & 8 & 9 \\ 
1 & 3 & 5 
\end{pmatrix}$$

Let's focus on calculating the first 3x3 determinant. What is $$det\begin{pmatrix} 
4 & 5 & 6 \\ 8 & 9 & 0 \\ 3 & 5 & 7 \end{pmatrix}$$?

To calculate the determinant of an $n \times n$ matrix where $n > 2$, you perform cofactor expansion, which involves calculating the determinants of $n$ smaller $(n-1) \times (n-1)$ matrices. 
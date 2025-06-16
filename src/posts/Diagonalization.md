##### Similar matrix

**Definition: similar matrix**: Let $𝐴,𝐵$ be square matrices of the same order. We say 𝐴 is similar to 𝐵 if there exists an invertible square matrix P of the same order such that $𝐴=𝑃−1𝐵𝑃$.

We have the following properties:

- If matrix 𝐴 is similar to matrix 𝐵, then matrix 𝐵 is also similar to matrix 𝐴
- Every square matrix 𝐴 is similar to some matrix 𝐵, and one of such 𝐵 is 𝐴 itself.
    - Easy Exercise: Show that $A$ is similar to 𝐴.
- If A is similar to B, then $det(𝐴)=det(𝐵)$
    - Easy exercise: If 𝐴 is similar to 𝐵, show that $det(𝐴)=det(𝐵)$

##### Matrix diagonalisation

**Definition: Matrix diagonalisation** is the process of converting a matrix 𝐴 to a similar matrix 𝐷 such that 𝐷 is a diagonal matrix. The attempt to carry out this conversion may or may not always be successful. Not every matrix has a similar matrix that is diagonal. Below is an attempt to diagonalise a square matrix 𝐴:  

- For a matrix 𝐴, construct the characteristic equation of 𝐴, det(𝜆𝐼−𝐴)=0
- Solve the characteristic equation of 𝐴, find all the [[Eigenvalues and Eigenvectors|eigenvalues]] 𝜆 of 𝐴
- Arrange all eigenvalues of 𝐴 in nonincreasing order, call them 𝜆1,𝜆2,…,𝜆𝑛
- For each eigenvalues 𝜆𝑖 of 𝐴, find its corresponding [[Eigenvalues and Eigenvectors|eigenvector]] 𝑉𝑖
- Construct a matrix 𝑉 so that the 𝑖th column of 𝑉 is eigenvector 𝑉𝑖
- If 𝑉 from previous step is [[Inverse Matrix|invertible]], construct a matrix $Λ$ so that each 𝑖th column of $Λ$ is a vector that the 𝑖th entry is 𝜆𝑖, and all other entries are zeros
- $Λ$ constructed this way is a diagonal matrix that is similar to A.

**Example**

Given matrices $𝐴=\begin{bmatrix}−1 &2\\0&3\end{bmatrix}$ and $𝑃=\begin{bmatrix}\frac12&-\frac12\\1&0\end{bmatrix}$, find the diagonal matrix 𝐷 using $𝐷=𝑃−1𝐴𝑃$.

$$𝑃^{−1}=\begin{bmatrix}0 & 1 \\ -2 & 1\end{bmatrix}$$ $$ 𝐷=\begin{bmatrix}0 & 1 \\ -2 & 1\end{bmatrix}\begin{bmatrix}−1 &2\\ 0& 3\end{bmatrix}\begin{bmatrix}\frac12& -\frac12 \\ 1 & 0\end{bmatrix} $$ $$𝐷=\begin{bmatrix}0&1\\-2&1\end{bmatrix}\begin{bmatrix}\frac32&\frac12\\3&0\end{bmatrix}=\begin{bmatrix}3&0\\0&−1\end{bmatrix}$$

All other entries except the diagonal are zeros ⇒ A is diagonalisable.

# How to perform diagonalisation

In general, to diagonalise a matrix $A$:

1. **Find the Eigenvalues:** Solve the characteristic equation $\det(A - \lambda I) = 0$ to find the eigenvalues $\lambda_1, \lambda_2, \ldots, \lambda_n$.

2. **Find the Eigenvectors:** For each eigenvalue $\lambda_i$, find the corresponding eigenvector $v_i$ by solving the equation $(A - \lambda_i I)v_i = 0$.

3. **Form the Matrix $P$:** Construct the matrix $P$ whose columns are the eigenvectors $v_1, v_2, \ldots, v_n$.

4. **Form the Diagonal Matrix $D$:** Construct the diagonal matrix $D$ whose diagonal elements are the eigenvalues $\lambda_1, \lambda_2, \ldots, \lambda_n$.

The matrix $A$ can then be formed through the composition $A = PDP^{-1}$.
## Eigenvalues
Calculating the eigenvalues of a matrix involves solving the characteristic equation of the matrix. Here are the steps to find the eigenvalues of a matrix $A$:

1. **Form the Characteristic Equation**: The characteristic equation is derived from the determinant of the matrix $A$ subtracted by $\lambda$ times the identity matrix $I$, set to zero:
$$ \det(A - \lambda I) = 0 $$

2. **Solve the [[Determinant]]**: Calculate the determinant of the matrix $A - \lambda I$. This will result in a polynomial equation in terms of $\lambda$.

3. **Solve for $\lambda$**: The solutions to this polynomial equation are the eigenvalues of the matrix $A$.

### Example:

Consider the matrix $A$:
$$ A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix} $$

1. **Form the matrix $A - \lambda I$**:
$$ A - \lambda I = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix} - \lambda \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 4 - \lambda & 1 \\ 2 & 3 - \lambda \end{pmatrix} $$

2. **Calculate the determinant**:
$$ \det(A - \lambda I) = \det\begin{pmatrix} 4 - \lambda & 1 \\ 2 & 3 - \lambda \end{pmatrix} = (4 - \lambda)(3 - \lambda) - (2)(1) $$
$$ = (4 - \lambda)(3 - \lambda) - 2 $$
$$ = 12 - 4\lambda - 3\lambda + \lambda^2 - 2 $$
$$ = \lambda^2 - 7\lambda + 10 $$

3. **Solve the characteristic equation**:
$$ \lambda^2 - 7\lambda + 10 = 0 $$

Solve this quadratic equation using the quadratic formula $\lambda = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$, where $a = 1$, $b = -7$, and $c = 10$:

$$ \lambda = \frac{7 \pm \sqrt{(-7)^2 - 4 \cdot 1 \cdot 10}}{2 \cdot 1} $$
$$ \lambda = \frac{7 \pm \sqrt{49 - 40}}{2} $$
$$ \lambda = \frac{7 \pm \sqrt{9}}{2} $$
$$ \lambda = \frac{7 \pm 3}{2} $$

So, the eigenvalues are:
$$ \lambda_1 = \frac{7 + 3}{2} = 5 $$
$$ \lambda_2 = \frac{7 - 3}{2} = 2 $$

Therefore, the eigenvalues of the matrix $A$ are $\lambda_1 = 5$ and $\lambda_2 = 2$.
## Eigenvectors
To find the eigenvectors corresponding to each eigenvalue of a matrix, follow these steps:

1. **Substitute the Eigenvalue into the Matrix**: For each eigenvalue $\lambda$, substitute $\lambda$ into the matrix $A - \lambda I$.

2. **Form the Homogeneous System**: Solve the equation $(A - \lambda I)v = 0$ for the eigenvector $v$. This involves finding the null space of the matrix $A - \lambda I$.

### Example:

Using the previous matrix $A$ and its eigenvalues $\lambda_1 = 5$ and $\lambda_2 = 2$:

$$ A = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix} $$

**Eigenvalue $\lambda_1 = 5$:**

1. **Substitute $\lambda_1$ into $A - \lambda I$**:
$$ A - 5I = \begin{pmatrix} 4 - 5 & 1 \\ 2 & 3 - 5 \end{pmatrix} = \begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix} $$

2. **Solve the equation $(A - 5I)v = 0$**:
$$ \begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$

This simplifies to the [[Linear Systems|system]]:
$$ -x + y = 0 $$
$$ 2x - 2y = 0 $$

Both equations are essentially the same, so we can write $y = x$. Thus, any vector of the form $v_1 = \begin{pmatrix} x \\ x \end{pmatrix}$ is an eigenvector for $\lambda_1 = 5$. For simplicity, choose $x = 1$:
$$ v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix} $$

**Eigenvalue $\lambda_2 = 2$:**

1. **Substitute $\lambda_2$ into $A - \lambda I$**:
$$ A - 2I = \begin{pmatrix} 4 - 2 & 1 \\ 2 & 3 - 2 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix} $$

2. **Solve the equation $A - 2I)v = 0$**:
$$ \begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix} $$

This simplifies to the system:
$$ 2x + y = 0 $$
$$ 2x + y = 0 $$

Both equations are essentially the same, so we can write $y = -2x$. Thus, any vector of the form $v_2 = \begin{pmatrix} x \\ -2x \end{pmatrix}$ is an eigenvector for $\lambda_2 = 2$. For simplicity, choose $x = 1$:
$$ v_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix} $$

### Summary:

The eigenvectors corresponding to the eigenvalues of the matrix $A$ are:

- For $\lambda_1 = 5$: $v_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$
- For $\lambda_2 = 2$: $v_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$

These eigenvectors can be scaled by any non-zero scalar, but the direction will remain the same.
---
aliases:
  - derivative
  - differentiation
  - differentiate
  - derivatives
---
1. **Definition of a Derivative**: Understanding the derivative as the limit of the average rate of change; the fundamental concept of differentiation.
2. **[[Rules of Differentiation]]**: Basic rules like the power rule, product rule, and quotient rule; essential for computing derivatives efficiently.
3. **[[Chain Rule]]**: Differentiating composite functions; crucial for handling nested functions.
4. **Implicit Differentiation**: Differentiating functions defined implicitly; useful for dealing with equations where y is not isolated.
5. **Higher-Order Derivatives**: Derivatives of derivatives (second, third, etc.); important for understanding concavity and acceleration.
6. **Derivatives of Trigonometric Functions**: Differentiating sine, cosine, and other trigonometric functions; widely used in oscillatory and wave phenomena.
7. **Derivatives of Exponential and Logarithmic Functions**: Understanding the behaviour of growth and decay processes.
8. **Applications of Derivatives**: Using derivatives to solve problems involving rates of change, optimisation, and motion.
9. **Mean Value Theorem**: Relates the derivative of a function to its average rate of change over an interval; fundamental for proving properties of functions.
10. **[[L'Hôpital's Rule]]**: A method for evaluating limits involving indeterminate forms; leverages derivatives for solving complex limit problems.
11. **Taylor Series and Polynomial Approximations**: Using derivatives to approximate functions locally with polynomials; important for numerical analysis.
12. **Curve Sketching**: Using derivatives to understand the shape and behaviour of graphs of functions, including critical points and inflection points.




### Finding the tangent line of a function at a point $a$
straight line is $𝑦=𝑚𝑥+𝑐$
$m$ can be found by differentiating $f(x)$ and passing in the value of x $m=f'(a)$

the tangent lies at the point $(a, f(a))$ so we find $f(a)$ and solve for $c$

$$f(a) = ma + c$$

Problems:
Find the tangent line to $𝑓(𝑥)=\frac{16}{𝑥}−4\sqrt𝑥$ at $𝑥=4$

$$f'(x) = \frac{0*x-16*1}{x^2} - \frac{4}{2}x^{\frac{-1}{2}} = \frac{-16}{x^2} - \frac{2}{\sqrt{x}}$$
$$f'(4)=\frac{-16}{16}-\frac{2}{2}=-2 = m$$

$$f(4) = \frac{16}{4} - 4\sqrt{4} = 4-8 = -4$$

$$-4 = -2*4 + c$$
$$c=4, \text{tangent} = -2x + 4$$
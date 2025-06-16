#### 1.3. Limits and [[Continuity]]

  
The equation of a limit can be written as lim𝑥→𝑎𝑓(𝑥)=𝐴lim𝑥→𝑎𝑓(𝑥)=𝐴.

It indicates that as 𝑥𝑥 approaches '𝑎𝑎_'_ both from the left of 𝑥=𝑎𝑥=𝑎 and the right of 𝑥=𝑎𝑥=𝑎, the output value of the function approaches 𝐴𝐴.

For example, when the limit of 𝑥𝑥 is 2 for a function 𝑓(𝑥)=2𝑥+3𝑓(𝑥)=2𝑥+3, then the function will approach 𝐴=7𝐴=7.

We can write it as $lim𝑥→2(2𝑥+3)=7$.

What this says is that when the input values approach 2, the output values will get close to 7, i.e. as 𝑥 approaches 2 (but not exactly 2), the output function 𝑓(𝑥) gets a value closer to 7. Let’s explore this further.

![This graph is an example of the concepts described in the preceding text](https://learning.monash.edu/pluginfile.php/2882198/mod_book/chapter/360872/5.1.1.3%20Limits%20and%20continuity%20.png)  

Limits and continuity (2023) adapted from Faculty of Information Technology

#### Left-hand limits and Right-hand limits

Look at a function $𝑓(𝑥)=𝑥+3,𝑥≠5$.

Here, it deliberately indicates that 𝑥 cannot be assigned the value of 5. If we analyse the behaviour of 𝑓(𝑥):

|             | <Values less than 5 (from the right) |      | />    | x = 5       | <Values greater than 5 (from the left) |      | />  |
| ----------- | ------------------------------------ | ---- | ----- | ----------- | -------------------------------------- | ---- | --- |
| **𝑥**      | 4.9                                  | 4.99 | 4.999 | 5           | 5.001                                  | 5.01 | 5.1 |
| 𝑓(𝑥)=𝑥+3 | 7.9                                  | 7.99 | 7.999 | Not defined | 8.001                                  | 8.01 | 8.1 |
The limit of values of $𝑓(𝑥)$ as 𝑥 approaches from the right is known as the right-hand limit, and the limit of $𝑓(𝑥)$ as 𝑥 approaches from left is called the left-hand limit.

They are indicated by $lim_{𝑥→5-}𝑓(𝑥)=8$ and $lim_{𝑥→5+}𝑓(𝑥)=8$

Limits can be found using graphs, too.

# Calculating Limits

To calculate the limit of a function as $x$ approaches a certain value, follow these steps:

1. **Direct Substitution**: Substitute the value of $x$ into the function. If the result is a finite number, that is the limit. For example, $\lim_{x \to 2} (3x + 1) = 3(2) + 1 = 7$.

2. **Simplify the Expression**: If direct substitution results in an indeterminate form like $\frac{0}{0}$ or $\infty - \infty$, try to simplify the function. This might involve factoring, rationalising, or using algebraic identities. 

3. **Use [[L'Hôpital's Rule]]**: If simplification doesn’t work, and you still get an indeterminate form of the type $\frac{0}{0}$ or $\frac{\infty}{\infty}$, apply L'Hôpital's Rule, which states that $\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$, provided the latter limit exists.

4. **Analyse One-Sided Limits**: For limits as $x$ approaches a value from the left ($x \to a^-$) or the right ($x \to a^+$), evaluate the function by approaching the value from the respective side. Both one-sided limits must be equal for the two-sided limit to exist.

5. **Check for Infinite Limits**: If the function grows without bound as $x$ approaches a value, the limit might be $\infty$ or $-\infty$. Analyze the behaviour of the function to determine this.

6. **Utilise Squeeze Theorem**: If the function can be "squeezed" between two other functions that have the same limit at a point, use the Squeeze Theorem to find the limit.

Problem:

Evaluate the following:

$$lim_{𝑥→−∞}\frac{\sqrt{4𝑥^6+5}}{𝑥3+1}$$

$$lim_{𝑥→−5}\frac{𝑥^2−25}{𝑥^2+2𝑥−15}$$
by direct substitution x=-5
$$\frac{25-25}{25-10-15} = \frac{0}{0}$$
this is an indeterminate form so not valid
by [[Factoring Quadratic Equations]] 
$$\text{discriminant}=b^2-4ac = 2^2-(4*-15) = 64 = 8^2$$

$$𝑥^2+2𝑥−15, ac=-15: m = 5, n= -3$$
$$x^2 + 5x - 3x - 15 = x(x+5) - 3(x+5) = (x-3)(x+5)$$

$$\frac{(x+5)(x-5)}{(x-3)(x+5)} = \frac{x-5}{x-3}$$
by direct substitution again x=-5
$$ \frac{-10}{-8} = \frac{5}{4}$$ 
$$lim_{𝑥→5}\frac{𝑥^3−125}{𝑥−5}$$
direct substitution is indeterminate
$$lim_{𝑥→5}\frac{(x-5)(x^2 + 5x + 25)}{x-5}$$
$$lim_{𝑥→5}x^2 + 5x + 25$$
substitute x=5
$$25 + 25 + 25 = 75$$

$$lim_{𝑥→−4}(10𝑥+36)^3$$
by direct sub
$$lim_{𝑥→−4}(-4)^3 = -64$$

$$lim_{𝑥→0}\frac{5sin(𝑥)}{3𝑥}$$
trying [[L'Hôpital's Rule]]!
$$lim_{𝑥→0}\frac{5cos(𝑥)}{3} = \frac{5}{3}$$
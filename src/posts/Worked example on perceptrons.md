There are three inputs, $𝑥_1,𝑥_2,𝑥_3$ and the constant input $𝑥_0=1$ for the bias term. Suppose each $𝑥_1,𝑥_2,𝑥_3$ can take only binary values (0,1) and that the activation function 𝑔 is the step function. 
(g(x) = 1 if x >= 0 otherwise g(x) = 0)

If the weights of the perceptron are currently $𝑤=(𝑤_0=2,𝑤_1=1,𝑤_2=−3,𝑤_3=4)$, and we have the following data with associated class labels.

==$x_0$ is always 1 because that's what makes the first weight the bias==

| $x_0$ | $x_1$ | $x_2$ | $x_3$ | class | w*x                             | g(w*x) |
| ----- | ----- | ----- | ----- | ----- | ------------------------------- | ------ |
| 1     | 0     | 1     | 1     | 1     | $(2*1 + 1*0 + -3*1 + 4*1) = 3$  | 1      |
| 1     | 0     | 0     | 1     | 1     | $(2*1 + 1*0 + -3*0 + 4*1) = 6$  | 1      |
| 1     | 1     | 0     | 1     | 0     | $(2*1 + 1*1 + -3*0 + 4*1) = 7$  | 1      |
| 1     | 0     | 1     | 0     | 0     | $(2*1 + 1*0 + -3*1 + 4*0) = -1$ | 0      |
Accuracy = 0.75

1. Show the perceptron's output for these four inputs and how the perceptron would classify each. Assume 𝑔(1)=1 corresponds to class 1, and therefore 𝑔(0)=0 corresponds to class 0. What is the accuracy of our perceptron on this data set?  

2. Suppose we were instead training the perceptron, and the weights were updated after classifying each of the four inputs. Show how the weights are updated after the first incorrect classification by the perceptron. Use a learning rate 𝛼=0.1.

After the first incorrect classification (3rd row) we update weights and bias (first weight)

>Training rule (step function): $w_i \leftarrow w_i + a(y-g_\mathbf{w}(x))x$

$$w_0 \leftarrow 2 + 0.1(0-1)\cdot 1 = 1.9$$

$$w_1 \leftarrow 1 + 0.1(0 - 1) \cdot 1 = 0.9$$

$$w_2 \leftarrow -3 + 0.1(0 - 1) \cdot 0 = -3$$

$$w_3 \leftarrow 4 + 0.1(0 - 1) \cdot 1 = 3.9$$
$$\underline{w} = (1.9, 0.9, -3, 3.9)$$

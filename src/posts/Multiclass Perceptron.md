# Multiple classes decision rule
- A different [[Perceptron]] for each output (class)
- When we have multiple classes, we have a weight vector for each class
- Calculate the weighted sum of the input for each class $$g_\mathbf{w}(\mathbf{x}, c) = \sum_i w_{c, i} \cdot x_i$$
	- Here I think c is meant to be the class (output). 
	- $g_\mathbf{w}(x, c)$ is on wikipedia called the *'feature representation function'* $f(x,y)$ where x is the input and y is the output - mapping each possible input-output pair to a finite-dimensional real-valued feature vector.
- To classify 𝑥, we assign 𝑥 the class for which the value is highest.
$$c^* = \arg\max_{c} g_\mathbf{w}(x,c)$$
	- The argmax function selects the index (or class label) of the perceptron with the highest output score.

### What is argmax?
In the context of multiclass classification using perceptrons, the **argmax** function is used to determine the class label that has the highest score among all possible classes. Here's how it works:

### Context of Multiclass Classification with Perceptrons

1. **Perceptron Outputs**:
   - For a multiclass classification problem, you typically have one perceptron (or neuron) for each class. Each perceptron outputs a score $z_j$ for its corresponding class $j$.
   - These scores are often referred to as the **logits**.

2. **Argmax Function**:
   - The **argmax** function selects the index (or class label) of the perceptron with the highest output score.
   - Mathematically, if $z_j$ represents the score of the $j$-th perceptron, the predicted class $\hat{y}$ is given by:
     $$
     \hat{y} = \arg\max_{j} z_j
     $$
   - This means $\hat{y}$ is the index $j$ for which $z_j$ is the highest among all perceptrons.

### Example

Suppose you have three classes (0, 1, 2) and the perceptron outputs are:

$$ z = [2.5, 1.2, 3.8] $$

Applying the **argmax** function:

$$ \hat{y} = \arg\max_{j} z_j $$

In this case, $ z_2 = 3.8 $ is the highest score, so:

$$ \hat{y} = 2 $$

Thus, the predicted class is 2.

### Summary

- **Argmax** in multiclass classification with perceptrons is used to select the class with the highest score.
- It takes the scores from all the perceptrons and identifies the index of the maximum score, which corresponds to the predicted class label.

input text = 'win the vote'
$\mathbf{x}$ = (BIAS: 1, win: 1, game: 0, vote: 1, the: 1)
$\mathbf{w}_{\text{SPORTS}}$ = (BIAS: -2, win: 4, game: 4, vote: 0, the: 0)
$\mathbf{w}_{\text{POLITICS}}$ = (BIAS: 1, win: 2, game: 0, vote: 4, the: 0)
$\mathbf{w}_{\text{TECH}}$ = (BIAS: 2, win: 0, game: 2, vote: 0, the: 0)

$$g_\mathbf{w}(\mathbf{x}, SPORTS) = 1 * -2 + 1 * 4 + 0 * 4 + 1 * 0 + 1 * 0 = 2$$
$$g_\mathbf{w}(\mathbf{x}, POLITICS) = 1 * 1 + 1 * 2 + 0 * 0 + 1 * 4 + 1 * 0 = 7$$
$$g_\mathbf{w}(\mathbf{x}, TECH) = 1 * 2 + 1 * 0 + 0 * 2 + 1 * 0 + 1 * 0 = 2$$
$c^* = POLITICS$
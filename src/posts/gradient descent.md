**Definition**: 
Gradient descent is an optimization algorithm used to minimize the loss function in machine learning models, including neural networks.

**Purpose**: 
It aims to find the optimal set of model parameters (weights and biases) that minimize the error or loss.

**How It Works**:
1. **Initialization**: Start with an initial set of parameters.
2. **Compute Gradients**: Calculate the gradient of the loss function with respect to each parameter. This involves computing the partial derivatives of the loss function.
3. **Update Parameters**: Adjust the parameters in the direction opposite to the gradient to reduce the loss. The update rule is typically:
   $$
   \theta := \theta - \eta \nabla L(\theta)
   $$
   where \( \theta \) represents the parameters, \( \eta \) is the learning rate, and \( \nabla L(\theta) \) is the gradient of the loss function with respect to the parameters.
4. **Iteration**: Repeat the process until the parameters converge to the minimum loss or for a fixed number of iterations.

**Variants**:
- **Batch Gradient Descent**: Uses the entire dataset to compute the gradient.
- **Stochastic Gradient Descent (SGD)**: Uses one training example at a time to compute the gradient.
- **Mini-Batch Gradient Descent**: Uses a subset of the dataset (mini-batch) to compute the gradient.
### Relationship Between Gradient Descent and Backpropagation

- **[[backpropagation]]** is used to efficiently compute the gradients of the loss function with respect to the network parameters.
- **Gradient Descent** uses these gradients to update the parameters in order to minimize the loss function.


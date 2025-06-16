#### MLE for Gaussian distribution

Let’s attempt the MLE for the Gaussian distribution. Suppose 3 data points were generated from a process described by a Gaussian distribution. These points are 3, 4, and 5. How do we calculate the maximum likelihood estimates of the parameter values of the Gaussian distribution μ and σ?

We want to calculate the total probability of observing all of the data, that is, the joint probability distribution of all observed data points. To do this, we would need to calculate some conditional probabilities, which can get very difficult. 

**Assumption**: Each data point is generated independently of the others. 

Assuming that each data point is generated independently of the others makes the maths easier. Recall that for **independent events**, the total probability of observing all of the data is the product of observing each data point individually, which is the product of the marginal probabilities. The probability density of observing a single data point 𝑥, that is generated from a Gaussian distribution is given by:

$$𝑃(𝑥;𝜇,𝜎)=\frac{1}{𝜎\sqrt{2𝜋}}𝑒𝑥𝑝\left(−\frac{(𝑥−𝜇)^2}{2𝜎^2}\right)$$

---

#### Solving for parameter μ 

In using MLE, the following steps apply:

##### Step 1

Write the total joint probability density of observing the three data points:

$$𝑃(3,4,5;𝜇,𝜎)=\frac{1}{𝜎\sqrt{2\pi}}𝑒𝑥𝑝\left(−\frac{(3−𝜇)^2}{2𝜎^2}\right)
×
\frac{1}{𝜎\sqrt{2\pi}}𝑒𝑥𝑝\left(−\frac{(4−𝜇)^2}{2𝜎^2}\right)
×\frac{1}{𝜎\sqrt{2\pi}}𝑒𝑥𝑝\left(−\frac{(5−𝜇)^2}{2𝜎^2|}\right) $$

##### Step 2

Take the natural logarithm of the expression above

$$𝑙𝑛(𝑃(𝑥;𝜇,𝜎)=𝑙𝑛(\frac{1}{𝜎\sqrt{2\pi}})−\frac{(3−𝜇)^2}{2𝜎^2}+𝑙𝑛(\frac{1}{𝜎\sqrt{2\pi}})−\frac{(4−𝜇)^2}{2𝜎^2}+𝑙𝑛(\frac{1}{𝜎\sqrt{2\pi}})-\frac{(5−𝜇)^2}{2𝜎^2}$$

$$𝑙𝑛(𝑃(𝑥;𝜇,𝜎)−−3𝑙𝑛(𝜎)−\frac{3}{2}𝑙𝑛(2𝜋)−\frac{1}{2𝜎^2}[(3−𝜇)2+(4−𝜇)2=(5−𝜇)2]$$

##### Step 3

Next, differentiate the natural logarithm expression above concerning parameter 𝜇𝜇 and set the partial derivatives to 00.

$$\frac{∂𝑙𝑛(𝑃(𝑥;𝜇,𝜎))}{∂𝜇}=\frac{1}{𝜎^2}[3+4+5=3𝜇]$$

##### Step 4

Finally, solve for parameter.

$$𝜇=\frac{3+4+5}{3}=4$$

---

#### Solving for parameter 𝜎

The same steps apply to solve for parameter 𝜎, but remember to differentiate the natural logarithm expression concerning 𝜎.

A more general form of the maximum likelihood estimation is as below. It can be applied to any random variable, assuming it is independent and identically distributed.

##### Step 1

Let’s say there is a parametric statistical model with parameter(s) θ, where $𝑃(𝑥|𝜃)$ is the probability density function of a random variable.

##### Step 2

Next, calculate the joint probability of the random variable 𝑥, i.e., $𝑥1,…,𝑥𝑛$, which is the product of the marginal probabilities of each data point 𝑥.

$$𝑃(𝑥|𝜃)=\prod^{𝑛}_{𝑖=1}𝑝(𝑥_𝑖|𝜃)$$

##### Step 3

Then perform the negative log-likelihood

$$𝑙𝑛(𝑃(𝑥|𝜃))=−\sum^{𝑛}_{𝑖=1}𝑙𝑛(𝑝(𝑥𝑖|𝜃))$$

##### Step 4

Next, differentiate concerning θ and set the partial derivative to 0.

$$\frac{∂𝑙𝑛(𝑃(𝑥|𝜃))}{∂𝜃}=0$$

##### Step 5

Finally, solve for θ.
### Expectation of a random variable

The expected value or expectation of a random variable is the **average value** of the random variable. The expected value of a random variable 𝑋 is denoted by $𝐸(𝑋)$.

The expected value of a random variable can be interpreted as the long-run average of observations on the random variable. The procedure for calculating the expected value of a random variable depends on whether the random variable is discrete or continuous.

If 𝑋 is a **discrete random variable** with **probability distribution function (pdf)** specified by 𝑓(𝑥), then the expectation of a discrete random variable 𝑋 is:

$$𝐸[𝑋]=\sum_𝑥𝑥 𝑓(𝑥)$$

or 

$$𝐸[𝑋]−\sum_𝑥𝑔(𝑥)𝑓(𝑥)$$

If 𝑋 is a **continuous random variable** with pdf specified by 𝑓(𝑥), then the expectation of the continuous random variable 𝑋 is:

$$𝐸[𝑋]=\int_{−∞}^∞𝑥 𝑓(𝑥)𝑑𝑥$$

or

$$𝐸[𝑔(𝑋)]=\int_{−∞}^∞𝑔(𝑥) 𝑓(𝑥)𝑑𝑥$$

Similar to the expectation of a random variable, the expectation of a function of a random variable 𝑔(𝑋) is a weighted average of the function over all possible values 𝑋 can take on, with each value being weighted according to the probability of observing it. 

In general, an expected value of a function of random variables is not the function evaluated at the expected values of the random variables.

$$𝐸[𝑓(𝑋)]≠𝑓(𝐸[𝑋])$$
In the previous part of this lesson, some of the requirements for designing asymmetric algorithms were covered. These requirements are formidable when designing any such algorithm, since the introduction of asymmetric algorithms in the late 1970's only a few have ever become mainstream and widely adopted for use in industry and government sectors. This, by itself, can communicate volumes on the level of sophistication these algorithms require.

However, one specific requirement, which is of a more technical nature, is that of the **trap-door** **one-way function**, which we will explore a bit more in this part of our lesson. Before this concept is explained further, it is important to point out that the term **one-way function** has many uses in cryptography, mostly depending on the context of its use. You will see this again in the lesson on digital signatures. But for now, you should keep this distinction in mind.

In the context of asymmetric algorithms, a **one-way function** is a function, generally mathematical, which is capable of defining a domain such that all elements contained in that domain have a unique inverse. However, the condition for the one-way function stipulates that determining the value of the calculation, given a condition, is generally easy. However, given the same condition, determining the inverse is infeasible.

Y = f(X)     ⟶ easy to calculate Y given X

X = f−1(Y)     ⟶ inf⁡easible to calculate X given Y

When we state 'computationally infeasible' we are generally referring to the fact that no algorithm exists to solve the problem within polynomial time as a function of the input length. For e.g. if our input size is n, but the time required by the algorithm in order to compute the function is 2^n, we state that this algorithm is infeasible.

Revisiting the earlier concept of a **trap-door one-way function**, is a function which, unless additional information is known, it is infeasible to calculate the inverse of the function. Should additional information be available, then the function can be computed in polynomial time. As such, we can define a trap-door one-way function to belong to a family of invertible functions fk, such that:

Y = fk (X)  ⟶ easy, if k and X are known

X = fk−1 (Y)  ⟶ easy, if k and Y are known

X = fk−1 (Y)  ⟶ inf⁡easible, if Y is known but k is not known

As such, in order to define a usable asymmetric algorithm to use for public key cryptography, such a suitable trap-door one-way function needs to be found, which hasn't been used already. Hence, defining such an algorithm that can be widely adopted is a challenging task.
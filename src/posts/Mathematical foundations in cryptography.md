---
title: 'Mathematical foundations in cryptography'
slug: 'mathematical-foundations-in-cryptography'
---

The concept of **finite fields** in mathematics is a very important concept for the field of cryptography. Most, if not all, cryptographic algorithms use these as the basis of the algorithm design, operation, and implementation. It allows us to leverage the complexity, soundness, and correctness of various mathematical theorems to formulate and justify the soundness and correctness of various algorithms.

While mathematics for humans can be arduous and time-consuming, the same is not true for computing systems. As such, cryptographic primitives rely on the use of larger and larger numbers as computing systems become faster. However, computation cycles are not cheap either. Over time, as the cycle increases, the time complexity does as well. Hence, cryptographic primitives mandate the use of large numbers that can be reduced to be as small as possible, thereby reducing computation cycles but not compromising the mathematical principles.

In this lesson, we aim to explore some of the many foundational concepts in number theory and those that are important to know for cryptography. We first will explore some mathematical foundations that deal with finite numbers and learn the application of the concepts of module arithmetic. The later parts of this lesson will focus on some abstract concepts such as group, ring, and field.

Note: It is imperative for students to understand that a foundation of basic mathematics is required. But as this unit is only designed to provide a foundational understanding, some of the more advanced concepts in mathematics will not be explored in great depth. Instead, this will serve as a baseline for those wanting to explore the field deeper in other units.

Next: [[The division algorithm]]
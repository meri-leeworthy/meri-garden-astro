### 1. Propositional logic

#### 1.1. Introduction to propositional logic

Some logic problems can be solved by using propositional logic. Success in solving them involves a good understanding of how symbols can be used to represent different pieces of information and how to use connectives to form more complicated clauses and solve them and be familiar with the laws on them.

**So what is a proposition?** A proposition is a declarative statement that can be true or false but not both. i.e. every proposition is either true (T) or false (F). The following table outlines some common examples.  

|   |   |
|---|---|
|29 is a prime number|True|
|10 < -10|False|
|8 is an odd number|False|
|Given x, y where x < 0 and y < 0, x 2 + y 2 >0|True|
|A square has 4 edges|True|

Propositions (2023) courtesy of Faculty of Information Technology

Like we combine sentences in real life, we can combine multiple statements to construct new ones. E.g., 29 is a prime number, AND 8 is not a prime number. Here we used AND to combine the two sentences.

Similarly, propositional statements can be combined using connectives. The following table explains several connectives.

| **Connective** | **Symbol** | **Example**  | **Statement**             |
| -------------- | ---------- | ------------ | ------------------------- |
| **AND**            | ∧          | P ∧ Q        | Conjunction               |
| **OR**             | ∨          | P ∨ Q        | Disjunction, Inclusive OR |
| **NOT**            | ¬, ∼       | ¬P, ∼ P      | Negation                  |
| IF ….THEN      | →, ⇒       | P → Q, P ⇒ Q | Implication               |
| IF AND ONLY IF | ↔, ⇔       | P ↔ Q, P ⇔ Q | Biconditional             |
| EXCLUSIVE OR   | ⊕          | P ⊕ Q        | Exclusive OR              |

Connectives table (2023) courtesy of Faculty of Information Technology

Let's consider the following example:

P = The sky is blue,  
Q = The grass is green.

Both these statements are True.

If we analyse this further, we can combine these two statements in various ways. Assume someone says the sky is black and/or the grass is white (sometimes these can also be true. However, for this example, let’s look at the standard colours the sky and grass could have). So there can be instances where both P and Q are true or false. 

**Consider** the following.

|                           |
| ------------------------- |
| ==AND P ∧ Q = T ∧ T = T== |
| NOT ¬P ∧ Q = F ∧ T = F    |
| NOT P ∧ ¬Q = T ∧ F = F    |
| NOT ¬P ∧ ¬Q = F ∧ F = F   |

|                          |
| ------------------------ |
| ==OR P ∨ Q = T V T = T== |
| NOT ¬P ∨ Q = F ∨ T = T   |
| NOT P ∨ ¬Q = T ∨ F = T   |
| NOT ¬P ∨ ¬Q = F ∨ F = F  |

When combining propositional statements, we have to follow some rules, summarised in the following section.
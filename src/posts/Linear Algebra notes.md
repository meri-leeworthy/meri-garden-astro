[MathJax symbol ref](https://bearnok.com/grva/en/knowledge/software/mathjax)

Law of cosines:
![220px-Triangle_with_notations_2.svg.png](https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Triangle_with_notations_2.svg/220px-Triangle_with_notations_2.svg.png)
$$ c^2 = a^2 + b^2 - 2ab\cos \gamma $$
$$ a^2 = b^2 + c^2 - 2ab\cos \alpha  $$
$$ b^2 = a^2 + c^2 - 2ab\cos \beta  $$
homework q: 
x & y = vectors corresponding to b and a in the diagram above 
theta = gamma in diagram above
is this true?
$$ \cos \theta = \frac {x^T y} {\Vert x \Vert _2 \Vert y \Vert _2} $$ $$ \frac {c^2 - a^2 - b^2} {-2ab} = \cos \gamma $$
where

$$ c = y - x, a = \Vert x \Vert _2, b = \Vert y \Vert _2 $$

$$ \cos \theta = \frac {(y-x)^2 - x^T x - y ^T y} {-2(\Vert x \Vert _2 \Vert y \Vert _2)} $$

apparently it's true!! i don't understand

$$ x^2 = x^T x $$

remember x is a vector but the dot product is a scalar and so is the length (norm2)

$$ \Vert x \Vert _2 = \sqrt{x^T x} $$

$$ (y-x)(y-x) = y^2 -2xy + x^2 $$

which means

$$ \cos \theta = \frac {x^T x - x^T x + y^T y - y ^T y -2x^T y} {-2(\Vert x \Vert _2 \Vert y \Vert _2)} $$

the x.x's and y.y's cancel out and so do the -2 scalars yay
$$ \cos \theta = \frac {x^T y} {\Vert x \Vert _2 \Vert y \Vert _2} $$

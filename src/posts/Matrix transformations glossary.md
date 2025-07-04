---
title: 'Matrix transformations glossary'
slug: 'matrix-transformations-glossary'
---

- **[[Linear Transformation]]**: Function that maps vectors to vectors, preserving vector addition and scalar multiplication. Represented by a matrix.
- **Transformation Matrix**: Matrix $A$ used to perform a linear transformation on a vector $v$, resulting in a new vector $Av$.
- **Translation**: Moving every point of an object a constant distance in a specified direction. Represented using homogeneous coordinates.
- **Rotation**: Rotating vectors around the origin by a specified angle. In 2D, represented by a rotation matrix $R(\theta)$.
- **Scaling**: Changing the size of vectors by multiplying with a scalar or scaling matrix. Uniform scaling uses the same factor for all dimensions; non-uniform scaling uses different factors.
- **Reflection**: Flipping vectors over a specified axis or plane. Represented by reflection matrices.
- **Shear**: Shifting one part of an object to create a slanting effect. Represented by shear matrices.
- **Affine Transformation**: Combination of linear transformations and translation. Represented by an augmented matrix in homogeneous coordinates.
- **Homogeneous Coordinates**: System that includes an additional coordinate to represent transformations like translation using matrix multiplication.
- **Composite Transformations**: Combining multiple transformations into a single operation by multiplying their corresponding matrices.
- **Determinant and Transformation**: The determinant of a transformation matrix indicates the scaling factor of area (in 2D) or volume (in 3D) and whether the transformation preserves orientation.
- **Inverse Transformation**: Reversing a transformation using the [[Inverse Matrix|inverse]] of the transformation matrix. Only possible if the matrix is invertible.
- **Orthogonal Transformations**: Transformations that preserve angles and lengths, represented by orthogonal matrices (e.g., rotations and reflections).
- **[[Eigenvalues and Eigenvectors]] in Transformations**: Indicate the scaling factors and invariant directions of a transformation.
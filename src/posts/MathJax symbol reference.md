Source: https://bearnok.com/grva/en/knowledge/software/mathjax
Latex-style

References for MathJax usage in Markdown sintax

Table of contents:

- [Symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#symbols "Symbols")
- - [Parentheses](https://bearnok.com/grva/en/knowledge/software/mathjax#parentheses "Parentheses")
- [Logical symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#logical-symbols "Logical symbols")
- [Operators](https://bearnok.com/grva/en/knowledge/software/mathjax#operators "Operators")
- [Set symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#set-symbols "Set symbols")
- [Arrows](https://bearnok.com/grva/en/knowledge/software/mathjax#arrows "Arrows")
- [Special symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#special-symbols "Special symbols")
- [Trigonometry](https://bearnok.com/grva/en/knowledge/software/mathjax#trigonometry "Trigonometry")
- [Functional symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#functional-symbols "Functional symbols")
- [Greek letters](https://bearnok.com/grva/en/knowledge/software/mathjax#greek-letters "Greek letters")
- - [Lowercase](https://bearnok.com/grva/en/knowledge/software/mathjax#lowercase "Lowercase")
    - [Uppercase](https://bearnok.com/grva/en/knowledge/software/mathjax#uppercase "Uppercase")
- [Fonts](https://bearnok.com/grva/en/knowledge/software/mathjax#fonts "Fonts")
- [Spaces](https://bearnok.com/grva/en/knowledge/software/mathjax#spaces "Spaces")
- [Accents and marks](https://bearnok.com/grva/en/knowledge/software/mathjax#accents-and-marks "Accents and marks")
- [Examples](https://bearnok.com/grva/en/knowledge/software/mathjax#examples "Examples")

[Mathjax plugin](https://github.com/sommerregen/grav-plugin-mathjax/blob/master/README.md) for math formula insertion has an extensive [documentation](http://docs.mathjax.org/en/latest/).

In [Mathjax quick sintax reference](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) tutorial and reference are available.

## [Symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#symbols "Permanent link: Symbols")

Inline formulas enclose \ ( ... \ )

Displayed formulas \ [ ... \ ]

Curly braces {} to group pieces of formulas

Superscripts ( ^ ) and subscripts ( _ ) : x1e𝑥1𝑒

Fractions:

$\frac {a} {b}$ \frac {a} {b}

${x} \over {y}$ {x} \over {y}

### [Parentheses](https://bearnok.com/grva/en/knowledge/software/mathjax#parentheses "Permanent link: Parentheses")

Unscaled parentheses

| Symbol       | Code                |
| ------------ | ------------------- |
| (...)(...)   | (...)               |
| [...][...]   | [...]               |
| {...}{...}   | { ... }             |
| \|...\|...\| | \vert ... \vert     |
| ‖...‖‖...‖   | \Vert ... \Vert     |
| ⟨...⟩⟨...⟩   | \langle ... \rangle |
| ⌈...⌉⌈...⌉   | \lceil ... \rceil   |
| ⌊...⌋⌊...⌋   | \lfloor ... \rfloor |

Scaled parentheses

| Symbol       | Code                           |
| ------------ | ------------------------------ |
| (...)(...)   | \left( ... \right)             |
| [...][...]   | \left[ ... \right]             |
| {...}        | \left{ ... \right}             |
| \|...\|...\| | \left\vert ... \right\vert     |
| ‖...‖‖...‖   | \left\Vert ... \right\Vert     |
| ⟨...⟩⟨...⟩   | \left\langle ... \right\rangle |
| ⌈...⌉⌈...⌉   | \left\lceil ... \right\rceil   |
| ⌊...⌋⌊...⌋   | \left\lfloor ... \right\rfloor |

Hidden parentheses

|Symbol|Code|
|---|---|
|{...{...|\left{ ... \right.|
|...]...]|\left. ... \right]|

- manual adjustment: (((((x)))))(((((𝑥))))) \Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)

## [Logical symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#logical-symbols "Permanent link: Logical symbols")

|Symbol|Code|
|---|---|
|<<|\lt|
|>>|\gt|
|≤≤|\le|
|≤≤|\leq|
|≦≦|\leqq|
|⩽⩽|\leqslant|
|≥≥|\ge|
|≥≥|\geq|
|≧≧|\geqq|
|⩾⩾|\geqslant|
|≠≠|\neq|
|∧∧|\land|
|∨∨|\lor|
|¬¬|\lnot|
|∀∀|\forall|
|∃∃|\exists|
|∄∄|\nexists|
|⊤⊤|\top|
|⊥⊥|\bot|
|⊢⊢|\vdash|
|⊨⊨|\vDash|
|≈≈|\approx|
|∼∼|\sim|
|≃≃|\simeq|
|≅≅|\cong|
|≡≡|\equiv|
|≺≺|\prec|
|⊲⊲|\lhd|
|∴∴|\therefore|

## [Operators](https://bearnok.com/grva/en/knowledge/software/mathjax#operators "Permanent link: Operators")

| Symbol | Code    |
| ------ | ------- |
| ××     | \times  |
| ÷÷     | \div    |
| ±±     | \pm     |
| ∓∓     | \mp     |
| ⋅⋅     | \cdot   |
| ⋆⋆     | \star   |
| ∗∗     | \ast    |
| ⊕⊕     | \oplus  |
| ∘∘     | \circ   |
| ∙∙     | \bullet |

## [Set symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#set-symbols "Permanent link: Set symbols")

|Symbol|Code|
|---|---|
|∪∪|\cup|
|∩∩|\cap|
|∖∖|\setminus|
|⊂⊂|\subset|
|⊆⊆|\subseteq|
|⊊⊊|\subsetneq|
|⊃⊃|\supset|
|∈∈|\in|
|∉∉|\notin|
|∅∅|\emptyset|
|∅∅|\varnothing|

## [Arrows](https://bearnok.com/grva/en/knowledge/software/mathjax#arrows "Permanent link: Arrows")

|Symbol|Code|
|---|---|
|→→|\to|
|→→|\rightarrow|
|←←|\leftarrow|
|⇒⇒|\Rightarrow|
|⇐⇐|\Leftarrow|
|⇔⇔|\Leftrightarrow|
|↦↦|\mapsto|

## [Special symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#special-symbols "Permanent link: Special symbols")

|Symbol|Code|
|---|---|
|∞∞|\infty|
|∇∇|\nabla|
|∂∂|\partial|
|ℑℑ|\Im|
|ℜℜ|\Re|
|……|\ldots|
|⋯⋯|\cdots|
|ℓℓ|\ell|

## [Trigonometry](https://bearnok.com/grva/en/knowledge/software/mathjax#trigonometry "Permanent link: Trigonometry")

| Symbol           | Code      |
| ---------------- | --------- |
| sinxsin⁡𝑥       | \sin x    |
| cosxcos⁡𝑥       | \cos x    |
| tanxtan⁡𝑥       | \tan x    |
| cotxcot⁡𝑥       | \cot x    |
| secxsec⁡𝑥       | \sec x    |
| cscxcsc⁡𝑥       | \csc x    |
| arcsinxarcsin⁡𝑥 | \arcsin x |
| arccosxarccos⁡𝑥 | \arccos x |
| arctanxarctan⁡𝑥 | \arctan x |

## [Functional symbols](https://bearnok.com/grva/en/knowledge/software/mathjax#functional-symbols "Permanent link: Functional symbols")

| Symbol                             | Code                             |
| ---------------------------------- | -------------------------------- |
| $\sqrt{x^3}$                       | \sqrt{x^3}                       |
| $\sqrt[3]{\frac xy}$               | \sqrt[3]{\frac xy}               |
| $\ln(x)$                           | \ln(x)                           |
| $\log_{2}(x)$                      | \log_{2}(x)                      |
| $\sum_{n=1} ^{N} n$                | \sum_{n=1} ^{N} n                |
| $\prod_{n=1} ^{N} n$               | \prod_{n=1} ^{N} n               |
| $\int_{0} ^{\infty} x dx$          | \int_{0} ^{\infty} x dx          |
| $\iint_{0} ^{\infty} x dx$         | \iint_{0} ^{\infty} x dx         |
| $\iiint_{0} ^{\infty} x dx$        | \iiint_{0} ^{\infty} x dx        |
| $\lim_{x \to \infty} {1 \over x }$ | \lim_{x \to \infty} {1 \over x } |
| $\max(1,2,3)$                      | \max(1,2,3)                      |
| $\min(3,4,5)$                      | \min(3,4,5)                      |
| ${n+1 \choose 2k}$                 | {n+1 \choose 2k}                 |
| $\binom{n+1}{2k} (n+12k)$          | \binom{n+1}{2k} (n+12k)          |

## [Greek letters](https://bearnok.com/grva/en/knowledge/software/mathjax#greek-letters "Permanent link: Greek letters")

### [Lowercase](https://bearnok.com/grva/en/knowledge/software/mathjax#lowercase "Permanent link: Lowercase")

|Symbol|Code|
|---|---|
|α𝛼|\alpha|
|β𝛽|\beta|
|γ𝛾|\gamma|
|δ𝛿|\delta|
|ϵ𝜖|\epsilon|
|ε𝜀|\varepsilon|
|ζ𝜁|\zeta|
|η𝜂|\eta|
|θ𝜃|\theta|
|ϑ𝜗|\vartheta|
|ι𝜄|\iota|
|κ𝜅|\kappa|
|λ𝜆|\lambda|
|μ𝜇|\mu|
|ν𝜈|\nu|
|ξ𝜉|\xi|
|ο𝜊|\omicron|
|π𝜋|\pi|
|ϖ𝜛|\varpi|
|ρ𝜌|\rho|
|ϱ𝜚|\varrho|
|σ𝜎|\sigma|
|ς𝜍|\varsigma|
|τ𝜏|\tau|
|υ𝜐|\upsilon|
|ϕ𝜙|\phi|
|φ𝜑|\varphi|
|χ𝜒|\chi|
|ψ𝜓|\psi|
|ω𝜔|\omega|

### [Uppercase](https://bearnok.com/grva/en/knowledge/software/mathjax#uppercase "Permanent link: Uppercase")

|Symbol|Code|
|---|---|
|ΓΓ|\Gamma|
|ΔΔ|\Delta|
|ΘΘ|\Theta|
|ΛΛ|\Lambda|
|ΞΞ|\Xi|
|ΠΠ|\Pi|
|ΣΣ|\Sigma|
|ΥΥ|\Upsilon|
|ΨΨ|\Psi|
|ΩΩ|\Omega|

Note: other greek uppercase lettere are the same as Roman letter.

## [Fonts](https://bearnok.com/grva/en/knowledge/software/mathjax#fonts "Permanent link: Fonts")

| Symbol                                          | Code                                          |
| ----------------------------------------------- | --------------------------------------------- |
| $\mathbb{N}$                                    | \mathbb{N}                                    |
| $\mathbb{Z}$                                    | \mathbb{Z}                                    |
| $\mathbb{Q}$                                    | \mathbb{Q}                                    |
| $\mathbb{I}$                                    | \mathbb{I}                                    |
| $\mathbb{R}$                                    | \mathbb{R}                                    |
| $\mathbb{C}$                                    | \mathbb{C}                                    |
| $\text{ is an even number}$                     | \text{ is an even number}                     |
| $\Bbb{blackboard bold}$                         | \Bbb{blackboard bold}                         |
| $\mathbf{boldface}$                             | \mathbf{boldface}                             |
| $\mathit{italics}$                              | \mathit{italics}                              |
| $\pmb{boldfaced italics}$                       | \pmb{boldfaced italics}                       |
| $\mathtt{ for typewriter}$                      | \mathtt{ for typewriter}                      |
| $\mathrm{roman font}$                           | \mathrm{roman font}                           |
| $\mathsf{sans-serif font}$                      | \mathsf{sans-serif font}                      |
| $\mathcal{calligraphic letters}$                | \mathcal{calligraphic letters}                |
| $\mathscr{script letters}$                      | \mathscr{script letters}                      |
| $\mathfrak{Fraktur (old German style) letters}$ | \mathfrak{Fraktur (old German style) letters} |

## [Spaces](https://bearnok.com/grva/en/knowledge/software/mathjax#spaces "Permanent link: Spaces")

|Symbol|Code|
|---|---|
|Thin space𝑇ℎ𝑖𝑛 𝑠𝑝𝑎𝑐𝑒|Thin \ space|
|Normalspace𝑁𝑜𝑟𝑚𝑎𝑙𝑠𝑝𝑎𝑐𝑒|Normal \; space|
|Bigspace𝐵𝑖𝑔𝑠𝑝𝑎𝑐𝑒|Big \quad space|
|Biggerspace𝐵𝑖𝑔𝑔𝑒𝑟𝑠𝑝𝑎𝑐𝑒|Bigger \qquad space|

## [Accents and marks](https://bearnok.com/grva/en/knowledge/software/mathjax#accents-and-marks "Permanent link: Accents and marks")

| Symbol                    | Code                    |
| ------------------------- | ----------------------- |
| $\hat{x}$                 | \hat{x}                 |
| $\overline{xyz}$          | \overline{xyz}          |
| $\vec{x}$                 | \vec{x}                 |
| $\widehat{xy}$            | \widehat{xy}            |
| $\bar{x}$                 | \bar{x}                 |
| $\overrightarrow{xy}$     | \overrightarrow{xy}     |
| $\overleftrightarrow{xy}$ | \overleftrightarrow{xy} |
| $\dot{x}$                 | \dot{x}                 |
| $\ddot{x}$                | \ddot{x}                |

## [Examples](https://bearnok.com/grva/en/knowledge/software/mathjax#examples "Permanent link: Examples")

Plain text: {x∈ℕ∣x is an even number}{𝑥∈𝑁∣𝑥 is an even number}

The Einstein field equations (EFE) may be written in the form:

Rμν−12gμνR+gμνΛ=8πGc4Tμν
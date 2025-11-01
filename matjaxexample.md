# 🧮 MathJax Examples

Berikut contoh lengkap penggunaan **MathJax** di Markdown Viewer kamu.

---

## 1. Inline Math

Tulisan ini mengandung *inline math*:  
Energi kinetik dirumuskan sebagai $E_k = \frac{1}{2}mv^2$ dan momentum sebagai $p = mv$.

---

## 2. Display Math

Untuk menampilkan rumus besar di tengah (block math), gunakan dua tanda dolar `$$`:

$$
E = mc^2
$$

Atau bisa juga pakai `\[ ... \]`:

\[
a^2 + b^2 = c^2
\]

---

## 3. Fraction dan Root

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

Atau yang lebih rumit:

$$
y = \frac{1}{1 + \frac{1}{x}}
$$

---

## 4. Sigma dan Integral

Sigma notation dan integral:

$$
S = \sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

$$
\int_0^{\pi} \sin(x)\, dx = 2
$$

---

## 5. Matrix dan Vector

Matrix 2x2 dan 3x1 vector:

$$
A = \begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
\quad
\vec{v} = \begin{bmatrix}
x \\
y \\
z
\end{bmatrix}
$$

Atau matrix besar:

$$
B = 
\begin{pmatrix}
1 & 0 & 2 \\
-1 & 3 & 1
\end{pmatrix}
$$

---

## 6. Physics Style Equations

$$
F = ma
$$

$$
V = IR
$$

$$
\vec{F} = q(\vec{E} + \vec{v} \times \vec{B})
$$

---

## 7. Greek Letters

Kamu bisa tulis huruf Yunani:

$$
\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \lambda, \mu, \pi, \sigma, \omega
$$

---

## 8. Limits dan Derivatives

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\frac{dy}{dx} = 3x^2 + 2x + 1
$$

---

## 9. Piecewise Function

$$
f(x) =
\begin{cases}
x^2, & x \ge 0 \\
-x, & x < 0
\end{cases}
$$

---

## 10. Complex Example (Multiple Equations)

$$
\begin{aligned}
\nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0 \vec{J} + \mu_0 \varepsilon_0 \frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

---

✨ Done!  
Sekarang kamu bisa campur Markdown biasa dengan rumus MathJax dan lihat hasilnya di preview.  
Kalau kamu mau pakai warna atau gaya di MathJax juga bisa, contoh:

$$
\color{#4e9cff}{E = mc^2}
$$

---

**Tip:**  
Kalau rumus panjang banget dan kepotong di textarea, aktifkan fullscreen pake tombol `enter` yang kamu udah buat 😉

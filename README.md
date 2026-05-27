# Markdown Editor ✦

A modern live Markdown editor and previewer built with HTML, CSS, and JavaScript.

Supports:
- Live preview
- Syntax highlighting
- Math rendering
- Dark mode
- Exporting
- Table of contents
- Find & replace
- Autosave
- Split editor view

---

# Features

## Live Markdown Preview
Render Markdown instantly while typing using Marked.js.

```md
# Hello World
This is **Markdown**

---

## Dark Mode

Toggle between light and dark themes.

Features:

* Saved automatically using `localStorage`
* Smooth UI switching
* Persistent across reloads

---

## Table of Contents

Automatically generates a sidebar TOC from headings.

Supported:

* `#`
* `##`
* `###`

Example:

```md
# Title
## Section
### Subsection
```

---

## Find & Replace

Built-in editor search system.

Keyboard shortcuts:

| Shortcut | Action         |
| -------- | -------------- |
| Ctrl + F | Open Find Bar  |
| Esc      | Close Find Bar |

Supports:

* Next / Previous match
* Replace one
* Replace all

---

## Statistics

Live editor statistics:

* Word count
* Character count
* Line count
* Cursor position

Example:

```txt
124 words
812 chars
18 lines
Ln 4, Col 12
```

---

# Math Support

Powered by MathJax.

Inline math:

```md
$E = mc^2$
```

Block math:

```md
$$
\int_0^\infty e^{-x^2} dx
$$
```

---

# Syntax Highlighting

Powered by Highlight.js.

Supported languages include:

* JavaScript
* Python
* C++
* HTML
* CSS
* JSON
* Bash

Example:

````md
```js
console.log("Hello");
```
````

---

# Table Support

GitHub Flavored Markdown tables are supported.

Example:

```md
| Feature | Status |
|---|---|
| Dark Mode | ✅ |
| Export | ✅ |
```

---

# File Features

## Open Markdown File

Supported:

* `.md`
* `.txt`

Supports:

* File picker
* Drag & drop

---

## Export Options

### Markdown Export

Exports raw `.md` file.

### HTML Export

Exports rendered HTML document.

### PDF Export

Exports preview as PDF using jsPDF.

---

# 🛠 Technologies Used

| Library      | Purpose             |
| ------------ | ------------------- |
| Marked.js    | Markdown parsing    |
| DOMPurify    | HTML sanitization   |
| Highlight.js | Syntax highlighting |
| MathJax      | Math rendering      |
| jsPDF        | PDF export          |

---

# Autosave System

Content automatically saves to `localStorage`.

Features:

* Unsaved indicator
* Automatic recovery
* Delayed saving optimization

Storage key:

```js
localStorage.setItem('md-content', editor.value);
```

---

# Custom Markdown Extensions

Additional syntax supported:

## Yellow Highlight

```md
==Highlighted==
```

## Blue Highlight

```md
--Blue Highlight--
```

---

# ⚠ Known Issue

## Table Rendering Bug

Problem:
Custom blue highlight regex may break Markdown tables.

Cause:

```js
/--(.+?)--/g
```

can conflict with:

```md
|------|------|
```

Fix:

```js
/(?<!-)--(.*?)--(?!-)/g
```

---

# Project Structure

```txt
project/
├── index.html
├── style.css
├── script.js
└── assets/
```

---

# Future Features

Planned improvements:

* Vim mode
* Markdown shortcuts
* Emoji picker
* Mermaid live rendering
* Collaborative editing
* Mobile optimization
* Plugin system
* Custom themes

---

# ⌨ Keyboard Shortcuts

| Shortcut | Action        |
| -------- | ------------- |
| Ctrl + F | Find          |
| Ctrl + S | Save          |
| Esc      | Close dialogs |

---

# License

MIT License

---

# ❤️ Credits

Created with:

* HTML
* CSS
* JavaScript

Libraries:

* Marked.js
* Highlight.js
* MathJax
* DOMPurify
* jsPDF

```
```

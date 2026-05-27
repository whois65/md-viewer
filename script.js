const $ = id => document.getElementById(id);
const editor = $('editor'), output = $('output');

// ── Dark mode ──
const darkToggle = $('darkToggle');
let dark = localStorage.getItem('md-dark') === '1';
document.body.classList.toggle('dark', dark);
darkToggle.onclick = () => { dark = !dark; document.body.classList.toggle('dark', dark); localStorage.setItem('md-dark', dark ? '1' : '0'); };

// ── Help Button ──
$("helpBtn").addEventListener("click", () => {
    editor.value = `# Welcome to Markdown Viewer ✦\nWrite **Markdown** with live preview — supports math like $E = mc^2$ and syntax highlighting.\n\n---\n\n# Headings\n# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6\n\n---\n\n# Text Formatting\n**Bold text**\n*Italic text*\n***Bold + Italic***\n~~Strikethrough~~\n==Highlighted text==\n=-Highlighted text-=\n> Blockquote example\n>> Nested quote\n\n---\n\n# Lists\n## Unordered List\n- Apple\n- Banana\n  - Nested item\n  - Another nested item\n## Ordered List\n1. First item\n2. Second item\n3. Third item\n## Task List\n- [x] Completed task\n- [ ] Incomplete task\n\n---\n\n# Links & Images\n[Youtube](https://youtube.com)\n<https://youtube.com>\n![Markdown Logo](https://markdown-here.com/img/icon256.png)\n\n---\n\n# Code\nInline code: \`console.log("Hello")\`\n## JavaScript\n\`\`\`js\nconst greet = name => \`Hello, \${name}!\`;\nfunction add(a, b) {\n    return a + b;\n}\nconsole.log(greet("World"));\nconsole.log(add(5, 3));\n\`\`\`\n## Python\n\`\`\`python\ndef fibonacci(n):\n\ta, b = 0, 1\n\tfor _ in range(n):\n\tprint(a)\n\ta, b = b, a + b\nfibonacci(10)\n\`\`\`\n\n## C++\n\n\`\`\`cpp\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World!" << std::endl;\n\treturn 0;\n}\n\`\`\`\n\n---\n\n# Math\n\nInline math:\n$E = mc^2$\n\n## Block Math\n\n$$\n\\int_0^\\infty e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}\n$$\n\n$$\nf(x) = ax^2 + bx + c\n$$\n\n$$\n\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}\n$$\n\n---\n\n# Tables\n\n| Feature | Status |\n|---------|--------|\n| Live preview | ✅ |\n| Dark mode | ✅ |\n| Export | ✅ |\n\n## Alignment Table\n\n| Left | Center | Right |\n|:-----|:------:|------:|\n| A | B | C |\n| 1 | 2 | 3 |\n\n---\n\n# Horizontal Rule\n\n---\n\n# HTML Support\n\n<div style="color:skyblue;">\nThis is raw HTML inside Markdown.\n</div>\n\n---\n\n# Emoji\n\n😀 🚀 ✨ 🎉 💻 📚\n\n---\n\n# Footnotes\n\nHere is a footnote example.[^1]\n\n[^1]: This is the footnote content.\n\n---\n\n# Escaping Characters\n\n\\*This text is not italic\\*\n---\n\n# Definition List\nTerm 1\n: Definition 1\n\nTerm 2\n: Definition 2\n\n---\n\n# Collapsible Section\n\n<details>\n<summary>Click to expand</summary>\n\nHidden content here\n\n</details>\n\n---\n\n# Keyboard Keys\n\nPress <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.\n\n---\n\n# Mermaid Diagram\n\`\`\`mermaid\ngraph TD\n\tA[Start] --> B{Decision}\n\tB -->|Yes| C[Continue]\n\tB -->|No| D[Stop]\n\`\`\`\n\n---\n\n# Quote Showcase\n\n> "Programs must be written for people to read,\n> and only incidentally for machines to execute."\n>\n> — Harold Abelson\n\n---\n\n# Nested Markdown Example\n\n1. Main item\n- Sub item\n\`\`\`js\nconsole.log("Nested code block");\n\`\`\`\n\n---\n\n# Final Notes\nMarkdown is awesome for:\n- Documentation\n- Notes\n- Blogs\n- README files\n- Static sites\n- Obsidian vaults\n\nHappy writing ✨`;
    updatePreview();
});

// ── Emoji Keyboard ──
$("emojiBtn").addEventListener("click", () => {

})

// ── View mode ──
let viewMode = localStorage.getItem('md-view') || 'split';
const editorPane = $('editorPane'), previewPane = $('previewPane'), divider = $('divider');
function applyView(mode) {
    viewMode = mode;
    localStorage.setItem('md-view', mode);
    document.querySelectorAll('.view-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
    editorPane.classList.toggle('hidden', mode === 'preview');
    previewPane.classList.toggle('hidden', mode === 'editor');
    divider.style.display = mode === 'split' ? '' : 'none';
}
document.querySelectorAll('.view-tab').forEach(t => t.onclick = () => applyView(t.dataset.mode));
applyView(viewMode);

// ── Divider resize ──
let dragging = false, startX, startW;
divider.addEventListener('mousedown', e => {
    dragging = true; startX = e.clientX;
    startW = editorPane.offsetWidth;
    divider.classList.add('dragging');
    document.body.style.userSelect = 'none';
});
document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const total = $('workspace').offsetWidth;
    const w = Math.max(200, Math.min(total - 200, startW + dx));
    editorPane.style.flex = 'none';
    editorPane.style.width = w + 'px';
    previewPane.style.flex = '1';
});
document.addEventListener('mouseup', () => { dragging = false; divider.classList.remove('dragging'); document.body.style.userSelect = ''; });

// ── Marked config ──
marked.setOptions({ breaks: true, gfm: true });

// ── Preview ──
let renderTimeout;
function updatePreview() {
    let md = editor.value;
    md = md.replace(/==(.+?)==/g, '<mark class="hl-yellow">$1</mark>');
    md = md.replace(/=-(.+?)-=/g, '<mark class="hl-blue">$1</mark>');
    const html = DOMPurify.sanitize(marked.parse(md));
    output.innerHTML = html;
    output.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
    if (window.MathJax) { MathJax.typesetClear(); MathJax.typesetPromise([output]); }
    buildTOC();
    updateStats();
    scheduleAutosave();
}
editor.addEventListener('input', () => { clearTimeout(renderTimeout); renderTimeout = setTimeout(updatePreview, 180); });

// ── Stats ──
function updateStats() {
    const txt = editor.value;
    const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
    $('wordCount').textContent = words + ' words';
    $('charCount').textContent = txt.length + ' chars';
    $('lineCount').textContent = txt.split('\n').length + ' lines';
}
editor.addEventListener('keyup', updateCursor);
editor.addEventListener('click', updateCursor);
function updateCursor() {
    const val = editor.value.substring(0, editor.selectionStart);
    const lines = val.split('\n');
    $('cursorPos').textContent = `Ln ${lines.length}, Col ${lines[lines.length - 1].length + 1}`;
}

// ── TOC ──
const tocToggle = $('tocToggle'), tocSidebar = $('tocSidebar'), tocList = $('tocList');
let showTOC = false;
tocToggle.onclick = () => { showTOC = !showTOC; tocSidebar.classList.toggle('hidden', !showTOC); };
function buildTOC() {
    const headings = output.querySelectorAll('h1,h2,h3');
    if (!headings.length) { tocList.innerHTML = '<span style="font-size:11px;color:var(--muted)">No headings found</span>'; return; }
    tocList.innerHTML = '';
    headings.forEach((h, i) => {
        h.id = 'h-' + i;
        const btn = document.createElement('button');
        btn.className = 'toc-item ' + h.tagName.toLowerCase();
        btn.textContent = h.textContent;
        btn.onclick = () => { h.scrollIntoView({ behavior: 'smooth' }); document.querySelectorAll('.toc-item').forEach(x => x.classList.remove('active')); btn.classList.add('active'); };
        tocList.appendChild(btn);
    });
}

// ── Autosave ──
let saveTimeout, unsaved = false;
const savedDot = $('savedDot'), savedLabel = $('savedLabel');
function scheduleAutosave() {
    unsaved = true; savedDot.className = 'saved-dot unsaved'; savedLabel.textContent = 'Unsaved';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        localStorage.setItem('md-content', editor.value);
        unsaved = false; savedDot.className = 'saved-dot'; savedLabel.textContent = 'Saved';
    }, 600);
}

// ── Load saved content ──
window.addEventListener('load', () => {
    const saved = localStorage.getItem('md-content');
    if (saved) editor.value = saved;
    if (editor.value === "") editor.value = `# Welcome to Markdown Viewer ✦\n\nWrite **Markdown** with live preview — supports math like $E = mc^2$ and syntax highlighting.\n\n## Features\n\n- **Split view** — editor + preview side by side\n- **Find & Replace** — Ctrl+F\n- **Table of contents** — auto-generated\n- **Formatting toolbar** — one-click formatting\n- **Export** — .md, .html, or .pdf\n\n## Code example\n\`\`\`js\nconst greet = name => \`Hello, !\`;\nconsole.log(greet('World'));\n\`\`\`\n\n## Math\n\n$$\\int_0^\\infty e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}$$\n\n## Table\n\n| Feature | Status |\n|---------|--------|\n| Live preview | ✅ |\n| Dark mode | ✅ |\n| Export | ✅ |`;
    updatePreview();
});

// ── Toolbar wrapping ──
document.querySelectorAll('[data-wrap]').forEach(btn => {
    btn.onclick = () => {
        const wrap = btn.dataset.wrap;
        const s = editor.selectionStart, e2 = editor.selectionEnd;
        const sel = editor.value.substring(s, e2) || 'text';
        insert(wrap + sel + wrap, s, e2, s + wrap.length, s + wrap.length + sel.length);
    };
});
document.querySelectorAll('[data-prefix]').forEach(btn => {
    btn.onclick = () => {
        const pre = btn.dataset.prefix;
        const s = editor.selectionStart;
        const lineStart = editor.value.lastIndexOf('\n', s - 1) + 1;
        editor.setRangeText(pre, lineStart, lineStart, 'end');
        editor.focus(); updatePreview();
    };
});
document.querySelectorAll('[data-insert]').forEach(btn => {
    btn.onclick = () => {
        const s = editor.selectionStart;
        const text = btn.dataset.insert;
        insert(text, s, s, s, s + text.length);
    };
});
function insert(text, from, to, curStart, curEnd) {
    editor.setRangeText(text, from, to, 'end');
    editor.setSelectionRange(curStart, curEnd);
    editor.focus(); updatePreview();
}

// ── File open ──
$('openBtn').onclick = () => $('mdFile').click();
$('mdFile').addEventListener('change', function () {
    const file = this.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = e => { editor.value = e.target.result; updatePreview(); };
    r.readAsText(file);
});

// ── Drag & drop ──
editor.addEventListener('dragover', e => e.preventDefault());
editor.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) { const r = new FileReader(); r.onload = e => { editor.value = e.target.result; updatePreview(); }; r.readAsText(file); }
});

// ── Clear ──
$('clearBtn').onclick = () => { if (confirm('Clear all content?')) { editor.value = ''; updatePreview(); } };

// ── Copy ──
$('copyBtn').onclick = () => { navigator.clipboard.writeText(editor.value); toast('Copied to clipboard'); };

// ── Toast ──
function toast(msg) {
    const t = $('toast'); t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

// ── Find & Replace ──
const findBar = $('findBar'), findInput = $('findInput'), replaceInput = $('replaceInput'), findCount = $('findCount');
let findMatches = [], findIndex = 0;
$('findToggle').onclick = () => toggleFind();
$('findClose').onclick = () => { findBar.classList.add('hidden'); editor.focus(); };
document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') { e.preventDefault(); toggleFind(); }
    if (e.key === 'Escape') findBar.classList.add('hidden');
});
function toggleFind() { findBar.classList.toggle('hidden'); if (!findBar.classList.contains('hidden')) findInput.focus(); }
findInput.addEventListener('input', doFind);
function doFind() {
    const q = findInput.value; findMatches = []; findIndex = 0;
    if (!q) { findCount.textContent = ''; return; }
    const text = editor.value; let i = 0;
    while ((i = text.indexOf(q, i)) !== -1) { findMatches.push(i); i += q.length; }
    findCount.textContent = findMatches.length ? `${Math.min(findIndex + 1, findMatches.length)} / ${findMatches.length}` : 'No results';
    if (findMatches.length) highlightFind();
}
function highlightFind() {
    if (!findMatches.length) return;
    const pos = findMatches[findIndex];
    editor.focus(); editor.setSelectionRange(pos, pos + findInput.value.length);
    findCount.textContent = `${findIndex + 1} / ${findMatches.length}`;
}
$('findNext').onclick = () => { if (!findMatches.length) return; findIndex = (findIndex + 1) % findMatches.length; highlightFind(); };
$('findPrev').onclick = () => { if (!findMatches.length) return; findIndex = (findIndex - 1 + findMatches.length) % findMatches.length; highlightFind(); };
$('replaceOne').onclick = () => {
    if (!findMatches.length) return;
    const pos = findMatches[findIndex], q = findInput.value, rep = replaceInput.value;
    editor.setRangeText(rep, pos, pos + q.length, 'end');
    doFind(); updatePreview();
};
$('replaceAll').onclick = () => {
    const q = findInput.value, rep = replaceInput.value;
    if (!q) return;
    const count = (editor.value.split(q).length - 1);
    editor.value = editor.value.split(q).join(rep);
    doFind(); updatePreview(); toast(`Replaced ${count} occurrence${count !== 1 ? 's' : ''}`);
};

// ── Export ──
$('exportMD').onclick = () => {
    const name = prompt('Filename:', 'document') || 'document';
    const blob = new Blob([editor.value], { type: 'text/markdown' });
    dl(blob, name + '.md');
};
$('exportHtml').onclick = () => {
    const name = prompt('Filename:', 'document') || 'document';
    const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${name}</title><style>body{font-family:system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 1rem;line-height:1.7}pre{background:#1e1b18;color:#e8e4df;padding:1em;border-radius:8px;overflow-x:auto}code{background:#f0ede8;padding:2px 5px;border-radius:3px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px 12px}</style></head><body>${output.innerHTML}</body></html>`], { type: 'text/html' });
    dl(blob, name + '.html');
};
$('exportPdf').onclick = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const name = prompt('Filename:', 'document') || 'document';
    doc.html(output, { callback: d => d.save(name + '.pdf'), x: 20, y: 20, width: 555 });
};
function dl(blob, name) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); }

// ── File menu toggle ──
$('fileMenuBtn').onclick = e => { e.stopPropagation(); $('fileMenu').classList.toggle('open'); };
document.addEventListener('click', () => $('fileMenu').classList.remove('open'));

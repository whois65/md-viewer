// Export HTML
document.getElementById("exportHtml").addEventListener("click", () => {
  let content = document.getElementById("output").innerHTML;
  let filename = prompt("Enter filename");
  const htmlFile = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${filename}</title>
<style>
body{
  font-family:Arial,sans-serif;
  padding:1rem;
  background: ${incolor.value};
  color: ${incolor2.value};
}
</style>
</head>
<body>
${content}
</body>
</html>`;
  let blob = new Blob([htmlFile], { type: "text/html" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename + ".html";
  link.click();
});

let script = `<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>document.addEventListener("DOMContentLoaded", ()=>{document.querySelectorAll("pre code").forEach(block=>hljs.highlightElement(block))});</script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script><style>pre{background-color: #0d1117;padding: 14px;border-radius: 12px;overflow-x: auto;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);margin-bottom: 16px;}code{font-family: "Fira Code", monospace;font-size: 15px;line-height: 1.5;color: #f8f8f2;}</style>`;

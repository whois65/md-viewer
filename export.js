// Export PDF
document.getElementById("exportPdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.html(document.getElementById("output"), {
    callback: function (doc) {
      doc.save("myfile.pdf");
    },
    x: 20,
    y: 20,
    width: 550,
  });
});
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
// Export MD
document.getElementById("exportMD").addEventListener("click", () => {
  const blob = new Blob([editor.value], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "myfile.md";
  link.click();
});

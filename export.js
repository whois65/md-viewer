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

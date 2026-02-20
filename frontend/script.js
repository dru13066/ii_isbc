document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("template", document.getElementById("template").files[0]);
    formData.append("content", document.getElementById("content").files[0]);
  
    const response = await fetch("http://localhost:8000/generate", {
      method: "POST",
      body: formData,
    });
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.pptx";
    a.click();
  });
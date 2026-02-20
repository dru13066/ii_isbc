const form = document.getElementById("form");
const progressBox = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const downloadBtn = document.getElementById("download");

let jobId = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  progress.style.width = "0%";
  downloadBtn.disabled = true;
  downloadBtn.classList.remove("active");

  const formData = new FormData();
  formData.append("template", template.files[0]);
  formData.append("content", content.files[0]);

  const response = await fetch("http://localhost:8000/generate", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  jobId = data.job_id;

  progressBox.classList.remove("hidden");
  pollStatus();
});

async function pollStatus() {
  const response = await fetch(`http://localhost:8000/status/${jobId}`);
  const data = await response.json();

  progress.style.width = `${data.progress}%`;

  if (data.status === "done") {
    downloadBtn.disabled = false;
    downloadBtn.classList.add("active");
    downloadBtn.onclick = () => {
      window.location.href = `http://localhost:8000/download/${jobId}`;
    };
  } else {
    setTimeout(pollStatus, 1000);
  }
}

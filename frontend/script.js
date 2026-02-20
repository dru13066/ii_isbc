const form = document.getElementById("form");
const progressBox = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const downloadBtn = document.getElementById("download");

let jobId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  progressBox.classList.remove("hidden");
  progress.style.width = "0%";

  downloadBtn.disabled = true;
  downloadBtn.classList.remove("active");

  const formData = new FormData();
  formData.append("template", template.files[0]);
  formData.append("content", content.files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/generate");

  // 📤 ПРОГРЕСС ЗАГРУЗКИ (0–30%)
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 30);
      progress.style.width = `${percent}%`;
    }
  };

  xhr.onload = () => {
    const response = JSON.parse(xhr.responseText);
    jobId = response.job_id;
    pollStatus();
  };

  xhr.send(formData);
});

// ⚙️ ПРОГРЕСС КОНВЕРТАЦИИ (30–100%)
async function pollStatus() {
  const res = await fetch(`http://localhost:8000/status/${jobId}`);
  const data = await res.json();

  const adjustedProgress = 30 + Math.round(data.progress * 0.7);
  progress.style.width = `${adjustedProgress}%`;

  if (data.status === "done") {
    progress.style.width = "100%";
    downloadBtn.disabled = false;
    downloadBtn.classList.add("active");

    downloadBtn.onclick = () => {
      window.location.href = `http://localhost:8000/download/${jobId}`;
    };
  } else {
    setTimeout(pollStatus, 1000);
  }
}

function displayUpload() {
  document.getElementById("ai_content_p").style.opacity = "0";
  const uploadContainer = document.createElement("div");
  uploadContainer.id = "upload_container";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "fileInput";
  fileInput.style.display = "none";

  const browseButton = document.createElement("button");
  browseButton.textContent = "Browse";
  browseButton.id = "browseButton";
  browseButton.style.display = "inline-block";

  browseButton.addEventListener("click", function () {
    fileInput.click();
  });

  const uploadButton = document.createElement("button");
  uploadButton.textContent = "Upload";
  uploadButton.id = "uploadButton";
  uploadButton.style.display = "inline-block";

  let selectedFile;

  fileInput.addEventListener("change", function () {
    selectedFile = fileInput.files[0];
  });

  uploadButton.addEventListener("click", function () {
    if (selectedFile) {
      uploadFile(selectedFile);
    } else {
      console.error("No file selected");
    }
  });

  uploadContainer.appendChild(fileInput);
  uploadContainer.appendChild(browseButton);
  uploadContainer.appendChild(uploadButton);
  document.body.append(uploadContainer);
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append("upload", file);

  fetch("./PHP/upload.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      return response.json();
    })
    .then((data) => {
      window.localStorage.setItem("upload", "true");
      console.log(data);
      checkUpload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function checkUpload() {
  if (window.localStorage.getItem("upload") === "true") {
    console.log("Upload key is true!");
  }
}

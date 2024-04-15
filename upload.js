function displayUpload() {
  const body = document.querySelector("body");

  // Create file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "fileInput";
  fileInput.style.display = "none"; // Hide the file input

  // Create browse button
  const browseButton = document.createElement("button");
  browseButton.textContent = "Browse";
  browseButton.id = "browseButton";
  browseButton.style.display = "inline-block";

  // Add event listener to browse button to trigger file input click
  browseButton.addEventListener("click", function () {
    fileInput.click(); // Trigger file input click
  });

  // Create upload button
  const uploadButton = document.createElement("button");
  uploadButton.textContent = "Upload";
  uploadButton.id = "uploadButton";
  uploadButton.style.display = "inline-block";

  let selectedFile; // Variable to store selected file

  // Add event listener to file input to handle file selection
  fileInput.addEventListener("change", function () {
    selectedFile = fileInput.files[0]; // Store selected file
  });

  // Add event listener to upload button to trigger file upload
  uploadButton.addEventListener("click", function () {
    if (selectedFile) {
      uploadFile(selectedFile); // Upload selected file
    } else {
      console.error("No file selected");
    }
  });

  // Append elements to the body
  body.appendChild(fileInput);
  body.appendChild(browseButton);
  body.appendChild(uploadButton);
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append("upload", file);

  fetch("upload.php", {
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
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let currentAudioIndex = 0;

function displayAudio(audioContent) {
  let audio = new Audio(audioContent);
  audio.controls = true;
  audio.id = "audio";

  function nextAudio(event) {
    currentAudioIndex = (currentAudioIndex + 1) % audioContent.length; // Increment index and loop back if necessary
    audio.src = audioContent[currentAudioIndex];
    audio.play();
    console.log(audio);
  }

  audio.addEventListener("ended", function () {
    messageIndex++;
    displayContent(messageIndex);
  });

  nextButton.addEventListener("click", nextAudio);

  let container = document.createElement("div");
  container.appendChild(audio);

  document.body.appendChild(container);
}

//Video
function displayVideo(videoFilePath) {
  let video = document.createElement("video");
  video.src = videoFilePath;
  video.controls = true;

  let container = document.createElement("div");
  container.appendChild(video);

  document.body.appendChild(container);
}

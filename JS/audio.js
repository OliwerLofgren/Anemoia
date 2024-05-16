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
  video.id = "video";

  if (document.querySelector("#content_div")) {
    document.querySelector("#content_img").remove();
    document.querySelector("#nextMessage").remove();
    // document.querySelector("#content_div").remove();
  }
  showEndMessage(true);
  let container = document.createElement("div");
  container.appendChild(video);

  document.body.appendChild(container);

  if (videoFilePath === "./audio/Avslutning.mp4") {
    const button = document.createElement("button");
    button.id = "removeVideo";
    button.addEventListener("click", (event) => {
      video.remove();
      continueToNextLayout();
    });
    button.textContent = "Fortsätt till nästa del";
    document.body.append(button);
  }
}

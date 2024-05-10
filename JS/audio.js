let currentAudioIndex = 0;

function displayAudio(audioContent) {
  let audio = new Audio(audioContent);
  audio.controls = true;

  let nextButton = document.createElement("button");
  nextButton.id = "nextButton";
  nextButton.textContent = "Fortsätt";

  function nextAudio(event) {
    currentAudioIndex = (currentAudioIndex + 1) % audioContent.length; // Increment index and loop back if necessary
    audio.src = audioContent[currentAudioIndex];
    audio.play();
    console.log(audio);
  }

  audio.addEventListener("ended", function () {
    messageIndex++;
    displayContent(messageIndex);
    // Add your logic here to handle the end of audio playback
  });

  nextButton.addEventListener("click", nextAudio);

  let container = document.createElement("div");
  container.appendChild(audio);
  container.appendChild(nextButton);

  document.body.appendChild(container);
}

let audioAmanda = [
  "./audio/Amandadel1.mp3",
  "./audio/Amandadel2.mp3",
  "./audio/Amandadel3.mp3",
  "./audio/Amandadel4.mp3",
  "./audio/Amandadel5.mp3",
  "./audio/Amandadel6.mp3",
];

let audioPeter1 = [];

let audioPeter2 = [];

//Video
function displayVideo(videoFilePath) {
  let video = document.createElement("video");
  video.src = videoFilePath;
  video.controls = true;

  let container = document.createElement("div");
  container.appendChild(video);

  document.body.appendChild(container);
}

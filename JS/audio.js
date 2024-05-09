let currentAudioIndex = 0;

function displayAudio() {
  let audio = new Audio(audioContent[currentAudioIndex]);
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
  audio.addEventListener("ended", function() {
    messageIndex++
    displayContent(messageIndex)
    // Add your logic here to handle the end of audio playback
  });

  nextButton.addEventListener("click", nextAudio);

  let container = document.createElement("div");
  container.appendChild(audio);
  container.appendChild(nextButton);

  document.body.appendChild(container);
}

let audioContent = [
  "./audio/Amandadel1.mp3",
  "./audio/Amandadel2.mp3",
  "./audio/Amandadel3.mp3",
  "./audio/Amandadel4.mp3",
  "./audio/Amandadel5.mp3",
  "./audio/Amandadel6.mp3",
];

let currentAudioIndex = 0;

function displayAudio() {
  let audio = new Audio(audioContent[currentAudioIndex]);
  audio.controls = true;

  let nextButton = document.createElement("button");
  nextButton.id = "nextButton";
  nextButton.textContent = "Fortsätt";

  function nextAudio() {
    currentAudioIndex = (currentAudioIndex + 1) % audioContent.length; // Increment index and loop back if necessary
    audio.src = audioContent[currentAudioIndex];
    audio.play();
  }

  nextButton.addEventListener("click", nextAudio);

  let container = document.createElement("div");
  container.appendChild(audio);
  container.appendChild(nextButton);

  document.body.appendChild(container);
}

let audioContent = ["./audio/Take_me.mp3", "./audio/WithoutYou.mp3"];

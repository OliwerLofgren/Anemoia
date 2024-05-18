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
  document.getElementById("nextButton").disabled = true;
  audio.addEventListener("ended", function () {
    document.getElementById("nextButton").disabled = false;
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
  document.body.appendChild(video);

  document.body.appendChild(container);
  


  if (videoFilePath === "./audio/Avslutning.mp4") {
    video.addEventListener("ended", (event) => {
      console.log("Video has ended");
      video.remove()
      createNextButton();
    });
    button.textContent = "Fortsätt till nästa del";
    document.body.append(button);
  }

  if (window.location.search.split("?layout=")[1] === "layout0") {
    video.style.top = "30%";
  }
}

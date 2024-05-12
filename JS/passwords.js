const passWords = {
  layout2: "861",
  layout4: "peter",
  layout8: "9691",
  layout11: "aiomen",
  layout12:"lionbar"
};

function passwordFunction(currentIndex) {
  const aiDiv = document.getElementById("aiDiv");
  aiDiv.innerHTML = `
      <img id="content_img" src="./uploads/anemoia1.png"></img>
      <div id="content_div">
          <p id="ai_content_p"></p>
      </div>
      <h2 id="h2">Skriv in lösenordet för att komma vidare</h2>
      <input id="passwordInput"></input>
      <button id="checkPassword">Tryck för att testa lösenordet</button>
  `;

  document
    .getElementById("checkPassword")
    .addEventListener("click", checkPassword);
  document.getElementById("ai_content_p").style.display = "none";
  index = currentIndex;
}

function checkPassword(event) {
  console.log(passWords.layoutUrl);
  const layoutUrl = window.location.search.split("?layout=")[1];
  const numLayout = parseInt(layoutUrl.match(/\d+/));
  document.querySelector("#ai_content_p").style.display = "none";
  let foundPassword = false;

  if (passWords[layoutUrl] === document.getElementById("passwordInput").value) {
    foundPassword = true;
    if (layoutUrl === "layout11") {
    
      layout10Passed = true;
      conversationPaused = false;
      document.body.innerHTML = ""
      displayContent(index + 2);
      return true;
    }
    window.location.href = `?layout=layout${numLayout + 1}`;
    return true;
  } else {
    if (!foundPassword) {
      document.getElementById("ai_content_p").style.display = "flex";
      document
        .getElementById("ai_content_p")
        .style.setProperty("--c", "#ff0000");
      let ai = document.querySelector("#ai_content_p");
      ai.textContent = "Sorry fel kod prova igen";
      ai.style.color = "white";
    }
  }
}

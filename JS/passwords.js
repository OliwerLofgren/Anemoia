const passWords = {
  layout2: "861",
  layout5: "peter",
  layout10: "9691",
  layout13: "9585",
  layout13: "lionbar",
  layout21: "38",
  layout25: "peter",
  layout28: "0708123450",
};

function passwordFunction(currentIndex) {
  const aiDiv = document.getElementById("aiDiv");
  aiDiv.innerHTML = `
      <img id="content_img" src="./uploads/ai.gif"></img>
      <div id="content_div">
          <p id="ai_content_p"></p>
      </div>
      <p id="h2">Skriv in koden för att komma vidare</p>
      <input id="passwordInput"></input>
      <button id="checkPassword">Testa lösenordet</button>
  `;

  document
    .getElementById("checkPassword")
    .addEventListener("click", checkPassword);
  document.getElementById("ai_content_p").style.display = "none";
  index = currentIndex;
}

function checkPassword(event) {
 
  const layoutUrl = window.location.search.split("?layout=")[1];
  const numLayout = parseInt(layoutUrl.match(/\d+/));
  document.querySelector("#ai_content_p").style.display = "none";
  let foundPassword = false;
  let userInput = document.getElementById("passwordInput").value
  let newValue = userInput.toLowerCase()
  console.log(newValue);
  if (passWords[layoutUrl] === newValue) {
    foundPassword = true;
    if (layoutUrl === "layout13") {
      layout10Passed = true;
      conversationPaused = false;
      addClues(11);
      document.body.innerHTML = "";
      messageIndex++;
      displayContent(messageIndex);
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
      ai.textContent = "Vänligen försök igen";
      ai.style.color = "white";
    }
  }
}

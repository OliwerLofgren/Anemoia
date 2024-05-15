//window.localStorage.clear();

if (localStorage.getItem("access") === "false") {
  accessCheck();
}
let conversationPaused = false;
let alternateEnding = false;
let layoutSixFinished = false;
let layout10Passed = false;
let addedEvent = false;
let option1s = false;
let option2s = false;
let messageIndex = 0;

function accessCheck() {
  history.pushState(null, "", "?layout=layout0");

  document.body.innerHTML = "";
  const button = document.querySelector("button");
  const img = document.querySelector("img");
  if (button) button.style.display = "none";
  if (img) img.style.display = "none";

  const h1Element = document.createElement("p");
  h1Element.id = "denied";
  h1Element.textContent = "ACCESS DENIED";
  document.body.appendChild(h1Element);
}

let goToLayout = (layoutNumber) => {
  console.log(layoutNumber);
  window.location.href = `?layout=layout${layoutNumber}`;
};

if (localStorage.getItem("username")) {
  if (!window.location.search.includes("layout")) {
    RenderStartingpage();
  } else {
    displayLayoutName();
  }
} else {
  signUppage();
}

// function checkLayout(num) {
//   const layoutUrl = window.location.search.split("?layout=")[1];
//   const numKeys = parseInt(window.localStorage.getItem("keysFound"));
//   const numLayout = parseInt(layoutUrl.match(/\d+/));

//   if (num > numKeys) {
//     return false;
//   }
//   return true;
// }

function RenderStartingpage() {
  if (document.getElementById("content_img")) {
    document.getElementById("content_img").remove();
  }

  history.pushState(null, "", "?layout=layout0");

  let username = localStorage.getItem("username");

  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;
  let cluesFound = parseInt(window.localStorage.getItem("cluesFound")) || 0;

  let optionsHTML =
    "<option value='' selected disabled>Välj en dialog</option>";
  for (let i = 1; i < keysFound + 1; i++) {
    optionsHTML += `<option value="${i}">Dialog ${i}</option>`;
  }

  let cluesHTML = "<option value='' selected disabled>Välj en ledtråd</option>";
  for (let i = 1; i < cluesFound + 1; i++) {
    cluesHTML += `<option value="${i}">Ledtråd ${i}</option>`;
  }

  document.querySelector("body").innerHTML = `
  <h1>Välkommen till Anemonia</h1>
  <h3>${username}</h3>
  <select id="dialogSelect" >
    ${optionsHTML}
  </select>
  <p id="scan_p" style="color:#9ed644;">Skanna första / nästa QR-koden för att fortsätta!</p>
  <select id="clueSelect" >
  ${cluesHTML}
  </select>
  
`;

  document
    .getElementById("dialogSelect")
    .addEventListener("change", (event) => {
      const dialogIndex = event.target.value;
      goToLayout(dialogIndex);
    });

  const dialogOptions = document.querySelectorAll("#dialogSelect option");
  dialogOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      const dialogIndex = event.target.value;
      goToLayout(dialogIndex);
    });
  });

  document.getElementById("clueSelect").addEventListener("change", (event) => {
    const clueIndex = event.target.value;
    goToClues(clueIndex);
  });

  if (localStorage.getItem("access") === "false") {
    accessCheck();
  }
  if (parseInt(window.localStorage.getItem("keysFound")) >= 2) {
    document.getElementById("scan_p").innerHTML = "";
  }
}

function goToClues(clueIndex) {
  console.log(clueIndex);

  const children = document.body.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.id !== "clueSelect" && child.id !== "gohome") {
      child.remove();
    }
  }

  if (document.querySelector("h3")) {
    document.querySelector("h3").remove();
  }

  const img = document.createElement("img");
  img.id = "clueImage";

  switch (clueIndex) {
    case "1":
      img.src = "uploads/Tidning.png";
      break;
    case "2":
      img.src = "uploads/Skolforum-1.png";
      break;
    case "3":
      img.src = "uploads/logs_censored_font_10.png";
      break;
    case "4":
      img.src = "uploads/Schema.png";
      break;
    case "5":
      img.src = "uploads/logs_uncensored_font_10.png";
      break;
    case "6":
      img.src = "uploads/Kontoutdrag.png";
      break;
    case "7":
      img.src = "uploads/Kvitto.png";
      break;
    case "9":
      displayVideo("./audio/Overvakning.mp4");
      break;
    case "10":
      img.src = "uploads/Loggbok.png";
      break;
    case "13":
      img.src = "uploads/Anteckningar.png";
      break;
    case "14":
      img.src = "uploads/Karta.png";
      break;
    case "14":
      //LÄNK TILL FIGMA
      break;
    default:
      break;
  }

  document.body.appendChild(img);

  if (!document.getElementById("gohome")) {
    const goHome = document.createElement("button");
    goHome.id = "gohome";
    goHome.textContent = "Gå tillbaka";
    goHome.addEventListener("click", (event) => {
      RenderStartingpage();
    });
    document.body.append(goHome);
  }
}

function createNextButton() {
  let nextButton = document.createElement("button");
  nextButton.textContent = "Fortsätt till nästa del";
  nextButton.id = "nextLayout";
  document.querySelector("#content_div").remove();
  document.querySelector("#nextMessage").remove();

  nextButton.addEventListener("click", continueToNextLayout);

  if (document.querySelector("#content_div")) {
    document.querySelector("#content_div").remove();
  }
  if (document.querySelector("#nextMessage")) {
    document.querySelector("#nextMessage").remove();
  }

  document.body.appendChild(nextButton);
}

function continueToNextLayout() {
  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;
  keysFound++;

  window.localStorage.setItem("keysFound", keysFound);

  window.location.href = `?layout=layout${keysFound}`;
}

function checkUpload() {
  if (window.localStorage.getItem("upload") === "true") {
    console.log("Upload key is true!");
    showEndMessage();
  }
}

function displayLayoutName() {
  const urlParams = new URLSearchParams(window.location.search);
  const layoutNumber = urlParams.get("layout").replace("layout", "");
  const keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;

  if (layoutNumber === "0" || isNaN(parseInt(layoutNumber))) {
    RenderStartingpage();
    return;
  }
  if (addKey()) {
    continueToNextLayout();
  }

  if (layoutNumber > keysFound) {
    RenderStartingpage();
    // window.location.reload();
  } else {
    document.querySelector("body").innerHTML = `
      <button id="goHome">Gå tillbaka</button>
    `;
    document.getElementById("goHome").addEventListener("click", (event) => {
      RenderStartingpage();
    });
  }

  displayContent(messageIndex);
}
function addKey() {
  const urlParams = new URLSearchParams(window.location.search);
  const layoutNumber = urlParams.get("layout").replace("layout", "");

  let keys = parseInt(window.localStorage.getItem("keysFound"));
  console.log(layoutNumber);

  if (keys + 1 === parseInt(layoutNumber)) {
    return true;
  } else {
    return false;
  }
}

function displayContent(currentIndex) {
  console.log(currentIndex);
  const layoutUrl = window.location.search.split("?layout=")[1];
  let aiDiv = document.getElementById("aiDiv");

  if (!aiDiv) {
    aiDiv = document.createElement("div");
    aiDiv.id = "aiDiv";
    aiDiv.innerHTML = `
      <img id="content_img" src="./uploads/ai.gif"></img>
      <div id="content_div">
        <p id="ai_content_p"></p>
      </div>
      <div id="nextMessage" class="nextMessage" style="display:none;">
        <button id="nextButton"></button>
      </div>
      <div id="user_options"></div>
      
    `;
    addedEvent = false;
    document.body.append(aiDiv);
  }

  if (layoutUrl === "layout12" && layout10Passed === false) {
    let helpMe = document.getElementById("helpButton");
    if (!helpMe) {
      helpMe = document.createElement("p");
      helpMe.setAttribute("id", "helpButton");
      helpMe.textContent = "jag behöver hjälp";
      document.querySelector("#user_options").appendChild(helpMe);
      helpMe.addEventListener("click", (event) => {
        passwordFunction(currentIndex);
      });
    }
  }

  if (layoutUrl === "layout12" && layout10Passed === true) {
    conversationPaused = false;
    document
      .getElementById("nextMessage")
      .addEventListener("click", (event) => {
        messageIndex++;
        displayContent(messageIndex);
      });
  }

  if (conversationPaused === false) {
    let currentContent;
    currentContent = content;
    for (let layoutContent in currentContent) {
      if (layoutUrl === layoutContent) {
        const message = currentContent[layoutContent][currentIndex];
        console.log(message);
        const container = document.getElementById("content_div");

        if (!message) {
          showEndMessage();
          return;
        }
        let text;
        const sender = Object.keys(message)[0];
        const textContent = message[sender];
        if (content || currentContent) {
          text = textContent.replace(
            /USER/g,
            window.localStorage.getItem("username")
          );
        }
        document.getElementById("content_img").style.opacity = "1";
        document.getElementById("ai_content_p").style.opacity = "1";
        console.log(text);
        if (text == "Då måste morotskakan vara till pjotur895? Vem är det?") {
          showEndMessage();
        }
        if (sender === "timeToChoose") {
          displayOptions();
        }
        if (sender === "Bild") {
          messageIndex++;
          displayImage(text, messageIndex);
        }
        if (sender === "Ljudfil") {
          document.getElementById("content_div").style.opacity = "0";
          if (document.getElementById("audio")) {
            document.getElementById("audio").remove();
          }
          displayAudio(text);
        }
        if (sender === "Spelare") {
          // Display user message

          displayUserMessage(text);
        }
        console.log(sender);

        if (sender === "Anemonia") {
          document.getElementById("nextButton").disabled = true;
          const messageContainer = document.getElementById("ai_content_p");
          let index = 0;
          if (messageContainer.innerHTML !== "") {
            console.log("content");
            return;
          } else {
            console.log("no content");
          }
          const interval = setInterval(() => {
            if (index < text.length && conversationPaused === false) {
              messageContainer.textContent += text[index];
              index++;
            } else {
              if (
                text ===
                ".--- .- --. / ..-. .--.- .-. / . .--- / ... ...- .- .-. .- / .--. .--.- / -.. . - - .--"
              ) {
                console.log("hmm");
                document.getElementById("nextButton").disabled = true;
                conversationPaused = true;
                clearInterval(interval);
                return;
              }
              clearInterval(interval);
              document.getElementById("nextButton").disabled = false;
              let newMessage = content[layoutContent][currentIndex + 1];
              if (
                !Object.keys(newMessage)[0] ||
                !content[layoutContent][currentIndex + 1]
              ) {
                showEndMessage(true);
              }
              let newSender = Object.keys(newMessage)[0];
              let newText = newMessage[newSender];

              if (newSender === "Spelare") {
                document.getElementById("nextButton").textContent = newText;
                messageIndex++;
                console.log(messageIndex);
              } else {
                console.log("AI");
                document.getElementById("nextButton").textContent = "Nästa";
              }
              if (addedEvent === false) {
                document.getElementById("nextMessage").style.display = "block";
                document
                  .getElementById("nextButton")
                  .addEventListener("click", (event) => {
                    //conversationPaused = false;
                    //messageContainer.innerHTML = ""
                    addedEvent = true;
                    displayContent(messageIndex);
                  });
              }
            }
          }, 50);
        }
      }
    }
  }
}

function displayUserMessage(text) {
  document.getElementById("nextMessage").style.display = "flex";
  document.getElementById("nextButton").textContent = text;
  if (text === undefined) {
    showEndMessage();
  }
}
if (document.getElementById("nextMessage") && addedEvent === false) {
  document.getElementById("nextMessage").addEventListener("click", (event) => {
    messageIndex++;
    document.getElementById("ai_content_p").innerHTML = "";
    //document.getElementById("user_content_p").innerHTML = ``;
    console.log("hufe");
    displayContent(messageIndex);
  });
}

function showEndMessage(check) {
  if (check !== true) {
    switchFunction(window.location.search.split("?layout=")[1]);
  }
  if (check === true) {
    setTimeout(() => {
      const aiContentP = document.getElementById("ai_content_p");
      aiContentP.style.color = "#9ed644";
      aiContentP.style.border = "none";
      aiContentP.textContent = "Skanna nästa QR-kod för att fortsätta!";
    }, 600);
  }

  console.log("YO WTF IS HAPPENING?");
}

function displayImage(url, index) {
  document.querySelector("body").innerHTML = `
  <img id="content_img" class="display_image" src="./uploads/anemoia.png"></img>
  <img id="image" src="${url}"></img>
  <div id="content_div">
        <p id="ai_content_p"></p>
      </div>
  <button id="removeImage">Stäng ner bilden</button>
  <button id="goHome">Gå tillbaka</button>`;
  document.getElementById("removeImage").addEventListener("click", (event) => {
    document.getElementById("image").remove();
    document.querySelector("body").innerHTML = "";
    displayContent(index);
  });
  document.getElementById("content_img").style.opacity = "0";
  document.getElementById("ai_content_p").style.opacity = "0";
}
function addClues(number) {
  //let numClues = parseInt(window.localStorage.getItem("cluesFound"));
  window.localStorage.setItem("cluesFound", number);
  console.log(window.localStorage.getItem("cluesFound"));
}

function switchFunction(layout) {
  switch (layout) {
    case "layout1":
      addClues(4);
      displayUpload();
      if (window.localStorage.getItem("upload") === "true") {
        createNextButton();
      }
      break;
    case "layout2":
      createNextButton();
      break;
    case "layout3":
      addClues(5);
      showEndMessage(true);
      break;
    case "layout4":
      addClues(6);
      createNextButton();
      break;
    case "layout5":
      addClues(7);
      passwordFunction();
      break;
    case "layout6":
      createNextButton();
      break;
    case "layout7":
      addClues(9);
      createNextButton();
      break;
    case "layout8":
      addClues(7);
      showEndMessage(true);
      break;
    case "layout9":
      displayVideo("./audio/Overvakning.mp4");

      break;
    case "layout10":
      addClues(10);
      fakeCaptcha();
      break;
    case "layout11":
      passwordFunction();
      break;
    case "layout12":
      passwordFunction();
      break;
    case "layout13":
      addClues(11);
      createNextButton();
      break;
    case "layout14":
      addClues(13);
      createNextButton();
      break;
    case "layout15":
      addClues(14);
      createNextButton();
      break;
    case "layout16":
      createNextButton();
      break;
    case "layout17":
      addClues(15);
      showEndMessage(true);

      break;
    case "layout18":
      createNextButton();
      break;
    case "layout19":
      createNextButton();
      break;
    case "layout20":
      createNextButton();
      break;
    case "layout21":
      createNextButton();
      break;
    case "layout22":
      createNextButton();
      break;
    case "layout23":
      window.localStorage.setItem("access", "false");
      accessCheck();
      break;
    case "layout24":
      passwordFunction();
      break;
    case "layout25":
      createNextButton();
      break;
    case "layout26":
      createNextButton();
      break;
    case "layout27":
      passwordFunction();
      break;
    case "layout28":
      createNextButton();
      break;
    case "layout29":
      createNextButton();
      break;

    default:
      break;
  }
}

function fakeCaptcha() {
  let captchas = document.querySelector("#content_div");
  //captcha.classList.add("captcha")
  captchas.innerHTML = `
  <div id="fake-captcha">
  <div id="fake-checkbox"></div>
  Are you really a human?
  </div>
  `;
  document.querySelector("body").appendChild(captchas);

  var captcha = document.getElementById("fake-captcha");

  var passOrFail = function () {
    var pass = Math.round(Math.random());
    console.log(pass);
    if (pass === 1) {
      addClues(7);
      window.location.href = `?layout=layout11`;
      return "pass";
    }
  };

  captcha.onclick = function () {
    if (captcha.className.includes("loading")) return;

    captcha.className = "";

    captcha.className += "loading";

    setTimeout(function () {
      captcha.className = captcha.className.replace("loading", "");
      captcha.className += passOrFail();
    }, Math.floor(Math.random() * 3000 + 1000));
  };
}

function displayOptions() {
  let alt1 = document.createElement("div");
  let alt2 = document.createElement("div");

  alt1.classList.add("nextMessage");
  alt1.id = "alt1";
  alt1.textContent = "Option 1";
  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;

  alt1.addEventListener("click", (event) => {
    option1s = true;
    messageIndex = 0;
    document.getElementById("ai_content_p").innerHTML = "";
    alt2.remove();
    keysFound = 21;

    window.localStorage.setItem("keysFound", keysFound);

    window.location.href = `?layout=layout${keysFound}`;
    //displayContent(messageIndex);
  });

  alt2.classList.add("nextMessage");
  alt2.id = "alt2";
  alt2.textContent = "Option 2";

  alt2.addEventListener("click", (event) => {
    option2s = true;
    messageIndex = 0;
    document.getElementById("ai_content_p").innerHTML = "";
    alt1.remove();

    keysFound = 24;

    window.localStorage.setItem("keysFound", keysFound);

    window.location.href = `?layout=layout${keysFound}`;
    //displayContent(messageIndex);
    displayContent(messageIndex);
  });

  document.querySelector("#user_options").append(alt1, alt2);
}
/*
lägg in för rörlig bild
<div style="padding-top:100.000%;position:relative;"><iframe src="https://gifer.com/embed/QWfb" width="100%" height="100%" style='position:absolute;top:0;left:0;' frameBorder="0" allowFullScreen></iframe></div>
<p><a href="https://gifer.com%22%3Evia/" GIFER></a></p>
*/

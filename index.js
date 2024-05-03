//window.localStorage.clear()
if (localStorage.getItem("access") === "false") {
  accessCheck();
}
let alternateEnding = false;
let layoutSixFinished = false;
function accessCheck() {
  history.pushState(null, "", "?layout=layout0");

  document.body.innerHTML = "";
  const button = document.querySelector("button");
  const img = document.querySelector("img");
  if (button) button.style.display = "none";
  if (img) img.style.display = "none";

  const h1Element = document.createElement("h1");
  h1Element.textContent = "ACCESS DENIED";
  document.body.appendChild(h1Element);
}

let messageIndex = 0;
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

function checkLayout(num) {
  const layoutUrl = window.location.search.split("?layout=")[1];
  const numKeys = parseInt(window.localStorage.getItem("keysFound"));
  const numLayout = parseInt(layoutUrl.match(/\d+/));

  if (num > numKeys) {
    return false;
  }
  return true;
}

function RenderStartingpage() {
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
  <h1>Välkommen till Anomeia</h1>
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

  // displayUpload();
}
function goToClues(clueIndex) {
  console.log(clueIndex);

  document.querySelector("h1").remove();
  document.querySelector("h3").remove();
  document.getElementById("dialogSelect").remove();

  const img = document.createElement("img");
  img.id = "clueImage";

  switch (clueIndex) {
    case "1":
      img.src = "uploads/Tidning.png";
      break;
    case "2":
      img.src = "uploads/Skolforum.png";
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
      img.src = "uploads/Kvitto.png";
      break;
    default:
  }

  document.body.append(img);

  const goHome = document.createElement("button");
  goHome.id = "gohome";
  goHome.textContent = "Gå tillbaka";

  goHome.addEventListener("click", (event) => {
    RenderStartingpage();
  });
  document.body.append(goHome);
  // if (window.localStorage.getItem("upload") === "false") {
  //   document.querySelector("body").innerHTML = `
  //   <p>Du har inga ledtrådar än, kom tillbaka när du skaffat ledtrådar</p>
  //   <button id="goHome">Gå tillbaka</button>`;
  // }

  // if (window.localStorage.getItem("upload") === "true") {
  //   document.querySelector("body").innerHTML = `
  //   <img>här ska bilden vara</img>
  //   <button id="goHome">Gå tillbaka</button>`;
  // }
}

function continueToNextLayout() {
  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;
  keysFound++;

  window.localStorage.setItem("keysFound", keysFound);

  window.location.href = `?layout=layout${keysFound}`;
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
  // accessCheck();
  const layoutUrl = window.location.search.split("?layout=")[1];
  let aiDiv = document.getElementById("aiDiv");

  if (!aiDiv) {
    aiDiv = document.createElement("div");
    aiDiv.id = "aiDiv";
    aiDiv.innerHTML = `
      <img id="content_img" src="./uploads/anemoia1.png"></img>
      <div id="content_div">
        <p id="ai_content_p"></p>
      </div>
      <div id="nextMessage" class="nextMessage">
        <p id="user_content_p"></p>
      </div>
      <div id="user_options"></div>
      
    
    `;
    document.body.append(aiDiv);
  }

  for (let layoutContent in content) {
    if (layoutUrl === layoutContent) {
      const message = content[layoutContent][currentIndex];
      const container = document.getElementById("content_div");

      if (message === undefined) {
        showEndMessage();
      }

      console.log(Object.keys(message).length);
      if (message === undefined || Object.keys(message).length == 0) {
        document.getElementById("nextMessage").style.display = "none";
        showEndMessage();
      } else {
        let replacedContent;
        const sender = Object.keys(message)[0];
        const text = message[sender];
        if (text) {
          replacedContent = text.replace(
            /USER/g,
            window.localStorage.getItem("username")
          );
        }

        if (sender === "Spelare") {
          console.log(replacedContent);
          displayUserMessage(replacedContent);
        }
        if (sender === "Anemonia") {
          document.getElementById("nextMessage").style.display = "none";
          document.getElementById("ai_content_p").style.opacity = "100%";

          const messageContainer = document.getElementById("ai_content_p");
          const messageElement = document.createElement("div");
          messageElement.classList.add("message", sender.toLowerCase());
          console.log(messageElement);

          let index = 0;
          if (index === replacedContent.length) {
            setInterval(() => {
              console.log("jife");
            }, 1000);
          }
          const interval = setInterval(() => {
            if (index < replacedContent.length) {
              messageContainer.textContent += replacedContent[index];
              index++;

              if (
                replacedContent ===
                "Ladda upp en fil så jag kan bekräfta att du är riktig"
              ) {
                if (!document.getElementById("browseButton")) {
                  if (window.localStorage.getItem("upload") === "false") {
                    displayUpload();
                  }
                }
              }
            } else {
              if (replacedContent === "SPECIAL LAYOUT!") {
                let alt1 = document.createElement("div");
                let alt2 = document.createElement("div");

                alt1.classList.add("nextMessage");
                alt1.textContent = "Option 1";
                alt1.addEventListener("click", (event) => {
                  window.location.href = `?layout=layout7`;
                  displayContent(0);
                });

                alt2.classList.add("nextMessage");
                alt2.textContent = "Option 2";
                alt2.addEventListener("click", (event) => {
                  window.location.href = `?layout=layout8`;
                  displayContent(0);
                });

                document.querySelector("#user_options").append(alt1, alt2);
              }
              clearInterval(interval);
              if (
                document.getElementById("user_content_p").textContent === ""
              ) {
                setTimeout(() => {
                  messageIndex++;
                  displayContent(messageIndex);
                }, 800);
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
  document.getElementById("user_content_p").textContent = text;
  if (text === undefined) {
    showEndMessage();
  }
}
if (document.getElementById("nextMessage")) {
  document.getElementById("nextMessage").addEventListener("click", (event) => {
    messageIndex++;
    document.getElementById("ai_content_p").innerHTML = "";
    document.getElementById("user_content_p").innerHTML = ``;

    displayContent(messageIndex);
  });
}

function showEndMessage() {
  if (window.location.search.split("?layout=")[1] === "layout2") {
    window.localStorage.setItem("cluesFound", 4);
  }
  if (parseInt(window.localStorage.getItem("cluesFound")) === 4) {
    alert("Du har 4 nya ledtrådar i ledtrådsbanken");
    console.log("hje");
  }
  console.log("YO WTF IS HAPPENING?");
  setTimeout(() => {
    const aiContentP = document.getElementById("ai_content_p");
    aiContentP.style.color = "#9ed644";
    aiContentP.style.border = "none";
    aiContentP.textContent = "Skanna nästa QR-kod för att fortsätta!";
  }, 600);
}

// if (window.location.search.split("?layout=")[1] === "layout4") {
//   /*
//   document.querySelector("body").innerHTML = `

//   <script type="module" src="https://unpkg.com/@splinetool/viewer@1.1.8/build/spline-viewer.js"></script>
// <spline-viewer url="https://prod.spline.design/Xz5uwIX7cuwOBMMv/scene.splinecode"></spline-viewer>

//  `
//  */
//   displayImage("./uploads/Kvitto.png");
// }

function displayImage(url) {
  document.querySelector("body").innerHTML = `
  <img id="content_img" src="default-pfp.jpg"></img>
  <img src="${url}"></img>
  <button id="nextMessage"></button>
  <button id="goHome">Go Home!</button>`;
}

/*

 <!-- Fake captcha start -->
  <div class="fkrc-container fkrc-m-p">
    <!-- Captcha checkbox widget -->
    <div id="fkrc-checkbox-window" class="fkrc-checkbox-window fkrc-m-p fkrc-block">
        <div class="fkrc-checkbox-container fkrc-m-p">
            <button type="button" id="fkrc-checkbox" class="fkrc-checkbox fkrc-m-p fkrc-line-normal"></button>
        </div>
        <p class="fkrc-im-not-a-robot fkrc-m-p fkrc-line-normal">I'm not a robot</p>
        <img src="./uploads/captcha_logo.svg" class="fkrc-captcha-logo fkrc-line-normal" alt="">
        <p class="fkrc-checkbox-desc fkrc-m-p fkrc-line-normal">CAPTCHA</p>
        <p class="fkrc-checkbox-desc fkrc-m-p fkrc-line-normal">Privacy - Terms</p>
        <img src="./uploads/captcha_spinner.gif" class="fkrc-spinner fkrc-m-p fkrc-line-normal" alt="" id="fkrc-spinner">
    </div>
    <!-- Captcha checkbox verification window -->
    <div id="fkrc-verifywin-window" class="fkrc-verifywin-window">
        <div class="fkrc-verifywin-container">
            <header class="fkrc-verifywin-header">
                
                <span class="fkrc-verifywin-header-text-big fkrc-m-p fkrc-block">Tack mannen</span>
               
            </header>
            <main class="fkrc-verifywin-main">
                Your content
            </main>
        </div>
        <footer class="fkrc-verifywin-container fkrc-verifywin-footer">
            <div class="fkrc-verifywin-footer-left">
                Press the verify button to proceed.
            </div>
            <button type="button" class="fkrc-verifywin-verify-button fkrc-block" id="fkrc-verifywin-verify-button">Verify</button>
        </footer>
    </div>
    <img src="./uploads/captcha_arrow.svg" alt="" class="fkrc-verifywin-window-arrow" id="fkrc-verifywin-window-arrow"/>
</div>
<!-- Fake captcha end -->`
*/

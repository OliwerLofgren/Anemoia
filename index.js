// localStorage.clear();

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

  let buttonsHTML = "";
  for (let i = 1; i < keysFound + 1; i++) {
    buttonsHTML += `<button onclick="goToLayout(${i})" class="clue_button" id="${i}">Ledtråd ${i}</button>`;
  }

  document.querySelector("body").innerHTML = `
    <h1>Välkommen till Anomeia</h1>
    <h3>${username}</h3>
    ${buttonsHTML}
    <p id="scan_p" style="color:limegreen;">Skanna första / nästa QR-koden för att fortsätta!</p>
  `;
  if (localStorage.getItem("access") === "false") {
    accessCheck();
  }
  // displayUpload();
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
      <h1>Ledtråd ${layoutNumber}</h1>
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
      <img id="content_img" src="default-pfp.jpg"></img>
      <div id="content_div">
        <p id="ai_content_p"></p>
      </div>
      <div id="nextMessage" class="nextMessage">
        <p id="user_content_p"></p>
      </div>
      <div id="alternative2" style="display: none;" class="nextMessage">ALTERNATIV 2</div>
    `;
    document.body.append(aiDiv);
  }

  for (let layoutContent in content) {
    if (layoutUrl === layoutContent) {
      const message = content[layoutContent][currentIndex];
      const container = document.getElementById("content_div");

      if (message === undefined) {
        setTimeout(() => {
          document.getElementById("ai_content_p").style.color = "limegreen";
          document.getElementById("ai_content_p").textContent =
            "Skanna nästa QR-kod för att fortsätta!";
          return;
        }, 600);
      }
      const sender = Object.keys(message)[0];
      const text = message[sender];
      let replacedContent = text.replace(
        /USER/g,
        window.localStorage.getItem("username")
      );

      if (sender === "AI") {
        document.getElementById("nextMessage").style.display = "none";
        const messageContainer = document.getElementById("ai_content_p");
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender.toLowerCase());
        console.log(messageElement);

        let index = 0;
        const interval = setInterval(() => {
          if (index < replacedContent.length) {
            messageContainer.textContent += replacedContent[index];
            index++;
          } else {
            clearInterval(interval);
            if(alternateEnding === false){
              displayUserMessage();
            }
            if (document.getElementById("user_content_p").textContent === "") {
              document.getElementById("ai_content_p").textContent = "";
              setTimeout(() => {
                messageIndex++;
                displayContent(messageIndex);
              }, 600);
            }
          }
        }, 50);

        function displayUserMessage() {
          const userMessageContainer = document.getElementById("user_content_p");
          const message = content[layoutContent][currentIndex + 1];
          const container = document.getElementById("content_div");
          console.log(message);
          if (message === undefined) {
            setTimeout(() => {
              document.getElementById("ai_content_p").style.color = "limegreen";
              document.getElementById("ai_content_p").textContent =
                "Skanna nästa QR-kod för att fortsätta!";

              return;
            }, 600);
          }

          const sender = Object.keys(message)[0];
          if (sender !== "AI") {
            document.getElementById("nextMessage").style.display = "flex";
            if(layoutUrl === "layout6"){
              if(document.getElementById("alternative2")){
                document.getElementById("alternative2").style.display = "flex"
                document.getElementById("alternative2").addEventListener("click", alternativeEnd);
                
              }
              
            }
            const text = message[sender];
            let replacedContent = text.replace(
              /USER/g,
              window.localStorage.getItem("username")
            );
            userMessageContainer.textContent = replacedContent;
          }
        }
      } else {
        if (!alternateEnding && !(layoutUrl === "layout6" && !layoutSixFinished)) { // Add condition for layout six
          displayContent(messageIndex);
        }
      }
    }
  }
}

document.getElementById("nextMessage").addEventListener("click", (event) => {
  messageIndex++;
  document.getElementById("ai_content_p").innerHTML = ``;
  document.getElementById("user_content_p").innerHTML = ``;
  if(document.getElementById("alternative2")){
    document.getElementById("alternative2").remove()
  }
  displayContent(messageIndex);
});

async function alternativeEnd(event) {
  alternateEnding = true;
  document.getElementById("ai_content_p").textContent = "";
  document.getElementById("alternative2").remove()

  
  for (const message of content_2.layoutAlt1) {
    
    const sender = Object.keys(message)[0];
    const text = message[sender];
    let replacedContent = text.replace(
      /USER/g,
      window.localStorage.getItem("username")
    );
    console.log(replacedContent);

    if (sender === "Spelare") {
      isUserMessage = true;
      document.getElementById("user_content_p").textContent = replacedContent;
      // Wait for user input before displaying the next AI message
      await new Promise(resolve => {
        document.getElementById("nextMessage").style.display = "flex";
        document.getElementById("nextMessage").onclick = () => {
          document.getElementById("nextMessage").style.display = "none";
          resolve();
        };
      });
    } else if (sender === "AI") {
      console.log("FFEFFE");
      document.getElementById("nextMessage").style.display = "none";
      await displayMessage(replacedContent);
    }
  }
  alternateEnding = false;
}

function displayMessage(replacedContent) {
  console.log(replacedContent);
  return new Promise(resolve => {
    const messageContainer = document.getElementById("ai_content_p");
    messageContainer.textContent = ""; // Clear existing content

    let i = 0;
    const interval = setInterval(() => {
      if (i < replacedContent.length) {
        messageContainer.textContent += replacedContent[i];
        i++;
      } else {
        clearInterval(interval);
        // Resolve the Promise after displaying the message
        resolve();
      }
    }, 50);
  });
}

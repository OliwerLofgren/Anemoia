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
    buttonsHTML += `<button onclick="goToLayout(${i})" id="${i}">Clues ${i}</button>`;
  }

  document.querySelector("body").innerHTML = `
    <h1>Welcome</h1>
    <h3>${username}</h3>
    ${buttonsHTML}
    
  `;
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
      <h1>Welcome to Layout ${layoutNumber}</h1>
      <button id="goHome">Go to Startpage</button>
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
      <div id="nextMessage">
        <p id="user_content_p"></p>
      </div>
    `;
    document.body.append(aiDiv);
  }

  console.log(layoutUrl);
  
  for (let layoutContent in content) {
    if (layoutUrl === layoutContent) {
      const message = content[layoutContent][currentIndex];
      const container = document.getElementById('content_div');

      if(message === undefined){
        document.getElementById("ai_content_p").textContent = "Gå och scanna nästa qr kod!"
        return;
      }
      const sender = Object.keys(message)[0];
      const text = message[sender];
      let replacedContent = text.replace(/USER/g, window.localStorage.getItem("username"));

      console.log(sender);
      if(sender === "AI"){
        document.getElementById("nextMessage").style.display = "none"
        const messageContainer = document.getElementById("ai_content_p");
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender.toLowerCase());
        console.log(messageElement);
       
  
        let index = 0;
        const interval = setInterval(() => {
          if (index < replacedContent.length) {
            messageContainer.textContent += replacedContent[index];
            index++;
          } else {
            clearInterval(interval);
            displayUserMessage();
            if(document.getElementById("user_content_p").textContent === ""){
              document.getElementById("ai_content_p").textContent = ""
              messageIndex++;
              displayContent(messageIndex);
            }
          }
        }, 50);

        function displayUserMessage() {
          // You can replace this with your actual logic to display user's message
          const userMessageContainer = document.getElementById("user_content_p");
          const message = content[layoutContent][currentIndex + 1];
          const container = document.getElementById('content_div');
          console.log(message);
          if(message === undefined){
            document.getElementById("ai_content_p").textContent = "Gå och scanna nästa qr kod!"
            document.getElementById("ai_content_p").style.color = "limegreen"
            return;
          }
          
          const sender = Object.keys(message)[0];
          if(sender !== "AI"){
            
            document.getElementById("nextMessage").style.display = "flex"
            const text = message[sender];
            let replacedContent = text.replace(/USER/g, window.localStorage.getItem("username"));
            userMessageContainer.textContent = replacedContent
          }
        }
      }else{
        messageIndex++;
        displayContent(messageIndex);
      }

    }
  }
}



document.getElementById("nextMessage").addEventListener("click", event => {
  messageIndex++
  document.getElementById("ai_content_p").innerHTML = ``;
  document.getElementById("user_content_p").innerHTML = ``
  displayContent(messageIndex)
})

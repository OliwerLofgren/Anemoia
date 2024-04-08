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

function displayContent(){

  let aiDiv = document.createElement("div")
  aiDiv.innerHTML = `
    <img id="content_img">jag är en ai </img>

    <div id="content_div">

      <p id="content_p"></p>  
      
    </div>
  `
  const layoutUrl = window.location.search.split("?layout=")[1];
  for(layoutContent of content){
    if(layoutUrl === layoutContent){

    }
  }
  
  


  
}

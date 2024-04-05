

let goToLayout = (layoutName) => {
  window.location.href = `?layout=${layoutName}`;
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
let layoutUrl = window.location.search.split("?layout=")[1];
let numKeys = window.localStorage.getItem("keysFound");
let numLayout = parseInt(layoutUrl.match(/\d+/));

if (numLayout >= parseInt(numKeys)) {
    RenderStartingpage();
    history.pushState(null, "", "?layout=layout0");
  }

function checkLayout(){
  if (window.location.search.includes("layout")) {

  if (parseInt(numKeys) >= numLayout) {
    document.querySelector("body").innerHTML = `
        <h1>Welcome to layout${numKeys}</h1>
        <button onclick="continueToNextLayout()">Continue</button>
      `;
  } else {
    RenderStartingpage();
    history.pushState(null, "", "?layout=layout0");
    
  }
}
}

function RenderStartingpage() {
  history.pushState(null, "", "?layout=layout0");
  let username = localStorage.getItem("username");

  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;

  let buttonsHTML = "";
  for (let i = 1; i <= keysFound + 1; i++) {
    buttonsHTML += `<button onclick="goToLayout('layout${i}')" id="${i}">Layout ${i}</button>`;
  }

  document.querySelector("body").innerHTML = `
    <h1>Welcome</h1>
    <h3>${username}</h3>
    ${buttonsHTML}
    <button onclick="continueToNextLayout()">Continue</button>
  `;
}

function continueToNextLayout() {
  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;
  keysFound++;

  window.localStorage.setItem("keysFound", keysFound);

  window.location.href = `?layout=layout${keysFound}`;
  checkLayout()
  
}

function displayLayoutName() {
  const urlParams = new URLSearchParams(window.location.search);
  const layoutNumber = urlParams.get("layout").replace("layout", "");
  console.log(layoutNumber);

  document.body.innerHTML = "";
if(layoutNumber === "0"){
  RenderStartingpage()
}else{

  document.querySelector("body").innerHTML = `
  <h1>Welcome to Layout ${layoutNumber}</h1>
  <button id="goHome"> Go Home</button>
  `
  document.getElementById("goHome").addEventListener("click", event => {
    RenderStartingpage()
  })
}
}

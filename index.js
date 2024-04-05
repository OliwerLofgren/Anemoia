
let goToLayout = (layoutName) => {
  console.log(layoutName);
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



function checkLayout(num) {
  const layoutUrl = window.location.search.split("?layout=")[1];
  const numKeys = parseInt(window.localStorage.getItem("keysFound"));
  const numLayout = parseInt(layoutUrl.match(/\d+/));

  if (num > numKeys) {
    // If the layout number is higher than the number of keys found, redirect to starting page
    RenderStartingpage();
    return;
  }

  history.pushState(null, "", `?layout=layout${num}`);
  document.querySelector("body").innerHTML = `
      <h1>Welcome to layout${num}</h1>
      <button id="goHome"> Go Home</button>
  `;
  
  document.getElementById("goHome").addEventListener("click", event => {
    RenderStartingpage();
  });
}


function RenderStartingpage() {
  history.pushState(null, "", "?layout=layout0");
  let username = localStorage.getItem("username");

  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;

  let buttonsHTML = "";
  for (let i = 1; i <= keysFound + 1; i++) {
    buttonsHTML += `<button onclick="checkLayout(${i})" id="${i}">Layout ${i}</button>`;
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

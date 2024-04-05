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

if (window.location.search.includes("layout")) {
  let layoutUrl = window.location.search.split("?layout=")[1];
  let numKeys = window.localStorage.getItem("keysFound");
  let numLayout = parseInt(layoutUrl.match(/\d+/));

  if (parseInt(numKeys) === numLayout) {
    document.querySelector("body").innerHTML = `
        <h1>Welcome to layout${numKeys}</h1>
        <button onclick="continueToNextLayout()">Continue</button>
      `;
  } else {
    RenderStartingpage();
    history.pushState(null, "", "?layout=layout0");
  }
}

function RenderStartingpage() {
  let username = localStorage.getItem("username");

  let keysFound = parseInt(window.localStorage.getItem("keysFound")) || 0;

  let buttonsHTML = "";
  for (let i = 1; i <= keysFound + 1; i++) {
    buttonsHTML += `<button onclick="goToLayout('layout${i}')">Layout ${i}</button>`;
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
}

function displayLayoutName() {
  const urlParams = new URLSearchParams(window.location.search);
  const layoutNumber = urlParams.get("layout").replace("layout", "");

  document.body.innerHTML = "";

  const h1Element = document.createElement("h1");

  h1Element.textContent = `Layout ${layoutNumber}`;

  document.body.appendChild(h1Element);
}

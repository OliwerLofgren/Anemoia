// localStorage.clear();

if (localStorage.getItem("username")) {
  if (!window.location.search.includes("layout")) {
    RenderStartingpage();
  } else {
    displayLayoutName();
  }
} else {
  signUppage();
}

function RenderStartingpage() {
  document.querySelector("body").innerHTML = `
    <h1>Welcome</h1>
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

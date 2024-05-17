"use strict";

function signUppage(event) {
  document.querySelector("main").innerHTML = `
    <main>
    <h1>Anemonia</h1>
    <div class="container">
    <div id="helloMessage">Vilket alias ska jag tillskriva dig?</div>
      <div class="box">
        <input placeholder="Username" id="registerUsername"></input>
        <input placeholder="Password" id="registerPassword" type ="password"></input>
        <button id="register">Registrera</button>
      </div>
        <button id="loginShortCut">Gå till login</button>
        <p id="registrationMessage"></p>
    </div>
</main>
    `;
  document
    .getElementById("register")
    .addEventListener("click", registerFunction);
  document
    .getElementById("loginShortCut")
    .addEventListener("click", signInpage);
}

function registerFunction(event) {
  let username = document.getElementById("registerUsername").value;
  let password = document.getElementById("registerPassword").value;

  fetch("./PHP/register.php", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      action: "register",
    }),
  })
    .then((respone) => respone.json())
    .then((data) => {
      document.getElementById("registrationMessage").textContent = data.message;
    });
}

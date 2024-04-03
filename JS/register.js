"use strict";

function signUppage(event) {
  document.querySelector("main").innerHTML = `
    <main>
    <h1>Anomeia</h1>
    <div>
        <div class="box">
            <button id="register">Register</button>
            <input placeholder="Username" id="registerUsername"></input>
            <input placeholder="Password" id="registerPassword"></input>
        </div>
        <button id="loginShortCut">Go to login</button>
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

  fetch("../PHP/register.php", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      action: "register",
    }),
  });
}

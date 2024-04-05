"use strict";

function signInpage(event) {
  document.querySelector("main").innerHTML = `
    <main>
        <h1>Anomeia Login</h1>
        <div>
            <div class="box">
                <button id="login">Login</button>
                <input placeholder="Username" id="loginUsername"></input>
                <input placeholder="Password" id="loginPassword" type="password"></input>
            </div>
            <p id="loginMessage"></p>
        </div>
    </main>
    `;
  document.getElementById("login").addEventListener("click", loginFunction);
}

function loginFunction(event) {
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;
  console.log(username);

  fetch("login.php", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      action: "login",
    }),
  })
    .then((request) => request.json())
    .then((resource) => {
      console.log(resource);
      if (resource.message === "Login successful!") {
        document.getElementById("loginMessage").textContent = resource.message;

        window.localStorage.setItem("username", username);
        window.localStorage.setItem("keysFound", 0);

        RenderStartingpage();
      } else {
        console.log("login failed");
        document.getElementById("loginMessage").textContent = resource.message;
      }
    });
}

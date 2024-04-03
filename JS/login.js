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
        </div>
    </main>
    `;
  document.getElementById("login").addEventListener("click", loginFunction);
}

function loginFunction(event) {
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;
  console.log(username);

  fetch("../PHP/login.php", {
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
        console.log("sucess");
        window.localStorage.setItem("username", username);
        RenderStartingpage();
      } else {
        console.log("login failed");
      }
    });
}

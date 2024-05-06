const passWords = [
    layout5 = "carl",
    layout4 = "oliwer"
]

function passwordFunction(){
    
      document.querySelector("body").innerHTML = `
      <img id="content_img" src="./uploads/anemoia1.png"></img>
        <div id="content_div">
          <p id="ai_content_p"></p>
        </div>
        <h2>Skriv in lösenordet för att komma vidare</h2>
        <input id = "passwordInput"></input>
        <button id="checkPassword">Tryck för att testa lösenordet</button>
  
      `
      document.getElementById("checkPassword").addEventListener("click", checkPassword)  
      document.getElementById("ai_content_p").style.display = "none"
      return;
    
  }
function checkPassword(event){
    const layoutUrl = window.location.search.split("?layout=")[1];
    const numKeys = parseInt(window.localStorage.getItem("keysFound"));
    const numLayout = parseInt(layoutUrl.match(/\d+/));
    console.log(passWords);
    passWords.forEach(password => {
      console.log(password);
      if(password === passwordInput.value){
        window.location.href = `?layout=layout${numLayout + 1}`;
      }else{
        document.getElementById("ai_content_p").style.display = "flex"
        document.getElementById("ai_content_p").style.setProperty("--c", "#ff0000")
        let ai = document.querySelector("#ai_content_p");
        ai.textContent="Sorry fel kod prova igen";
        ai.style.color = "white"

      }
    });
  }
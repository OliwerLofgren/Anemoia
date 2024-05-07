const passWords = [
    layout2 = "carl",
    layout4 = "peter",
    layout8 = "idkyet",
    layout10 = "aiomen"
]
let index = 0;
function passwordFunction(currentIndex){
    
      document.querySelector("body").innerHTML = `
      <img id="content_img" src="./uploads/anemoia1.png"></img>
        <div id="content_div">
          <p id="ai_content_p"></p>
        </div>
        <h2 id="h2">Skriv in lösenordet för att komma vidare</h2>
        <input id = "passwordInput"></input>
        <button id="checkPassword">Tryck för att testa lösenordet</button>
  
      `
      document.getElementById("checkPassword").addEventListener("click", checkPassword)  
      document.getElementById("ai_content_p").style.display = "none"
      index = currentIndex
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
        if(layoutUrl === "layout10"){
            document.querySelector("#ai_content_p").innerHTML = ""
            document.getElementById("checkPassword").remove();

            //TA BORT DET RÖDA OCH KNAPPEN FÖR ATT KOLLA LÖSENORD SEN FÄRDIG OCKSÅ ATT DET INTE SKA DINNAS TVÅ AV
            layout10Passed = true;
            conversationPaused = false;
            displayContent(index)
            return true;
        }
        window.location.href = `?layout=layout${numLayout + 1}`;
        return true;
      }
      document.getElementById("ai_content_p").style.display = "flex"
      document.getElementById("ai_content_p").style.setProperty("--c", "#ff0000")
      let ai = document.querySelector("#ai_content_p");
      ai.textContent="Sorry fel kod prova igen";
      ai.style.color = "white"
    });
    
      
  }
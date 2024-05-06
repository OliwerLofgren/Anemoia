const passWords = [
    layout5 = "carl",
    layout4 = "oliwer"
]

function checkPassword(event){
    console.log(passWords);
    passWords.forEach(password => {
      console.log(password);
      if(password === passwordInput.value){
        window.location.href = `?layout=layout6`;
      }
    });
  }
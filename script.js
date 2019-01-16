function createAlias(){
  hideAllResponses();
  if(verifyInput()){
    const Http = new XMLHttpRequest();
    const url='https://jsonplaceholder.typicode.com/posts';
    Http.open("GET", "https://bypasscors.herokuapp.com/api/?url=https://forwardmx.io/api/aliases");
    Http.send();
    Http.onreadystatechange=(e)=>{
      console.log(Http.responseText)
    }
  }
}

function deleteAlias(){
  hideAllResponses();
  if(verifyInput()){

  }
}

function verifyInput(){
  var realEmailInput = document.getElementById("realEmail");
  var aliasInput = document.getElementById("alias");

  var emailVerificationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(realEmailInput.value && aliasInput.value){
    if(emailVerificationRegex.test(realEmailInput.value.toLowerCase())){
      if(!emailVerificationRegex.test(aliasInput.value.toLowerCase()) && !(aliasInput.value.includes('@'))){
        return true;
      }else{
        showResponse("Error: Invalid Alias Email", "The alias email that you entered is invalid, you don't need to include the '@' character, nor any characters after it. Please try again.", false);
        return false;
      }
    }else{
      showResponse("Error: Invalid Real Email", "The real email that you entered is invalid. Please try again.", false);
      return false;
    }
  }else{
    showResponse("Error:", "Both a real email and an email alias must be entered to proceed.", false);
    return false;
  }
  return true;
}

function showResponse(responseHeader,responseText,positiveBoolean){
  var responseElement = document.getElementById("response");

  if(positiveBoolean){
    responseElement.innerHTML = "<strong class=positiveResponse>"+responseHeader+"</strong><br><br>"+responseText;
  }else{
    responseElement.innerHTML = "<strong class=negativeResponse>"+responseHeader+"</strong><br><br>"+responseText;
  }
  responseElement.style.display = "block";
  responseElement.style.visibility = "visible";
}

function hideAllResponses(){
  var responseElement = document.getElementById("response");
  responseElement.style.display = "none";
  responseElement.style.visibility = "hidden";
}

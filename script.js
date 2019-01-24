var corsProxy = "https://cors-anywhere.herokuapp.com/";
var version = "Version: 1.7.4_Public";

function createAlias(){
  hideAllResponses();
  if(verifyInput()){
    var realEmailInput = document.getElementById("realEmail");
    var aliasInput = document.getElementById("alias");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             if(this.responseText.includes("Alias created")){
               showResponse("Success!","Your alias has been created! <br><br>Please wait 60 seconds before sending emails to the alias. After the small delay, all emails sent to "+aliasInput.value+"@pseudoname.io will be automatically forwarded to "+realEmailInput.value+".<br><br><i>If you like Pseudoname and would like to keep the service free, please consider making a small donation via the button below:</i>", 1);
             }else if(this.responseText.includes("You can only define the same source once per domain")){
               showResponse("Error: Alias Unavailable","That alias has already been taken by someone else. Please choose a different alias and try again.", 2);
             }else{
               showResponse("Error: Unknown API Response", "An unexpected error occured. Please try again later. If this problem persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
               console.log(this.responseText);
             }
         }else if (this.readyState == 4){
           showResponse("Error: Something's Wrong", "Something went wrong when creating your alias. Please try again later. If this problem persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
         }else{
           showResponse("Loading", "Please wait...", 3);
         }
    };
    xhttp.open("POST", corsProxy.concat("https://forwardmx.io/api/alias/create?"+
    "&key=S7CIbakmt8jXSSz0Svjm1End67Bwh828sUs"+
    "&domain=pseudoname.io"+
    "&destination="+realEmailInput.value+
    "&alias="+aliasInput.value), true);
    xhttp.send();
  }
}

function deleteAlias(){
  hideAllResponses();
  showResponse("How To Delete An Alias:", "In order to prevent abuse, we have temporarily disabled automatic alias deletion. If you'd like to remove an alias, please <a href=\"contact.html\">contact us</a> and we will happily assist you.", 3);
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
        showResponse("Error: Invalid Alias Email", "The alias email that you entered is invalid, you don't need to include the '@' character, nor any characters after it. Please try again.", 2);
        return false;
      }
    }else{
      showResponse("Error: Invalid Real Email", "The real email that you entered is invalid. Please try again.", 2);
      return false;
    }
  }else{
    showResponse("Error:", "Both a real email and an email alias must be entered to proceed.", 2);
    return false;
  }
  return true;
}

function showResponse(responseHeader,responseText,statusCode){
  var responseElement = document.getElementById("response");

  if(statusCode == 1){
    responseElement.innerHTML = "<strong class=positiveResponse>"+responseHeader+"</strong><br><br>"+responseText+"<br><br>"+
    "<a href='https://ko-fi.com/M4M4P3CB' target='_blank'><img height='36' style='border:0px;height:36px;' src='imgs/SupportButton.jpg' border='0' alt='Support Pseudoname'/></a>";
  }else if(statusCode == 2){
    responseElement.innerHTML = "<strong class=negativeResponse>"+responseHeader+"</strong><br><br>"+responseText;
  }else{
    responseElement.innerHTML = "<strong class=neutralResponse>"+responseHeader+"</strong><br><br>"+responseText;
  }
  responseElement.style.display = "block";
  responseElement.style.visibility = "visible";
}

function hideAllResponses(){
  var responseElement = document.getElementById("response");
  responseElement.style.display = "none";
  responseElement.style.visibility = "hidden";
}

function displayVersion(){
  var versionElement = document.getElementById("version");
  versionElement.innerHTML = version;
}

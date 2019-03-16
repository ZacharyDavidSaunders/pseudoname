var version = "v2.3";
var api = 'https://pseudoname-api.herokuapp.com';
var pseudonameRepo = 'https://github.com/ZacharyDavidSaunders/pseudoname/';
var pseudonameApiRepo = 'https://github.com/ZacharyDavidSaunders/PseudonameAPI/'
var captchaIndex;

function displayVersion(){
    var xhttp = new XMLHttpRequest();
    var apiVersion;
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var data = this.responseText;
            var json = JSON.parse(data);
            var message = json['message'];
            apiVersion = message.substring(message.indexOf("PseudonameAPI")+13,message.indexOf("PseudonameAPI")+17) || '?';
            var versionIdentification = document.getElementById("versionIdentification");
            versionIdentification.innerHTML = "Site: "+version+ " / API: "+apiVersion+'<br><br>We are open source! <br><br>Repos are linked below:<br><br><a href='+pseudonameRepo+' target=\'_blank\'>Pseudoname</a><br><br><a href='+pseudonameApiRepo+' target=\'_blank\'>PseudonameAPI</a>';
        }else if(this.readyState == 4){
            showResponse("Error: Something's Wrong", "PseudonameAPI is unavailable. If this issue persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
        }
    };
    xhttp.open("GET", api+'/',true);
    xhttp.send();
}

function createAlias(){
  hideAllResponses();
  if(verifyInput()){
    refreshCaptcha();
    var realEmailInput = document.getElementById("realEmail");
    var aliasInput = document.getElementById("alias");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var data = this.responseText;
             var json = JSON.parse(data);
             var message = json['message'];
             if(message === 'Alias has been created. Please wait 60 seconds before sending emails to the alias. Doing so ensures that the all systems have been updated and emails are not lost.'){
                 showResponse("Success!"," Your alias has been created. Please wait 60 seconds before sending emails to the alias. After the small delay, all emails sent to \""+aliasInput.value+"@pseudoname.io\" will be automatically forwarded to \""+realEmailInput.value+"\". A \"Copy Alias\" button will appear when the countdown has ended.", 3);
             }else if(message === 'Error: Duplicate alias request refused.'){
                 showResponse("Error: Alias Already Taken", "The alias you requested is already in use. Please choose another.", 2);
             }else{
                 showResponse("Error: Unknown API Response", "An unexpected error occurred. Please try again later. If this problem persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
             }
         }else if (this.readyState == 4){
           showResponse("Error: Something's Wrong", "Something went wrong when creating your alias. Please try again later. If this problem persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
         }else{
           showResponse("Loading", "Please wait...", 4);
         }
    };
    xhttp.open("GET", api+'/add/?'+
    "alias="+aliasInput.value +
    "&realEmail="+realEmailInput.value, true);
    xhttp.send();
  }
}

function deleteAlias(){
    hideAllResponses();
    if(verifyInput()){
        refreshCaptcha();
        var realEmailInput = document.getElementById("realEmail");
        var aliasInput = document.getElementById("alias");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = this.responseText;
                var json = JSON.parse(data);
                var message = json['message'];
                if(message === 'Alias has been deleted.'){
                    showResponse("Success!","Your alias has been deleted.", 1);
                }else if(message === 'Error: Alias has not yet been registered and thus may not be deleted.'){
                    showResponse("Error: Alias Not Yet Registered", "The alias you requested to delete does not exist. Feel free to create it!", 2);
                }else if (message === 'Error: Deletion denied. The provided alias is not owned by the provided email.'){
                    showResponse('Error: Deletion denied.', 'According to our records, you do not own the alias you wish to delete. Please enter the alias\' corresponding email address to delete it.', 2);
                }
            }else if (this.readyState == 4){
                showResponse("Error: Something's Wrong", "Something went wrong when deleting your alias. Please try again later. If this problem persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
            }else{
                showResponse("Loading", "Please wait...", 4);
            }
        };
        xhttp.open("GET", api+'/delete/?'+
            "alias="+aliasInput.value +
            "&realEmail="+realEmailInput.value, true);
        xhttp.send();
    }
}

function verifyInput(){
  var realEmailInput = document.getElementById("realEmail");
  var aliasInput = document.getElementById("alias");
  var userCaptchaSolutionInput = document.getElementById("userCaptchaSolutionInput");

  var emailVerificationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(realEmailInput.value && aliasInput.value && userCaptchaSolutionInput.value){
    if(emailVerificationRegex.test(realEmailInput.value.toLowerCase())){
      if(!emailVerificationRegex.test(aliasInput.value.toLowerCase()) && !(aliasInput.value.includes('@'))){
        if(verifyCaptcha()){
            return true;
        }else{
            showResponse("Error: Incorrect CAPTCHA Response", "The CAPTCHA response that you entered is invalid. Please try again.", 2);
            return false;
        }  
      }else{
        showResponse("Error: Invalid Alias", "The alias that you entered is invalid, you don't need to include the '@' character, nor any characters after it. Please try again.", 2);
        return false;
      }
    }else{
      showResponse("Error: Invalid Real Email", "The real email that you entered is invalid. Please try again.", 2);
      return false;
    }
  }else{
    showResponse("Error: Missing Information" , "A real email, an email alias, and a CAPTCHA response must be entered to proceed.", 2);
    return false;
  }
}

function showResponse(responseHeader,responseText,statusCode){
  var responseDiv = document.getElementById('responseDiv');
  var responseHeaderP = document.getElementById('responseHeader');
  var responseMessageP = document.getElementById('responseMessage');
  var donationDiv = document.getElementById('donationDiv');
  var showDonation = false;

  if(statusCode == 1){
      responseHeaderP.classList.add("positiveResponse");
      showDonation = true;
  }else if(statusCode == 2){
      responseHeaderP.classList.add("negativeResponse");
  }else if(statusCode == 3){
      responseHeaderP.classList.add("positiveResponse");
      countdown(60);
      showDonation = true;
  }else{
      responseHeaderP.class= "neutralResponse";
  }
  responseHeaderP.innerText = responseHeader;
  responseMessageP.innerHTML = responseText;

  responseDiv.style.display = "block";
  responseDiv.style.visibility = "visible";
  responseHeaderP.style.display = "block";
  responseHeaderP.style.visibility = "visible";
  responseMessageP.style.display = "block";
  responseMessageP.style.visibility = "visible";

  if(showDonation){
      donationDiv.style.display = "block";
      donationDiv.style.visibility = 'visible';
  }
}

function hideAllResponses(){
    resetHeaderColor();
    var elementsThatShouldBeHidden = ['responseDiv', 'responseHeader', 'responseMessage', 'timer', 'timerDiv', 'copyAliasButton', 'donationDiv'];

    for(var i = 0; i < elementsThatShouldBeHidden.length; i++){
      var element = document.getElementById(elementsThatShouldBeHidden[i]);
      element.style.display = "none";
      element.style.visibility = "hidden";
    }
}

function displayDate(){
    var currentDate = document.getElementById("currentDate");
    var timestamp = new Date();
    currentDate.innerHTML = "Last Updated: " + timestamp;
}

function countdown(seconds) {
    var copyAliasButton = document.getElementById('copyAliasButton');
    var timer = document.getElementById("timer");
    var timerDiv = document.getElementById("timerDiv");

    timer.style.display = "block";
    timer.style.visibility = "visible";
    timerDiv.style.display = "block";
    timerDiv.style.visibility = "visible";

    setInterval(calculate, 1000);
    function calculate() {
        var timeRemaining = seconds-1;
        if (timeRemaining >= 0) {
            seconds = timeRemaining;
            if(timeRemaining == 0){
                timer.style.color = 'chartreuse';
                timer.innerHTML = '(0 seconds) All set ✓';
                copyAliasButton.style.display = "block";
                copyAliasButton.style.visibility = 'visible';
                timer.style.display = "none";
                timer.style.visibility = "hidden";
                timerDiv.style.display = "none";
                timerDiv.style.visibility = "hidden";
            }else{
                if(timeRemaining <= 60 && timeRemaining >= 45){
                    timer.style.color = 'red';
                }else if(timeRemaining < 45 && timeRemaining >= 30){
                    timer.style.color = 'orange';
                }else if(timeRemaining < 30 && timeRemaining >= 15){
                    timer.style.color = 'yellow';
                }else{
                    timer.style.color = 'chartreuse';
                }
                timer.innerHTML = (seconds + ' seconds');
            }
        }
    }
}

function copyAliasToClipboard(){
    var button = document.getElementById("copyAliasButton");
    var dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.setAttribute('value', document.getElementById("alias").value + '@pseudoname.io');
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);
    button.innerHTML = 'Copied! 🚀';
    button.style.marginLeft = '34%';
}

function resetHeaderColor(){
    var responseHeaderP = document.getElementById('responseHeader');
    responseHeaderP.classList.remove("positiveResponse");
    responseHeaderP.classList.remove("negativeResponse");
    responseHeaderP.classList.remove("neutralResponse");
}

function displayCaptcha(){
    captchaIndex = Math.floor(Math.random()*10);
    var captchaImage = document.createElement("img"); 
    var captchaDiv = document.getElementById('captchaDiv');
    var captchaImageSrc = './imgs/captcha/captcha'+captchaIndex+'.jpg';
    captchaImage.src = captchaImageSrc;
    captchaImage.id = 'captchaImage';
    captchaDiv.appendChild(captchaImage);
}

function verifyCaptcha(){
    var captchaAnswers = ["+B5kww9","Au7eWm9","RAj42Pb","X6Mjjf3","cvUtch9","TyD237L","h@R#yL3","&C)XAw4","!f73K88","?WeL5C?"];
    var userCaptchaSolutionInput = document.getElementById("userCaptchaSolutionInput");
    if(userCaptchaSolutionInput.value == captchaAnswers[captchaIndex]){
        return true;
    }else{
        return false;
    }
}

function refreshCaptcha(){
    captchaIndex = Math.floor(Math.random()*10);
    captchaImage = document.getElementById("captchaImage");
    captchaImage.src = './imgs/captcha/captcha'+captchaIndex+'.jpg';
    var userCaptchaSolutionInput = document.getElementById("userCaptchaSolutionInput");
    userCaptchaSolutionInput.innerHTML = '';
}
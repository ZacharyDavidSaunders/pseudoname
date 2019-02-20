var version = "v2.2";
var api = 'https://pseudoname-api.herokuapp.com';
var pseudonameRepo = 'https://github.com/ZacharyDavidSaunders/pseudoname/';
var pseudonameApiRepo = 'https://github.com/ZacharyDavidSaunders/PseudonameAPI/'

function createAlias(){
  hideAllResponses();
  if(verifyInput()){
    var realEmailInput = document.getElementById("realEmail");
    var aliasInput = document.getElementById("alias");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.responseText);
         if (this.readyState == 4 && this.status == 200) {
             var data = this.responseText;
             var json = JSON.parse(data);
             var message = json['message'];
             if(message === 'Alias has been created. Please wait 60 seconds before sending emails to the alias. Doing so ensures that the all systems have been updated and emails are not lost.'){
                 showResponse("Success!","Your alias has been created! <br><br>Please wait 90 seconds before sending emails to the alias. After the small delay, all emails sent to \""+aliasInput.value+"@pseudoname.io\" will be automatically forwarded to \""+realEmailInput.value+"\".<br><br>", 3);
             }else if(message === 'Error: Duplicate alias request refused.'){
                 showResponse("Error: Alias Already Taken", "The alias you requested is already in use. Please choose another.", 2);
             }else{
                 showResponse("Error: Unknown API Response", "An unexpected error occurred. Please try again later. If this problem persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
             }
         }else if (this.readyState == 4){
           showResponse("Error: Something's Wrong", "Something went wrong when creating your alias. Please try again later. If this problem persists, please <a href=\"contact.html\">get in touch with us.</a>", 2);
         }else{
           showResponse("Loading", "Please wait...", 3);
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
        var realEmailInput = document.getElementById("realEmail");
        var aliasInput = document.getElementById("alias");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            console.log(this.responseText);
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
                showResponse("Loading", "Please wait...", 3);
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
    responseElement.innerHTML = "<strong class=positiveResponse>"+responseHeader+"</strong><br><br>"+responseText+"<br><br><i>If you like Pseudoname and would like to keep the service free, please consider making a small donation via the button below:</i><br><br>"+
    "<a href='https://ko-fi.com/M4M4P3CB' target='_blank'><img height='36' style='border:0px;height:36px;' src='imgs/SupportButton.jpg' border='0' alt='Support Pseudoname'/></a>";
  }else if(statusCode == 2){
    responseElement.innerHTML = "<strong class=negativeResponse>"+responseHeader+"</strong><br><br>"+responseText;
  }else if(statusCode == 3){
      responseElement.innerHTML = "<strong class=positiveResponse>"+responseHeader+"</strong><br><br>"+responseText+"Time Remaining:<br><p id=timer></p><br><i>If you like Pseudoname and would like to keep the service free, please consider making a small donation via the button below:</i><br><br>"+
          "<a href='https://ko-fi.com/M4M4P3CB' target='_blank'><img height='36' style='border:0px;height:36px;' src='imgs/SupportButton.jpg' border='0' alt='Support Pseudoname'/></a>";
      countdown(90);
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
    var xhttp = new XMLHttpRequest();
    var apiVersion;
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var data = this.responseText;
            var json = JSON.parse(data);
            var message = json['message'];
            console.log(message);
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

function displayDate(){
    var currentDate = document.getElementById("currentDate");
    var timestamp = new Date();
    currentDate.innerHTML = "Last Updated: " + timestamp;
    currentDate.style = "text-align: center;";
}

function countdown(seconds) {
    var timer = document.getElementById("timer");

    setInterval(calculate, 1000);

    function calculate() {

        var timeRemaining = seconds-1;

        if (timeRemaining >= 0) {

            seconds = parseInt(timeRemaining);

            if(timeRemaining == 0){
                timer.style.color = 'chartreuse';
                timer.innerHTML = 'All set ✓';
            }else{
                if(timeRemaining < 90 && timeRemaining >= 60){
                    timer.style.color = 'red';
                }else if(timeRemaining < 60 && timeRemaining >= 30){
                    timer.style.color = 'orange';
                }else{
                    timer.style.color = 'yellow';
                }
                timer.innerHTML = (seconds + ' seconds');
            }
        }
    }
}
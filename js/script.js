//initialize request object
var xhr = new XMLHttpRequest();

var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var usernames = [];

users.forEach(function(user){
  var endpoint = makeURL(user);
  //construct get request to desired URL, set asynchronous to false since iterating over an array
  xhr.open('GET', endpoint, false);
  //send the request
  xhr.send();
  //listen for the readystatechange event on our xhr object and call the processRequest event handler when the event gets overheard
  xhr.onreadystatechange = processRequest;
  function processRequest(e){
    //check if request is completed (readyState == 4) and is successful (status == 200)
    if(xhr.readyState == 4 && xhr.status == 200){
      //actual logic of request
      var response = JSON.parse(xhr.responseText);
      usernames.push(response.display_name);
    }
  }
});

alert(usernames);

//separate logic for endpoint builder function
function makeURL(user){
  var base = 'https://crossorigin.me/https://wind-bow.hyperdev.space/twitch-api';
  var userPart = '/users/' + user;
  var API = base + userPart;
  return API;
}

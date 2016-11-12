var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

users.forEach(function(user){
  loadData(makeUrl(user), 10000, processData);
});


//process data callback
function processData(response){
  var obj = JSON.parse(this.response);
  var new_div = document.createElement('div');
  new_div.className = "channel";
  new_div.innerHTML = '<h3>' + obj.display_name + '</h3>';

  document.getElementById('channel__list').appendChild(new_div);
  console.log(obj);
}

//build user endpoint
function makeUrl(user){
  var base = 'https://crossorigin.me/https://wind-bow.hyperdev.space/twitch-api';
  var userPart = '/users/' + user;
  var API = base + userPart;
  return API;
}

//make get request to endpoint
function loadData(url, timeout, callback){
  var xhr = new XMLHttpRequest();
  xhr.ontimeout = function() {
    console.error("The request for " + url + " timed out.");
  };
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback.apply(xhr, xhr);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.timeout = timeout;
  xhr.send(null);
}

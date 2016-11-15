var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

channels.forEach(function(channel){
  loadData(makeUrl("channels", channel), 30000, processData);
  //loadData(makeURL("streams", channel), 30000,processData);
});


//process data callback
function processData(response){
  var obj = JSON.parse(this.response);

  if(obj.hasOwnProperty('display_name')){
    var channel_div = document.createElement('div');
    channel_div.className = "channel";
    channel_div.id = obj.display_name;
    channel_div.innerHTML = `
    <h3><a href=` + obj.url + `>` + obj.display_name + `</a></h3>
    `;
    document.getElementById('channel__list').appendChild(channel_div);
  }
  console.log(obj);
}

//build user endpoint
function makeUrl(type, name){
  var API = 'https://crossorigin.me/https://wind-bow.hyperdev.space/twitch-api/' +
  type + '/' + name;
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

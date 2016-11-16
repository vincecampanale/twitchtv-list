//separated ajax and data processing logic to avoid polluting global scope
function loadPage(){
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  channels.forEach(function(channel){
    var channelData = [];
    $.ajax({
      url: makeUrl("channels", channel)
    }).done(function(data){
      channelData.push(data.display_name); //channelData[0] contains the name of the channel
      channelData.push(data.url); //channelData[1] contains the link to their channel
      //nested ajax request to get streaming data
      $.ajax({
        url: makeUrl("streams", channel)
      }).done(function(data){
        var channel_div = document.createElement('div');
        channel_div.className = "channel";
        if(data.stream === null){
          channelData.push("Channel is offline"); //channelData[2] contains "Channel is offline"
          channel_div.className += " offline little-offline-circle";
        }
        if(data.stream !== null){
          var status = data.stream.channel.status;
          if(status.length > 40){
            var trimmed = status.substring(0, 40) + '...';
            channelData.push(trimmed); //channelData[2] contains status of channel
          } else {
            channelData.push(status);
          }
          channel_div.className += " online little-online-circle";
        }
        channel_div.innerHTML = `
            <h3><a href=` + channelData[1] + `>` + channelData[0] + `</a></h3>\n
            <p>` + channelData[2] + `</p>
          `;
        document.getElementById('channel__list').appendChild(channel_div);
      });
    });
  });
  //build endpoint
  function makeUrl(type, name){
    var API = 'https://crossorigin.me/https://wind-bow.hyperdev.space/twitch-api/' +
    type + '/' + name;
    return API;
  }
}

loadPage();


//toggle buttons logic
$(".online-circle").click(function(){
  $(".offline").addClass('hide');
  if($(".online").hasClass('hide')){
    $(".online").removeClass('hide');
  }
});

$(".offline-circle").click(function(){
  $(".online").addClass('hide');
  if($(".offline").hasClass('hide')){
    $(".offline").removeClass('hide');
  }
});

$(".all-circle").click(function(){
  if($(".online").hasClass('hide')){
    $(".online").removeClass('hide');
  }
  if($(".offline").hasClass('hide')){
    $(".offline").removeClass('hide');
  }
});

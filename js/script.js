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
          channelData.push("Channel is offline");
          channel_div.className += " offline";
        }
        if(data.stream !== null){
          channelData.push(data.stream.channel.status);
          channel_div.className += " online";
        }



        channel_div.innerHTML = `
            <h3><a href=` + channelData[1] + `>` + channelData[0] + `</a></h3>
          `;


        document.getElementById('channel__list').appendChild(channel_div);



        //TODO: Add code to put channelData into DOM elements.



        console.log(channelData);
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

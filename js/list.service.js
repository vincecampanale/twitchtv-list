function ListService($http){
  function constructEndpoint(user){
    // NOTE:
    // This server caches data to lower the request rate.
    // To prevent abuses this server accepts GET requests only,
    // and serves only routes:
    // /users/:user, /channels/:channel, and /streams/:stream.
    // These are more than enough to complete the challenge.

    var base = 'https://crossorigin.me/https://wind-bow.hyperdev.space/twitch-api';
    var user = '/users/' + user;
    var API = base + user;
    return API;
  }

  function getUserData(){
    var users = ['freecodecamp'];
    var API = constructEndpoint("freecodecamp");
    return $http.get(API).then(function(response){
      return response;
    });
  }

  return {
    getUserData: getUserData
  };
}

angular
  .module('app')
  .factory('ListService', ListService);

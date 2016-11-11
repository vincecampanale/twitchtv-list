function ListController(ListService){
  var ctrl = this;
  ctrl.fullResponse = [];
  ctrl.arr = [];

  function getUserData(){
    ListService
      .getUserData()
      .then(function(response){
        ctrl.fullResponse = response.data;
      });
  }

  getUserData();

}

angular
  .module('app')
  .controller('ListController', ListController);

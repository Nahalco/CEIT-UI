(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('PluginController', PluginController);

  /** @ngInject */
  function PluginController($scope , $http, Table,$sce) {
    var vm = this;

    $scope.states = [];
    $scope.stateTypes = ["filter", "notify"];
    /*vm.zones = [];


    vm.list1 = [];


    $scope.list5 = [
      { 'title': 'Filter', 'drag': true , 'type':"filter" },
      { 'title': 'Notify', 'drag': true , 'type':"notify" },
    ];*/
    //var vm = this;

    $scope.addState = function(){
      var x = {}
      $scope.states.push(x)
    }
    $scope.stateAccept = function(state,state_name,state_agent_id,state_type){
      for(var key in state){
        if(key != state_name){
          delete state[key];
        }
      }
      state[state_name] = {agent_id:state_agent_id,type:state_type,conditions:[]}
      //console.log(state)
      //console.log('++++++++')
      console.log($scope.states)
    }
  }
})();

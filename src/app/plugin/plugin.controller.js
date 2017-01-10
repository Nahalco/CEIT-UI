(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('PluginController', PluginController);

  /** @ngInject */
  function PluginController($scope , $http, Table,$sce) {
    var vm = this;

    $scope.states = [];
    $scope.stateTypes = ["filter", "notif"];
    /*vm.zones = [];


    vm.list1 = [];


    $scope.list5 = [
      { 'title': 'Filter', 'drag': true , 'type':"filter" },
      { 'title': 'Notify', 'drag': true , 'type':"notify" },
    ];*/
    //var vm = this;

    $scope.addCond = function(state){
      var txt = '{"type":"","device_id":"","states":[],"actions":""}'
      var x = JSON.parse(txt)
      for(var key in state) {
        if(state[key].conditions != undefined){
          state[key].conditions.push(x)
        }
      }
    }
    $scope.addState = function(){
      var txt = '{"name":"","agent_id":"","type":"","conditions":[],"stat":"0"}'
      var x = JSON.parse(txt)
      $scope.states.push(x)
      //console.log( $scope.states)
    }
    /*$scope.stateAccept = function(state){
      console.log($scope.states)
      //state = {name:state_name,agent_id:state_agent_id,type:state_type,conditions:[],stat:1}
      console.log(state)
      console.log('++++++++')
      console.log($scope.states)
    }*/
    $scope.prevClick = function(state){
      console.log(state)
      state['stat'] = 0
      console.log(state)
    }
  }
})();

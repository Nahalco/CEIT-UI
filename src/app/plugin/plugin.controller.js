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


    $scope.addState = function(){
      var txt = '{"name":"","agent_id":"","type":"","conditions":[],"actions":[]}'
      var x = JSON.parse(txt)
      $scope.states.push(x)
      //console.log( $scope.states)
    }
    $scope.addCond = function(state){
      //console.log(state)
      var txt = '{"type":"","device_id":"","states":[],"action":{"nextStep":""}}'
      var x = JSON.parse(txt)
      state['conditions'].push(x)
    }
    $scope.addSt = function(cond){
      //console.log(cond)
      var txt = '{"type":"","value":"","op":"","logic":""}'
      var x = JSON.parse(txt)
      cond['states'].push(x)
    }
    $scope.deleteSt = function(cond,st){
      //console.log(cond)
      cond['states'] = deleteIndex(cond['states'],cond['states'].indexOf(st))
      //console.log(state['conditions'])
    }
    $scope.deleteCond = function(state,cond){
      //console.log(cond)
      state['conditions'] = deleteIndex(state['conditions'],state['conditions'].indexOf(cond))
      //console.log(state['conditions'])
    }
    /*$scope.stateAccept = function(state){
      console.log($scope.states)
      //state = {name:state_name,agent_id:state_agent_id,type:state_type,conditions:[],stat:1}
      console.log(state)
      console.log('++++++++')
      console.log($scope.states)
    }*/
    $scope.check = function(state){
      console.log(state)
    }
    $scope.deleteState = function(state){
      //console.log($scope.states)
      $scope.states = deleteIndex($scope.states,$scope.states.indexOf(state))
      //console.log($scope.states)
    }
  }
})();

function deleteIndex(array,index){
  if(index == 0){
    return array.splice(1,array.length)
  }
  return (array.splice(0,index).concat(array.splice(index,array.length)))
}

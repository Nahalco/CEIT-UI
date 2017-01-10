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
    $scope.notifSettings=[
      {"item":"on","values":["true","false"]},
      {"item":"off","values":["true","false"]},
    ]
    /*vm.zones = [];


    vm.list1 = [];


    $scope.list5 = [
      { 'title': 'Filter', 'drag': true , 'type':"filter" },
      { 'title': 'Notify', 'drag': true , 'type':"notify" },
    ];*/
    //var vm = this;


    $scope.addState = function(){
      var txt = '{"name":"","agent_id":"","type":"","conditions":[],"actions":[], "nextStep":""}'
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

    $scope.addAction = function(state){
      var txt = '{"type":"","agent_id":"","device_id":[],"settings":{}}'
      var x = JSON.parse(txt)
      state['actions'].push(x)
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

    $scope.fillSettings = function(act, name){
      for(var key in act['settings']){
        if(key != name){
          delete act['settings'][key];
        }
      }
    }

    $scope.deleteAct = function(state,act){
      //console.log(cond)
      state['actions'] = deleteIndex(state['actions'],state['actions'].indexOf(act))
      //console.log(state['conditions'])
    }

    $scope.addDevice = function(act){
      var txt = ''
      if(!act['device_id'].includes('')) {
        act['device_id'].push(txt)
      }
    }

    $scope.deleteDevice = function(act,device){
      //console.log(cond)
      act['device_id'] = deleteIndex(act['device_id'],act['device_id'].indexOf(device))
      //console.log(state['conditions'])
    }
  }
})();

function deleteIndex(array,index){
  if(index == 0){
    return array.splice(1,array.length)
  }
  return (array.splice(0,index).concat(array.splice(index,array.length)))
}

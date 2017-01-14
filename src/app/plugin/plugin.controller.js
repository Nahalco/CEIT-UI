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

    $scope.myjson = ''
    /*vm.zones = [];


    vm.list1 = [];


    $scope.list5 = [
      { 'title': 'Filter', 'drag': true , 'type':"filter" },
      { 'title': 'Notify', 'drag': true , 'type':"notify" },
    ];*/
    //var vm = this;


    $scope.addState = function(){
      var txt = '{"name":"","agent_id":"","type":"","conditions":[],"actions":[], "nextStep":"" , "else":{"nextStep":""}}'
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

    $scope.convertToVJson = function(){
      var vjs = '{ "root":"1", "tree": { '
      for (var state in $scope.states){
        var x = jQuery.extend(true, {}, $scope.states[state]);
        delete x['name']
        if(x['type'] == 'notif'){
          delete x['conditions']
          delete x['else']
          delete x['agent_id']
        }
        if(x['type'] == 'filter'){
          delete x['actions']
          delete x['nextStep']
        }
        var tmp= {}

        tmp[$scope.states[state]['name']] = x
        var tmp2 = JSON.stringify(tmp)
        if(tmp2.length > 0){
          tmp2 = tmp2.substring(1,tmp2.length -1 )
        }
        vjs = vjs + tmp2 + " ,"
      }
      if(vjs.slice(-1) == ","){
        vjs = vjs.substring(0,vjs.length - 1)
      }
      vjs = vjs + ' }}'
      $scope.myjson = vjs
      console.log(vjs)

      var message = JSON.parse(vjs);

      console.log(message)


      var url = "http://192.168.128.90:8081/senario/new";

      $http({
        url: url,
        method: "POST",
        dataType: "json",
        data:  message
      }).then(function(response) {
        // success
        console.log(response)
      }, function(response) { // optional
        // failed
        console.log(response)
        console.log('error')
      });

    }
  }
})();

function deleteIndex(array,index){
  if(index == 0){
    return array.splice(1,array.length)
  }
  return (array.splice(0,index).concat(array.splice(index,array.length)))
}

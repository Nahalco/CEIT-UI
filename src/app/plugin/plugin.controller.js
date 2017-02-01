(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('PluginController', PluginController);

  /** @ngInject */
  function PluginController($scope , $http, Table,$sce) {
    var vm = this;

    // initial
    // offline
    var stateIndex = 0;
    $scope.states = [];
    $scope.stateTypes = ["filter", "notif"];
    /*$scope.notifSettings=[
      {"item":"on","values":["true","false"]},
      {"item":"off","values":["true","false"]},
    ]*/

    $scope.myjson = ''

    //online
    $scope.agents = []
    var geturl = "http://iot.ceit.aut.ac.ir:58910/senario/discovery"
    $http({
      url: geturl,
      method: "Post",
      dataType: "json",
      data: {}
    }).then(function(response) {
      // success
      $scope.agents = response.data;
      console.log($scope.agents)
    }, function(response) { // optional
      // failed
      console.log(response)
      console.log('error')
    });

    /*vm.zones = [];


    vm.list1 = [];


    $scope.list5 = [
      { 'title': 'Filter', 'drag': true , 'type':"filter" },
      { 'title': 'Notify', 'drag': true , 'type':"notify" },
    ];*/
    //var vm = this;


    $scope.addState = function(){
      var txt = '{"mindex": '+stateIndex+', "name":"","agent_id":"","type":"","conditions":[],"actions":[], "nextStep":"" , "else":{"nextStep":""}}'
      stateIndex++;
      var x = JSON.parse(txt)
      $scope.states.push(x)
    }
    $scope.deleteState = function(state){
      $scope.states = deleteIndex($scope.states,$scope.states.indexOf(state))
    }

    $scope.addSt = function(cond){
      var txt = '{"type":"","value":"","op":"","logic":""}'
      var x = JSON.parse(txt)
      cond['states'].push(x)
    }
    $scope.deleteSt = function(cond,st){
      cond['states'] = deleteIndex(cond['states'],cond['states'].indexOf(st))
    }

    $scope.addCond = function(state){
      var txt = '{"type":"","device_id":"","states":[],"action":{"nextStep":""}}'
      var x = JSON.parse(txt)
      state['conditions'].push(x)
    }
    $scope.deleteCond = function(state,cond){
      state['conditions'] = deleteIndex(state['conditions'],state['conditions'].indexOf(cond))
    }

    $scope.addAction = function(state){
      var txt = '{"type":"","agent_id":"","device_id":[],"settings":{}}'
      var x = JSON.parse(txt)
      state['actions'].push(x)
    }
    $scope.deleteAct = function(state,act){
      state['actions'] = deleteIndex(state['actions'],state['actions'].indexOf(act))
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

    $scope.check = function(state){
      console.log(state)
    }

    $scope.fillSettings = function(act, name){
      console.log(name)
      for(var key in act['settings']){
        if(key != name){
          delete act['settings'][key];
        }
      }
    }

    $scope.tt = function(type){
      console.log(type)
    }

    $scope.checkForNull = function(testvar){
      if(testvar === undefined){
        return ''
      }
      return testvar
    }

    $scope.convertToVJson = function(){
      var vjs = '{ "root":"1", "tree": { '
      for (var state in $scope.states){


        var hashKey = $scope.states[state]['$$hashKey']
        delete $scope.states[state]['$$hashKey']

        console.log($scope.states[state])

       // var x = jQuery.extend(true,{},$scope.states[state])
        var x = angular.copy($scope.states[state])
        $scope.states[state]['$$hashKey'] = hashKey

        delete x['name']
        if(x['type'] == 'notif'){
          delete x['conditions']
          delete x['else']
          delete x['agent_id']
          x['nextStep'] = $scope.getStateFromIndex(x['nextStep'])
        }
        if(x['type'] == 'filter'){
          delete x['actions']
          delete x['nextStep']
          x['else']['nextStep'] = $scope.getStateFromIndex(x['else']['nextStep'])
          for (var k in x['conditions']){
            var cond = x['conditions'][k]
            cond['action']['nextStep'] = $scope.getStateFromIndex(cond['action']['nextStep'])
          }
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

     /* var url = "http://iot.ceit.aut.ac.ir:58910/senario/new";


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
      });*/

    }
    $scope.getStateFromIndex = function(index){
      for(var i = index; i >= 0 ; i--){
        if($scope.states[i] === undefined){
          return null;
        }
        if($scope.states[i].mindex == index){
          return $scope.states[i].name;
        }
      }
      return null;
    }
  }
})();



function deleteIndex(array,index){
  if(index == 0){
    return array.splice(1,array.length)
  }
  return (array.splice(0,index).concat(array.splice(index,array.length)))
}


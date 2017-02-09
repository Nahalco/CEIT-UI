(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('PluginController', PluginController)
      .filter('hasSomeValue', [function(){
        return function(input, param) {
          var ret = [];
          if(!angular.isDefined(param)) param = true;

          angular.forEach(input, function(v){
            if(angular.isDefined(v.Message) && v.Message) {
              v.Message = v.Message.replace(/^\s*/g, '');
              ret.push(v);
            }
          });

          return ret;
        };
      }]);

  /** @ngInject */
  function PluginController($scope , $http, Table,$sce) {
    var vm = this;

    // initial
    // offline
    var stateIndex = 0;
    $scope.states = [];
    $scope.stateTypes = ["filter", "notif", "timer", "alert"];
    $scope.alertTypes = [];

    //Diagram
    var $ = go.GraphObject.make;
    var diagram =
        $(go.Diagram, "scenarioDiagram",
            {
              initialContentAlignment: go.Spot.Center, // center Diagram contents
              "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
              layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                  { angle: 90, layerSpacing: 35 })
            });
    diagram.nodeTemplate =
        $(go.Node, "Auto",
            { fromSpot: go.Spot.TopSide,    // coming out from top side -- BAD!
              toSpot: go.Spot.RightSide },  // going into at right side -- BAD!
            new go.Binding("location", "loc", go.Point.parse),
            $(go.Shape, "Circle", { fill: "lightgray" }),
            $(go.TextBlock, { margin: 5 },
                new go.Binding("text", "key"))
        );
    diagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.AvoidsNodes,
              corner: 10 },                  // rounded corners
            $(go.Shape),
            $(go.Shape, { toArrow: "Standard" }),
            $(go.TextBlock, { margin: 3 },
                new go.Binding("text", "text"))
        );
    var nodeDataArray = [];
    var linkDataArray = [];
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

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
      $scope.alertTypes = response.data.alerts.types;
      console.log($scope.agents)
      console.log($scope.alertTypes)
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
      var txt = '{"mindex": '+stateIndex+', "name":"","agent_id":"","type":"","conditions":[],"actions":[], "nextStep":"" ,' +
          ' "else":{"nextStep":""}, "time":"", "action": "", "alert_type": "", "to": "", "message": ""}'
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
          delete x['time']
          delete x['action']
        }
        if(x['type'] == 'filter'){
          delete x['actions']
          delete x['nextStep']
          x['else']['nextStep'] = $scope.getStateFromIndex(x['else']['nextStep'])
          for (var k in x['conditions']){
            var cond = x['conditions'][k]
            cond['action']['nextStep'] = $scope.getStateFromIndex(cond['action']['nextStep'])
          }
          delete x['time']
          delete x['action']
        }
        if(x['type'] == 'timer'){
          delete x['conditions']
          delete x['else']
          delete x['agent_id']
          delete x['actions']
          x['nextStep'] = $scope.getStateFromIndex(x['nextStep'])
          x['action'] = $scope.getStateFromIndex(x['action'])
        }
        if(x['type'] == 'alert'){
          x['nextStep'] = $scope.getStateFromIndex(x['nextStep'])
        }
        delete x['mindex']
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
      $scope.myjson = message

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
      $scope.printScenario()

    }

    $scope.getStateFromIndex = function(index){

      for(var i = $scope.states.length - 1; i >= 0 ; i--){
        if($scope.states[i] === undefined){
          return '';
        }
        if($scope.states[i].mindex == index){
          return $scope.states[i].name;
        }
      }
      return '';
    }

    $scope.printScenario = function(){

      diagram.clear()

      for (var id in $scope.states){
        var state = $scope.states[id]
        var node = {
          'key': state.name
        }
        diagram.model.addNodeData(node)
        console.log(state)
      }

      for (var id2 in $scope.states){
        var state = $scope.states[id2]

        console.log('link')
        console.log(state)
        console.log(state['else'].nextStep)
        if(state['else'].nextStep !== '' && state['type']=='filter'){
          var link = {
            'from': state.name,
            'to': $scope.getStateFromIndex(state['else'].nextStep),
            'text': 'else'
          }
          console.log(link)
          diagram.model.addLinkData(link)
        }
        if(state.nextStep !== ''  && ( state['type']=='notif' || state['type']=='timer' || state['type']=='alert')){
          var link = {
            'from': state.name,
            'to': $scope.getStateFromIndex(state.nextStep),
            'text': 'go to'
          }
          diagram.model.addLinkData(link)
        }
        if(state['conditions'].length !== 0  && state['type']=='filter'){
          for (var k in state['conditions']){
            var cond = state['conditions'][k]
            var link = {
              'from': state.name,
              'to': $scope.getStateFromIndex(cond['action'].nextStep),
              'text': cond.device_id + " condition accept"
            }
            diagram.model.addLinkData(link)
          }
        }
        if(state.action !== '' && state['type']=='timer'){
          var link = {
            'from': state.name,
            'to': $scope.getStateFromIndex(state.action),
            'text': 'times up'
          }
          diagram.model.addLinkData(link)
        }
      }
      diagram.requestUpdate()
    }
  }
})();





function deleteIndex(array,index){
  if(index == 0){
    return array.splice(1,array.length)
  }
  return (array.splice(0,index).concat(array.splice(index,array.length)))
}

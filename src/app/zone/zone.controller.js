(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('ZoneController', ZoneController);

  /** @ngInject */
  function ZoneController($scope , $http, Table) {
    var vm = this;
    vm.zones = [];
    vm.isReady = false;
      //vm.building = [];
      //vm.rooms = [];

      Table.getItems('building', []).then(function(res) {
          vm.building = res.items;
      });

      vm.newRoom = function () {
          vm.isReady = false;
          Table.getItems('building/' + vm.model.building, []).then(function(res) {
              vm.rooms = res.rooms  ;
              console.log(vm.model.building , vm.rooms)
          });
      }

      vm.getData = function () {

          if(vm.model.room == undefined)
              return;

          Table.getItems('room/' + vm.model.room, []).then(function(res) {
              console.log("get room " , res)
              if(res.zones != undefined ){
                  if(res.zones[0].data != undefined){
                      vm.zones = res.zones[0].data;
                  }else{
                      defaultZone()
                  }
              }else{
                  defaultZone()
              }

          });

          vm.lamps = [{"id" : "2:3",'title': 'l1', "type" : "lamp"},
              {"id" : "2:2",'title': 'l2', "type" : "lamp"},
              {"id" : "1:3",'title': 'l3', "type" : "lamp"},
              {"id" : "1:4",'title': 'l4', "type" : "lamp"},
              {"id" : "1:5",'title': 'l5', "type" : "lamp"},
              {"id" : "1:5",'title': 'l5', "type" : "lamp"},
              {"id" : "1:5",'title': 'l5', "type" : "lamp"}
          ];
          vm.multisensors = [
              {"id" : "2:3",'title': 'm1', "type" : "multi"},
              {"id" : "2:2",'title': 'm2', "type" : "multi"},
              {"id" : "1:3",'title': 'm3', "type" : "multi"},
              {"id" : "3:3",'title': 'm4', "type" : "multi"},
              {"id" : "2:3",'title': 'm5', "type" : "multi"},
              {"id" : "5:3",'title': 'm6', "type" : "multi"}
          ];
          vm.coolers = [{"id" : "2:3",'title': 'l1'},{"id" : "2:2",'title': 'l2'},{"id" : "1:3",'title': 'l3'}];

          $scope.list1 = [{'title': 'l1'},{'title': 'l2'},{'title': 'l3'}];

          vm.isReady = true;
      }

      function defaultZone() {
          vm.zones = [
              {
                  "title": "ناحیه عمومی اتاق",
                  "list": []
              }
          ];
      }
    vm.saveChange = function () {

        var data = {
            "room_id" : vm.model.room,
            "data": vm.zones
        };
        console.log(data)
        Table.addItem('zone', data).then(function () {
            console.log("saved ok")
        }, function () {
            console.log("saved failure")
        });

    }
      
    vm.defineNewZone = function(){
      if( vm.zoneName != "" ){
        vm.zones.push({"title" : vm.zoneName , "list" : []});
        vm.zoneName = "";
      }
    }

      $http({
          method: 'GET',
          url: 'http://192.168.128.90:8080/discovery',

      }).success(function(data){
          console.log("discovery success" , data);

      }).error(function(data){
          console.log("discovery error" , data);
      });

    vm.dragCallback = function () {
            console.log("dragCallback");
        };
        vm.dropCallback = function () {
            console.log("dropCallback");
        };
        vm.overCallback = function () {
            console.log("overCallback");
        };
        $scope.startCallback = function (event, ui) {
        	  console.log("startCallback" );
        };
        $scope.stopCallback = function (event) {
          console.log("stopCallback" )

        }
        $scope.onDrop = function (event) {
          console.log("onDrop" )
        }
        //kalaghsefid 10
  }
})();

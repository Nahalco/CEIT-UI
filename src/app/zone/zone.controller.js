(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('ZoneController', ZoneController);

  /** @ngInject */
  function ZoneController($scope , $http) {
    var vm = this;

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

    vm.zones = [];

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

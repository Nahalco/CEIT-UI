(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('ZoneController', ZoneController);

  /** @ngInject */
  function ZoneController($scope) {
    var vm = this;

    vm.lamps = [{"id" : "2:3",'title': 'l1'},{"id" : "2:2",'title': 'l2'},{"id" : "1:3",'title': 'l3'}];
    vm.multisensors = [{"id" : "2:3",'title': 'l1'},{"id" : "2:2",'title': 'l2'},{"id" : "1:3",'title': 'l3'}];
    vm.coolers = [{"id" : "2:3",'title': 'l1'},{"id" : "2:2",'title': 'l2'},{"id" : "1:3",'title': 'l3'}];

    $scope.list1 = [{'title': 'l1'},{'title': 'l2'},{'title': 'l3'}];

    vm.zones = [];

    vm.defineNewZone = function(){
      if( vm.zoneName != "" ){
        vm.zones.push({"title" : vm.zoneName , "list" : []});
        vm.zoneName = "";
      }
    }


  }
})();

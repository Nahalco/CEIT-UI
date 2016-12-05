(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('PluginController', PluginController);

  /** @ngInject */
  function PluginController($scope , $http, Table,$sce) {
    var vm = this;
    vm.zones = [];


    vm.list1 = [];


    $scope.list5 = [
      { 'title': 'Filter', 'drag': true , 'type':"filter" },
      { 'title': 'Notify', 'drag': true , 'type':"notify" },
    ];



  }
})();

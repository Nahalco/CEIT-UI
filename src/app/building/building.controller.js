(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('BuildingController', BuildingController);

  /** @ngInject */
  function BuildingController() {
    var vm = this;
    console.log("BuldingController")
  }
})();
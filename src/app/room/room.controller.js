(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('RoomController', RoomController);

  /** @ngInject */
  function RoomController() {
    var vm = this;
    console.log("RoomController")
  }
})();

(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('UsersController', UsersController);

  /** @ngInject */
  function UsersController() {
    var vm = this;
    console.log("UsersController")
  }
})();
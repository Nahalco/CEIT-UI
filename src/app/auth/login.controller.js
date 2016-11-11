(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController() {
    var vm = this;
    vm.user = {};


  }
})();
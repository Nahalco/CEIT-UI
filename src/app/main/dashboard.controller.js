(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($state) {
    var vm = this;

    vm.$state = $state;
    console.log('DashboardController' , vm.$state)
  }
})();
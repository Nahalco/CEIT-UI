(function() {
  'use strict';

  angular
    .module('clientUi')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log , $rootScope, $state, $stateParams, $urlRouter) {

    $log.debug('runBlock end');
    var userStatus;

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

  }

})();

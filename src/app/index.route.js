(function() {
  'use strict';

  angular
    .module('clientUi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
                  url: '/login',
                  templateUrl: 'app/auth/login.html',
                  controller: 'LoginController',
                  controllerAs: 'vm',
              })

      ;

    $urlRouterProvider.otherwise('/');
  }

})();

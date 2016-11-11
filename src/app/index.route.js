(function() {
  'use strict';

  angular
    .module('clientUi')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('login', {
                  url: '/login',
                  templateUrl: 'app/auth/login.html',
                  controller: 'LoginController',
                  controllerAs: 'vm',
              })
              .state('index', {
                        url: '/index',
                        templateUrl: 'app/index/site.html',
                        controller: 'IndexController',
                        controllerAs: 'vm',
                    })
                    // home
        .state('app', {
            url: '/',
            abstract: true,
            templateUrl: 'app/main/main.html',
            controller: 'AppController',
            controllerAs: 'vm',
        })
        .state('app.dashboard', {
            url: 'dashboard',
            templateUrl: 'app/main/home.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
        })
        // room
      .state('app.room', {
          url: 'room',
          template: '<div ui-view></div>',
          abstract: true,
      })
      //room list
      .state('app.room.list', {
          url: '/list',
          templateUrl: 'app/room/listRoom.html',
          controller: 'TableController',
          controllerAs: 'vm'
      })
      .state('app.room.add', {
          url: '/list',
          templateUrl: 'app/room/addRoom.html',
          controller: 'AddItemController',
          controllerAs: 'vm',
          resolve: {
            editModel: ['$stateParams', 'Table', function($stateParams, Table) {
          }]
        }
      })
      ;

    $urlRouterProvider.otherwise('/index');
  }

})();

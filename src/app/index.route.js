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
        // users
        .state('app.user', {
            url: 'user',
            template: '<div ui-view></div>',
            abstract: true,
        })

        //user list
        .state('app.user.list', {
            url: '/list',
            templateUrl: 'app/users/userList.html',
            controller: 'TableController',
            controllerAs: 'vm'
        })
        .state('app.user.add', {
            url: '/add',
            templateUrl: 'app/users/addUser.html',
            controller: 'AddItemController',
            controllerAs: 'vm',
            resolve: {
                editModel: ['$stateParams', 'Table', function($stateParams, Table) {
                }]
            }
        })
        // building
        .state('app.building', {
            url: 'building',
            template: '<div ui-view></div>',
            abstract: true,
        })

        //building list
        .state('app.building.list', {
            url: '/list',
            templateUrl: 'app/building/listBuilding.html',
            controller: 'TableController',
            controllerAs: 'vm'
        })
        .state('app.building.add', {
            url: '/add',
            templateUrl: 'app/building/addBuilding.html',
            controller: 'AddItemController',
            controllerAs: 'vm',
            resolve: {
                editModel: ['$stateParams', 'Table', function($stateParams, Table) {
                }]
            }
        })
        .state('app.building.edit', {
            url: '/edit/:buildingId',
            templateUrl: 'app/building/addBuilding.html',
            controller: 'AddItemController',
            controllerAs: 'vm',
            resolve: {
                editModel: ['$stateParams', 'Table', function($stateParams, Table) {
                    return Table.getItem('building' , $stateParams.buildingId);
                }]
            }
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
          url: '/add',
          templateUrl: 'app/room/addRoom.html',
          controller: 'AddItemController',
          controllerAs: 'vm',
          resolve: {
            editModel: ['$stateParams', 'Table', function($stateParams, Table) {
          }]
        }
      })
      // zone
        .state('app.zone', {
            url: 'zone',
            template: '<div ui-view></div>',
            abstract: true,
        })
        // zone
        .state('app.zone.set', {
            url: '/set',
            templateUrl: 'app/zone/zone.html',
            controller: 'ZoneController',
            controllerAs: 'vm'
        })
      ;

    //$urlRouterProvider.otherwise('/index');
      $urlRouterProvider.otherwise(function ($injector) {
          var $state = $injector.get("$state");
          $state.go('index');
      });

  }

})();

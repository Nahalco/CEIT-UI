(function() {
  'use strict';

  angular
    .module('clientUi')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig , RestangularProvider , $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;



    //set restangular config
    RestangularProvider.setBaseUrl('http://192.168.128.90:1337/');
    RestangularProvider.setDefaultHttpFields({
      withCredentials: false,
      cache: false
    });
    RestangularProvider.setDefaultHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json',
      //'X-Accept-Version': '1.0.0'
    });



  }

})();

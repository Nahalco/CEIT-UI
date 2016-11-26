(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('AppController', AppController);

  /** @ngInject */
  function AppController($state ) {
    var vm = this;
    console.log("in AppController")

    console.log($state)
    vm.$state = $state;
    vm.xxx = ["ddd"];

    $('.sp-dropdown').click(function(){
      if($(this).hasClass('sp-dropdown-active'))
        return;
      $('.sp-dropdown').each(function () {
        //console.log("on click" , $(this))
        if($(this).hasClass('sp-dropdown-active')){
          $(this).removeClass('sp-dropdown-active');
          $(this).children('.sp-dropdown-menu').stop().animate({height: "toggle", 'padding-top': "toggle", 'padding-bottom': "toggle", opacity: "toggle"}, "slow");
        }
      })

      $(this).children('i').stop().toggleClass('fa-arrow-circle-up');
      $(this).stop().toggleClass('sp-dropdown-active');
      $(this).children('.sp-dropdown-menu').stop().animate({height: "toggle", 'padding-top': "toggle", 'padding-bottom': "toggle", opacity: "toggle"}, "slow");
    });

    $('.toggler').click(function() {
      $('body').stop().toggleClass('sp-toggle-sidebar', 300);
    });


  }
})();

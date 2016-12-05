/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('clientUi')
      .filter('range', function() {
        return function(input, total) {
          total = parseInt(total);

          for (var i=1; i<=total; i++) {
            input.push(i);
          }

          return input;
        };
      })
    .filter('yesNo', [function() {
      return function(input) {
        if (input) {
          return 'Yes';
        }
      };
    }])
    .filter('gender', [function() {
      return function(input) {
        if (input === false) {
          return 'Female';
        } else if (input === true) {
          return 'Male';
        }
      };
    }])
    .filter('age', ['$filter', function($filter) {
      return function(birthday, just) {
        if (birthday) {
          var ageDifMs = Date.now() - new Date(birthday).getTime();
          var ageDate = new Date(ageDifMs); // miliseconds from epoch
          var age = Math.abs(ageDate.getUTCFullYear() - 1970);
          if (just) {
            return age;
          }
          return $filter('date')(birthday, 'MM-dd-yyyy') + ' (' + age + ')';
        }
      };
    }])
    .filter('label', function() {
      return function(input) {
        return _.startCase(input);
      }
    })
    .filter('fullDate', function() {
      return function(input) {
        if (input) {
          return moment(input).format();
        }
      }
    })

})();
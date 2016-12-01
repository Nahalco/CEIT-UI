(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($scope, $state) {
    var vm = this;

    vm.$state = $state;
    console.log('DashboardController' , vm.$state)

    $scope.labels1 = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series1 = ['Series A', 'Series B'];
    $scope.data1 = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick1 = function (points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride1 = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options1 = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };


    $scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series2 = ['Series A', 'Series B'];

    $scope.data2 = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.labels3 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data3 = [300, 500, 100];

    $scope.labels4 =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

    $scope.data4 = [
      [65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100]
    ];

    $scope.labels5 = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data5 = [300, 500, 100, 40, 120];

    $scope.labels6 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data6 = [300, 500, 100];


  }
})();
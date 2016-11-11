(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('TableController', TableController);

  /** @ngInject */
  function TableController(Table, $stateParams, $state) {
    var vm = this,
      entity;
    vm.$state = $state

    vm.activate = function(what) {
      entity = what;
      vm.urlParams = $stateParams;

      // if (what === 'treatment') {
      //   entity = 'patient/' + vm.urlParams.patientId + '/treatment';
      // }
      //
      // if (what === 'insurance') {
      //   entity = 'patient/' + vm.urlParams.patientId + '/insurance';
      // }
      //
      // if (what === 'photocollection') {
      //   entity = 'patient/' + vm.urlParams.patientId + '/photocollection';
      // }
      //
      // if (what === 'photo') {
      //   entity = 'patient/photocollection/photo';
      // }
      //
      // if (what == "billing/invoice/all") {
      //   Table.getItems('user/role/responsible').then(function(res) {
      //     vm.responsibleList = res;
      //   });
      //   //nextState = 'app.billing.show';
      // }
      //
      // if (what == 'billing/{id}/invoice/billing/id') {
      //   entity = 'billing/' + $stateParams.billingId + '/invoice/billing/id'
      // }

    }

    vm.items = [];

    vm.getItems = getItems;

    var tableLoaded = 0;

    function getItems(tableState) {

      console.log("get items function")

      tableLoaded++;
      if (tableLoaded !== 2) {
        vm.isLoading = true;

        vm.pagination = tableState.pagination;
        var query = {
          offset: vm.pagination.start || 0,
          limit: vm.pagination.number || 10
        };

        if (tableState.search) {
          angular.extend(query, tableState.search.predicateObject);
        }

        Table.getItems(entity, query).then(function(res) {
          vm.items = res.items;
          tableState.pagination.numberOfPages = Math.ceil(res.count / query.limit);
          vm.isLoading = false;
        });
      }
    }

  }
})();

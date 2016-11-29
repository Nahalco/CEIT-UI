(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('TableController', TableController);

  /** @ngInject */
  function TableController(Table, $stateParams, $state,toastr) {
    var vm = this,
      entity;
    vm.$state = $state

    vm.activate = function(what) {
      entity = what;
      vm.urlParams = $stateParams;
    }

    vm.delete = function (item) {
      Table.removeItem(entity , item.id).then(function (res) {
        var index = vm.items.indexOf(item);
        vm.items.splice(index, 1);
      }, onDeleteFailure);
    }

    function onDeleteSuccess(res) {
      console.log("onDeleteSuccess" , res)
      toastr.info('حذف شد');

      // var index = vm.items.indexOf(res);
      // vm.items.splice(index, 1);

      //vm.items.splice(res.id , 1);
    }

    function onDeleteFailure(res) {
      console.log("onDeleteFailure" , res)
      toastr.error('حذف نشد');
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

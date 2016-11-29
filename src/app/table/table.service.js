(function() {
  'use strict';

  angular
    .module('clientUi')
    .factory('Table', Table);

  /** @ngInject */
  function Table(Restangular) {

    var header = {};

    function getItems(entity, query) {
      var params = query || {};
      return Restangular.one(entity).get(params, header);
    }

    function getItem(entity, id) {
      return Restangular.one(entity, id).get({}, header);
    }

    function addItem(entity, item) {
      return Restangular.one(entity).post('', item, {}, header);
    }

    function editItem(entity, id, item) {
      return Restangular.one(entity, id).customPUT(item,null, {}, header);
    }

    function removeItem(entity, id){
      return Restangular.one(entity, id).remove( '', null, {}, header);
    }

    return {
      getItems: getItems,
      getItem: getItem,
      addItem: addItem,
      editItem: editItem,
      removeItem : removeItem,
    };

  }
})();

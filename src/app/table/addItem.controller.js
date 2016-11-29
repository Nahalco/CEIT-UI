(function() {
  'use strict';

  angular
    .module('clientUi')
    .controller('AddItemController', AddItemController);

  /** @ngInject */
  function AddItemController(Table, toastr, editModel, $httpParamSerializerJQLike, $state, $stateParams) {

    var vm = this,
      entity,
      nextState,
      nextStateParams = {},
      putId = editModel ? editModel.id : null;

    vm.model = editModel || {};
    vm.isEdit = editModel ? true : false;
    vm.activate = activate;
    vm.submit = submit;

    function activate(what, forPatient) {
      entity = what;

      nextState = 'app.' + entity + '.list';
      if (entity === 'room') {
          Table.getItems('building', {}).then(function(res) {
            vm.building = res.items;
          });
      }

    }

    function submit(isValid) {

      var form_data = vm.model;
      if (!editModel) {
        console.log("on submit",form_data , vm.fields , entity , editModel)
        Table.addItem(entity, form_data).then(onAddSuccess, onAddFailure);
      } else {
        Table.editItem(entity, putId, form_data).then(onEditSuccess, onEditFailure);
      }

    }

    function onAddSuccess(res) {
      toastr.success('اضافه شد');
      $state.go(nextState, nextStateParams);
    }

    function onAddFailure(res) {
      toastr.error('مشکل در اضافه کردن');
    }

    function onEditSuccess() {
      console.log("onEditSuccess" )
      toastr.success('بروزرسانی انجام شد');
      $state.go(nextState, nextStateParams);
    }

    function onEditFailure(res) {
      toastr.error('مشکل در بروزرسانی');
    }


  }
})();

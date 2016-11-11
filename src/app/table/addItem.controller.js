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

      // nextState = 'app.' + entity + '.list';
      // if (entity === 'officemanager') {
      //   Table.getItems('company?limit=10000').then(function(res) {
      //     vm.companyList = res.items;
      //   });
      // }
      // if (entity === 'patient') {
      //   Table.getItems('patient', {}).then(function(res) {
      //     vm.grantorList = res.items;
      //   });
      //   if ($stateParams.action === 'add') {
      //     nextState = 'app.patient.forms.dental';
      //   }
      // }
      // if (forPatient) {
      //   vm.patientId = $stateParams.patientId;
      //   entity = 'patient/' + $stateParams.patientId + '/' + what;
      //   nextState = 'app.patient.detail.insurance';
      //   nextStateParams = {
      //     patientId: $stateParams.patientId
      //   };
      // }
      // if (what === 'photocollection') {
      //   entity = 'patient/' + $stateParams.patientId + '/photocollection';
      // }
      // if (what === 'dentalhistory' || what === 'medicalhistory') {
      //   putId = null;
      // }
      // if (what == "billing") {
      //   Table.getItems('patient').then(function(res) {
      //     vm.grantors = res.items;
      //   });
      //   Table.getItems('doctor').then(function(res) {
      //     vm.doctors = res.items;
      //   });
      // }
      // if(what === 'doctor') {
      //   nextState = 'app.staff.list';
      // }

    }

    function submit(isValid) {


      var form_data = vm.fields;
      if (!editModel) {console.log("on submit" , vm.fields , entity , editModel)
        Table.addItem(entity, form_data).then(onAddSuccess, onAddFailure);
      } else {
        Table.editItem(entity, putId, form_data).then(onEditSuccess, onEditFailure);
      }

      // var form = angular.element('form');
      // var form_data = form.serializeArray();
      // var ajax_params = nik_serializeFormer(form_data, {
      //   cleanup: true
      // });
      // var final_data = $httpParamSerializerJQLike(ajax_params);
      //
      // if (!editModel) {
      //   Table.addItem(entity, final_data).then(onAddSuccess, onAddFailure);
      // } else {
      //   Table.editItem(entity, putId, final_data).then(onEditSuccess, onEditFailure);
      // }
    }

    function onAddSuccess(res) {
      console.log("onAddSuccess" , res)
      if (entity === 'patient')  {
        nextStateParams = {
          action: 'add',
          patientId: res.id
        };
      }
      toastr.success('New Item Created!');
      $state.go(nextState, nextStateParams);
    }

    function onAddFailure(res) {
      console.log("onAddFailure" , res)
    }

    function onEditSuccess() {
      console.log("onEditSuccess" , res)
      toastr.success('Item Updated!');
      $state.go(nextState, nextStateParams);
    }

    function onEditFailure(res) {
      console.log("onEditFailure" , res)
      console.log(res)
    }

    function nik_serializeFormer(arr, options) {
      var result = {};
      var options = options || {};
      $.each(arr, function(i, fd) {
        if (options.cleanup) {
          var valueIsEmpty = fd.value == '?' || fd.value == '' || fd.value == 'null';
          if (!valueIsEmpty && fd.name.includes('[')) {
            result[fd.name] = fd.value;
          }
        } else {
          result[fd.name] = fd.value;
        }
      });
      return result;
    }

  }
})();

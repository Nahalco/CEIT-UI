(function() {
    'use strict';

    angular
        .module('clientUi')
        .controller('IndexController', IndexController);

    function IndexController($scope , $http , mySocket) {
        var vm = this;

        console.log("index controller")
        var vm = this
        console.log("AppController" )

        vm.loading = false;
        vm.loadDiscovery = false;
        vm.headerText = "جلسه دوازدهم اینترنت اشیا دانشکده مهندسی کامپیوتر دانشگاه امیرکبیر"

        vm.rpis = [];
        vm.things =  [];

        $scope.$on('socket.states', function(data, states) {
            vm.light = states.light;
            vm.temperature = states.temperature;
            vm.humidity = states.humidity;
            vm.gas = states.gas;
        })

        $http({
            method: 'GET',
            url: 'http://192.168.128.90:8080/discovery',

        }).success(function(data){
            console.log("discovery success");
            loadThingFromDiscovry(data)
        }).error(function(data){
            console.log("discovery error" , data);
        });

        vm.onLampChange = function (rpiKey,thing) {
            console.log("on change",rpiKey,thing)

            var dest = false;
            if(thing.attributes.status == null){
                dest = true;
            }else{
                if(thing.attributes.status == "on"){
                    dest = false
                    //thing.attributes.status = "off"
                }else if(thing.attributes.status == "off"){
                    dest = true;
                    //thing.attributes.status = "on"
                }
            }

            var payload = {
                type: thing.type,
                rpi_id: rpiKey,
                device_id: thing.id,
                settings: {
                    on:dest
                }
            }

            $http({
                method: 'POST',
                url: 'http://192.168.128.90:8080/command',
                data:payload,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data){
                changeLampStatus(data.on , rpiKey , thing )
            }).error(function(){
                //alert("error");
            });


            if(thing.attributes.status == "on"){
                thing.attributes.status = "off"
            }else if(thing.attributes.status == "off"){
                thing.attributes.status = "on"
            }
        }

        vm.present = 32
        vm.abcent = 8;
        vm.start_time = "09:15";
        vm.end_time = "11:00";
        vm.light = ""
        vm.temperature = ""
        vm.gas = ""
        vm.humidity = "";

        vm.timerSet = function () {

            if(vm.timerDelay == undefined){
                return
            }
            if(vm.lightThreshold == undefined){
                return
            }
            $http({
                method: 'POST',
                url: 'http://192.168.128.90:8080/setConfig',
                data:{
                    time:vm.timerDelay,
                    light: vm.lightThreshold
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data){
                console.log("setTime");
            }).error(function(data){
                console.log("setTime error" );
            });

        }

        vm.lightThresholdSet = function () {
            if(vm.lightThreshold == undefined){
                return
            }
            $http({
                method: 'POST',
                url: 'http://192.168.128.90:8080/setCongig',
                data:{
                    time:vm.lightThreshold
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function(data){
                console.log("lightThresholdSet");
            }).error(function(data){
                console.log("lightThresholdSet error" );
            });
        }
        function loadThingFromDiscovry(data) {
            vm.rpis = data;
            console.log(data)
            // for(var rpi in data){
            //     vm.things = data[rpi]["things"]
            // }
        }
        function changeLampStatus(on , rpiKey , thing) {
            if(on){
                thing.attributes.status = "on"
            }else{
                thing.attributes.status = "off"
            }
            console.log("change states ",thing)
        }

    }


})();

(function() {
    'use strict';

    angular
        .module('clientUi')
        .factory('mySocket', function (socketFactory , $rootScope) {

            var socket = io.connect('http://192.168.128.90:8080/');

            socket.on('connect', function () {
                console.log("connect")
            })
            socket.on('error', function () {
                console.log("error")
            })
            socket.on('log', function (message) {

                message = JSON.parse(message)
                console.log(message)
                for (var key in message) {

                    if(key == "states"){
                        $rootScope.$broadcast("socket.states", message[key])
                    }

                }

            })
            return socket;
            // console.log("in factory")
            //
            // var mySocket = socketFactory(
            //     {
            //         ioSocket: io.connect('http://iot.ceit.aut.ac.ir:58902')
            //     }
            // );
            //
            // mySocket.forward('error');
            //
            // mySocket.on('connect', function () {
            //     console.log("connect in factory")
            //     mySocket.forward('connect');
            // })
            // mySocket.on('error', function () {
            //     console.log("error")
            // })
            //
            // return mySocket;
        });
})();

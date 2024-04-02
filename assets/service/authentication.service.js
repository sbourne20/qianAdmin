(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http','$location', '$cookieStore', '$rootScope', '$timeout','DREAM_FACTORY_URL'];
    function AuthenticationService($http,$location, $cookieStore, $rootScope, $timeout,DREAM_FACTORY_URL) {
        var service = {};

        service.Login = Login;
        service.ClearCredentials = ClearCredentials;
        service.SetCredentials = SetCredentials;
        service.test = test;

        return service;

        function test(){
            $http({
                        method: 'POST',
                        url: DREAM_FACTORY_URL + "/_proc/fetchNasabah",
                        datatype : 'json',
                        headers: {                    
                            'X-DreamFactory-API-Key':'5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8'
                        },
                        data : {
                            "params": [
                                {
                                    "name": "idnasab",
                                    "param_type": "IN",
                                    "value": "A39215276"
                                }
                            ],
                            "wrapper": "data"
                        }
                    }).then(function successCallback(xx) {
                        //console.log (xx);
                    });
        }

        function Login(username, password, callback) {
            /*var request = $http({
                method: 'POST',
                url: DREAM_FACTORY_URL + '/_func/fetchBottle',
                headers: {
                    //'X-DreamFactory-Application-Name': "myapp"
                    'X-DreamFactory-API-Key':"5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8"
                },
                data: {

                    "params": [
                        {
                            "name": "botid",
                            "param_type": "IN",
                            "value": username
                        },
                        {
                            "name": "botpas",
                            "param_type": "IN",
                            "value": password
                        }

                    ],
                    "wrapper" : "login",
                    "returns" : "fetchBottle"

                }


            });*/
           /* var responsex = [
                {name : "Success", answer : ""},
                {name : "token", answer : ""}

            ];*/
            $http({
                            method: 'POST',
                            url: "https://arjuna.homeeahvalas.co.id/api/v2/user/session",
                            datatype : 'json',
                            headers: {
                                //'X-DreamFactory-Application-Name': "myapp"
                                'X-DreamFactory-API-Key':"5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8"
                            },
                           data : {
                                                               "email": username,
                                                               "password": password,
                                                               "duration": "0"

                           }


                        }).then(function successCallback(callback1) {
                                var responsex = [
                                                {success : "True", token : callback1.data.session_token}


                                            ];
                               callback (responsex);
                   });


            //request.success(function (loginResult) {

              //  var response = { success: loginResult == "1" };



                /*if (!response.success) {
                    response.message = 'Username or password is incorrect';
                } else {
                    //console.log("test");

                    $http({
                        method: 'POST',
                        url: "https://192.168.8.48/api/v2/user/session",
                        datatype : 'json',
                        headers: {                    
                            'X-DreamFactory-API-Key':'5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8'
                        },
                        data : {
                                    "email": username,
                                    "password": password,
                                    "duration": "0"

                        }
                    }).then(function successCallback(callback1) {
                        //response.token = "test";


                        //console.log (callback1.data.session_token);
                    });
                }
                //console.log(response);*/




                //callback(responsex);
               // return responsex;

            //});



            /* request.error(function(err){

                alert ('error');

             });*/



        }

        function handleSuccess(data) {
            //console.log (data);
            //return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }


        function SetCredentials(username, password, responseToken) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata,
                    token: responseToken

                }


            };
              console.log($rootScope.globals);
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            //$http.defaults.headers.common.Authorization = 'Basic ';
        }


    }
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };


})();
(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$window', 'AuthenticationService' ];
    function LoginController($location, $window, AuthenticationService) {
        var vm = this;

        vm.login = login;
        vm.login2 = login2;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login2(){

        }

        function login() {

            vm.dataLoading = true;
            AuthenticationService.Login(vm.USER_NAME, vm.PASSWORD, function(response){
                if (response[0].success) {
                                    AuthenticationService.SetCredentials(vm.USER_NAME, vm.PASSWORD,response[0].token);
                                    $location.path('/home/dashboard');
                                    //console.log(response);

                                } else {
                                    vm.dataLoading = false;
                                    vm.response = response.message;
                                    //console.log ('unsuccess'); test here
                                }
            });

        };
    }

})();

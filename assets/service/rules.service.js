(function () {
    'use strict';

    angular
        .module('qianApp')
        .factory('rulesService', rulesService);

    rulesService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];
    function rulesService($http, DREAM_FACTORY_URL, $rootScope) {
        var service = {};
        //$http.defaults.headers.common['X-DreamFactory-Application-Name'] = 'qianApp'; //default header for X-DreamFactory-Application-Name

        service.GetTable = GetTable;
        return service;

        function GetTable() {


            return  $http({
                method: 'Get',
                url: DREAM_FACTORY_URL + '/_table/rules?order=tanggal',
                headers: {
                     'X-DreamFactory-API-Key':"036005e85349258dd2404c2b00a550f7fcc558bdb3d07fd0a39f97d78df6873d",
                     'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: {
                    "params": [
                        {
                            "name": "stats",
                            "param_type": "IN",
                            "value": "'ACTIVE'"
                        }
                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "resource"
                }


            }).then(handleSuccess, handleError('Error getting rules'));


        }

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }


    }

})();

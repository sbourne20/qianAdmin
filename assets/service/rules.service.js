(function () {
    'use strict';

    angular
        .module('qianApp')
        .factory('rulesService', rulesService);

    rulesService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];
    function rulesService($http, DREAM_FACTORY_URL, $rootScope) {
        var service = {};
        $http.defaults.headers.common['X-DreamFactory-Application-Name'] = 'qianApp'; //default header for X-DreamFactory-Application-Name

        service.GetTable = GetTable;
        return service;

        function GetTable() {


            return  $http({
                method: 'Get',
                url: DREAM_FACTORY_URL + '/_table/rules?order=tanggal',
                headers: {
                     'X-DreamFactory-API-Key':"c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4",
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

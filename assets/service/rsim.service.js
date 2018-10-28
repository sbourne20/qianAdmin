(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('rsimService', rsimService);

    rsimService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];

    function rsimService($http, DREAM_FACTORY_URL,$rootScope) {
        var service = {};

        service.initData = initData;

        return service;

        function initData(){

            var source =
            {
                datatype: "json",
                type : "GET",
                data: {
                    "params": [
                        {
                            "name": "idx",
                            "param_type": "IN",
                            "value": "minjual"
                        }
                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "resource"
                },
                datafields: [
                    { name: 'curname' },
                    { name: 'costavg', type: 'int' },
                ],
                id: 'id',
                url: DREAM_FACTORY_URL+ "/_proc/fetchDCA",
                root: 'resource',

            };

            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                    request.setRequestHeader("X-DreamFactory-API-Key", "c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4");
                    request.setRequestHeader("X-DreamFactory-Session-Token", $rootScope.globals["currentUser"].token);


                }
            });

            return dataAdapter;
        }

        function handleSuccess(data) {
            return true;
        }

        function handleSuccessData(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }


    }

})();

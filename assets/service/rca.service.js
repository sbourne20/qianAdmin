(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('rcaService', rcaService);

    rcaService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];

    function rcaService($http, DREAM_FACTORY_URL, $rootScope) {
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
                    request.setRequestHeader("X-DreamFactory-API-Key", "5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8");
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

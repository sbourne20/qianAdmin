(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('rcaService', rcaService);

    rcaService.$inject = ['$http','DREAM_FACTORY_URL'];

    function rcaService($http, DREAM_FACTORY_URL) {
        var service = {};

        service.initData = initData;

        return service;

        function initData(){

            var source =
            {
                datatype: "json",
                type : "GET",

                datafields: [
                    { name: 'curname' },
                    { name: 'costavg', type: 'int' },
                ],
                id: 'id',
                url: DREAM_FACTORY_URL+ "/_proc/retrieveAdminRates",
                root: 'record',

            };

            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                    request.setRequestHeader("X-DreamFactory-Application-Name", "myapp");


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

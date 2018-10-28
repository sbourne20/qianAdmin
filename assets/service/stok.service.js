(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('stokService', stokService);

    stokService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];

    function stokService($http, DREAM_FACTORY_URL,$rootScope) {
        var service = {};

        service.initData = initData;
        service.addedit = addedit;
        service.deleteData = deleteData;
        service.fetchStok = fetchStok;

        return service;

        function deleteData(uid){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/_table/akun?ids='+uid;
            data = {

                "resource": [
                    {
                        "stats": "DELETE"

                    }

                ],
                "schema": {
                    "STATUS": "varchar",
                    "ERROR_CODE": "varchar",
                    "MESSAGE": "varchar"
                },
                "wrapper": "resource"
            };

            return  $http({
                method: "PATCH",
                url: url,
                headers: {
                   'X-DreamFactory-API-Key':"c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4",
                   'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating currency'));
        }



        function addedit(aemethod, rowid, rowdata){
            var url = "";

            if (aemethod == 'POST') {
                var data = {};
                url = DREAM_FACTORY_URL + '/_table/akun'
                data = {
                    "resource": [
                        {
                            "stats":"ACTIVE"
                        }
                    ]
                };
            }
            else
            {

                url = DREAM_FACTORY_URL + '/_table/akun?ids='+rowdata.uid;
                data = {

                    "resource": [
                        {
                            "akun_code" : rowdata.akun_code,
                            "akun_group" : rowdata.akun_group,
                            "akun_name" : rowdata.akun_name

                        },


                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "resource"
                };

            }


                return $http({
                        method: aemethod,
                        url: url,
                        headers: {
                            'X-DreamFactory-API-Key':"c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4",
                                                'X-DreamFactory-Session-Token':$rootScope.globals.token
                        },
                        data: data


                    }).then(handleSuccess, handleError('Error updating data'));

        }

        function initData(curid){

            var source =
            {
                datatype: "json",
                type : "GET",
                data : {
                    "params": [
                        {
                            "name": "curid",
                            "param_type": "IN",
                            "value": curid
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
                    { name: 'id' },
                    { name: 'pecahan_id' },
                    { name: 'qty' , type:'int'},
                    { name: 'pecahan', type:'int' },
                    { name: 'curname' },
                    { name: 'jumlahlembar', type:'int' },

                ],
                id: 'id',
                url: DREAM_FACTORY_URL+ "/_proc/fetchStok",
                root: 'resource',
                updaterow: function (rowid, rowdata, commit) {

                    //addedit('PATCH',rowid, rowdata);
                    //commit(true);
                }

            };
            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                     request.setRequestHeader("X-DreamFactory-API-Key", "c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4");
                     request.setRequestHeader("X-DreamFactory-Session-Token", $rootScope.globals["currentUser"].token);


                }
            });

            return dataAdapter;
        }

        function fetchStok(){


                var data = {
                    "params": [
                        {
                            "name": "curid",
                            "param_type": "IN",
                            "value": 0
                        }
                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "resource"
                };


            var url =  DREAM_FACTORY_URL+ "/_proc/fetchStok";

            return $http({
                method: "POST",
                url: url,
                headers: {
                   'X-DreamFactory-API-Key':"c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4",
                                                          'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccessData, handleError('Error updating data'));
        }

        function handleSuccessData(data) {
            return data;
        }


        function handleSuccess(data) {
            return true;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }


    }

})();

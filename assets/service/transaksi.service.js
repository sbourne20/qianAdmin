(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('transaksiService', transaksiService);

    transaksiService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];

    function transaksiService($http, DREAM_FACTORY_URL, $rootScope) {
        var service = {};
        var status_owp = false;
        $http.defaults.headers.common['X-DreamFactory-Application-Name'] = 'myapp'; //default header for X-DreamFactory-Application-Name

        service.initData = initData;
        service.addedit = addedit;
        service.addtrxh_trxd = addtrxh_trxd;
        service.deleteData = deleteData;
        service.fetchNasab = fetchNasab;
        service.changeJenis = changeJenis;
        service.saveTrxh = saveTrxh;
        service.fetchTRXH = fetchTRXH;
        service.postTRXH = postTRXH;
        service.openWindowPopup = openWindowPopup;
        return service;

        function openWindowPopup(sowp){
            if (sowp!=null)
                status_owp = sowp;

            return status_owp;
        }

        function changeJenis (trhid, jenis){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/_func/changeTRXJenis',
                data = {
                    "params": [
                        {
                            "name": "jenis",
                            "param_type": "IN",
                            "value": jenis
                        },
                        {
                            "name": "idtrxh",
                            "param_type": "IN",
                            "value": trhid
                        }
                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "resource"
                };

            return $http({
                method: "POST",
                url: url,
                headers: {
                    'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                    'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
        }

        function deleteData(uid){
            var url = "";


            url = DREAM_FACTORY_URL + '/_table/trxd/'+uid;


            return  $http({
                method: "DELETE",
                url: url,
                headers: {
                   'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                                                          'X-DreamFactory-Session-Token':$rootScope.globals.token
                },

            }).then(handleSuccess, handleError('Error updating currency'));
        }

        function fetchNasab(idnasabah){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/_proc/fetchNasabah'
            data = {
                "params": [
                    {
                        "name": "idnasab",
                        "param_type": "IN",
                        "value": idnasabah
                    }
                ],
                "schema": {
                    "STATUS": "varchar",
                    "ERROR_CODE": "varchar",
                    "MESSAGE": "varchar"
                }
            };

            return $http({
                method: "POST",
                url: url,
                headers: {
                    'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                                                           'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
        }

        function saveTrxh(trxh){
            var url = DREAM_FACTORY_URL + '/_table/trxh?ids='+trxh.id;
            var x = {
                a : "aa",
                b : "bb"
            }

            var data = {

                "resource": [
                    {
                        "trxh_nasab_id" :  trxh.trxh_nasab_id,
                        "trxh_date" :  trxh.trxh_date,
                        "trxh_tipe" :  trxh.trxh_tipe,
                        "trxh_total" : trxh.trxh_total,
                        "trxh_amount" : trxh.trxh_amount,
                        "trxh_kembali" : trxh.trxh_kembali,
                        "trxh_notes": trxh.trxh_notes,
                        "branch_id" : trxh.branch_id


                    }


                ],
                "schema": {
                    "STATUS": "varchar",
                    "ERROR_CODE": "varchar",
                    "MESSAGE": "varchar"
                },
                "wrapper": "resource"
            };

            return $http({
                method: "PATCH",
                url: url,
                headers: {
                    'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                                                           'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
        }

        function addtrxh_trxd(nasabah_id){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/_proc/insertTrxhTrxd?wrapper=resource',
            data = {
                "params": [
                    {
                        "name": "nasab_id",
                        "param_type": "IN",
                        "value": nasabah_id
                    }
                ],
                "schema": {
                    "STATUS": "varchar",
                    "ERROR_CODE": "varchar",
                    "MESSAGE": "varchar"
                },
                "wrapper": "resource"
            };

            return $http({
                method: "POST",
                url: url,
                headers: {
                   'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                                                          'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));

        }

        function addedit(aemethod, rowid, rowdata){
            var url = "";
            var data = {};
            var pMethod = "";

            if (aemethod == 'POST') {
                pMethod = "POST"
                url = DREAM_FACTORY_URL + '/_table/trxd'
                data = {
                    "resource": [{
                        "trxd_trxh_id" : rowid,
                        "trxd_jumlah": 0
                    }
                    ]
                };

            }
            else if (aemethod == 'POSTNASAB') {
                pMethod = "POST"
                url = DREAM_FACTORY_URL + '/_table/nasab'
                data = {
                    "resource": rowdata
                };

            } else
            {

                pMethod = aemethod;
                url = DREAM_FACTORY_URL + '/_table/trxd?ids='+rowdata.uid;
                data = {

                    "resource":
                        {
                            "trxd_currency_id" : rowdata.trxd_currency_id,
                            "trxd_stok_id" : rowdata.trxd_stok_id,
                            "trxd_satuan" : rowdata.trxd_satuan,
                            "trxd_jumlah" : rowdata.trxd_jumlah

                        }
                };

            }


                return $http({
                        method: pMethod,
                        url: url,
                        headers: {
                           'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                                                                  'X-DreamFactory-Session-Token':$rootScope.globals.token
                        },
                        data: data


                    }).then(handleSuccess, handleError('Error updating data'));

        }

        function postTRXH(idtrxh){
            var url = DREAM_FACTORY_URL + "/_func/postTRX?wrapper=resource";
            var data = {
                "params": [
                    {
                        "name": "idtrxh",
                        "param_type": "IN",
                        "value": idtrxh
                    }
                ],
                "schema": {
                    "STATUS": "varchar",
                    "ERROR_CODE": "varchar",
                    "MESSAGE": "varchar"
                },
                "wrapper": "resource",
                "returns": "resource"
            };

            return $http({
                method: "POST",
                url: url,
                headers: {
                   'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                    'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
        }


        function fetchTRXH(stats,idtrxh){
			console.log($rootScope.globals.token);
            var url = DREAM_FACTORY_URL + "/_proc/fetchTrxh";
            var data = {
                    "params": [
                        {
                            "name": "stats",
                            "param_type": "IN",
                            "value": stats
                        },
                        {
                            "name": "idtrxh",
                            "param_type": "IN",
                            "value": idtrxh
                        }
                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "record"
                };

            return $http({
                method: "POST",
                url: url,
                headers: {                    
                    'X-DreamFactory-API-Key':'3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d',
                    'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
        }

        function initData(trxhid,stats){
        if (trxhid==0){

            var source =
            {
                datatype: "json",
                type: "POST",
                data: {
                    "params": [
                        {
                            "name": "stats",
                            "param_type": "IN",
                            "value": stats
                        },
                        {
                            "name": "idtrxh",
                            "param_type": "IN",
                            "value": trxhid
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
                    {name: 'id'},
                    {name: 'trxh_code', type: 'string'},
                    {name: 'trxh_date'},
                    {name: 'trxh_tipe'},
                    {name: 'jenis'},
                    {name: 'idtype'},
                    {name: 'idnasabah', type: 'string'},
                    {name: 'nama', type: 'string'},
                    {name: 'trxh_total', type: 'int'},
                    {name: 'trxh_stats'},
                    { name: 'idcopy', type: 'binary' },
                    {name :'branch_id'}

                ],
                id: 'id',
                url: DREAM_FACTORY_URL + "/_proc/fetchTrxh",
                root: 'resource'
            };

        } else {
            var source =
            {
                datatype: "json",
                type: "POST",
                data: {
                    "params": [

                        {
                            "name": "trxhid",
                            "param_type": "IN",
                            "value": trxhid
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
                    {name: 'id'},
                    {name: 'trxd_trxh_id'},
                    {name: 'trxd_currency_id'},
                    {name: 'trxd_stok_id'},
                    {name: 'trxd_satuan', type: 'float'},
                    {name: 'trxd_jumlah', type: 'float'},
                    {name: 'trxd_total', type: 'int'},
                    {name: 'curname'},
                    {name: 'pecahan', type: 'float'},
                    {name: 'pecahanID', type: 'int'}

                ],
                id: 'id',
                url: DREAM_FACTORY_URL + "/_proc/fetchTrxd",
                root: 'resource',
                updaterow: function (rowid, rowdata, commit) {
                    if (addedit('PATCH', rowid, rowdata))
                        setTimeout(function () {
                            commit(true)
                        }, 700);
                    else  setTimeout(function () {
                        commit(false)
                    }, 700);


                }

            };
        }
		console.log($rootScope.globals["currentUser"].token);
            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                    request.setRequestHeader("X-DreamFactory-API-Key", "3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d");
                    request.setRequestHeader("X-DreamFactory-Session-Token", $rootScope.globals["currentUser"].token);
					//request.setRequestHeader("X-DreamFactory-Session-Token", $rootScope.globals.token)
                }
            });

            return dataAdapter;


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

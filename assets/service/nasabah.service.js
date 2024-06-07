(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('nasabahService', nasabahService);


               
    nasabahService.$inject = ['$http','$location', '$cookieStore', '$rootScope', '$timeout','DREAM_FACTORY_URL'];
    function nasabahService($http, $location, $cookieStore, $rootScope, $timeout,DREAM_FACTORY_URL,rateService) {
        var service = {};

        service.initData = initData;
        service.addedit = addedit;
        service.deleteData = deleteData;
        service.fetchNasab = fetchNasab;
        service.saveNasab = saveNasab;
        service.test = test;

        return service;

        function saveNasab(dataNasabah, mode){
            if (mode=='Edit'){
               /* var url = DREAM_FACTORY_URL + '/_table/nasab?filter=ids='+dataNasabah.id;

                var data = {

                    "record": [
                        {
                            "jenis" :  dataNasabah.jenis,
                            "idtype" :  dataNasabah.idtype,
                            "idnasabah" :  dataNasabah.idnasabah,
                            "nama" : dataNasabah.nama,
                            "alamat" : dataNasabah.alamat,
                            "negara" : dataNasabah.negara,
                            "phone" : dataNasabah.phone,
                            "notes" : dataNasabah.notes,
                            "idcopy" : dataNasabah.idcopy


                        }


                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "record"
                };*/

                var url = DREAM_FACTORY_URL + '/_table/nasab?filter=id='+dataNasabah.id;

                var data = {

                    "resource": [
                        {

                            "jenis" :  dataNasabah.jenis,
                            "idtype" :  dataNasabah.idtype,
                            "idnasabah" :  dataNasabah.idnasabah,
                            "nama" : dataNasabah.nama,
                            "alamat" : dataNasabah.alamat,
                            "negara" : dataNasabah.negara,
                            "phone" : dataNasabah.phone,
                            "notes" : dataNasabah.notes,
                            "idcopy" : dataNasabah.idcopy

                        }


                    ]
                };


            }

            console.log(data);

            return $http({
                method: "PATCH",
                url: url,
                headers: {
                    'X-DreamFactory-API-Key':"036005e85349258dd2404c2b00a550f7fcc558bdb3d07fd0a39f97d78df6873d",
                    'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
        }

        function fetchNasab(idnasabah){

            
            var request = $.ajax({
                method: 'POST',
                url: DREAM_FACTORY_URL + "/_proc/fetchNasabah",
                datatype : 'json',
                async: true,
                headers: {                    
                    'X-DreamFactory-API-Key':'036005e85349258dd2404c2b00a550f7fcc558bdb3d07fd0a39f97d78df6873d',
                    'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data : {
                    "params": [
                        {
                            "name": "idnasab",
                            "param_type": "IN",
                            "value": idnasabah
                        }
                    ],
                    "wrapper": "data"
                }
            });
            

            return request;

        }

        function deleteData(uid){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/pecahan?ids='+uid;
            data = {

                "record": [
                    {
                        "stats": "DELETE"

                    }

                ],
                "schema": {
                    "STATUS": "varchar",
                    "ERROR_CODE": "varchar",
                    "MESSAGE": "varchar"
                },
                "wrapper": "record"
            };

            return  $http({
                method: "PATCH",
                url: url,
                headers: {
                    'X-DreamFactory-API-Key':"752e4202cbee2b3626493ee452deeeefc1a791d53d9c5c01adf2d9fd222efcd3",
                    'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating currency'));
        }

        function addedit(aemethod, rowid, rowdata){
            var url = "";

            if (aemethod == 'POST') {
                var data = {};
                url = DREAM_FACTORY_URL + '/_func/insertPecahan',
                    data = {
                        "schema": {
                            "STATUS": "varchar",
                            "ERROR_CODE": "varchar",
                            "MESSAGE": "varchar"
                        },
                        "wrapper": "record"
                    };
            }
            else
            {
                //console.log (rowdata);
                url = DREAM_FACTORY_URL + '/pecahan?ids='+rowdata.id;
                data = {

                    "record": [
                        {
                            "pecahan" : rowdata.pecahan,
                            "currency_id" : rowdata.currency_id

                        },


                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "record"
                };

            }


                return $http({
                        method: aemethod,
                        url: url,
                        headers: {
                            'X-DreamFactory-API-Key':"036005e85349258dd2404c2b00a550f7fcc558bdb3d07fd0a39f97d78df6873d",
                            'X-DreamFactory-Session-Token':$rootScope.globals.token
                        },
                        data: data


                    }).then(handleSuccess, handleError('Error updating data'));

        }


         function test(){
            $http({
                        method: 'POST',
                        url: DREAM_FACTORY_URL + "/_proc/fetchNasabah",
                        datatype : 'json',
                        headers: {                    
                            'X-DreamFactory-API-Key':'036005e85349258dd2404c2b00a550f7fcc558bdb3d07fd0a39f97d78df6873d',
                            'X-DreamFactory-Session-Token':$rootScope.globals.token
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
                        console.log (xx);
                    });
        }


        function initData(){

            var source =
            {
                datatype: "json",
                type : "POST",
                data : {
                    "params": [
                        {
                            "name": "idnasab",
                            "param_type": "IN",
                            "value": "select all"
                        }
                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "record"
                },
                datafields: [
                    {name: 'id'},
                    { name: 'jenis' },
                    { name: 'idtype' },
                    { name: 'idnasabah'},
                    { name: 'nama' },
                    { name: 'alamat' },
                    { name: 'negara' },
                    { name: 'phone' },
                    { name: 'notes' },
                    { name: 'beli', type: 'int' },
                    { name: 'jual', type: 'int' },


                ],
                id: 'id',
                url: DREAM_FACTORY_URL+ "/_proc/fetchNasabah",
                root: 'record'

            };


        var dataAdapter = new $.jqx.dataAdapter(source, {
            beforeSend: function (request) {

                request.setRequestHeader("X-DreamFactory-API-Key", "036005e85349258dd2404c2b00a550f7fcc558bdb3d07fd0a39f97d78df6873d");



            }
        });


        //console.log($rootScope.globals);

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

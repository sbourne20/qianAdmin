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
                    'X-DreamFactory-API-Key':"c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4"
                   // 'X-DreamFactory-Session-Token':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlNGE1Y2RjNzViNTQ3NzVmYzRhNDM1OWM3ODBlYzAwMyIsImlzcyI6Imh0dHBzOi8vMTkyLjE2OC44LjQ4L2FwaS92Mi9zeXN0ZW0vYWRtaW4vc2Vzc2lvbiIsImlhdCI6MTUzOTQ0NjU5MiwiZXhwIjoxNTM5NDUwMTkyLCJuYmYiOjE1Mzk0NDY1OTIsImp0aSI6IjkwSlBJUGZ0NXFNMmpQMFciLCJ1c2VyX2lkIjoxLCJmb3JldmVyIjpmYWxzZX0.YBsMx6vz6FkVx-r_soK3f65SCv4hbbVFMGeWf_i83mc"
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
                    'X-DreamFactory-API-Key':'c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4'
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
                    'X-DreamFactory-API-Key':"752e4202cbee2b3626493ee452deeeefc1a791d53d9c5c01adf2d9fd222efcd3"
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
                            'X-DreamFactory-API-Key':"c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4"
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
                            'X-DreamFactory-API-Key':'c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4'
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
                request.setRequestHeader("X-DreamFactory-API-Key", "c44b6fd31135e76ee2cdfbf5cfb95d63152a89952af9fe697d9b7e72a556f7c4");

                
                //autoBind : true

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

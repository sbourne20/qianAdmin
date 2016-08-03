(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('nasabahService', nasabahService);

    nasabahService.$inject = ['$http','DREAM_FACTORY_URL'];

    function nasabahService($http, DREAM_FACTORY_URL,rateService) {
        var service = {};

        service.initData = initData;
        service.addedit = addedit;
        service.deleteData = deleteData;
        service.fetchNasab = fetchNasab;
        service.saveNasab = saveNasab;
        return service;

        function saveNasab(dataNasabah, mode){
            if (mode=='Edit'){
                var url = DREAM_FACTORY_URL + '/nasab?ids='+dataNasabah.id;

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
                };


            }

            return $http({
                method: "PATCH",
                url: url,
                headers: {
                    'X-DreamFactory-Application-Name': "myapp"
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
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
                    'X-DreamFactory-Application-Name': "myapp"
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
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
                    'X-DreamFactory-Application-Name': "myapp"
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
                            'X-DreamFactory-Application-Name': "myapp"
                        },
                        data: data


                    }).then(handleSuccess, handleError('Error updating data'));

        }



        function initData(){

            var source =
            {
                datatype: "json",
                type : "GET",
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
                root: 'record',
                updaterow: function (rowid, rowdata, commit) {


                }

            };



        var dataAdapter = new $.jqx.dataAdapter(source, {
            beforeSend: function (request) {
                request.setRequestHeader("X-DreamFactory-Application-Name", "myapp");
                autoBind : true

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

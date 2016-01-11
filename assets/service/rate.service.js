(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('rateService', rateService);

    rateService.$inject = ['$http','DREAM_FACTORY_URL'];

    function rateService($http, DREAM_FACTORY_URL) {
        var service = {};

        service.initData = initData;
        service.addedit = addedit;
        service.publishRate = publishRate;
        service.fetchTRXRate = fetchTRXRate;
        service.fetchTRXRateJB = fetchTRXRateJB;
        service.fetchTRXRate2 = fetchTRXRate2;
        service.fetchTRXRate3 = fetchTRXRate3;
        //service.deleteData = deleteData;

        return service;
        /*
        function deleteData(uid){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/currency?ids='+uid;
            data = {

                "record": [
                    {
                        "nstatus": "DELETE"

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
        }*/

        function publishRate(){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/_proc/publishRate'
            data = {
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

        function addedit(aemethod, rowid, rowdata){
            var url = "";

            if (aemethod == 'POST') {
                var data = {};
                url = DREAM_FACTORY_URL + '/_proc/insert_currency'
                data = {
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    }
                };
            }
            else
            {
                //console.log (rowdata);
                url = DREAM_FACTORY_URL + '/rates?ids='+rowdata.nid;
                data = {

                    "record": [
                        {
                            "stamp_dt" : rowdata.nstampdt,
                            "stats_edit" : rowdata.stats_edit,
                            "price_sell" : rowdata.nprice_sell,
                            "price_buy" : rowdata.nprice_buy
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

        function fetchTRXRate(jenis,curid){
            if (jenis = 'xa') {
                var source =
                {
                    datatype: "json",
                    type: "GET",
                    data: {
                        "params": [
                            {
                                "name": "nid",
                                "param_type": "IN",
                                "value": jenis
                            },
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
                        "wrapper": "record"
                    },
                    datafields: [
                        {name: 'id'},
                        {name: 'stamp_dt'},
                        {name: 'curname'},
                        {name: 'price_buy', type: 'int'},
                        {name: 'price_sell', type: 'int'},
                        {name: 'currency_id', type: 'int'}

                    ],
                    id: 'id',
                    url: DREAM_FACTORY_URL + "/_proc/fetchRates",
                    root: 'record',
                    updaterow: function (rowid, rowdata, commit) {
                        //console.log ("haha " + rowdata.uid);
                        addedit('PATCH', rowid, rowdata);
                        commit(true);
                    }

                };

                var dataAdapter = new $.jqx.dataAdapter(source, {
                    beforeSend: function (request) {
                        request.setRequestHeader("X-DreamFactory-Application-Name", "myapp");


                    }
                });

                return dataAdapter;
            } else if (jenis="xa2"){
                var url = DREAM_FACTORY_URL + "/_proc/fetchRates";
                var data = {
                    "params": [
                        {
                            "name": "nid",
                            "param_type": "IN",
                            "value": "xa"
                        },
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
                    "wrapper": "record"
                };




                return $http({
                    method: aemethod,
                    url: url,
                    headers: {
                        'X-DreamFactory-Application-Name': "myapp"
                    },
                    data: data


                }).then(handleSuccess, handleError('Error updating data'));
            } else {
                var url = DREAM_FACTORY_URL + "/_proc/fetchRates";
                var data = {
                        "params": [
                            {
                                "name": "nid",
                                "param_type": "IN",
                                "value": jenis
                            },
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
                        "wrapper": "record"
                };




            return $http({
                method: aemethod,
                url: url,
                headers: {
                    'X-DreamFactory-Application-Name': "myapp"
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));

            }
        }

        function fetchTRXRate2(){

                var url = DREAM_FACTORY_URL + "/_proc/fetchRates";
                var data = {
                    "params": [
                        {
                            "name": "nid",
                            "param_type": "IN",
                            "value": "xapecahan"
                        },
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
                    "wrapper": "record"
                };




                return $http({
                    method: "POST",
                    url: url,
                    headers: {
                        'X-DreamFactory-Application-Name': "myapp"
                    },
                    data: data


                }).then(handleSuccessData, handleError('Error updating data'));

        }

        function fetchTRXRate3(){

            var url = DREAM_FACTORY_URL + "/_proc/fetchRates";
            var data = {
                "params": [
                    {
                        "name": "nid",
                        "param_type": "IN",
                        "value": "xapecahan2"
                    },
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
                "wrapper": "record"
            };




            return $http({
                method: "POST",
                url: url,
                headers: {
                    'X-DreamFactory-Application-Name': "myapp"
                },
                data: data


            }).then(handleSuccessData, handleError('Error updating data'));

        }

        function fetchTRXRateJB(jenis,curid){

                var url = DREAM_FACTORY_URL + "/_proc/fetchRates";
                var data = {
                    "params": [
                        {
                            "name": "nid",
                            "param_type": "IN",
                            "value": jenis
                        },
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
                    "wrapper": "record"
                };




                return $http({
                    method: "POST",
                    url: url,
                    headers: {
                        'X-DreamFactory-Application-Name': "myapp"
                    },
                    data: data


                }).then(handleSuccessData, handleError('Error updating data'));
        }

        function initData(){


            var statusData = [
                { value: "ACTIVE", label: "ACTV & PBLSH" },
                { value: "ACTIVEN", label: "ACTV & NOT PBLSH" }

            ];
            var statusSource =
            {
                datatype: "array",
                datafields: [
                    { name: 'label', type: 'string' },
                    { name: 'value', type: 'string' }
                ],
                localdata: statusData
            };
            var statusAdapter = new $.jqx.dataAdapter(statusSource, {
                autoBind: true
            });

            var source =
            {
                datatype: "json",
                type : "GET",

                datafields: [
                    { name: 'stamp_dt' },
                    { name: 'curname' },
                    { name: 'price_buy', type: 'int' },
                    { name: 'price_sell', type: 'int'},
                    { name: 'nid', type: 'int'},
                    { name: 'nstampdt' },
                    { name: 'stats_edit'},
                    { name: 'nprice_buy' , type: 'int'},
                    { name: 'nprice_sell', type: 'int'},
                    { name: 'currency_id', type: 'int'},
                    { name: 'stats_edit_str'},


                ],
                id: 'id',
                url: DREAM_FACTORY_URL+ "/_proc/retrieveAdminRates",
                root: 'record',
                updaterow: function (rowid, rowdata, commit) {
                    //console.log ("haha " + rowdata.uid);
                    addedit('PATCH',rowid, rowdata);
                    commit(true);
                }

            };

            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                    request.setRequestHeader("X-DreamFactory-Application-Name", "myapp");


                }
            });
            var cellclass1 = function (row, columnfield, value) {
                    return "noeditedCell";
            }

            var setEditableCells = function(row, datafield, columntype) {
                var xstatus = $('#jqxgrid').jqxGrid('getcellvalue', row, "nstampdt");
                //console.log (xstatus);
                if (xstatus==null){
                    return false;
                } else{
                    return true;
                }

            }


            $("#jqxgrid").jqxGrid(
                {
                    width: "100%",
                    source: dataAdapter,
                    columnsresize: true,
                    editable: true,
                    selectionmode: 'multiplecellsadvanced',
                    editmode: 'click',
                    columns: [
                        { text: 'Mata Uang', dataField: 'curname', width: 100, editable:false },
                        { text: 'Tanggal/Jam Updt Trkhr', dataField: 'stamp_dt', width: 150, cellclassname: cellclass1, editable:false },
                        { text: 'Jual Terakhir', dataField: 'price_sell', width: 80 , editable:false,  cellclassname: cellclass1,cellsformat: 'd', cellsalign: 'right'},
                        { text: 'Beli Terakhir', dataField: 'price_buy', width: 80, editable:false ,  cellclassname: cellclass1,cellsformat: 'd', cellsalign: 'right'},
                        { text: 'Tanggal/Jam', dataField: 'nstampdt', width: 150, cellbeginedit : setEditableCells},
                        { text: 'Status', dataField: 'stats_edit', displayField:'stats_edit_str', width: 150, cellbeginedit : setEditableCells,
                          columntype:'combobox',
                                createeditor: function (row, value, editor) {
                                editor.jqxComboBox({ source: statusAdapter, displayMember: 'label', valueMember: 'value' });
                            }
                        },
                        { text: 'Jual', dataField: 'nprice_sell', width: 80, cellsformat: 'd', cellsalign: 'right', cellbeginedit : setEditableCells },
                        { text: 'Beli',dataField: 'nprice_buy', width: 80, cellsformat: 'd', cellsalign: 'right', cellbeginedit : setEditableCells}

                    ]
                });


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

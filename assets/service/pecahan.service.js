(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('pecahanService', pecahanService);

    pecahanService.$inject = ['$http','DREAM_FACTORY_URL', 'rateService','$rootScope'];

    function pecahanService($http, DREAM_FACTORY_URL,rateService,$rootScope) {
        var service = {};

        service.initData = initData;
        service.addedit = addedit;
        service.deleteData = deleteData;
        service.pecahanDataAdapter = pecahanDataAdapter;
        return service;

        var TRXRate = {};

        function deleteData(uid){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/_table/pecahan?ids='+uid;
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
                    'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
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
                        "wrapper": "resource"
                    };
            }
            else
            {
                //console.log (rowdata);
                url = DREAM_FACTORY_URL + '/_table/pecahan?ids='+rowdata.id;
                data = {

                    "resource": [
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
                    "wrapper": "resource"
                };

            }


                return $http({
                        method: aemethod,
                        url: url,
                        headers: {
                            'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                            'X-DreamFactory-Session-Token':$rootScope.globals.token
                        },
                        data: data


                    }).then(handleSuccess, handleError('Error updating data'));

        }

        function pecahanDataAdapter(xid){
            if (xid == "all"){
                var source =
                {
                    datatype: "json",
                    type : "GET",
                    data : {
                        "params": [
                            {
                                "name": "currencid",
                                "param_type": "IN",
                                "value": "0"
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
                        { name: 'id' },
                        { name: 'currency_id' },
                        { name: 'pecahan' }

                    ],
                    id: 'id',
                    url: DREAM_FACTORY_URL+ "/_proc/fetchPecahan",
                    root: 'resource',
                    updaterow: function (rowid, rowdata, commit) {

                        addedit('PATCH',rowid, rowdata);
                        commit(true);
                    }

                };


            } else {
                var source =
                {
                    datatype: "json",
                    type : "GET",
                    data : {
                        "params": [
                            {
                                "name": "currencid",
                                "param_type": "IN",
                                "value": xid
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
                        { name: 'id' },
                        { name: 'currency_id' },
                        { name: 'pecahan' }

                    ],
                    id: 'id',
                    url: DREAM_FACTORY_URL+ "/_proc/fetchPecahan",
                    root: 'resource',
                    updaterow: function (rowid, rowdata, commit) {

                        addedit('PATCH',rowid, rowdata);
                        commit(true);
                    }

                };
            }


            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                   request.setRequestHeader("X-DreamFactory-API-Key", "3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d");
                   request.setRequestHeader("X-DreamFactory-Session-Token", $rootScope.globals["currentUser"].token);
                autoBind : true

                }
            });
            return dataAdapter;

        }

        function initData(){


            rateService.fetchTRXRate3()
                .then (function(result){
                    TRXRate = result.data.record;

                JSON.stringify(TRXRate);

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
                    source: pecahanDataAdapter('all'),
                    columnsresize: true,
                    editable: true,
                    filterable: true,
                    sortable: true,
                    selectionmode: 'multiplecellsadvanced',
                    editmode: 'click',
                    columns: [
                        { text: 'Mata Uang', dataField: 'currency_id', width: 100, displayfield:'curname', columntype: 'combobox',
                            createeditor: function (row, value, editor) {
                                //editor.jqxComboBox({ source: dataAdapterCurrency, displayMember: 'curname', valueMember: 'id' });
                                editor.jqxComboBox({ source: TRXRate, displayMember: 'curname', valueMember: 'currency_id' });
                            }
                        },
                        { text: 'Pecahan', dataField: 'pecahan', width: 150 },

                    ]
                });


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

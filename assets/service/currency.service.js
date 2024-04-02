(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('currencyService', currencyService);

    currencyService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];

    function currencyService($http, DREAM_FACTORY_URL,$rootScope) {
        var service = {};
        //$http.defaults.headers.common['X-DreamFactory-Application-Name'] = 'MetronicApp'; //default header for X-DreamFactory-Application-Name

        service.initDataCurrency = initDataCurrency;
        service.addedit = addedit;
        service.deleteData = deleteData;
        service.currencyDataAdapter = currencyDataAdapter;

        return service;

        function deleteData(uid){
            var url = "";
            var data = {};

            url = DREAM_FACTORY_URL + '/_table/currency?ids='+uid;
            data = {

                "resource": [
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
                    'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                    'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating currency'));
        }

        function addedit(aemethod, rowid, rowdata){
            var url = "";
            var data = {};

            if (rowid==0) {

                url = DREAM_FACTORY_URL + '/_table/currency';
                data = {
                    "resource": [
                        {
                            "nstatus": "ACTIVE"
                        }

                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "record"
                }
            } else {
                url = DREAM_FACTORY_URL + '/_table/currency?ids='+rowdata.uid;
                data = {

                    "resource": [
                        {
                            "curname": rowdata.curname,
                            "description": rowdata.description
                        }

                    ],
                    "schema": {
                        "STATUS": "varchar",
                        "ERROR_CODE": "varchar",
                        "MESSAGE": "varchar"
                    },
                    "wrapper": "resource"
                };

            }

            return  $http({
                method: aemethod,
                url: url,
                headers: {
                   'X-DreamFactory-API-Key':"3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d",
                                       'X-DreamFactory-Session-Token':$rootScope.globals.token
                },
                data: data


            }).then(handleSuccess, handleError('Error updating data'));
        }


        function currencyDataAdapter(){
            var source =
            {
                datatype: "json",
                type : "GET",

                datafields: [
                    { name: 'id' },
                    { name: 'curname' },
                    { name: 'description' },
                    { name: 'status'}

                ],
                id: 'id',
                url: DREAM_FACTORY_URL+ "/_table/currency?filter=nstatus=ACTIVE&order=curname",
                root: 'resource',

                updaterow: function (rowid, rowdata, commit) {
                    //console.log (rowdata.uid);
                    addedit('PATCH',rowid, rowdata);
                    commit(true);
                }
            };
            console.log ($rootScope.globals["currentUser"].token);
            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                    request.setRequestHeader("X-DreamFactory-API-Key", "3c18400b8622ef7b1e31279152f87c535e7465e2740f373ae7f1611523e12a4d");
                request.setRequestHeader("X-DreamFactory-Session-Token", $rootScope.globals["currentUser"].token);

                }
            });

            return dataAdapter;
        }

        function initDataCurrency(){

            $("#jqxgrid").jqxGrid(
                {
                    width: "100%",
                    source: currencyDataAdapter(),
                    columnsresize: true,
                    editable: true,
                    selectionmode: 'singlecell',
                    editmode: 'click',
                    columns: [
                        { text: 'Mata Uang', dataField: 'curname', width: 100 },
                        { text: 'Deskripsi', dataField: 'description', width: 200 },
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

(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .factory('akunService', akunService);

    akunService.$inject = ['$http','DREAM_FACTORY_URL','$rootScope'];

    function akunService($http, DREAM_FACTORY_URL,$rootScope) {
        var service = {};
        $http.defaults.headers.common['X-DreamFactory-Application-Name'] = 'MetronicApp'; //default header for X-DreamFactory-Application-Name

        service.initData = initData;
        service.addedit = addedit;

        service.deleteData = deleteData;

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
                     'X-DreamFactory-API-Key':"5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8",
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
                             'X-DreamFactory-API-Key':"5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8",
                                                'X-DreamFactory-Session-Token':$rootScope.globals.token
                        },
                        data: data


                    }).then(handleSuccess, handleError('Error updating data'));

        }

        function initData(){




            var source =
            {
                datatype: "json",
                type : "GET",

                datafields: [
                    { name: 'akun_code' },
                    { name: 'akun_group' },
                    { name: 'akun_name' }

                ],
                id: 'id',
                url: DREAM_FACTORY_URL+ "/_table/akun?filter=stats%3D'ACTIVE'&order=akun_code",
                root: 'resource',
                updaterow: function (rowid, rowdata, commit) {

                    addedit('PATCH',rowid, rowdata);
                    commit(true);
                }

            };

            var dataAdapter = new $.jqx.dataAdapter(source, {
                beforeSend: function (request) {
                    request.setRequestHeader("X-DreamFactory-API-Key", "5338c1dff5dcf11a64a01b6dccdc8cd5b8c5bc625070e3029574e51fd845ded8");
                                    request.setRequestHeader("X-DreamFactory-Session-Token", $rootScope.globals["currentUser"].token);


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
                        { text: 'Akun ID', dataField: 'akun_code', width: 150 },
                        { text: 'Akun Group', dataField: 'akun_group', width: 100 },
                        { text: 'Akun Name', dataField: 'akun_name', width: 300 },

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

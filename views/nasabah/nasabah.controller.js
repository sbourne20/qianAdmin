(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .controller('nasabahController', nasabahController);

    nasabahController.$inject = ['$rootScope','$location','$window','$scope','nasabahService','AuthenticationService','$modal'];
    function nasabahController($rootScope, $location, $window, $scope, nasabahService, AuthenticationService, $modal) {



        var vm = this;
        vm.test = test;

        
        vm.user = [];
        $scope.obj = {};


        initController();

        function initController() {

            $("#jqxgrid").jqxGrid(
                {
                    width: "100%",
                    source: nasabahService.initData(),
                    columnsresize: true,
                    filterable: true,
                    sortable: true,
                    //selectionmode: 'singlerow',
                    selectionmode: 'singlerow',
                    columns: [
                        { text: 'Jenis', dataField: 'jenis', width: 80 },
                        { text: 'ID Type', dataField: 'idtype', width: 80 },
                        { text: 'ID Nasabah', dataField: 'idnasabah', width: 80 },
                        { text: 'Nama', dataField: 'nama', width: 150 },
                        { text: 'Beli', dataField: 'beli', width: 100, cellsformat: 'd', cellsalign: 'right' },
                        { text: 'Jual', dataField: 'jual', width: 100, cellsformat: 'd', cellsalign: 'right' },
                        { text: 'Alamat', dataField: 'alamat', width: 200 },
                        { text: 'Negara', dataField: 'negara', width: 80 },
                        { text: 'Phone', dataField: 'phone', width: 80 },
                        { text: 'Notes', dataField: 'notes', width: 80 },


                    ]
                });

            $("#jqxgrid").on("rowdoubleclick", function (event) {
                var args = event.args;
                //nasabahService.test();
                
                nasabahService.fetchNasab(args.row.bounddata.idnasabah)
                    .then(function (result) {
                        //console.log (result);
                        var trxhnasab = result.data[0];
                        //console.log("here");
                        var modalInstance = $modal.open({
                            templateUrl: './views/nasabah/nasabah.mdl.html',
                            windowClass: 'app-modal-window',
                            controller: "nasabahWinController",
                            resolve: {
                                trxnasabah: function () {
                                    return trxhnasab;
                                }
                            }
                        });
                    });
            });

        }

        $scope.refreshData = function (id) {
            $('#jqxgrid').jqxGrid('updatebounddata');
        }

        $scope.addData = function (id) {
            var modalInstance = $modal.open({
                templateUrl: './views/nasabah/nasabah.mdl.html',
                windowClass: 'app-modal-window',
                controller: "nasabahWinController",
                resolve: {
                }
            });
        }



        $scope.deleteData = function (id) {
            var selcell = $("#jqxgrid").jqxGrid('getselectedcell');
           // var valueId = $('#jqxgrid').jqxGrid('getcellvalue', selcell.rowindex, 'uid');
            console.log(selcell);
            /*  if (pecahanService.deleteData(valueId)) {
                  setTimeout(function() {
                      $('#jqxgrid').jqxGrid('updatebounddata')
                  },500);
   
                  */
        }

        function test(){
            vm.dataLoading = true;
            //AuthenticationService.test();           
            nasabahService.test();
        }

        $scope.printID = function (id) {

            var selcell = $("#jqxgrid").jqxGrid('getselectedrowindex');
            var valueId = $('#jqxgrid').jqxGrid('getcellvalue', selcell, 'id');
            
            

        }

    }

    })();
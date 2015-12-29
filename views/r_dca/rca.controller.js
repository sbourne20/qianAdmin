(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .controller('rcaController', rcaController);


    rcaController.$inject = [ '$rootScope','$location','$window','$scope','rcaService','$modal'];
    function rcaController( $rootScope,$location,$window,$scope,rcaService,$modal) {

        var vm = this;
        vm.user = [];

        $scope.obj = {};

        initController();



        function initController() {
            var sourceDA = rcaService.initData();


            $("#jqxgrid").jqxGrid(
                {
                    width: "100%",
                    source: sourceDA,
                    columnsresize: true,
                    editable: false,
                    selectionmode: 'singlerow',
                    columns: [
                        { text: 'Mata Uang',  groupable: true, dataField: 'curname', width: 150 },
                        { text: 'Cost Average', dataField: 'costavg', cellsalign: 'right', width: 150, cellsformat: 'd' },

                    ]
                });



        }

        $scope.refreshData = function(){
            $('#jqxgrid').jqxGrid('updatebounddata');
        }

    }

})();

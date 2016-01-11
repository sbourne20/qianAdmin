(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .controller('rsimController', rsimController);


    rsimController.$inject = [ '$rootScope','$location','$window','$scope','rsimService','$modal'];
    function rsimController( $rootScope,$location,$window,$scope,rsimService,$modal) {

        var vm = this;
        vm.user = [];

        $scope.obj = {};

        initController();



        function initController() {
            var sourceDA = rsimService.initData();


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

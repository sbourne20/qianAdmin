(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .controller('rcaController', rcaController);


    rcaController.$inject = [ '$rootScope','$location','$window','$scope','stokService','$modal'];
    function rcaController( $rootScope,$location,$window,$scope,stokService,$modal) {

        var vm = this;
        vm.user = [];

        $scope.obj = {};

        initController();



        function initController() {
            var sourceDA = stokService.initData(0);
            var toThemeProperty = function (className) {
                return className + " " + className + "-";
            }
            var groupsrenderer = function (text, group, expanded, data) {
                if (data.groupcolumn.datafield == 'curname' || data.groupcolumn.datafield == 'qty') {
                    var number = sourceDA.formatNumber(group, data.groupcolumn.cellsformat);
                    var text = data.groupcolumn.text + ': ' + number;
                    if (data.subItems.length > 0) {
                        var aggregate = this.getcolumnaggregateddata('qty', ['sum'], true, data.subItems);
                    }
                    else {
                        var rows = new Array();
                        var getRows = function (group, rows) {
                            if (group.subGroups.length > 0) {
                                for (var i = 0; i < group.subGroups.length; i++) {
                                    getRows(group.subGroups[i], rows);
                                }
                            }
                            else {
                                for (var i = 0; i < group.subItems.length; i++) {
                                    rows.push(group.subItems[i]);
                                }
                            }
                        }
                        getRows(data, rows);
                        var aggregate = this.getcolumnaggregateddata(data.groupcolumn.datafield, ['sum'], true, rows);
                    }

                    return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + text + ', </span>' + '<span class="' + toThemeProperty('jqx-grid-groups-row-details') + '">' + "Total" + ' (' + aggregate.sum + ')' + '</span></div>';
                }
                else {
                    return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + text + '</span>';
                }
            }

            $("#jqxgrid").jqxGrid(
                {
                    width: "100%",
                    source: sourceDA,
                    columnsresize: true,
                    editable: false,
                    selectionmode: 'singlerow',
                    groupable: true,
                    groupsrenderer: groupsrenderer,
                    groups: ['curname'],
                    groupsexpandedbydefault: true,
                    columns: [
                        { text: 'Mata Uang',  groupable: true, dataField: 'curname', width: 150 },
                        { text: 'Pecahan', dataField: 'pecahan', width: 150, cellsformat: 'd' },
                        { text: 'Total Lembar', cellsformat: 'd', dataField: 'jumlahlembar', cellsalign:'right', width: 100 },
                        { text: 'Total Nominal', cellsformat: 'd', dataField: 'qty', cellsalign:'right', width: 100 },

                    ]
                });



        }

        $scope.refreshData = function(){
            $('#jqxgrid').jqxGrid('updatebounddata');
        }

    }

})();

(function () {
    'use strict';

    angular
        .module('MetronicApp')
        .controller('testController', testController);


    testController.$inject = [ '$rootScope','$location','$window','$scope','$modal','$http'];
    function testController( $rootScope,$location,$window,$scope,$modal,$http) {

        var vm = this;
        vm.user = [];

        $scope.obj = {};

        initController();




        function initController() {
          $.getJSON("https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.vip.co.id%22%20and%20xpath%3D'%2F%2Ftable%5B%40id%3D%22rate-table%22%5D'&format=json&callback=", function(result) {
                console.log(result.query.results);
              //$('#container').html(result.query.results);
              //$('#container').html("<h1>test</h1>");
            });

        }


    }

})();

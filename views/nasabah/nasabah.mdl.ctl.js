function nasabahWinController($scope,$modal, $modalInstance, $window,$interval,$http, nasabahService, trxnasabah) {
    $scope.nasabah = trxnasabah;

    if (typeof $scope.nasabah.id!=="undefined") {
        $scope.nasabah.mode = 'Edit';
        showIDCopy();
    }

    function showIDCopy(){
        window.setTimeout(function () {
            if ($scope.nasabah.idcopy!== null) {
                var elem = document.getElementById("fileinput-prev");
                var DOM_img = document.createElement("img");
                DOM_img.setAttribute("id","IMGidcopy");
                var data = btoa($scope.nasabah.idcopy);
                DOM_img.src = "data:image/png;base64," + data;
                elem.appendChild(DOM_img);
            }
        },500);
    }

    $scope.save = function(){
        var elem = document.getElementById("fileinput-prev");
        var f = document.getElementById('file').files[0],
            r = new FileReader();

        if (typeof f!=='undefined') {
            r.onloadend = function (e) {
                if (e.target.result !== null) {
                    $scope.nasabah.idcopy = e.target.result;

                    nasabahService.saveNasab($scope.nasabah, $scope.nasabah.mode)
                        .then (function(result){
                        $modalInstance.dismiss();
                    });
                }
            }
            r.readAsBinaryString(f);
        } else {
            nasabahService.saveNasab($scope.nasabah, $scope.nasabah.mode)
                .then (function(result){
                $modalInstance.dismiss();
            });
        }


    }

    $scope.close = function(){
        $modalInstance.dismiss();
    }

    $scope.onBlur = function(ev){
        var elem = document.getElementById("IMGidcopy");
        if (elem!==null) elem.remove();
        nasabahService.fetchNasab($scope.nasabah.idnasabah)
            .then(function (result) {

                if (result.data.length > 0) {
                    $scope.nasabah = result.data[0];
                    $scope.nasabah.mode = 'Edit';
                    $scope.nasabah.resultbox = "Pencarian ditemukan";
                    showIDCopy();
                } else {
                    var idnasabahlama = $scope.nasabah.idnasabah;
                    $scope.nasabah = {
                        idnasabah : idnasabahlama
                    };
                    $scope.nasabah.mode = 'New';
                    $scope.nasabah.resultbox = "Pencarian tidak ditemukan"
                }
            });


    }


}

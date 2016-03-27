/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("TutorialController", TutorialController);

    TutorialController.$inject = ['$scope', '$rootScope'];

    function TutorialController($scope, $http){
        $scope.run = run;

        function run(userCode) {
            console.log(userCode);
            $http.post("api.hackerrank.com/checker/submission.json -d 'source=print 1&lang=5&testcases=['1']&api_key=07913d61ce2ab2fa56f514dee20af8c36a2c0cf7'")
                .success(function(response){
                    console.log(response);
                })
        }
    }

})();
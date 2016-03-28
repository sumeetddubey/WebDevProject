/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("TutorialController", TutorialController);

    TutorialController.$inject = ['$scope','HackerRankService'];

    function TutorialController($scope, HackerRankService){
        $scope.run = run;
        $scope.showloader = showloader;

        function showloader() {
            $scope.isLoading = true;
        }

        function run(userCode) {
            console.log(userCode.data);
            var code = userCode;
            HackerRankService.sendCode(code)
                .then(
                    function(response) {
                        if (response.data) {
                            $scope.isLoading = false;
                            console.log("in response");
                            console.log("response is " + response.data);
                            $scope.output = response.data;
                        }
                        else{
                            $scope.isLoading = false;
                            console.log("no response");
                        }
                    }

                );
            //TutorialService.sendCode(userCode.data);

            //$http.post("api.hackerrank.com/checker/submission.json -d 'source=print 1&lang=5&testcases=['1']&api_key=07913d61ce2ab2fa56f514dee20af8c36a2c0cf7'")
            //    .success(function(response){
            //        console.log(response);
            //    })
        }

    }

})();
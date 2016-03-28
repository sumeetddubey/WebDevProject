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

        function run(userCode) {
            console.log(userCode.data);
            HackerRankService.sendCode(userCode.data)
                .then(
                    function(response){
                        console.log(response.data);
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
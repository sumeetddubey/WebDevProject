/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("TutorialController", TutorialController);

    TutorialController.$inject = ['$scope', '$mdDialog', 'HackerRankService'];

    function TutorialController($scope, $mdDialog, HackerRankService){
        $scope.run = run;
        $scope.showloader = showloader;
        $scope.openOffscreen = openOffscreen;

        function openOffscreen() {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Hint')
                    .textContent('You hung up your cape and your cowl but you did not move on. ' +
                        'You never went to find a life.')
                    .ariaLabel('Offscreen Demo')
                    .ok('Close')
                    // Or you can specify the rect to do the transition from
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
            );
        };

        function showloader() {
            $scope.isLoading = true;
        }

        function run(userCode) {
            console.log(userCode.data);
            var code = [userCode.data];
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
/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("TutorialController", TutorialController);

    TutorialController.$inject = ['$scope', '$mdDialog', 'HackerRankService', 'TutorialService', '$rootScope'];

    function TutorialController($scope, $mdDialog, HackerRankService, TutorialService, $rootScope){
        $scope.run = run;
        $scope.showloader = showloader;
        $scope.openOffscreen = openOffscreen;

        function initTutorial(){
            var tutorialId = $rootScope.tutorial._id;
            TutorialService.findTutorialById(tutorialId)
                .then(
                    function(response){
                        if(response){
                            $scope.tutorial = response.data;
                            console.log($scope.tutorial);
                        }
                    }
                )
        }

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
            var language = $scope.tutorial.language;
            var testcases = JSON.stringify(["1\n"]);
            console.log(userCode.data);
            var code = [userCode.data];
            HackerRankService.sendCode(code, language, testcases)
                .then(
                    function(response) {
                        if (response.data) {
                            $scope.isLoading = false;
                            console.log(JSON.stringify(response.data));
                            console.log(String(response.data));
                            console.log("response is "+response.data);
                            $scope.output = response.data;
                            if(JSON.stringify(response.data) === testcases){
                                window.alert('correct output');
                            }
                            else{
                                window.alert('wrong output');
                            }
                        }
                        else{
                            $scope.isLoading = false;
                            console.log("no response");
                        }
                    }

                );
        }

        initTutorial();
    }
})();
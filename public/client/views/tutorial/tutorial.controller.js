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
        $scope.nextLesson = nextLesson;
        $scope.link = 'https://www.youtube.com/watch?v=7SWvDHvWXok';

        var count = 0;

        function initTutorial(){
            var tutorialId = $rootScope.tutorial._id;
            TutorialService.findTutorialById(tutorialId)
                .then(
                    function(response){
                        if(response){
                            $scope.tutorial = response.data;
                            $scope.currentLesson = response.data.lessons[count];
                            console.log($scope.currentLesson);
                        }
                    }
                )
        }

        function lessonCounter(tutorial){
            var lessons = tutorial.lessons;
            var len = lessons.length;
            if(count<len){
                count++;
                $scope.currentLesson = tutorial.lessons[count];
            }
        }

        function nextLesson(userCode){
            var code = [userCode.data];
            var language = $scope.tutorial.language;
            var testcases = ["1\n"];
            HackerRankService.sendCode(code, language, testcases)
                .then(
                    function(response){
                        if(response){
                            $scope.output = response.data;
                            $scope.isLoading = false;
                            testcases = JSON.stringify(testcases);
                            var output = JSON.stringify(response.data);
                            console.log(testcases);
                            console.log(output);
                            if(testcases == output){
                                lessonCounter($scope.tutorial);
                                console.log(count);
                                console.log($scope.currentLesson);
                                $scope.userCode.data = '';
                                $scope.output = '';
                            }
                            else{
                                console.log('wrong output');
                            }
                        }
                    }
                )
        }

        function openOffscreen() {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Hint')
                    .textContent($scope.currentLesson.hints)
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
                            $scope.output = response.data;
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
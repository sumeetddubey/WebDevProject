/**
 * Created by sumeetdubey on 4/16/16.
 */
(function(){
    var app = angular.module('codingTutorial');
    app.controller('TutorialListController', TutorialListController);

    function TutorialListController($scope, $location, TutorialService, $rootScope){

        $scope.openTutorial = openTutorial;
        //$scope.openLesson = openLesson;

        var tutorials = {};
        TutorialService.findAllTutorials()
            .then(
                function(response){
                    if(response){
                        console.log(response.data);
                        $scope.tutorials = response.data;
                    }
                }
            );

        function openTutorial(tutorial){
            var tutorialId = tutorial._id;
            TutorialService.findTutorialById(tutorialId)
                .then(
                    function(response){
                        if(response){
                            $rootScope.tutorial = response.data;
                            $location.url('/tutorial');
                        }
                    }
                )
        }
    }
})();
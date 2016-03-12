/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("DmTutorialController", DmTutorialController);

    function DmTutorialController($scope, TutorialService, $route, $location){
        $scope.addTutorial = addTutorial;
        $scope.selectTutorial = selectTutorial;
        $scope.updateTutorial = updateTutorial;
        $scope.deleteTutorial = deleteTutorial;

        function findTutorials(){
            function render(response){
                $scope.tutorials = response;
            }

            TutorialService.findAllTutorials(render);
        }

        findTutorials();

        function addTutorial(newTutorial){
            function render(response){
                console.log(response);
                $location.url("/dm-tutorial");
                $route.reload();
            }

            if(newTutorial) {
                TutorialService.createTutorial(newTutorial, render)
            }
            else{
                $location.url("/dm-tutorial");
            }
        }

        function updateTutorial(tutorial){
            if(tutorial) {
                TutorialService.updateTutorialById($scope.selectedTutorialId, $scope.tutorial, render);

                function render(response) {
                    console.log(response);
                    $location.url("/dm-tutorial");
                    $route.reload();
                }
            }

        }

        function deleteTutorial(tutorial){
            TutorialService.deleteTutorialById(tutorial._id, render);

            function render(response){
                console.log(response);
                $location.url("/dm-tutorial");
                $route.reload();
            }
        }

        function selectTutorial(tutorial){
            console.log(tutorial);
            $scope.selectedTutorialId = tutorial._id;
            $scope.tutorial = {
                "name": tutorial.name,
                "language": tutorial.language,
                "lessons": tutorial.lessons,
                "author": tutorial.author
            };
        }
    }

})();
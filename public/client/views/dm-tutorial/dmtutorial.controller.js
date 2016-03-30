/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("DmTutorialController", DmTutorialController);

    function DmTutorialController($scope, TutorialService, $location){
        $scope.addTutorial = addTutorial;
        $scope.selectTutorial = selectTutorial;
        $scope.updateTutorial = updateTutorial;
        $scope.deleteTutorial = deleteTutorial;

        function findTutorials(){
            //function render(response){
            //    $scope.tutorials = response;
            //}

            TutorialService.findAllTutorials()
                .then(
                    function(response){
                        if(response.data){
                            console.log(response.data);
                            $scope.tutorials = response.data;
                        }
                    }
                )
        }

        findTutorials();

        function addTutorial(newTutorial){
            //function render(response){
            //    console.log(response);
            //    $location.url("/dm-tutorial");
            //    $route.reload();
            //}

            if(newTutorial) {
                TutorialService.createTutorial(newTutorial)
                    .then(
                        function(response){
                            if(response.data){
                                console.log(response.data);
                                $scope.tutorials = response.data;
                            }
                        }
                    )
            }
            else{
                $location.url("/dm-tutorial");
            }
        }

        function updateTutorial(tutorial){
            if(tutorial) {
                TutorialService.updateTutorial($scope.selectedTutorialId, $scope.tutorial)
                    .then(
                        function(response){
                            if(response){
                                console.log(response.data);
                                $scope.tutorials = response.data;
                            }
                        }
                    );

                //function render(response) {
                //    console.log(response);
                //    $location.url("/dm-tutorial");
                //    $route.reload();
                //}
            }

        }

        function deleteTutorial(tutorial){
            TutorialService.deleteTutorial(tutorial._id)
                .then(
                    function(response){
                        if(response.data){
                            console.log(response.data);
                            $scope.tutorials = response.data;
                        }
                    }
                );

            //function render(response){
            //    console.log(response);
            //    $location.url("/dm-tutorial");
            //    $route.reload();
            //}
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
/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("TutorialMakerController", TutorialMakerController);

    TutorialMakerController.$inject = ['$scope', '$rootScope', 'TutorialService', '$location'];

    function TutorialMakerController($scope, $rootScope, TutorialService, $location){

        $scope.createTutorial = createTutorial;

        var currentUser = $rootScope.currentUser;

        $scope.languages = [
            "Python",
            "JavaScript",
            "Ruby",
            "Java",
            "C++"
        ];

        // transfer to display view
        //function findAllTutorials(){
        //    TutorialService.findAllTutorials()
        //        .then(
        //            function(response){
        //                if(response){
        //                    $scope.tutorials = response.data;
        //                }
        //            }
        //        )
        //}

        function findTutorialsByUserId(){
            var userId = $rootScope.currentUser._id;
            TutorialService.findTutorialsByUserId(userId)
                .then(
                    function(response){
                        if(response){
                            $rootScope.tutorial = response.data;
                            $scope.userTutorials = response.data;
                        }
                    }
                )
        }

        function createTutorial(tutorial){
            console.log("in client create");
            console.log(currentUser);
            console.log(tutorial);
            if(currentUser && tutorial){
                console.log('here');
                TutorialService.createTutorial(tutorial)
                    .then(
                        function(response){
                            if(response){
                                $rootScope.tutorial = response.data;
                                $scope.userTutorials = response.data;
                                console.log(response.data);
                                $location.url('/lesson-maker');
                            }
                        }
                    )
            }
        }

        function updateTutorial(tutorial){
            if(tutorial){
                TutorialService.updateTutorial(tutorial)
                    .then(
                        function(response){
                            if(response){
                                $scope.userTutorials = response.data;
                            }
                        }
                    )
            }
        }

        function deleteTutorial(tutorial){
            if(tutorial){
                TutorialService.deleteTutorial(tutorial)
                    .then(
                        function(response){
                            if(response){
                                findAllTutorials();
                            }
                        }
                    )
            }
        }


    }

})();
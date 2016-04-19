/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, TutorialService) {

        var tutorials = {};
        //var image = $flow.files[0];
        //console.log(image);
        //$scope.codeLevel = 70;
        //
        if ($rootScope.currentUser) {
            $scope.currentUser = $rootScope.currentUser;
            //if($scope.currentUser.photo === ""){
            //    $scope.currentUser.photo = "http://placehold.it/200x200";
            //}
            $scope.username = $rootScope.currentUser.username;
            //console.log(currentUser.photo);
        }
        else {
            $location.url("/home");
        }

        $scope.openTutorial = openTutorial;
        $scope.edit = edit;

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

        function edit(user){
            console.log(user.pic);
        }
    }


})();
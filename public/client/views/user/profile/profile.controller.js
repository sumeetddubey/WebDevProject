/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, TutorialService) {

        var vm = this;
        var tutorials = {};

        if ($rootScope.currentUser) {
            vm.currentUser = $rootScope.currentUser;
            //if(vm.currentUser.photo === ""){
            //    vm.currentUser.photo = "http://placehold.it/200x200";
            //}
            vm.username = $rootScope.currentUser.username;
            //console.log(currentUser.photo);
        }
        else {
            $location.url("/home");
        }

        vm.openTutorial = openTutorial;
        vm.edit = edit;

        TutorialService.findAllTutorials()
            .then(
                function(response){
                    if(response){
                        console.log(response.data);
                        vm.tutorials = response.data;
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
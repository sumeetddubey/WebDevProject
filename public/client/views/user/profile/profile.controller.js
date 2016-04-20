/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, $mdToast, TutorialService) {

        var vm = this;
        var tutorials = {};

        vm.showSimpleToast = showSimpleToast;

        function showSimpleToast(message, parentId) {

            var el = angular.element(document.getElementById(parentId));

            var toast = $mdToast.simple()
                .content(message)
                .action('OK')
                .highlightAction(true)
                .hideDelay(0)
                .position('bottom right')
                .parent(el);
            $mdToast.show(toast);
            // Could also do $mdToast.showSimple('Hello');
        }

        //function showSimpleToast() {
        //    $mdToast.show({
        //        hideDelay   : 3000,
        //        position    : 'top right',
        //        controller  : 'ToastCtrl'
        //    });
        //}

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
            UserService.updateUserById(user._id, user)
                .then(
                    function(response){
                        if(response){
                            $rootScope.currentUser = response.data;
                            vm.currentUser = response.data;
                        }
                    }
                )
        }
    }


})();
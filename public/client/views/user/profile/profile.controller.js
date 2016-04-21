/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, $mdToast, UserService, TutorialService, $localStorage) {

        var vm = this;
        var tutorials = {};

        vm.showSimpleToast = showSimpleToast;

        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        vm.toastPosition = angular.extend({},last);
        vm.getToastPosition = function() {
            sanitizePosition();
            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        };
        function sanitizePosition() {
            var current = vm.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }

        function showSimpleToast(message, parentId) {
            var pinTo = vm.getToastPosition();
            var el = angular.element(document.getElementById(parentId));
            var toast = $mdToast.simple()
                .content(message)
                .hideDelay(3000)
                .position(pinTo)
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
                            $localStorage.currentTutorial = response.data;
                            $localStorage.lessonCount = 0;
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
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
        vm.tutorialLang = displayLangIcon;

        function showSimpleToast(message, parentId) {
            var el = angular.element(document.getElementById(parentId));

            var toast = $mdToast.simple()
                .content(message)
                .hideDelay(3000)
                .position('bottom right')
                .parent(el);
            $mdToast.show(toast);
        }

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

        function displayLangIcon(tutorial){
            var lang = tutorial.language;
            if(lang === "C++"){
                console.log("in display lang icon");
                return "devicon-cplusplus-plain";
            }
            else if(lang === "Java"){
                console.log("in display lang icon");
                return "devicon-java-plain";
            }
            else if(lang === "Python"){
                console.log("in display lang icon");
                return "devicon-python-plain";
            }
            else if(lang === "JavaScript"){
                console.log("in display lang icon");
                return "devicon-javascript-plain";
            }
            else if(lang === "Ruby"){
                console.log("in display lang icon");
                return "devicon-ruby-plain";
            }
        }
    }


})();
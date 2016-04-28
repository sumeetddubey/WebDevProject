/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, $mdToast, UserService, TutorialService, $localStorage) {

        var vm = this;

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
            vm.username = $rootScope.currentUser.username;
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
                return "devicon-cplusplus-plain";
            }
            else if(lang === "Java"){
                return "devicon-java-plain";
            }
            else if(lang === "Python"){
                return "devicon-python-plain";
            }
            else if(lang === "JavaScript"){
                return "devicon-javascript-plain";
            }
            else if(lang === "Ruby"){
                return "devicon-ruby-plain";
            }
        }
    }


})();
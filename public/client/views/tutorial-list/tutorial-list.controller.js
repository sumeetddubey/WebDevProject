/**
 * Created by sumeetdubey on 4/16/16.
 */
(function(){
    var app = angular.module('codingTutorial');
    app.controller('TutorialListController', TutorialListController);

    function TutorialListController($location, TutorialService, $localStorage){
        var vm = this;

        //instances for methods
        vm.openTutorial = openTutorial;
        vm.tutorialLang = displayLangIcon;

        var tutorials = {};
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

                            var lang = $localStorage.currentTutorial.language;
                            $localStorage.tutorialLang = lang.toLowerCase();
                            $location.url('/tutorial');
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
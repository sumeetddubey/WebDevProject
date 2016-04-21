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
        //$scope.openLesson = openLesson;

        var tutorials = {};
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
                            console.log(response.data);
                            $localStorage.currentTutorial = response.data;
                            $localStorage.lessonCount = 0;

                            var lang = $localStorage.currentTutorial.language;
                            $localStorage.tutorialLang = lang.toLowerCase();
                            $location.url('/tutorial');
                        }
                    }
                )
        }
    }
})();
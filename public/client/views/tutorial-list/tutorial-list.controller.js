/**
 * Created by sumeetdubey on 4/16/16.
 */
(function(){
    var app = angular.module('codingTutorial');
    app.controller('TutorialListController', TutorialListController);

    function TutorialListController($location, TutorialService, $rootScope){
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
                            $rootScope.tutorial = response.data;
                            var lang = $rootScope.tutorial.language;
                            $rootScope.tutorialLang = lang.toLowerCase();
                            $location.url('/tutorial');
                        }
                    }
                )
        }
    }
})();
/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("TutorialMakerController", TutorialMakerController);

    TutorialMakerController.$inject = ['$rootScope', 'TutorialService', '$location', 'LessonService', '$route', '$localStorage'];

    function TutorialMakerController($rootScope, TutorialService, $location, LessonService, $route, $localStorage){

        var vm = this;
        
        vm.createTutorial = createTutorial;
        vm.updateTutorial = updateTutorial;
        vm.deleteTutorial = deleteTutorial;
        vm.openTutorialEditor = openTutorialEditor;
        vm.openLessonEditor = openLessonEditor;
        vm.findAllLessonsForTutorial = findAllLessonsForTutorial;

        vm.languages = [
            "Python",
            "JavaScript",
            "Ruby",
            "Java",
            "C++"
        ];

        vm.selectedDirection = 'up';
        vm.selectedMode = 'md-fling';
        vm.isOpen = 'false';

        console.log($rootScope.currentUser);
        console.log($rootScope.currentUser._id);
        TutorialService.findTutorialsByUserId($rootScope.currentUser._id)
            .then(
                function(response){
                    if(response){
                        console.log(response.data);
                        vm.tutorials = response.data;
                    }
                }
            );

        function openTutorialEditor(tutorial){
            var tutorialId = tutorial._id;
            TutorialService.findTutorialById(tutorialId)
                .then(
                    function(response){
                        if(response){
                            $localStorage.tutorial = response.data;
                            vm.tutorial = response.data;
                        }
                    }
                )
        }

        function openLessonEditor(lesson){
            if(!lesson){
                $location.url('/lesson-maker');
            }
            else {
                var tutorialId = vm.tutorial._id;
                var lessonId = lesson._id;
                console.log(tutorialId);
                console.log(lessonId);
                LessonService.findLessonById(tutorialId, lessonId)
                    .then(
                        function (response) {
                            if (response) {
                                $localStorage.currentLesson = response.data;
                                $location.url('/lesson-maker');
                            }
                        }
                    )
            }
        }

        function findAllLessonsForTutorial(){
            LessonService.findAllLessonsForTutorial(tutorialId)
                .then(
                    function(response){
                        if(response){
                            vm.lessons = response.data;
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        var currentUser = $rootScope.currentUser;

        vm.languages = [
            "C++",
            "Java",
            "Python",
            "Javascript",
            "Ruby"
        ];

         //transfer to display view
        function findAllTutorials(){
            TutorialService.findAllTutorials()
                .then(
                    function(response){
                        if(response){
                            vm.tutorials = response.data;
                        }
                    }
                )
        }

        function findTutorialsByUserId(){
            var userId = $rootScope.currentUser._id;
            TutorialService.findTutorialsByUserId(userId)
                .then(
                    function(response){
                        if(response){
                            $localStorage.tutorial = response.data;
                            vm.userTutorials = response.data;
                        }
                    }
                )
        }

        function createTutorial(tutorial){
            if(currentUser && tutorial){
                console.log('here');
                tutorial.uploaderId = $rootScope.currentUser._id;
                TutorialService.createTutorial(tutorial)
                    .then(
                        function(response){
                            if(response){
                                $localStorage.tutorial = response.data;
                                vm.userTutorials = response.data;
                                console.log(response.data);
                                $location.url('/lesson-maker');
                            }
                        }
                    )
            }
        }

        function updateTutorial(tutorial){
            var tutorialId = vm.tutorial._id;
            if(tutorial){
                TutorialService.updateTutorial(tutorialId, tutorial)
                    .then(
                        function(response){
                            if(response){
                                console.log(response.data);
                                TutorialService.findTutorialById(tutorialId)
                                    .then(
                                        function(response){
                                            if(response){
                                                vm.tutorial = response.data;
                                            }
                                        }
                                    )
                            }
                        }
                    )
            }
            else{
                window.alert('SELECT A TUTORIAL');
            }
        }

        function deleteTutorial(){
            var tutorialId = vm.tutorial._id;
            if(vm.tutorial){
                TutorialService.deleteTutorial(tutorialId)
                    .then(
                        function(response){
                            if(response){
                                $route.reload();
                            }
                        }
                    )
            }
        }


    }

})();
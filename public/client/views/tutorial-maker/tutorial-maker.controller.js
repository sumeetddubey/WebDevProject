/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("TutorialMakerController", TutorialMakerController);

    TutorialMakerController.$inject = ['$rootScope', 'TutorialService', '$location', 'LessonService'];

    function TutorialMakerController($rootScope, TutorialService, $location, LessonService){

        var vm = this;
        
        vm.createTutorial = createTutorial;
        vm.updateTutorial = updateTutorial;
        vm.deleteTutorial = deleteTutorial;
        vm.openTutorial = openTutorial;
        vm.findAllLessonsForTutorial = findAllLessonsForTutorial;

        vm.languages = [
            "Python",
            "JavaScript",
            "Ruby",
            "Java",
            "C++"
        ];

        var tutorials = {};
        vm.selectedDirection = 'up';
        vm.selectedMode = 'md-fling';
        vm.isOpen = 'false';

        TutorialService.findTutorialsByUserId()
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

        function openLesson(lesson){
            var lessonId = lesson._id;
            LessonService.findLessonById(lessonId)
                .then(
                    function(response){
                        if(response){
                            $rootScope.currentLesson = response.data;
                            $location.url('/lesson-maker')
                        }
                    }
                )
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
                            $rootScope.tutorial = response.data;
                            vm.userTutorials = response.data;
                        }
                    }
                )
        }

        function createTutorial(tutorial){
            if(currentUser && tutorial){
                console.log('here');
                TutorialService.createTutorial(tutorial)
                    .then(
                        function(response){
                            if(response){
                                $rootScope.tutorial = response.data;
                                vm.userTutorials = response.data;
                                console.log(response.data);
                                $location.url('/lesson-maker');
                            }
                        }
                    )
            }
        }

        function updateTutorial(tutorial){
            if(tutorial){
                TutorialService.updateTutorial(tutorial)
                    .then(
                        function(response){
                            if(response){
                                vm.userTutorials = response.data;
                            }
                        }
                    )
            }
        }

        function deleteTutorial(tutorial){
            if(tutorial){
                TutorialService.deleteTutorial(tutorial)
                    .then(
                        function(response){
                            if(response){
                                findAllTutorials();
                            }
                        }
                    )
            }
        }


    }

})();
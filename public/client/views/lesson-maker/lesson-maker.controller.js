/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("LessonMakerController", LessonMakerController);

    LessonMakerController.$inject = ['$mdConstant', '$rootScope', 'LessonService', '$route'];

    function LessonMakerController($mdConstant, $rootScope, LessonService, $route){

        var vm = this;

        //instances for methods
        vm.findAllLessonsForTutorial = findAllLessonsForTutorial;
        vm.createLesson = createLesson;
        vm.updateLesson = updateLesson;
        vm.deleteLesson = deleteLesson;

        var semicolon = 186;
        vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];
        vm.tags = [];
        vm.lesson = $rootScope.currentLesson;

        var currentUser = $rootScope.currentUser;
        var tutorialId = $rootScope.tutorial._id;

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

        function createLesson(lesson){
            console.log("in client create");
            console.log(currentUser);
            console.log(lesson);
            if(currentUser && lesson){
                console.log('here');
                LessonService.createLesson(tutorialId, lesson)
                    .then(
                        function(response){
                            if(response){
                                vm.lesson = response.data;
                                console.log(response.data);
                            }
                        }
                    )
            }
        }

        function updateLesson(lesson){
            var id = vm.lesson._id;
            console.log(lesson);
            if(lesson){
                LessonService.updateLesson(tutorialId, id, lesson)
                    .then(
                        function(response){
                            if(response){
                                console.log(response.data);
                                LessonService.findLessonById(tutorialId, id)
                                    .then(
                                        function(response){
                                            if(response){
                                                vm.lesson = response.data;
                                            }
                                        }
                                    )
                            }
                        }
                    )
            }
        }

        function deleteLesson(lesson){
            var lessonId = vm.lesson._id;
            if(lesson){
                LessonService.deleteLesson(tutorialId, lessonId)
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
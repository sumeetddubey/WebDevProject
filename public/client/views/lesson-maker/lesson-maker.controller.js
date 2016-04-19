/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("LessonMakerController", LessonMakerController);

    LessonMakerController.$inject = ['$mdConstant', '$rootScope', 'LessonService'];

    function LessonMakerController($mdConstant, $rootScope, LessonService){

        var vm = this;

        //instances for methods
        vm.findAllLessonsForTutorial = findAllLessonsForTutorial;
        vm.createLesson = createLesson;
        vm.updateLesson = updateLesson;
        vm.deleteLesson = deleteLesson;

        var semicolon = 186;
        vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];
        vm.tags = [];

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
                                vm.lessons = response.data;
                                console.log(response.data);
                            }
                        }
                    )
            }
        }

        function updateLesson(lesson){
            var id = vm.currentLesson._id
            if(lesson){
                LessonService.updateLesson(tutorialId, id, lesson)
                    .then(
                        function(response){
                            if(response){
                                vm.lessons = response.data;
                            }
                        }
                    )
            }
        }

        function deleteLesson(lesson){
            var lessonId = vm.currentLesson._id;
            if(lesson){
                LessonService.deleteLesson(tutorialId, lesson)
                    .then(
                        function(response){
                            if(response){
                                vm.lessons = response.data;
                            }
                        }
                    )
            }
        }

    }



})();
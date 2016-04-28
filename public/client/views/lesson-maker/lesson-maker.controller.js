/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("LessonMakerController", LessonMakerController);

    LessonMakerController.$inject = ['$mdConstant', '$rootScope', 'LessonService', '$route', '$localStorage', '$mdToast'];

    function LessonMakerController($mdConstant, $rootScope, LessonService, $route, $localStorage, $mdToast){

        var vm = this;

        //instances for methods
        vm.findAllLessonsForTutorial = findAllLessonsForTutorial;
        vm.createLesson = createLesson;
        vm.updateLesson = updateLesson;
        vm.deleteLesson = deleteLesson;
        vm.showSimpleToast = showSimpleToast;

        var semicolon = 186;
        vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];
        vm.tags = [];
        vm.lesson = $localStorage.currentLesson;

        var currentUser = $rootScope.currentUser;
        var tutorialId = $localStorage.tutorial._id;

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
            if(currentUser && lesson){
                LessonService.createLesson(tutorialId, lesson)
                    .then(
                        function(response){
                            if(response){
                                vm.lesson = response.data;
                            }
                        }
                    )
            }
        }

        function updateLesson(lesson){
            var id = vm.lesson._id;
            if(lesson){
                LessonService.updateLesson(tutorialId, id, lesson)
                    .then(
                        function(response){
                            if(response){
                                LessonService.findLessonById(tutorialId, id)
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

        function showSimpleToast(message, parentId) {
            var el = angular.element(document.getElementById(parentId));

            var toast = $mdToast.simple()
                .content(message)
                .hideDelay(3000)
                .position('bottom right')
                .parent(el);
            $mdToast.show(toast);
        }

    }



})();
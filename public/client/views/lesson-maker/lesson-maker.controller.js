/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("LessonMakerController", LessonMakerController);

    LessonMakerController.$inject = ['$scope', '$mdConstant', '$rootScope', 'LessonService'];

    function LessonMakerController($scope, $mdConstant, $rootScope, LessonService){

        $scope.findAllLessonsForTutorial = findAllLessonsForTutorial;
        $scope.createLesson = createLesson;
        $scope.updateLesson = updateLesson;
        $scope.deleteLesson = deleteLesson;

        $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        $scope.tags = [];

        var currentUser = $rootScope.currentUser;
        var tutorialId = $rootScope.tutorial._id;

        function findAllLessonsForTutorial(){
            LessonService.findAllLessonsForTutorial(tutorialId)
                .then(
                    function(response){
                        if(response){
                            $scope.lessons = response.data;
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
                                $scope.lessons = response.data;
                                console.log(response.data);
                            }
                        }
                    )
            }
        }

        function updateLesson(lesson){
            if(lesson){
                LessonService.updateLesson(tutorialId, lesson)
                    .then(
                        function(response){
                            if(response){
                                $scope.lessons = response.data;
                            }
                        }
                    )
            }
        }

        function deleteLesson(lesson){
            if(lesson){
                LessonService.deleteLesson(tutorialId, lesson)
                    .then(
                        function(response){
                            if(response){
                                $scope.lessons = response.data;
                            }
                        }
                    )
            }
        }

    }



})();
/**
 * Created by sumeetdubey on 4/16/16.
 */
(function(){
    var app = angular.module('codingTutorial');
    app.factory('LessonService', LessonService);

    function LessonService($http){
        var api = {
            findAllLessonsForTutorial: findAllLessonsForTutorial,
            createLesson: createLesson,
            updateLesson: updateLesson,
            deleteLesson: deleteLesson
        };

        return api;

        function findAllLessonsForTutorial(tutorialId){
            return $http.get('/api/project/tutorial/' +tutorialId +'/lessons');
        }

        function createLesson(tutorialId, lesson){
            return $http.post('/api/project/tutorial/' +tutorialId +'/lessons', lesson)
        }

        function updateLesson(tutorialId, lessonId, lesson){
            return $http.put('/api/project/tutorial/' +tutorialId +'/lessons' +lessonId, lesson)
        }

        function deleteLesson(tutorialId, lessonId){
            return $http.delete('/api/project/tutorial/' +tutorialId +'/lessons' +lessonId)
        }
    }
})();
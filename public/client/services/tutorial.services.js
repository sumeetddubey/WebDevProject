/**
 * Created by sumeetdubey on 3/11/16.
 */
(function() {
    var app = angular.module("codingTutorial");
    app.factory("TutorialService", TutorialService);

    function TutorialService($http) {
        var api = {
            //method declarations
            findAllTutorials: findAllTutorials,
            findTutorialById: findTutorialById,
            findTutorialsByUserId: findTutorialsByUserId,
            findTutorialByName: findTutorialByName,
            findTutorialByKeyword: findTutorialByKeyword,
            createTutorial: createTutorial,
            updateTutorial: updateTutorial,
            deleteTutorial: deleteTutorial
        };
        return api;

        function findAllTutorials(){
            return $http.get('/api/project/tutorial');
        }

        function findTutorialById(tutorialId){
            return $http.get('/api/project/tutorial/' +tutorialId);
        }

        function findTutorialsByUserId(userId){
            return $http.get('/api/project/user/'+userId +'/tutorial')
        }

        function findTutorialByName(name){
            return $http.get('/api/project/tutorial?name=' +name);
        }

        function findTutorialByKeyword(keyword){
            return $http.get('/api/project/tutorial?keyword=' +keyword);
        }

        function createTutorial(tutorial){
            return $http.post('/api/project/tutorial', tutorial);
        }

        function updateTutorial(tutorialId, tutorial){
            return $http.put('/api/project/tutorial/'+tutorialId, tutorial);
        }

        function deleteTutorial(tutorialId){
            return $http.delete('/api/project/tutorial/'+tutorialId);
        }
    }
})();
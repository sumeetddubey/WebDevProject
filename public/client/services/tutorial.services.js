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
        //var model = {
        //    tutorials: [
        //        {
        //            "_id": 1, "name": "OOP", "language": "Python",
        //            "lessons": 12, "author": "Sumeet", "keywords":["python", "oop", "objects"]
        //        },
        //        {
        //            "_id": 2, "name": "Java Programming", "language": "Java",
        //            "lessons": 10, "author": "Sumeet", "keywords": []
        //        },
        //        {
        //            "_id": 3, "name": "Introduction to c", "language": "C",
        //            "lessons": 10, "author": "Sumeet", "keywords": []
        //        }
        //    ],
    //
    //        //method declarations
    //        createTutorial: createTutorial,
    //        findAllTutorials: findAllTutorials,
    //        findTutorialsByName: findTutorialsByName,
    //        updateTutorialById: updateTutorialById,
    //        deleteTutorialById: deleteTutorialById,
    //        findTutorialsByKeyword: findTutorialsByKeyword,
    //        sendCode: sendCode
    //
    //    };
    //
    //    return model;
    //
    //    //create dm-tutorial method
    //    function createTutorial(tutorial, callback) {
    //        var d = new Date();
    //        var t = d.getTime();
    //        var newTutorial = {
    //            "_id": t,
    //            "name": tutorial.name,
    //            "language": tutorial.language,
    //            "lessons": tutorial.lessons,
    //            "author": tutorial.author,
    //            "keywords": tutorial.keywords
    //        };
    //
    //        model.tutorials.push(newTutorial);
    //        callback(newTutorial);
    //    }
    //
    //    //findAllTutorials
    //    function findAllTutorials(callback){
    //        callback(model.tutorials)
    //    }
    //
    //    //find dm-tutorial by name method
    //    function findTutorialsByName(ipName, callback) {
    //        var tutorialIndex, tutorial;
    //        var check = false;
    //        for (tutorialIndex in model.tutorials) {
    //            tutorial = model.tutorials[tutorialIndex];
    //            if (ipName === tutorial.name) {
    //                check = true;
    //                callback(tutorial)
    //            }
    //        }
    //        if (check == false) {
    //            callback(null);
    //        }
    //    }
    //
    //    //update dm-tutorial method
    //    function updateTutorialById(tutorialid, tutorial, callback) {
    //        var tutorialIndex;
    //        for (tutorialIndex in model.tutorials) {
    //            if (model.tutorials[tutorialIndex]._id === tutorialid) {
    //                model.tutorials[tutorialIndex].name = tutorial.name;
    //                model.tutorials[tutorialIndex].language = tutorial.language;
    //                model.tutorials[tutorialIndex].lessons = tutorial.lessons;
    //                model.tutorials[tutorialIndex].author = tutorial.author;
    //            }
    //        }
    //    }
    //
    //    //delete dm-tutorial method
    //    function deleteTutorialById(tutorialid, callback) {
    //        for (tutorialIndex in model.tutorials) {
    //            if (model.tutorials[tutorialIndex]._id === tutorialid) {
    //                model.tutorials.splice(tutorialIndex, 1);
    //                callback(model.tutorials);
    //            }
    //        }
    //    }
    //
    //    function findTutorialsByKeyword(ipKeyword, callback) {
    //        var tutorialIndex, tutorial;
    //        var results=[];
    //        for (tutorialIndex in model.tutorials) {
    //            tutorial = model.tutorials[tutorialIndex];
    //            if (tutorial.keywords.indexOf(ipKeyword)!= -1) {
    //                console.log("success");
    //                results.push(tutorial)
    //            }
    //        }
    //
    //        console.log(results);
    //        callback(results)
    //    }
    //
    //    function sendCode(inputCode){
    //        return $http.post('api/project/code', inputCode);
    //    }
    //}
})();
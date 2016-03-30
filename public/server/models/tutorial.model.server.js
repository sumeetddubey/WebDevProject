///**
// * Created by sumeetdubey on 3/27/16.
// */
//module.export = function($http){
//    var api = {
//        getCodeFromApi: getCodeFromApi
//    };
//
//    return api;
//
//    function getCodeFromApi(code){
//        $http.post("/api.hackerrank.com/checker")
//    }
//};
//
//

/**
 * Created by sumeetdubey on 3/27/16.
 */
module.exports = function(){

    var mock = require('./tutorial.mock.json');
    var q = require("q");
    var HackerRank = require('machinepack-hackerrank');

    var api = {
        findAllTutorials: findAllTutorials,
        findTutorialByName: findTutorialByName,
        findTutorialByKeyword: findTutorialByKeyword,
        createTutorial: createTutorial,
        updateTutorial: updateTutorial,
        deleteTutorial: deleteTutorial,
        sendCodeToApi: sendCodeToApi
    };

    return api;

    function findAllTutorials(){
        console.log("in tutorial model");
        return mock;
    }

    function findTutorialByName(name){
        var tutorials = [];
        for(var index in mock){
            if(mock[index].name == name){
                tutorials.push(mock[index]);
            }
        }
        return tutorials;
    }

    function findTutorialByKeyword(keyword){
        var tutorials = [];
        for(var index in mock){
            if(mock[index].keyword == keyword){
                tutorials.push(mock[index]);
            }
        }
        return tutorials;
    }

    function createTutorial(ipTutorial){
        var d = new Date();
        var t = d.getTime();
        var tutorial = {
            "_id": t
        };
        if(ipTutorial.name){
            tutorial.name = ipTutorial.name;
        }
        if(ipTutorial.language){
            tutorial.language = ipTutorial.language;
        }
        if(ipTutorial.lessons){
            tutorial.lessons = ipTutorial.lessons;
        }
        if(ipTutorial.author){
            tutorial.author = ipTutorial.author;
        }
        if(ipTutorial.keywords){
            tutorial.keywords = ipTutorial.keywords;
        }

        mock.push(tutorial);
        console.log(mock);
        return mock;
    }

    function updateTutorial(id, tutorial) {
        for(var index in mock){
            if(mock[index]._id === id){
                if(tutorial.name){
                    mock[index].name = tutorial.name;
                }
                if(tutorial.language){
                    mock[index].language = tutorial.language;
                }
                if(tutorial.lessons){
                    mock[index].lessons = tutorial.lessons;
                }
                if(tutorial.author){
                    mock[index].author = tutorial.author;
                }
                if(tutorial.keywords){
                    mock[index].keywords = tutorial.keywords;
                }
            }
        }
        return mock;
    }

    function deleteTutorial(id){
        for(var index in mock){
            if(mock[index]._id === id){
                mock.splice(index, 1);
                break;
            }
        }
        return mock;
    }

    function sendCodeToApi(code){

        var deferred = q.defer();

        console.log("in api 2");
        console.log(code);
        HackerRank.submit({
            apiKey: 'hackerrank|902784-700|93c391311e30d1172470dfc810eeb0ea0b2c70dd',
            source: code,
            language: 5,
            testcases: [" "],
            wait: true,
            //callbackUrl: '/api/tutorial/callback',
            format: 'json'
        }).exec({

            error: function (err){
                console.log(err);
                deferred.reject(err);
            },

            success: function (response){
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }


};



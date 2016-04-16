/**
 * Created by sumeetdubey on 3/27/16.
 */

var q = require('q');
var mongoose = require('mongoose');

module.exports = function(){

    var q = require('q');
    var mock = require('./tutorial.mock.json');
    var HackerRank = require('machinepack-hackerrank');

    //load form schema
    var TutorialSchema = require("./tutorial.schema.server.js")(mongoose);
    var TutorialModel = mongoose.model("Tutorial", TutorialSchema);

    var api = {
        findAllTutorials: findAllTutorials,
        findTutorialsByUserId: findTutorialsByUserId,
        findTutorialByName: findTutorialByName,
        findTutorialByKeyword: findTutorialByKeyword,
        createTutorial: createTutorial,
        updateTutorial: updateTutorial,
        deleteTutorial: deleteTutorial,
        sendCodeToApi: sendCodeToApi,
        searchTutorial: searchTutorial
    };

    return api;

    function findAllTutorials(){
        console.log("in tutorial model");
        return mock;
    }

    function findTutorialsByUserId(userId){
        var deferred = q.defer();
        var tutorials = [];
        TutorialModel.find({'userId': userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
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
        var deferred = q.defer();
        var tutorial = null;

        if(ipTutorial.title){
            tutorial.title = ipTutorial.title;
        }
        if(ipTutorial.uploaderId){
            tutorial.uploaderId = ipTutorial.uploaderId;
        }
        if(ipTutorial.lessons){
            tutorial.lessons = ipTutorial.lessons;
        }
        if(ipTutorial.tags){
            tutorial.tags = ipTutorial.tags;
        }
        if(ipTutorial.language){
            tutorial.language = ipTutorial.language;
        }
        TutorialModel.create(tutorial, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateTutorial(id, tutorial) {
        for(var index in mock){
            if(mock[index]._id === id){
                if(tutorial.title){
                    mock[index].title = tutorial.title;
                }
                if(tutorial.uploaderId){
                    mock[index].uploaderId = tutorial.uploaderId;
                }
                if(tutorial.lessons){
                    mock[index].lessons = tutorial.lessons;
                }
                if(tutorial.tags){
                    mock[index].tags = tutorial.tags;
                }
                if(tutorial.language){
                    mock[index].language = tutorial.language;
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
        //callbackUrl: '/api/tutorial/callback',
        var deferred = q.defer();

        console.log("in api 2");
        console.log(code);
        HackerRank.submit({
            apiKey: "hackerrank|902784-700|93c391311e30d1172470dfc810eeb0ea0b2c70dd",
            source: code,
            language: 5,
            testcases: [""],
            wait: true,
            format: "json"
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

    function searchTutorial(data){
        var deferred = q.defer();
        var reg = new RegExp(data);
        console.log(reg);

        TutorialModel.find({tags: {$in: [reg]}}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


};



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
        findTutorialById: findTutorialById,
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
        var deferred = q.defer();
        TutorialModel.find(function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findTutorialById(tutorialId){
        var deferred = q.defer();

        TutorialModel.findById(tutorialId, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findTutorialsByUserId(userId){
        var deferred = q.defer();
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
        var deferred = q.defer();
        TutorialModel.find({'title': name}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findTutorialByKeyword(keyword){
        var deferred = q.defer();
        TutorialModel.find({'tags': keyword}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createTutorial(ipTutorial){
        var deferred = q.defer();
        var tutorial = {};

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
        console.log("the tutorial is");
        console.log(tutorial);
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
        var deferred = q.defer();
        TutorialModel.update({'_id': id},{
            title: tutorial.title,
            lessons: tutorial.lessons,
            tags: tutorial.tags,
            language: tutorial.language
        }, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteTutorial(id){
        var deferred = q.defer();
        TutorialModel.remove({'_id': id}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        })
    }

    function sendCodeToApi(code, language){
        var deferred = q.defer();
        var lang;
        console.log(language);
        if(language === 'C++'){
            lang = 2;
        }

        if(language === 'Java'){
            lang = 3;
        }

        if(language === 'Python'){
            lang = 5;
        }

        if(language === 'JavaScript'){
            lang = 20;
        }

        if(language === 'Ruby'){
            lang = 8;
        }
        console.log(lang);
        HackerRank.submit({
            apiKey: "hackerrank|902784-700|93c391311e30d1172470dfc810eeb0ea0b2c70dd",
            source: code,
            language: lang,
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



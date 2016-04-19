/**
 * Created by sumeetdubey on 4/16/16.
 */
var q = require('q');
var mongoose = require('mongoose');

module.exports = function(){
    var TutorialModel = mongoose.model('Tutorial');
    var LessonSchema = require('./lesson.schema.server.js')(mongoose);
    var LessonModel = mongoose.model('Lesson', LessonSchema);

    var api = {
        findAllLessonsForTutorial: findAllLessonsForTutorial,
        findLessonById: findLessonById,
        createLesson: createLesson,
        updateLesson: updateLesson,
        deleteLesson: deleteLesson
    };

    return api;

    function findAllLessonsForTutorial(tutorialId){
        var deferred = q.defer();

        TutorialModel.findOne({'_id': tutorialId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc.lessons);
            }
        });

        return deferred.promise;
    }

    function findLessonById(tutorialId, lessonId){
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

    function createLesson(tutorialId, lesson){
        var deferred = q.defer();

        TutorialModel.findById(tutorialId, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                var newLesson = new LessonModel(lesson);
                console.log(newLesson);
                doc.lessons.push(newLesson);
                doc.save(function(err, data){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc.lessons);
                    }
                })
            }
        });

        return deferred.promise;
    }

    function updateLesson(tutorialId, lessonId, lesson){
        var deferred = q.defer();

        TutorialModel.findById(tutorialId, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                for(var index in doc.lessons){
                    if(doc.lesson[index]._id === lessonId){
                        if(lesson.title){
                            doc.lesson[index].title = lesson.title;
                        }
                        if(lesson.tagline){
                            doc.lesson[index].tagline = lesson.tagline;
                        }
                        if(lesson.description){
                            doc.lesson[index].description = lesson.description;
                        }
                        if(lesson.question){
                            doc.lesson[index].question = lesson.question;
                        }
                        if(lesson.multimedia){
                            doc.lesson[index].multimedia = lesson.multimedia;
                        }
                        if(lesson.title){
                            doc.lesson[index].hints = lesson.hints;
                        }
                        if(lesson.keywords){
                            doc.lesson[index].keywords = lesson.keywords;
                        }
                        if(lesson.testcases){
                            doc.lesson[index].testcases = lesson.testcases;
                        }
                    }
                    doc.save(function(err, doc){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(doc);
                        }
                    })
                }
            }
        });

        return deferred.promise;
    }

    function deleteLesson(tutorialId, lessonId){
        var deferred = q.defer();

        TutorialModel.findById(tutorialId, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                for(var index in doc.lessons){
                    if(doc.lessons[index]._id === lessonId){
                        doc.lessons.splice(lessonId, 1);
                    }
                }
                doc.save(function (err, doc){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(doc);
                    }
                })
            }
        });

        return deferred.promise;
    }
};
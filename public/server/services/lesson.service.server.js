/**
 * Created by sumeetdubey on 4/16/16.
 */
module.exports  = function(app, lessonModel){
    app.get('/api/project/tutorial/:tutorialId/lessons', findAllLessonsForTutorial);
    app.get('/api/project/tutorial/:tutorialId/lesson/:lessonId', findLessonById);
    app.post('/api/project/tutorial/:tutorialId/lessons', createLesson);
    app.put('/api/project/tutorial/:tutorialId/lessons/:lessonId', updateLesson);
    app.delete('/api/project/tutorial/:tutorialId/lessons', deleteLesson);

    function findAllLessonsForTutorial(req, res){
        var tutorialId = req.params.tutorialId;
        lessonModel.findAllLessonsForTutorial(tutorialId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findLessonById(req, res){
        var tutorialId = req.params.tutorialId;
        var lessonId = req.params.lessonId;
        lessonModel.findLessonById(tutorialId, lessonId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function createLesson(req, res){
        var tutorialId = req.params.tutorialId;
        var lesson = req.body;

        lessonModel.createLesson(tutorialId, lesson)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateLesson(req, res){
        var tutorialId = req.params.tutorialId;
        var lessonId = req.params.lessonId;
        var lesson = req.body;
        lessonModel.updateLesson(tutorialId, lessonId, lesson)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteLesson(req, res){
        var tutorialId = req.params.tutorialId;
        var lessonId = req.params.lessonId;
        lessonModel.deleteLesson(tutorialId, lessonId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
};
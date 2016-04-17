/**
 * Created by sumeetdubey on 4/12/16.
 */

var mongoose = require('mongoose');
var LessonSchema = require('./lesson.schema.server.js')(mongoose);

module.exports = function(){

    var TutorialSchema = mongoose.Schema({
            title: String,
            uploaderId: String,
            lessons: [LessonSchema],
            tags: [String],
            language: String
        },
        {collection: 'tutorial'});

    return TutorialSchema;
};
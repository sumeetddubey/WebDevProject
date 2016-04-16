/**
 * Created by sumeetdubey on 4/12/16.
 */
var mongoose = require('mongoose');

module.exports = function(){
    var LessonSchema = mongoose.Schema({
        title: String,
        description: [String],
        multimedia: String,
        hints: String,
        keywords: [String],
        testcases: [String]
    },
        {
            collection: 'tutorial.lesson'
        });

    return LessonSchema;
};
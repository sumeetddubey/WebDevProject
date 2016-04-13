/**
 * Created by sumeetdubey on 4/12/16.
 */

var mongoose = require('mongoose');

module.exports = function(){

    var TutorialSchema = mongoose.Schema({
            title: String,
            uploaderId: String,
            lessons: [String],
            tags: [String],
            language: String
        },
        {collection: 'tutorial'});

    return TutorialSchema;
};
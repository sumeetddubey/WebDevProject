/**
 * Created by sumeetdubey on 4/12/16.
 */
module.exports = function(mongoose){
    var Grid = require('gridfs-stream');

    var UserSchema = mongoose.Schema({
            firstName: String,
            lastName: String,
            username: String,
            password: String,
            email: String,
            photo: String,
            roles: [String],
            badges: Number,
            lastTutorial: String,
            google:   {
                id:    String,
                token: String
            },
            facebook:   {
                id:    String,
                token: String
            }
        },
        {
            collection: 'user_project'
        });

    return UserSchema;
};
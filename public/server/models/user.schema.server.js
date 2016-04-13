/**
 * Created by sumeetdubey on 4/12/16.
 */

module.exports = function(mongoose){
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        photo: String,
        roles: [String],
        badges: Number,
        lastTutorial: String
    },
        {
            collection: 'user_project'
        });

    return UserSchema;
};
/**
 * Created by sumeetdubey on 4/18/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel){
    passport.use('user', new LocalStrategy(userLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/project/login',    passport.authenticate('user'), userLogin);
    app.post  ('/api/project/logout',   userLogout);
    app.get   ('/api/project/loggedin', userLoggedin);
    app.post  ('/api/project/register', userRegister);

    function userLocalStrategy(email, password, done){
        userModel.findUserByCredentials(email, password)
            .then(function(user){
                if(resposne && bcrypt.compareSync(password, user.password)){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            },
            function(err){
                if(err){
                    return done(err);
                }
            })
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel.findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            )

    }
};




/**
 * Created by sumeetdubey on 3/26/16.
 */

var q = require('q');
var mongoose = require('mongoose');

//load user schema
var UserSchema = require("./user.schema.server.js")(mongoose);
var UserModel = mongoose.model("User", UserSchema);

module.exports = function(app, mongoose, gfs){
    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByRole: findUserByRole,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId
    };

    return api;

    function createUser(ipUser){
        var deferred = q.defer();
        var user = {
            "username": ipUser.username,
            "password": ipUser.password,
            "email": ipUser.email,
            "photo": ""
        };
        if(ipUser.firstName){
            user.firstName = ipUser.firstName;
        }
        if(ipUser.lastName){
            user.lastName = ipUser.lastName;
        }
        if(ipUser.roles){
            user.roles = ipUser.roles;
        }
        if(ipUser.tutorials){
            user.tutorials = ipUser.tutorials;
        }

        UserModel.create(ipUser, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername (username){
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials (credentials){
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, ipUser){
        var deferred = q.defer();
        UserModel.update({_id: userId},{
            username: ipUser.username,
            password: ipUser.password,
            firstName: ipUser.firstName,
            lastName: ipUser.lastName,
            email: ipUser.email,
            roles: ipUser.roles}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                var user = findUserById(userId);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByRole(role){
        var re = new RegExp(role);
        var deferred = q.defer();
        UserModel.find({roles: re}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }
};
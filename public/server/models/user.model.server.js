/**
 * Created by sumeetdubey on 3/26/16.
 */

module.exports = function(app, mongoose, gfs){

    var q = require('q');

    //load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("User", UserSchema);
    var fs = require('fs');


    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByRole: findUserByRole,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        createProfilePic: createProfilePic
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
        console.log(re);
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

    function createProfilePic(image){
        var writeStream = gfs.createWriteStream({
            filename: 'pic'
        });
        fs.createReadStream(image).pipe(writeStream);

        writeStream.on('close', function(file){
            console.log(file.filename);
        })
    }
};
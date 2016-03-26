/**
 * Created by sumeetdubey on 3/26/16.
 */

module.exports = function(){

    //user schema
    //var UserSchema = require("./user.schema.client.js")

    var mock = require("./user.mock.json");

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById
    };

    return api;

    function createUser(ipUser){
        var d = new Date();
        var t = d.getTime();
        var user = {
            "_id": t,
            "username": ipUser.username,
            "password": ipUser.password,
            "email": ipUser.email
        };
        mock.push(user);
        console.log(mock);
        return user;
    }

    function findAllUsers(){
        return mock;
    }

    function findUserById(userId){
        var user;
        var count = 0;
        for(user in mock){
            if(mock[user]._id === userId) {
                count = 1;
                return mock[user];
            }
        }
        if(count==0){
            return null;
        }
    }

    function findUserByUsername (username){
        var user;
        var count = 0;
        for(user in mock){
            if(mock[user].username === username) {
                count = 1;
                return user;
            }
        }
        if(count==0){
            return null;
        }
    }

    function findUserByCredentials (credentials){
        var user;
        var count = 0;

        for (user in mock){
            if(mock[user].email === credentials.email && mock[user].password === credentials.password){
                count = 1;
                return (mock[user]);
            }
        }
        if (count==0){
            console.log("didnt find user");
            return null;
        }
    }

    function deleteUserById(userId){
        var user;
        for(user in mock){
            if(mock[user]._id === userId){
                mock.splice(user, 1);
            }
        }
        return null;
    }

    function updateUserById(userId, ipUser){
        var user;
        console.log(ipUser);
        for(user in mock){
            if(mock[user]._id === userId){
                if(ipUser.username) {
                    mock[user].username = ipUser.username;
                }
                if(ipUser.password) {
                    mock[user].password = ipUser.password;
                }
                if(ipUser.firstname) {
                    mock[user].firstName = ipUser.firstname;
                }
                if(ipUser.lastname) {
                    mock[user].lastName = ipUser.lastname;
                }
                if(ipUser.email) {
                    mock[user].email = ipUser.email;
                }
                break;
            }
        }
        console.log(mock[user]);
        return mock[user];
    }



};
/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.factory("UserService", UserService);

    function UserService(){
        var model = {
            currUsers: [
                {
                    "_id": 1, "firstName": "Sumeet", "lastName": "Dubey",
                    "username": "sumeetdubey", "password": "pass@123", email:"sumeet@abc.com",
                    "roles": ["dm-instructor"], "tutorials":0
                },
                {
                    "_id": 2, "firstName": "Rohit", "lastName": "Begani",
                    "username": "rohitbegani", "password": "pass@123", email:"rohit@abc.com",
                    "roles": ["dm-student"], "badges":3
                }
            ],

            //method declarations
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            updateUserById: updateUserById,
            deleteUserById: deleteUserById,
            findUserByRole: findUserByRole
        };
        return model;

        //create user method
        function createUser(user, callback){
            var d = new Date();
            var t = d.getTime();
            var newUser = {
                "_id": t,
                "firstName": user.firstName,
                "lastName":  user.lastName,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles,
                "tutorials": user.tutorials,
                "badges": user.badges
            };

            model.currUsers.push(newUser);
            callback(newUser);
        }

        //find user method
        function findUserByCredentials(ipEmail, ipPassword, callback){
            var userIndex, user;
            var check = false;
            for (userIndex in model.currUsers){
                user = model.currUsers[userIndex];
                if(ipEmail === user.email && ipPassword === user.password){
                    check = true;
                    callback(user)
                }
            }
            if(check == false) {
                callback(null);
            }
        }

        //update user method
        function updateUserById(userid, user, callback){
            var userIndex;
            for(userIndex in model.currUsers){
                if(model.currUsers[userIndex]._id === userid){
                    model.currUsers[userIndex].firstName = user.firstName;
                    model.currUsers[userIndex].lastName = user.lastName;
                    model.currUsers[userIndex].username = user.username;
                    model.currUsers[userIndex].password = user.password;
                    model.currUsers[userIndex].email = user.email;
                    model.currUsers[userIndex].roles = user.roles;
                    model.currUsers[userIndex].tutorials = user.tutorials;
                    model.currUsers[userIndex].badges = user.badges;
                }
            }
        }

        //find users by role
        function findUserByRole(role,callback){
            var adminUsers =[];
            var userIndex;
            for(userIndex in model.currUsers) {
                if (model.currUsers[userIndex].roles.indexOf(role) != -1){
                    adminUsers.push(model.currUsers[userIndex]);
                }
            }
            callback(adminUsers);
        }

        //delete user method
        function deleteUserById(userid, callback){
            for(userIndex in model.currUsers){
                if(model.currUsers[userIndex]._id === userid){
                    model.currUsers.splice(userIndex, 1);
                    callback(model.currUsers);
                }
            }
        }
    }
})();
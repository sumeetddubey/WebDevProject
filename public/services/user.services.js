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
                    "username": "sumeetdubey", "password": "pass@123", email:"sumeet@abc.com"
                },
                {
                    "_id": 2, "firstName": "Rohit", "lastName": "Begani",
                    "username": "rohitbegani", "password": "pass@123", email:"rohit@abc.com"
                }
            ],

            //method declarations
            createUser: createUser
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
                "email": user.email
            };

            model.currUsers.push(newUser);
            callback(newUser);
        }
    }
})();
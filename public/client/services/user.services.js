/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.factory("UserService", UserService);

    function UserService($http){
        var api = {
            //method declarations
            findUserByUsername: findUserByUsername,
            findUserByRole: findUserByRole,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById
        };
        return api;

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByRole(role){
            return $http.get("/api/project/user?role=" +role);
        }

        function findUserByCredentials(email, password){
            return $http.get('/api/project/user?email='+email +'&password=' +password);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function createUser(user){
            return $http.post("/api/project/user", user)
        }

        function deleteUserById(userId){
            return $http.delete('/api/project/user/'+userId);
        }

        function updateUserById(userId, user){
            return $http.put('/api/project/user/'+userId, user);
        }
    }
})();
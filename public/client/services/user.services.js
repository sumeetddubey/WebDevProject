/**
 * Created by sumeetdubey on 2/18/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.factory("UserService", UserService);

    function UserService($http, $rootScope){
        var api = {
            //method declarations
            login: login,
            logout: logout,
            register: register,
            findUserByUsername: findUserByUsername,
            findUserByRole: findUserByRole,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUserById: updateUserById,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };
        return api;

        function login(user){
            console.log(user);
            return $http.post('/api/project/login', user);
        }

        function logout(){
            return $http.post('/api/project/logout');
        }

        function register(user){
            return $http.post('/api/project/register', user);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByRole(role){
            return $http.get("/api/project/user?role=" +role);
        }

        function findUserByCredentials(username, password){
            return $http.get('/api/project/user?username='+username +'&password=' +password);
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

        function getCurrentUser() {
            return $http.get("/api/project/loggedIn");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();
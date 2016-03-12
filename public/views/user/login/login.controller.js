/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, $window, UserService){
        $scope.login = login;


        function callback(response){
            if(response) {
                $rootScope.currentUser = response;
                console.log(response);
                $location.url("/profile")
            }
            else{
                $window.alert("Invalid credentials");
            }
        }
        function login(user){
            if(!user.email || !user.password){
                $window.alert("Invalid credentials");
            }
            else {
                UserService.findUserByCredentials(user.email, user.password, callback)
            }
        }

    }

})();
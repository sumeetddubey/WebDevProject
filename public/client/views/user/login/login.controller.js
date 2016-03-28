/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.login = login;

        function login(user) {
            if (!user) {
                console.log(user.email);
                return;
            }
            UserService.findUserByCredentials(user.email, user.password)
                .then(function (response) {
                    if (response.data) {
                        $rootScope.currentUser = response.data;
                        console.log(response.data);
                        $location.url("/profile");

                    }
                })
        }
    }
})();

//(function(){
//    var app = angular.module("codingTutorial");
//    app.controller("LoginController", LoginController);
//


    //function LoginController($scope, $rootScope, $location, $window, UserService){
    //    $scope.login = login;
    //
    //
    //    function callback(response){
    //        if(response) {
    //            $rootScope.currentUser = response;
    //            console.log(response);
    //            $location.url("/profile")
    //        }
    //        else{
    //            $window.alert("Invalid credentials");
    //        }
    //    }
    //    function login(user){
    //        if(!user.email || !user.password){
    //            $window.alert("Invalid credentials");
    //        }
    //        else {
    //            UserService.findUserByCredentials(user.email, user.password, callback)
    //        }
    //    }
    //
    //}

//})();
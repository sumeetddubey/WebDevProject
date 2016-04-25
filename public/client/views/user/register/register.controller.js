/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $window) {

        var vm = this;

        //instances for methods
        vm.register = register;

        function register(user){
            if (user == null) {
                $window.alert("Please fill in the required fields");
                return;
            }
            if (!user.username) {
                $window.alert("Please provide a username");
                return;
            }
            if (!user.password || !user.verifyPassword) {
                $window.alert("Please provide a password");
                return;
            }
            if (user.password != user.verifyPassword) {
                $window.alert("Passwords must match");
                return;
            }
            if (!user.email) {
                $window.alert("Please provide a valid email");
                return;
            }
            if (!user.roles){
                $window.alert('Please select an account type');
                return;
            }

            UserService.register(user)
                .then(
                    function(response){
                        if(response.data == null){
                            $window.alert("Username already exists");
                        }
                        else if(response.data){
                            UserService.setCurrentUser(response.data);
                            UserService.login(response.data)
                                .then(
                                    function(response){
                                        if(response.data){
                                            $location.url('/profile');
                                            console.log(response.data);
                                        }
                                    },
                                    function(err){
                                        console.log(err);
                                    }
                                )
                        }
                    }
                );
        }
    }
})();
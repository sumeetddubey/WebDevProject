/**
 * Created by rohitbegani on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("HomeController", HomeController);

    function HomeController($window, $location, UserService, $rootScope) {

        var vm = this;

        //instances for methods
        vm.register = register;

        function register(user){
            function render(response){
                $rootScope.currentUser = response;
                console.log(response);
                $location.url("/profile");
            }

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

            UserService.createUser(vm.user)
                .then(
                    function(response){
                        if(response.data){
                            $rootScope.currentUser = response.data;
                            $location.url('/profile');
                            console.log(response.data);
                        }
                    }
                );
        }
    }
})();
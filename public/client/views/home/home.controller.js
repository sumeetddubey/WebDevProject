/**
 * Created by rohitbegani on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("HomeController", HomeController);

    function HomeController($location, UserService, $window) {
        var vm = this;

        //instances for methods
        vm.register = register;

        console.log('in home');

        function register(user){
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
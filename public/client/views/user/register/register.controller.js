/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {

        var vm = this;

        //instances for methods
        vm.register = register;

        function register(user){
            console.log(user.username);

            UserService.register(user)
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
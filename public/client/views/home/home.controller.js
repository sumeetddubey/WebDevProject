/**
 * Created by rohitbegani on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("HomeController", HomeController);

    function HomeController($location, UserService, $rootScope) {
        var vm = this;

        //instances for methods
        vm.login = login;

        console.log('in home');
        function login(user) {
            console.log(user);
            if (!user) {
                console.log(user.email);
                return;
            }
            UserService.login(user)
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
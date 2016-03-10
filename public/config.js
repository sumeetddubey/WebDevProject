/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.config(function($routeProvider){
        $routeProvider
            .when('/home', {
                templateUrl: "views/home/home.view.html",
                //controller: "HomeController"
            })
            .when('/register', {
                templateUrl: "views/register/register.view.html",
                controller: "RegisterController"
            })
            .when('/profile', {
                templateUrl: "views/profile/profile.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    });
})();
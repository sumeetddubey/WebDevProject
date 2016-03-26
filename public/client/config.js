/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.config(function($routeProvider){
        $routeProvider
            .when('/home', {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when('/login', {
                templateUrl: "views/user/login/login.view.html",
                controller: "LoginController"
            })
            .when('/register', {
                templateUrl: "views/user/register/register.view.html",
                controller: "RegisterController"
            })
            .when('/profile', {
                templateUrl: "views/user/profile/profile.view.html",
                controller: "ProfileController"
            })
            .when('/admin', {
                templateUrl: "views/admin/admin.view.html"
            })
            .when('/search', {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when('/dm-instructor', {
                templateUrl: "views/dm-instructor/dminstructor.view.html",
                controller: "DmInstructorController"
            })
            .when('/dm-student', {
                templateUrl: "views/dm-student/dmstudent.view.html",
                controller: "DmStudentController"
            })
            .when('/dm-tutorial', {
                templateUrl: "views/dm-tutorial/dmtutorial.view.html",
                controller: "DmTutorialController"
            })
            .when('/tutorial', {
                templateUrl: "views/tutorial/tutorial.view.html",
                //controller: "TutorialController"
            })
            .otherwise({
                redirectTo: "/"
            });
    });
})();
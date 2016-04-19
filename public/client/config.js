/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.config(function($routeProvider){
        $routeProvider
            .when('/home', {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: "views/user/login/login.view.html",
                controller: "LoginController",
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: "views/user/register/register.view.html",
                controller: "RegisterController",
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: "views/user/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: 'model'
            })
            .when('/admin', {
                templateUrl: "views/admin/admin.view.html",
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: 'model'
            })
            .when('/dm-instructor', {
                templateUrl: "views/dm-instructor/dminstructor.view.html",
                controller: "InstructorController",
                controllerAs: 'model'
            })
            .when('/dm-student', {
                templateUrl: "views/dm-student/dmstudent.view.html",
                controller: "StudentController",
                controllerAs: 'model'
            })
            .when('/dm-tutorial', {
                templateUrl: "views/dm-tutorial/dmtutorial.view.html",
                controller: "DmTutorialController",
                controllerAs: 'model'
            })
            .when('/tutorial', {
                templateUrl: "views/tutorial/tutorial.view.html",
                controller: "TutorialController",
                controllerAs: 'model'
            })
            .when('/tutorial-maker', {
                templateUrl: "views/tutorial-maker/tutorial-maker.view.html",
                controller: "TutorialMakerController",
                controllerAs: 'model'
            })
            .when('/lesson-maker', {
                templateUrl: "views/lesson-maker/lesson-maker.view.html",
                controller: "LessonMakerController",
                controllerAs: 'model'
            })
            .when('/tutorial-list', {
                templateUrl: 'views/tutorial-list/tutorial-list.view.html',
                controller: "TutorialListController",
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: "/"
            });
    });
})();
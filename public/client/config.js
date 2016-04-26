/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.config(function($routeProvider){
        $routeProvider
            .when('/home', {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: "client/views/user/login/login.view.html",
                controller: "LoginController",
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: "client/views/user/register/register.view.html",
                controller: "RegisterController",
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: "client/views/user/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: "client/views/admin/admin.view.html",
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/search', {
                templateUrl: "client/views/search/search.view.html",
                controller: "SearchController",
                controllerAs: 'model'
            })
            .when('/dm-instructor', {
                templateUrl: "client/views/dm-instructor/dminstructor.view.html",
                controller: "InstructorController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/dm-student', {
                templateUrl: "client/views/dm-student/dmstudent.view.html",
                controller: "StudentController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/dm-tutorial', {
                templateUrl: "client/views/dm-tutorial/dmtutorial.view.html",
                controller: "DmTutorialController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/tutorial', {
                templateUrl: "client/views/tutorial/tutorial.view.html",
                controller: "TutorialController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/tutorial-maker', {
                templateUrl: "client/views/tutorial-maker/tutorial-maker.view.html",
                controller: "TutorialMakerController",
                controllerAs: 'model',
                resolve: {
                    checkInstructor: checkInstructor
                }
            })
            .when('/lesson-maker', {
                templateUrl: "client/views/lesson-maker/lesson-maker.view.html",
                controller: "LessonMakerController",
                controllerAs: 'model',
                resolve: {
                    checkInstructor: checkInstructor
                }
            })
            .when('/tutorial-list', {
                templateUrl: 'client/views/tutorial-list/tutorial-list.view.html',
                controller: "TutorialListController",
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: "/home"
            });
    });

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                console.log(response.data);
                if(response.data != '0'){
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                }
                else{
                    deferred.reject();
                }
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location, $window) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                if(response.data == '0') {
                    deferred.reject();
                    //$window.alert("Invalid Credentials");
                    console.log(response.data);
                    $location.url("/login");
                }
                else {
                    console.log(response.data);
                    UserService.setCurrentUser(response.data);
                    deferred.resolve();
                }
            });

        return deferred.promise;
    }

    function checkInstructor(UserService, $q, $window, $location){
        var deferred = $q.defer();

        UserService.checkInstructor()
            .then(
                function(response){
                    if(response.data){
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        deferred.resolve();
                    }
                    else{
                        deferred.reject();
                        $window.alert('Need to be logged as instructor');
                        $location.url('/login');
                    }
                }
            );

        return deferred.promise;
    }
})();
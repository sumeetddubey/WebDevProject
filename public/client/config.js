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
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/login', {
                templateUrl: "views/user/login/login.view.html",
                controller: "LoginController",
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/register', {
                templateUrl: "views/user/register/register.view.html",
                controller: "RegisterController",
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/profile', {
                templateUrl: "views/user/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: "views/admin/admin.view.html",
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/search', {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: 'model'
            })
            .when('/dm-instructor', {
                templateUrl: "views/dm-instructor/dminstructor.view.html",
                controller: "InstructorController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/dm-student', {
                templateUrl: "views/dm-student/dmstudent.view.html",
                controller: "StudentController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/dm-tutorial', {
                templateUrl: "views/dm-tutorial/dmtutorial.view.html",
                controller: "DmTutorialController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/tutorial', {
                templateUrl: "views/tutorial/tutorial.view.html",
                controller: "TutorialController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/tutorial-maker', {
                templateUrl: "views/tutorial-maker/tutorial-maker.view.html",
                controller: "TutorialMakerController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/lesson-maker', {
                templateUrl: "views/lesson-maker/lesson-maker.view.html",
                controller: "LessonMakerController",
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/tutorial-list', {
                templateUrl: 'views/tutorial-list/tutorial-list.view.html',
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
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

    function setTutorial($window){
        console.log($window.sessionStorage.currentTutorial);

    }
})();
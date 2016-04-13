/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location) {

        $scope.codeLevel = 70;

        if ($rootScope.currentUser) {
            $scope.currentUser = $rootScope.currentUser;
            if($scope.currentUser.photo === ""){
                $scope.currentUser.photo = "http://placehold.it/200x200";
            }
            $scope.username = $rootScope.currentUser.username;
        }
        else {
            $location.url("/home");
        }

        $scope.labels =["Variables", "Loops", "Methods", "Classes", "File Operations", "Inheritance", "Objects"];

        $scope.data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];

    }


})();
/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location) {
        if ($rootScope.currentUser) {
            $scope.currentUser = $rootScope.currentUser;
            $scope.username = $rootScope.currentUser.username;
            console.log($scope.currentUser.image);
        }
        else {
            $location.url("/home");
        }

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

    }


})();
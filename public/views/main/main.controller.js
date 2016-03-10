/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");

    app.controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();
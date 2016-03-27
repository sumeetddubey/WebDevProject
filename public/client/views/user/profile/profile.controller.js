/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope){
        $scope.currentUser = $rootScope.currentUser;
        $scope.username = $rootScope.currentUser.username;
        console.log($scope.currentUser.image);
    }


})();
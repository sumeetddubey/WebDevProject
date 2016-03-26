/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope){
        $scope.username = $rootScope.currentUser.username;
    }


})();
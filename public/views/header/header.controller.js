/**
 * Created by rohitbegani on 3/10/16.
 */
(function () {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ['$scope', '$rootScope', '$location'];

    function HeaderController($scope, $rootScope, $location) {
        $scope.loginPage = loginPage;

        $scope.logout = logout;
        $scope.location = $location;

        function logout() {
            $rootScope.user = null;
            $location.url("/");
        }
    }
})();
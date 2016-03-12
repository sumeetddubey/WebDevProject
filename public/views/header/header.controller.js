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

        $scope.logout = logout;
        $scope.location = $location;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/");
        }

        function search(keywords) {
            SearchService.searchForTitle(keywords.keyword,
                function(response) {
                    if (response) {
                        $rootScope.currentUser = response;
                    }
                    $location.url("/search");
                });

        }
    }
})();
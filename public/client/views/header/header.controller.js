/**
 * Created by rohitbegani on 3/10/16.
 */
(function () {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ['$scope', '$rootScope', '$location', '$mdSidenav', 'TutorialService'];

    function HeaderController($scope, $rootScope, $location, $mdSidenav, TutorialService) {
        $scope.search = search;
        $scope.logout = logout;
        $scope.location = $location;
        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }

        function search(query){
            var keyword = query.keyword;
            function render(response){
                $rootScope.results = response;
                $location.url("/search");
            }
            console.log(keyword);
            TutorialService.findTutorialsByKeyword(keyword, render)
        }
    }
})();
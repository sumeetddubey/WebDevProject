/**
 * Created by rohitbegani on 3/10/16.
 */
(function () {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ['$scope', '$rootScope', '$location', '$mdSidenav', 'SearchService'];

    function HeaderController($scope, $rootScope, $location, $mdSidenav, SearchService) {
        $scope.search = search;
        $scope.logout = logout;
        $scope.location = $location;
        $scope.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
        };

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }

        function search(data){
            console.log(data);
            SearchService.search(data)
                .then(
                    function(response){
                        if(response){
                            if(response.data === null){
                                return null;
                            }
                            console.log(response.data);
                            $rootScope.results = response.data;
                            $location.url('/search');
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }
    }
})();
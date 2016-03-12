/**
 * Created by rohitbegani on 3/12/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("SearchController", SearchController);

    SearchController.$inject = ['$scope', '$rootScope', '$location', 'SearchService'];

    function SearchController($scope, $rootScope, $location, SearchService) {
        $scope.search = search;

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
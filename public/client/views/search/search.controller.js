/**
 * Created by rohitbegani on 3/12/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("SearchController", SearchController);

    SearchController.$inject = ['$rootScope'];

    function SearchController($rootScope){

        var vm = this;

        vm.results = $rootScope.results;
    }
})();
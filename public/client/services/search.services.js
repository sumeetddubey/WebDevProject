/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .factory("SearchService", SearchService);

    function SearchService($http) {

        var api = {
            search: search
        };

        return api;

        function search(data){
            return $http.post('/api/project/search?data='+data);
        }
    }
})();
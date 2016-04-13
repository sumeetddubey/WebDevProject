/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .factory("SearchService", SearchService);

    function SearchService($http) {
        var tutorials=[];
        tutorials = [
            { "_id:":1, "title":"Hello World"},
            { "_id:":2, "title":"Introduction to datatypes"},
            { "_id:":3, "title":"Lorem Ipsum"}
        ];

        var api = {
            searchForTitle: searchForTitle,
            search: search
        };

        return api;

        function searchForTitle(keywords, callback) {
            var titleFound = null;
            for (var tutorial in tutorials){
                if(tutorials[tutorial].title.split(' ') == keywords){
                    titleFound = title;
                    console.log(titleFound);
                }
                callback(titleFound);
            }
        }

        function search(data){
            return $http.post('/api/project/search?data='+data);
        }
    }
})();
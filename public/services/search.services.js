/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .factory("SearchService", SearchService);

    function SearchService() {
        var tutorials=[];
        tutorials = [
            { "_id:":1, "title":"Hello World"},
            { "_id:":2, "title":"Introduction to datatypes"},
            { "_id:":3, "title":"Lorem Ipsum"}
        ];

        var api = {
            searchForTitle: searchForTitle
        };

        return api;

        function searchForTitle(keywords, callback) {
            var titleFound = null;
            for (var tutorial in tutorials){
                if(tutorials[tutorial].title == keywords){
                    titleFound = title;
                }
                callback(titleFound);
            }
        }
    }
})();
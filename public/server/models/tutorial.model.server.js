/**
 * Created by sumeetdubey on 3/27/16.
 */
module.export = function($http){
    var api = {
        getCodeFromApi: getCodeFromApi
    };

    return api;

    function getCodeFromApi(code){
        $http.post("/api.hackerrank.com/checker")
    }
};



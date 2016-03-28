///**
// * Created by sumeetdubey on 3/27/16.
// */
//module.export = function($http){
//    var api = {
//        getCodeFromApi: getCodeFromApi
//    };
//
//    return api;
//
//    function getCodeFromApi(code){
//        $http.post("/api.hackerrank.com/checker")
//    }
//};
//
//

/**
 * Created by sumeetdubey on 3/27/16.
 */
module.exports = function(){

    var q = require("q");
    var HackerRank = require('machinepack-hackerrank');

    var api = {
        sendCodeToApi: sendCodeToApi
    };

    return api;

    function sendCodeToApi(code){

        var deferred = q.defer();

        console.log("in api 2");
        HackerRank.submit({
            apiKey: 'hackerrank|902784-700|93c391311e30d1172470dfc810eeb0ea0b2c70dd',
            source: code,
            language: 5,
            testcases: ["1"],
            wait: true,
            //callbackUrl: '/api/tutorial/callback',
            format: 'json'
        }).exec({

            error: function (err){
                console.log(err);
                deferred.reject(err);
            },

            success: function (response){
                deferred.resolve(response);
            }
        });

        return deferred.promise;
    }
};



/**
 * Created by sumeetdubey on 3/27/16.
 */
(function(){
    angular
        .module("codingTutorial")
        .factory("HackerRankService", HackerRankService);

    function HackerRankService($http) {
        var api = {
            sendCode: sendCode
        };
        return api;

        function sendCode(code, language, testcases){
            console.log(code);
             return $http.post("/api/project/tutorialCode?language=" +language, code);
        }
    }
})();
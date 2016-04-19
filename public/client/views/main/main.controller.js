/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module("codingTutorial");

    app.controller("MainController", MainController);

    function MainController($location) {
        var vm = this;
        vm.$location = $location;
    }
})();
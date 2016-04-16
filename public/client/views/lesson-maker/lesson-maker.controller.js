/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("LessonMakerController", LessonMakerController);

    LessonMakerController.$inject = ['$scope', '$mdConstant'];

    function LessonMakerController($scope, $mdConstant){
        $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        $scope.tags = [];


    }

})();
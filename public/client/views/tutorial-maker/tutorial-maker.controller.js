/**
 * Created by rohitbegani on 4/15/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("TutorialMakerController", TutorialMakerController);

    TutorialMakerController.$inject = ['$scope'];

    function TutorialMakerController($scope){
        $scope.languages = [
            "Python",
            "JavaScript",
            "Ruby",
            "Java",
            "C++"
        ];
    }

})();
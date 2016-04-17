/**
 * Created by sumeetdubey on 4/16/16.
 */
(function(){
    var app = angular.module('codingTutorial');
    app.controller('TutorialListController', TutorialListController);

    function TutorialListController($scope, TutorialService){
        var tutorials = {};
        TutorialService.findAllTutorials()
            .then(
                function(response){
                    if(response){
                        console.log(response.data);
                        $scope.tutorials = response.data;
                    }
                }
            )
    }
})();
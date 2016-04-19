/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("DmTutorialController", DmTutorialController);

    function DmTutorialController(TutorialService, $location){

        var vm = this;

        //instances for methods
        vm.addTutorial = addTutorial;
        vm.selectTutorial = selectTutorial;
        vm.updateTutorial = updateTutorial;
        vm.deleteTutorial = deleteTutorial;

        function findTutorials(){
            //function render(response){
            //    vm.tutorials = response;
            //}

            TutorialService.findAllTutorials()
                .then(
                    function(response){
                        if(response.data){
                            console.log(response.data);
                            vm.tutorials = response.data;
                        }
                    }
                )
        }

        findTutorials();

        function addTutorial(newTutorial){
            //function render(response){
            //    console.log(response);
            //    $location.url("/dm-tutorial");
            //    $route.reload();
            //}

            if(newTutorial) {
                TutorialService.createTutorial(newTutorial)
                    .then(
                        function(response){
                            if(response.data){
                                console.log(response.data);
                                vm.tutorials = response.data;
                            }
                        }
                    )
            }
            else{
                $location.url("/dm-tutorial");
            }
        }

        function updateTutorial(tutorial){
            if(tutorial) {
                TutorialService.updateTutorial(vm.selectedTutorialId, vm.tutorial)
                    .then(
                        function(response){
                            if(response){
                                console.log(response.data);
                                vm.tutorials = response.data;
                            }
                        }
                    );

                //function render(response) {
                //    console.log(response);
                //    $location.url("/dm-tutorial");
                //    $route.reload();
                //}
            }

        }

        function deleteTutorial(tutorial){
            TutorialService.deleteTutorial(tutorial._id)
                .then(
                    function(response){
                        if(response.data){
                            console.log(response.data);
                            vm.tutorials = response.data;
                        }
                    }
                );

            //function render(response){
            //    console.log(response);
            //    $location.url("/dm-tutorial");
            //    $route.reload();
            //}
        }

        function selectTutorial(tutorial){
            console.log(tutorial);
            vm.selectedTutorialId = tutorial._id;
            vm.tutorial = {
                "name": tutorial.name,
                "language": tutorial.language,
                "lessons": tutorial.lessons,
                "author": tutorial.author
            };
        }
    }

})();
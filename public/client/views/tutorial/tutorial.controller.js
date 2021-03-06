/**
 * Created by rohitbegani on 3/11/16.
 */
(function() {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("TutorialController", TutorialController);

    TutorialController.$inject = ['$mdDialog', 'HackerRankService', 'TutorialService', '$localStorage', '$window', '$location', '$route'];

    function TutorialController($mdDialog, HackerRankService, TutorialService, $localStorage, $window, $location, $route){

        var vm = this;

        //instances for methods
        vm.run = run;
        vm.showloader = showloader;
        vm.openOffscreen = openOffscreen;
        vm.nextLesson = nextLesson;
        vm.onEditorLoad = onEditorLoad;
        vm.onEditorChange = onEditorChange;
        vm.langMode = langMode;

        vm.storage = $localStorage;
        vm.loadPlayer = false;

        function initTutorial(){
            var tutorialId = $localStorage.currentTutorial._id;
            TutorialService.findTutorialById(tutorialId)
                .then(
                    function(response){
                        if(response){
                            vm.tutorial = response.data;
                            $localStorage.currentLesson = response.data.lessons[$localStorage.lessonCount];
                            vm.currentLesson = $localStorage.currentLesson;
                            prettyDescription(vm.currentLesson.description);
                            vm.loadPlayer = true;
                        }
                    }
                )
        }

        function prettyDescription(description){
            vm.lessonDescription = description.split("\n");
        }

        function lessonCounter(tutorial){
            var lessons = tutorial.lessons;
            var len = lessons.length;
            if($localStorage.lessonCount<len){
                $localStorage.lessonCount++;
                $localStorage.currentLesson = tutorial.lessons[$localStorage.lessonCount];
                vm.currentLesson = $localStorage.currentLesson;
                prettyDescription(vm.currentLesson.description);
            }
            if($localStorage.lessonCount == len){
                tutorialCompletion();
            }
        }

        function tutorialCompletion(){
            $window.alert("CONGRATS");
            $location.url('/tutorial-list');
        }

        function nextLesson(userCode){
            if(!userCode){
                if($localStorage.currentLesson.testcases === /\n?/){
                    console.log("pattern match");
                    lessonCounter(vm.tutorial);
                    $route.reload();
                    vm.output = "";
                }
            }
            else {
                vm.isLoading = true;
                var code = [userCode.data];
                var language = vm.tutorial.language;
                var testcases = [vm.currentLesson.testcases];
                HackerRankService.sendCode(code, language, testcases)
                    .then(
                        function (response) {
                            if (response) {
                                vm.output = response.data;
                                vm.isLoading = false;
                                testcases = JSON.stringify(testcases);
                                var output = JSON.stringify(response.data);
                                console.log(testcases);
                                console.log(output);
                                if (testcases == output) {
                                    lessonCounter(vm.tutorial);
                                    $route.reload();
                                    vm.output = '';
                                }
                                else {
                                    $window.alert('wrong output');
                                }
                            }
                        }
                    )
            }
        }

        function openOffscreen() {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Hint')
                    .textContent(vm.currentLesson.hints)
                    .ariaLabel('Offscreen Demo')
                    .ok('Close')
                    .openFrom({
                        top: -50,
                        width: 30,
                        height: 80
                    })
                    .closeTo({
                        left: 1500
                    })
            );
        }

        function showloader() {
            vm.isLoading = true;
            console.log('Loader Called');
        }

        function run(userCode) {
            vm.isLoading = true;
            var language = vm.tutorial.language;
            var code = [userCode.data];
            HackerRankService.sendCode(code, language)
                .then(
                    function(response) {
                        if (response.data) {
                            vm.isLoading = false;
                            vm.output = response.data;
                        }
                        else{
                            vm.isLoading = false;
                        }
                    }

                );
        }

        function langMode(){
            var lang = vm.tutorial.language;
            lang = lang.toLowerCase();
            console.log(lang);
            return lang;
        }

        function onEditorLoad(_editor){
            _editor.setValue('');
        }

        function onEditorChange(e){
            console.log(e);
        }

        initTutorial();
    }
})();
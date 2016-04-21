/**
 * Created by rohitbegani on 3/10/16.
 */
(function () {
    "use strict";
    angular
        .module("codingTutorial")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ['$rootScope', '$location', '$mdSidenav', 'SearchService', 'UserService'];

    function HeaderController($rootScope, $location, $mdSidenav, SearchService, UserService) {

        var vm = this;

        //instances for methods
        vm.search = search;
        vm.logout = logout;
        vm.activeUser = activeUser;

        vm.location = $location;
        vm.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };
        vm.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
        };

        function search(data){
            console.log(data);
            SearchService.search(data)
                .then(
                    function(response){
                        if(response){
                            if(response.data === null){
                                return null;
                            }
                            console.log(response.data);
                            $rootScope.results = response.data;
                            $location.url('/search');
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        function logout(){
            console.log('in logout');
            UserService.logout()
                .then(
                    function(response){
                        console.log(response.data);
                        delete $rootScope.currentUser;
                        console.log($rootScope.currentUser);
                        $location.url('/home');
                    }
                )
        }

        function activeUser(){
            return $rootScope.currentUser;
        }
    }
})();
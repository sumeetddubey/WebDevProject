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
        vm.isAdminUser = isAdminUser;

        vm.location = $location;
        vm.openLeftMenu = function() {
            $mdSidenav('left').toggle();
        };
        vm.close = function () {
            $mdSidenav('left').close()
        };

        function search(data){
            SearchService.search(data)
                .then(
                    function(response){
                        if(response){
                            if(response.data === null){
                                return null;
                            }
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
                        $rootScope.currentUser = null;
                        $location.url('/home');
                    }
                )
        }

        function activeUser(){
            if($rootScope.currentUser != null){
                return $rootScope.currentUser;
            }
            else{
                return null;
            }
        }

        function isAdminUser(){
            if($rootScope.currentUser) {
                var user = $rootScope.currentUser;
                return (user.roles.indexOf('dm-instructor') != -1);
            }
            else{
                return false;
            }
        }
    }
})();
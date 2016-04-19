/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("InstructorController", InstructorController);

    function InstructorController(UserService, $location){

        var vm = this;

        //instances for methods
        vm.addUser = addUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function findInstructors(){
            //function callback(response){
            //    vm.instructorUsers = response;
            //}

            UserService.findUserByRole("dm-instructor")
                .then(
                    function(response){
                        if(response.data){
                            vm.instructorUsers = response.data;
                        }
                    }
                )
        }

        findInstructors();

        function addUser(newUser){
            //function render(response){
            //    console.log(response);
            //    $location.url("/dm-instructor");
            //    $route.reload();
            //}

            if(newUser) {
                UserService.createUser(newUser)
                    .then(
                        function(response){
                            if(response.data){
                                console.log(response.data);
                                findInstructors();
                            }
                        }
                    )
            }
            else{
                $location.url("/dm-instructor");
            }
        }

        function updateUser(user){
            if(user) {
                UserService.updateUserById(vm.selectedUserId, vm.user)
                    .then(
                        function(response){
                            if(response.data){
                                console.log(response.data);
                                findInstructors();
                                //vm.instructorUsers = response.data;
                            }
                        }
                    )

                //function render(response) {
                //    console.log(response);
                //    $location.url("/dm-instructor");
                //    $route.reload();
                //}
            }

        }

        function deleteUser(user){
            UserService.deleteUserById(user._id)
                .then(
                    function(response){
                        if(response.data){
                            console.log(response.data);
                            findInstructors();
                        }
                    }
                );

            //function render(response){
            //    console.log(response);
            //    $location.url("/dm-instructor");
            //    $route.reload();
            //}
        }

        function selectUser(user){
            console.log(user);
            vm.selectedUserId = user._id;
            vm.user = {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "roles": user.roles,
                "tutorials": user.tutorials
            };
        }
    }

})();
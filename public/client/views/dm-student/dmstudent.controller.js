/**
 * Created by sumeetdubey on 3/11/16.
 */
/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("StudentController", StudentController);

    function StudentController(UserService, $route, $location){

        var vm = this;

        //instances for methods
        vm.addUser = addUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function findStudents(){
            function render(response){
                vm.studentUsers = response;
            }

            UserService.findUserByRole("dm-student")
                .then(
                    function(response){
                        if(response.data){
                            vm.studentUsers = response.data;
                        }
                    }
                )
        }

        findStudents();

        function addUser(newUser){
            function render(response){
                console.log(response);
                $location.url("/dm-student");
                $route.reload();
            }

            if(newUser) {
                UserService.createUser(newUser)
                    .then(
                        function(response){
                            if(response.data){
                                console.log(response.data);
                                findStudents();
                            }
                        }
                    )
            }
            else{
                $location.url("/dm-student");
            }
        }

        function updateUser(user){
            if(user) {
                UserService.updateUserById(vm.selectedUserId, vm.user)
                    .then(
                        function(response){
                            if(response.data){
                                console.log(response.data);
                                findStudents();
                            }
                        }
                    );

                //function render(response) {
                //    console.log(response);
                //    $location.url("/dm-student");
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
                            findStudents();
                        }
                    }
                );

            //function render(response){
            //    console.log(response);
            //    $location.url("/dm-student");
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
                "badges": user.badges
            };
        }
    }

})();
/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("InstructorController", InstructorController);

    function InstructorController($scope, UserService, $location){
        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;

        function findInstructors(){
            //function callback(response){
            //    $scope.instructorUsers = response;
            //}

            UserService.findUserByRole("dm-instructor")
                .then(
                    function(response){
                        if(response.data){
                            $scope.instructorUsers = response.data;
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
                UserService.updateUserById($scope.selectedUserId, $scope.user)
                    .then(
                        function(response){
                            if(response.data){
                                console.log(response.data);
                                findInstructors();
                                //$scope.instructorUsers = response.data;
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
            $scope.selectedUserId = user._id;
            $scope.user = {
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
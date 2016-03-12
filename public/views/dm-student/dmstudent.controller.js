/**
 * Created by sumeetdubey on 3/11/16.
 */
/**
 * Created by sumeetdubey on 3/11/16.
 */
(function(){
    var app = angular.module("codingTutorial");
    app.controller("StudentController", StudentController);

    function StudentController($scope, UserService, $route, $location){
        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;

        function findStudents(){
            function render(response){
                $scope.studentUsers = response;
            }

            UserService.findUserByRole("dm-student",render);
        }

        findStudents();

        function addUser(newUser){
            function render(response){
                console.log(response);
                $location.url("/dm-student");
                $route.reload();
            }

            if(newUser) {
                UserService.createUser(newUser, render)
            }
            else{
                $location.url("/dm-student");
            }
        }

        function updateUser(user){
            if(user) {
                UserService.updateUserById($scope.selectedUserId, $scope.user, render);

                function render(response) {
                    console.log(response);
                    $location.url("/dm-student");
                    $route.reload();
                }
            }

        }

        function deleteUser(user){
            UserService.deleteUserById(user._id, render);

            function render(response){
                console.log(response);
                $location.url("/dm-student");
                $route.reload();
            }
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
                "badges": user.badges
            };
        }
    }

})();
/**
 * Created by sumeetdubey on 3/17/16.
 */

module.exports = function(app, userModel) {

    app.get('/api/project/user', findUser);
    app.post('/api/project/user', createUser);
    app.get('/api/project/user/:id', findUserById);
    app.put('/api/project/user/:id', updateUser);
    app.delete('/api/project/user/:id', deleteUser);

    app.getUserByCredentials = getUserByCredentials;

    function getUserByCredentials(req, res){
        console.log("in finduserbycredentials");
        var credentials = {
            "email": req.query.email,
            "password": req.query.password
        };

        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function findUser(req, res){
        console.log("in finduser now");
        console.log(req.query.email);
        console.log(req.query.password);
        if(req.query.email && req.query.password){
            getUserByCredentials(req, res);
        }
        else if(req.query.email){
            findUserByUsername(req, res);
        }
        else{
            console.log("error");
        }
    }

    function createUser(req, res){
        var user = req.body;
        res.json(userModel.createUser(user));
    }

    function findAllUsers(req, res){
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res){
        var userId = parseInt(req.params.id);
        res.json(userModel.findUserById(userId));
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        res.json(userModel.findUserByUsername(username));
    }

    function updateUser(req, res){
        console.log("in update");
        var userId = parseInt(req.params.id);
        var userParams = req.body;
        res.json(userModel.updateUserById(userId, userParams));
    }

    function deleteUser(req, res){
        var userId = res.params.id;
        res.json(userModel.deleteUserById(userId));
    }
};
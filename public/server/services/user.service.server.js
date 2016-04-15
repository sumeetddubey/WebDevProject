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

        userModel.findUserByCredentials(credentials)
            .then(
                function(doc){
                    console.log(doc);
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
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
        else if(req.query.role){
            findUserByRole(req, res);
        }
        else{
            console.log("error");
        }
    }

    function findUserByRole(req, res){
        var role = req.query.role;
        console.log("role is" +role);
        userModel.findUserByRole(role)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function createUser(req, res){
        var user = req.body;
        userModel.createUser(user)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findAllUsers(req, res){
        var users = [];
        userModel.findAllUsers()
            .then(
                function(doc){
                    users = doc;
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findUserById(req, res){
        var userId = req.params.id;
        var user;
        userModel.findUserById(userId)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        var user;
        userModel.findUserByUsername(username)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res){
        console.log("in update");
        var userId = req.params.id;
        var userParams = req.body;
        var user;
        userModel.updateUserById(userId, userParams)
            .then(
                function(doc){
                    user = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteUser(req, res){
        var userId = req.params.id;
        var users;
        userModel.deleteUserById(userId)
            .then(
                function(doc){
                    users = doc;
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }
};
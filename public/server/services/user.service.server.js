/**
 * Created by sumeetdubey on 3/17/16.
 */
module.exports = function(app, userModel, passport) {
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require('bcrypt-nodejs');
    var auth = authorized;

    passport.use(new LocalStrategy(localStrategy));

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get('/api/project/loggedIn', loggedIn);
    app.get('/api/project/checkInstructor', checkInstructor);
    app.get('/api/project/user', auth, findUser);
    app.post('/api/project/user', auth, createUser);
    app.get('/api/project/user/:id', findUserById);
    app.put('/api/project/user/:id', auth, updateUser);
    app.delete('/api/project/user/:id',auth, deleteUser);

    app.getUserByCredentials = getUserByCredentials;

    function localStrategy(username, password, done){
        userModel.findUserByCredentials({username: username, password: password})
            .then(function(user){
                    if(user){
                        return done(null, user);
                    }
                    else{
                        return done(null, false);
                    }
                },
                function(err){
                    if(err){
                        return done(err);
                    }
                })
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            )
    }

    function login(req, res){
        var user = req.user;
        console.log(user);
        res.json(user);
    }

    function logout(req, res){
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res){
        res.send(req.isAuthenticated()? req.user: '0');
    }

    function checkInstructor(req, res){
        console.log('in check instructor');
        var user = (req.isAuthenticated() ? req.user : '0');
        console.log(user);
        if(user =='0'){
            res.json(null);
        }
        else if(user.roles.indexOf('dm-instructor') != -1){
            console.log('found admin '+user);
            res.json(user);
        }
        else{
            res.json(null);
        }
    }

    function register(req, res){
        console.log('in register');
        var user = req.body;

        userModel
            .findUserByUsername(user.username)
            .then(
                function(response){
                    if(response){
                        res.json(null);
                    }
                    else{
                        return userModel.createUser(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(response){
                    if(response){
                        req.login(user, function(err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function getUserByCredentials(req, res){
        console.log("in finduserbycredentials");
        var credentials = {
            "username": req.query.username,
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
        console.log(req.query.username);
        console.log(req.query.password);
        if(req.query.username && req.query.password){
            getUserByCredentials(req, res);
        }
        else if(req.query.username){
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
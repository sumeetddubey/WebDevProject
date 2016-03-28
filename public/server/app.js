/**
 * Created by sumeetdubey on 3/17/16.
 // */
module.exports = function(app) {
    var userModel = require("./models/user.model.server.js")();
    var tutorialModel = require("./models/tutorial.model.server.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    var tutorialService = require("./services/tutorial.service.server.js")(app, tutorialModel);
};

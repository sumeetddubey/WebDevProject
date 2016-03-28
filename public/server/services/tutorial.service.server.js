///**
// * Created by sumeetdubey on 3/27/16.
// */
//module.exports = function(app, tutorialModel){
//    app.post('api/project/code', sendCode);
//
//    function sendCode(req, res){
//        var code = req.body;
//
//    }
//};

/**
 * Created by sumeetdubey on 3/27/16.
 */
module.exports = function(app, TutorialModel){

    app.post('/api/project/tutorial', sendCode);

    function sendCode(req, res){
        console.log(req.body);
        var code = Object.keys(req.body)[0];
        console.log(code);
        (TutorialModel.sendCodeToApi(code))
            .then(
                function(doc) {
                    var response = JSON.parse(doc);
                    console.log(doc);
                    if(response.result.stdout) {
                        var output = response.result.stdout;
                    }
                    if(response.result.stderr != "false"){
                        output = response.result.stderr;
                    }
                    if(response.result.compilemessage != ""){
                        output = response.result.compilemessage;
                    }
                    console.log(output);
                    res.json(output);

                    //console.log("the response is "+doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            )
    }
};
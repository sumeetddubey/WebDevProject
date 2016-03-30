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
module.exports = function(app, tutorialModel){

    app.get('/api/project/tutorial', findTutorial);
    app.post('/api/project/tutorial', createTutorial);
    app.put('/api/project/tutorial/:id', updateTutorial);
    app.delete('/api/project/tutorial/:id', deleteTutorial);
    app.post('/api/project/tutorialCode', sendCode);


    function findTutorial(req, res){
        var response;
        if(req.query.name){
            response = tutorialModel.findTutorialByName(req.query.name);
        }
        else if(req.query.keyword){
            response = tutorialModel.findTutorialByKeyword(req.query.keyword);
        }
        else{
            response = tutorialModel.findAllTutorials();
        }
        res.json(response);
    }

    function createTutorial(req, res){
        var tutorial = req.body;
        var response = tutorialModel.createTutorial(tutorial);
        res.json(response);
    }

    function updateTutorial(req, res){
        var id = parseInt(req.params.id);
        var tutorial = req.body;
        var response = tutorialModel.updateTutorial(id, tutorial);
        res.json(response);
    }

    function deleteTutorial(req, res){
        var id = parseInt(req.params.id);
        var response = tutorialModel.deleteTutorial(id);
        res.json(response);
    }

    function sendCode(req, res){
        console.log(req.body);
        var code = Object.keys(req.body)[0];
        console.log(code);
        tutorialModel.sendCodeToApi(code)
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
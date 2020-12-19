const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const mongoOp = require("../app/model/mongo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));



router.get("/",function (req, res) {
    res.json({"error" : false,"message" : "Hello World"});
})
router.route("/users")
    .get(function(req,res){
        let response = {};
        mongoOp.find({},function(err,data){
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : err};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res) {
        let db = new mongoOp();
        let response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.userEmail = req.body.email;
        // Hash the password using SHA1 algorithm.
        db.userPassword = require('crypto')
            .createHash('sha1')
            .update(req.body.password)
            .digest('base64');
        db.save(function (err) {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = {"error": true, "message": "Error adding data"};
            } else {
                response = {"error": false, "message": "Data added"};
            }
            res.json(response);
        });
});

app.use('/',router);

app.listen(3000);

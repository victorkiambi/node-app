const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));



router.get("/",function (req, res) {
    res.json({"error" : false,"message" : "Hello World"});
})

app.use('/',router);

app.listen(3000);

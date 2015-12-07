var disqus_functions = require("./disqus_signon.js")

var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var util = require('util');

app.post('/disqus/sso', function (req, res) {
    console.log("Received Body: " + util.inspect(req.body, false, null));
    var signon_data = disqus_functions.disqusSignon(req.body.user);
    console.log("Returning signon data:" + util.inspect(signon_data, false, null));
    res.send(signon_data);
});

app.listen(8081);
console.log("Disqus SSO service - listening on port 8081");
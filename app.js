const express = require("express");
const app = express();
var path = require("path");
const bodyParser= require('body-parser')
const static = express.static(__dirname + '/public');

app.use(static);
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/pages/home.html'));
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
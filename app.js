const express = require("express");
const app = express();
var path = require("path");
const static = express.static(__dirname + '/public');

app.use(static);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'));
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
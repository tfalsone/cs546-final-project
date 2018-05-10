const express = require("express");
const app = express();
var path = require("path");
const bodyParser= require('body-parser')
const static = express.static(__dirname + '/public');

app.use(static);
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
<<<<<<< HEAD
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'));
});
=======
    res.sendFile(path.join(__dirname + '/public/pages/login.html'));
})
>>>>>>> 64c2cfc40530cf80055bac3f7af57f2c52bbd015

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
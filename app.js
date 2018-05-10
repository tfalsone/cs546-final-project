const express = require("express");
const app = express();
var path = require("path");
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const static = express.static(__dirname + '/public');
const dbConfig = require('./config/settings.js');
const configRoutes = require("./routes");
const MongoClient = require("mongodb").MongoClient;

mongoose.Promise = global.Promise;

app.use(static);
app.use(bodyParser.urlencoded({extended: true}))

// Connecting to the database
mongoose.connect(dbConfig.serverUrl, { keepAlive: 120 })
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    console.log(err);
    process.exit();
});
configRoutes(app);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/pages/login.html'));
})

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
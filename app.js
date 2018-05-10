const express = require("express");
const app = express();
var path = require("path");
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const static = express.static(__dirname + '/public');
const settings = require('./config/settings');
const mongoConfig = settings.mongoConfig;
const configRoutes = require("./routes");


let fullMongoUrl = `${mongoConfig.serverUrl + mongoConfig.database}`;
mongoose.Promise = global.Promise;

app.use(static);
//app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());
// Connecting to the database
mongoose.connect(fullMongoUrl, { keepAlive: 120 })
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    console.log(err);
    process.exit();
});
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
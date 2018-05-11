const Game = require('./models/games.js');
const League = require('./models/leagues.js');
const Team = require('./models/teams.js');
const User = require('./models/users');
const team = require('./controllers/teams');
const league = require('./controllers/leagues');
const user = require('./controllers/users');
const game = require('./controllers/games');
const mongoose = require('mongoose');
const settings = require('./config/settings');
const mongoConfig = settings.mongoConfig;
let fullMongoUrl = `${mongoConfig.serverUrl + mongoConfig.database}`;

exports.seedDB = function() {
    mongoose.Promise = global.Promise;
    mongoose.connect(fullMongoUrl, { keepAlive: 120 })
        .then(() => {
        console.log("Cleaning DB");   
        Game.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("success");
            }
        });
        League.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("success");
            }
        });
        Team.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("success");
            }
        });
        User.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("success");
            }
        });
        console.log("DB's cleaned, seeding now...");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        console.log(err);
        process.exit();
});

}
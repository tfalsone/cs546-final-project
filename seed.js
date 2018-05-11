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
            cleanDB();
            //fillDB();

    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        console.log(err);
        process.exit();
});
}

function cleanDB(){
    console.log("Cleaning DB");   
        Game.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                League.remove({}, function(err) {
                    if (err) {
                        console.log(err)
                    } else {
                        Team.remove({}, function(err) {
                            if (err) {
                                console.log(err)
                            } else {
                                User.remove({}, function(err) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log("success");
                                        console.log("DB's cleaned, seeding now...");
                                        fillDB();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
}

async function fillDB(){
    var user1 = await user.createUser("Michael", "Janvier", "mjanvier@stevens.edu", "Pass123");
    var user2 = await user.createUser("Hunter", "Bartholomew", "hbart@stevens.edu", "Pass123");
    var user3 = await user.createUser("Scott", "Russell", "srussel@stevens.edu", "Pass123");
    var user4 = await user.createUser("Thomas", "Falsone", "tfalsone@stevens.edu", "Pass123");

    var user5 = await user.createUser("Joe", "Schmoe", "jchmoe@stevens.edu", "Pass123");
    var user6 = await user.createUser("John", "Doe", "jdoe@stevens.edu", "Pass123");

    console.log(user1);
    var league1 = await league.createLeague("8008 Orginial", "Football");
    var league2 = await league.createLeague("The Second Coming", "Golf");

    var team1 = await team.createTeam("8008 Boyz", league1._id);
    var team2 = await team.createTeam("The Other Guys", league1._id);

    team.addUser(team1._id, user1._id);
    team.addUser(team1._id, user2._id);
    team.addUser(team1._id, user3._id);
    team.addUser(team1._id, user4._id);

    team.addUser(team2._id, user5._id);
    team.addUser(team2._id, user6._id);

    var game1 = await game.createGame(league1._id, team1._id, team2._id, "2018-05-09T15:23:38.654Z", "Schafer Lawn");
    var game2 = await game.createGame(league1._id, team1._id, team2._id, new Date(), "Schafer Lawn");

    await game.updateScore(game1._id, "5", "3");
    await game.updateScore(game2._id, "7", "0");


    console.log("Done Seeding");
    /*user.addLeague(user1._id, league1._id);
    user.addLeague(user2._id, league1._id);
    user.addLeague(user3._id, league1._id);
    user.addLeague(user4._id, league1._id);

    user.addLeague(user1._id, league2._id);
    user.addLeague(user2._id, league2._id);*/




}
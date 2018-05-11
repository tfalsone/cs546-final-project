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
    user1 = await user.createUser("Michael", "Janvier", "mjanvier@stevens.edu", "Pass123");
    user2 = await user.createUser("Hunter", "Bartholomew", "hbart@stevens.edu", "Pass123");
    user3 = await user.createUser("Scott", "Russell", "srussel@stevens.edu", "Pass123");
    user4 = await user.createUser("Thomas", "Falsone", "tfalsone@stevens.edu", "Pass123");

    user5 = await user.createUser("Joe", "Schmoe", "jchmoe@stevens.edu", "Pass123");
    user6 = await user.createUser("John", "Doe", "jdoe@stevens.edu", "Pass123");

    console.log(user1);
    league1 = await league.createLeague("8008 Orginial", "Football");
    league2 = await league.createLeague("The Second Coming", "Golf");

    team1 = await team.createTeam("8008 Boyz");
    team2 = await team.createTeam("The Other Guys");

    team.addUser(team1._id, user1._id);
    team.addUser(team1._id, user2._id);
    team.addUser(team1._id, user3._id);
    team.addUser(team1._id, user4._id);

    team.addUser(team2._id, user5._id);
    team.addUser(team2._id, user6._id);

    league.addTeam(league1._id, team1._id);
    league.addTeam(league1._id, team2._id);

    game.createGame(league1._id, team1._id, team2._id, new Date(), "Schafer Lawn");
    game.createGame(league1._id, team1._id, team2._id, new Date(), "Schafer Lawn");

    /*user.addLeague(user1._id, league1._id);
    user.addLeague(user2._id, league1._id);
    user.addLeague(user3._id, league1._id);
    user.addLeague(user4._id, league1._id);

    user.addLeague(user1._id, league2._id);
    user.addLeague(user2._id, league2._id);*/




}
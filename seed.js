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

    var user7 = await user.createUser("Mary", "Jane", "mjane@stevens.edu", "Pass123");
    var user8 = await user.createUser("Mike", "Kaspar", "mkaspar@stevens.edu", "Pass123");
    var user9 = await user.createUser("Dan", "Wronka", "dwronka@stevens.edu", "Pass123");

    // console.log(user1);
    var league1 = await league.createLeague("8008 Orginial", "Football");
    var league2 = await league.createLeague("Dodgeball Tournament", "Dodgeball");

    var team1 = await team.createTeam("8008 Boyz", league1._id);
    var team2 = await team.createTeam("The Other Guys", league1._id);
    var team3 = await team.createTeam("A Really Bad Team", league1._id);
    //league.addTeam(league1._id, team1.id);
    //league.addTeam(league1._id, team2.id);
    //league.addTeam(league1._id, team3.id);
    var team4 = await team.createTeam("Cobras", league2._id);
    var team5 = await team.createTeam("Average Joes", league2._id);
    //league.addTeam(league2._id, team4.id);
    //league.addTeam(league2._id, team5.id);

    // console.log(team1);
    // console.log(team1._id);

    team.addUser(team1._id, user1._id);
    user.addTeam(user1._id, team1._id);
    user.addLeague(user1._id, league1._id);
    user.addTeam(user1._id, team4._id);
    user.addLeague(user1._id, league2._id);

    team.addUser(team1._id, user2._id);
    user.addTeam(user2._id, team1._id);
    user.addLeague(user2._id, league1._id);
    user.addTeam(user2._id, team4._id);
    user.addLeague(user2._id, league2._id);

    team.addUser(team1._id, user3._id);
    user.addTeam(user3._id, team1._id);
    user.addLeague(user3._id, league1._id);
    user.addTeam(user3._id, team4._id);
    user.addLeague(user3._id, league2._id);

    team.addUser(team1._id, user4._id);
    user.addTeam(user4._id, team1._id);
    user.addLeague(user4._id, league1._id);
    user.addTeam(user4._id, team4._id);
    user.addLeague(user4._id, league2._id);
    
    team.addUser(team2._id, user5._id);
    user.addTeam(user5._id, team2._id);
    user.addLeague(user5._id, league1._id);
    user.addTeam(user5._id, team5._id);
    user.addLeague(user5._id, league2._id);

    team.addUser(team2._id, user6._id);
    user.addTeam(user6._id, team2._id);
    user.addLeague(user6._id, league1._id);
    user.addTeam(user6._id, team5._id);
    user.addLeague(user6._id, league2._id);

    team.addUser(team3._id, user7._id);
    user.addTeam(user7._id, team3._id);
    user.addLeague(user7._id, league1._id);
    user.addTeam(user7._id, team5._id);
    user.addLeague(user7._id, league2._id);

    team.addUser(team3._id, user8._id);
    user.addTeam(user8._id, team3._id);
    user.addLeague(user8._id, league1._id);
    user.addTeam(user8._id, team5._id);
    user.addLeague(user8._id, league2._id);

    team.addUser(team3._id, user9._id);
    user.addTeam(user9._id, team3._id);
    user.addLeague(user9._id, league1._id);
    user.addTeam(user9._id, team5._id);
    user.addLeague(user9._id, league2._id);

    var game1 = await game.createGame(league1._id, team1._id, team2._id, "2018-05-09T15:23:38.654Z", "Schafer Lawn");
    var game2 = await game.createGame(league1._id, team1._id, team2._id, new Date(), "Schafer Lawn");
    var game3 = await game.createGame(league1._id, team1._id, team2._id, "2018-05-13T15:00:00.654Z", "Babbio Garage");
    var game4 = await game.createGame(league1._id, team1._id, team3._id, "2018-05-10T13:00:00.654Z", "Turf");
    var game5 = await game.createGame(league1._id, team2._id, team3._id, "2018-05-10T15:00:00.654Z", "Turf")

    var game6 = await game.createGame(league2._id, team4._id, team5._id, "2018-05-06T13:00:38.654Z", "Canavan Gym");
    var game7 = await game.createGame(league2._id, team4._id, team5._id, "2018-05-07T13:00:38.654Z", "Canavan Gym");

    await game.updateScore(game1._id, "5", "3");
    await game.updateScore(game2._id, "7", "0");
    await game.updateScore(game4._id, "3", "10");
    await game.updateScore(game5._id, "5", "7");

    await game.updateScore(game6._id, "3", "2");
    await game.updateScore(game7._id, "5", "7");


    console.log("Done Seeding");
    /*user.addLeague(user1._id, league1._id);
    user.addLeague(user2._id, league1._id);
    user.addLeague(user3._id, league1._id);
    user.addLeague(user4._id, league1._id);
    user.addLeague(user1._id, league2._id);
    user.addLeague(user2._id, league2._id);*/




}
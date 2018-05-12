const Game = require('../models/games.js');
const League = require('../models/leagues.js');
const Team = require('../models/teams.js');
const User = require('../models/users');
const team = require('./teams');
const league = require('./leagues');
const user = require('./users');
const game = require('./games');

exports.getLeague = async (req, res) => {
    let teams = await Team.find({
        "roster": req.params.userId
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return user;
    }).catch(err => {
        if (err.kind === 'String') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });

    let leagueIdArray = [];
    teams.forEach(element => {
        element.record.forEach(rec => {
            leagueIdArray.push(rec.leagueId);
        });
    });

    console.log(leagueIdArray);
    
    for(var i = 0; i < teams.length; i++){
        for(var j = 0; j < teams[i].roster.length; j++){
            let u = await user.getUserById(teams[i].roster[j]);
            teams[i].roster[j] = u.firstName + " " + u.lastName;
        }
    }




    console.log(teams);
    //console.log("Upcoming games", upcomingGames);
    //console.log("Recent games", recentGames);
    res.render("leagues", {});
};
const Game = require('../models/games.js');
const League = require('../models/leagues.js');
const Team = require('../models/teams.js');
const User = require('../models/users');
const team = require('./teams');
const league = require('./leagues');
const user = require('./users');
const game = require('./games');


exports.getHome = async (req, res) => {
    let currentUser = await User.findById(req.params.userId)
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return user;
    }).catch(err => {
        if(err.kind === 'String') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });


    let recentGames = await Game.find( {  $and: [
        {
        $or: 
        [ {"team1": currentUser._id} , {"team2": currentUser._id} ]
    }, 
    {"time": {"$lt": new Date()} }] })
    .then(games => {
        if (!games) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return games;
    }).catch(err => {
        if(err.kind === 'String') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });

    let leagueIdArray = recentGames.map(a => a.leagueId);
    console.log(leagueIdArray);

    let leagues = await League.find( {"_id": { $in: leagueIdArray }}   )
    .then(leagues => {
        return leagues;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving leagues."
        });
    });


    var finalList = [];
    for(var i = 0; i < recentGames.length; i++){
        for(var j = 0; j < leagues.length; j++){
            if(leagues[j]._id == recentGames[i].leagueId){
                var tmp = {
                    leagueName: leagues[j].name,
                    leagueSport: leagues[j].sport,
                    _id: recentGames[i]._id,
                    team1: recentGames[i].team1, 
                    team2: recentGames[i].team2,
                    time: recentGames[i].time,
                    location: recentGames[i].location,
                    score: {team1Score: recentGames[i].team1Score, team2Score: recentGames[i].team2Score}
                }
                finalList.push(tmp);
            }
        }
    }

    console.log(finalList);
    res.render("home", finalList);
    //res.send(finalList);
};


exports.getProfile = (req, res) => {

};

exports.getAddTeam = (req, res) => {

};

exports.getTeams = (req, res) => {

};
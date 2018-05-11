const Game = require('../models/games.js');
const League = require('../models/leagues.js');
const Team = require('../models/teams.js');
const User = require('../models/users');
const team = require('./teams');
const league = require('./leagues');
const user = require('./users');
const game = require('./games');


exports.getAddTeam = async (req, res) => {
    league.findAll()
    .then(leagues => {
    console.log(leagues);
    //res.send(leagues);
    res.render("admin_add_team", {leagues});
    });
};

exports.getAddLeague = (req, res) => {
    res.render("admin_add_league");
};

exports.getTeams = async (req, res) => {
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

    let teamIdArray = teams.map(a => a._id);
    
    for(var i = 0; i < teams.length; i++){
        for(var j = 0; j < teams[i].roster.length; j++){
            let u = await user.getUserById(teams[i].roster[j]);
            teams[i].roster[j] = u.firstName + " " + u.lastName;
        }
    }

    

    let upcomingGames = await Game.find({
        $and: [{
                $or: [{
                    "team1": teamIdArray
                }, {
                    "team2": teamIdArray
                }]
            },
            {
                "time": {
                    "$gte": new Date()
                }
            }
        ]
    })
    .then(games => {
        if (!games) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return games;
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

    for(var i = 0; i < upcomingGames.length; i++){
        let l = await league.findOne(upcomingGames[i].leagueId);
        let team1 = await team.findOne(upcomingGames[i].team1);
        let team2 = await team.findOne(upcomingGames[i].team2);
        upcomingGames[i].leagueId = l.name;
        upcomingGames[i].team1 = team1.name;
        upcomingGames[i].team2 = team2.name;
    }

    let recentGames = await Game.find({
        $and: [{
                $or: [{
                    "team1": teamIdArray
                }, {
                    "team2": teamIdArray
                }]
            },
            {
                "time": {
                    "$lt": new Date()
                }
            }
        ]
    })
    .then(games => {
        if (!games) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return games;
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

    for(var i = 0; i < recentGames.length; i++){
        let l = await league.findOne(recentGames[i].leagueId);
        let team1 = await team.findOne(recentGames[i].team1);
        let team2 = await team.findOne(recentGames[i].team2);
        recentGames[i].leagueId = l.name;
        recentGames[i].team1 = team1.name;
        recentGames[i].team2 = team2.name;
    }


    console.log(teams);
    console.log("Upcoming games", upcomingGames);
    console.log("Recent games", recentGames);



    res.render("teams", {teams: teams,
                        upcomingGames: upcomingGames,
                        recentGames: recentGames
    });
};

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
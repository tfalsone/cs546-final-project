const Game = require('../models/games.js');
const team = require("./teams");
const uuid = require("node-uuid");


exports.findAll = function() {
    return Game.find()
    .then(game => {
        return game;
        //res.send(game);
    }).catch(err => {
        console.log(err.message || "Some error occurred while retrieving games.");
    });
};

exports.createGame = function(leagueId, team1, team2, time, location) {

    // Create a Note
    const game = new Game({
        _id: uuid.v4(),
        leagueId: leagueId,
        team1: team1,
        team2: team2,
        time: time,
        location: location,
        score: {team1Score: "-", team2Score: "-"}
    });

    // Save Note in the database
    return game.save()
    .then(data => {
        return game;
       // res.redirect("/");
    }).catch(err => {
        console.log(err.message || "Some error occurred while creating the Game.");
    });
};


exports.updateScore = function(gameId, team1, team2) {
    return Game.findByIdAndUpdate(gameId, {
        $set: {
            "score.team1Score": team1,
            "score.team2Score": team2
        }
    }, {new: true})
    .then(game => {
        if(!game) {
                console.log("Game not found with id " + gameId);            
        }

        if(Number(team1) == Number(team2)){
        } else if (Number(team1) > Number(team2)){
            team.updateWin(game.team1, game.leagueId);
            team.updateLoss(game.team2, game.leagueId);
        } else {
            team.updateWin(game.team2, game.leagueId);
            team.updateLoss(game.team1, game.leagueId);
        }
        return game;
        //res.send(game);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            console.log(err.message || "Game not found with id " + gameId);                
        }
            console.log("Error retrieving Game with id " + gameId);
    });
};

exports.delete = function(gameId) {
    return Game.findByIdAndRemove(gameId)
    .then(game => {
        if(!game) {
            console.log("Game not found with id " + gameId);
        }
        return true;
        //res.send({message: "Game deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            console.log("Game not found with id " + gameId);                
        }
        console.log("Could not delete Game with id " + gameId);
    });
};

exports.findOne = function(gameId) {
    return Game.findById(gameId)
    .then(game => {
        if(!game) {
            console.log("Game not found with id " + gameId);            
        }
        return game;
        //res.send(game);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            console.log("Game not found with id " + gameId);                
        }
        console.log("Error retrieving Game with id " + gameId);
    });
};



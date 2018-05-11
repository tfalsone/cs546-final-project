const League = require('../models/leagues.js');
const uuid = require("node-uuid");


// Retrieve and return all leagues from the database.
exports.findAll = function () {
    return League.find()
    .then(leagues => {
        return leagues;
    }).catch(err => {
        console.log(err.message|| "Some error occurred while retrieving leagues.");
    });
};

exports.createLeague = function(name, sport) {
    // Create a Note
    const league = new League({
        _id: uuid.v4(),
        name: name, 
        sport: sport, 
        teams: []
    });

    // Save Note in the database
    return league.save()
    .then(data => {
        return league;
    }).catch(err => {
        console.log(err.message|| "Some error occurred while creating the League.");
    });
};

exports.findOne = function(leagueId) {
    return League.findById(leagueId)
    .then(league => {
        if(!league) {
            console.log("League not found with id " + leagueId);            
        }
        return league;
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            console.log("League not found with id " + leagueId);
        }
            console.log("Error retrieving League with id " + leagueId);
    });
};

exports.delete = function(leagueId) {
    return League.findByIdAndRemove(leagueId)
    .then(league => {
        if(!league) {
                console.log("League not found with id " + leagueId);
        }
        return true;
        //res.send({message: "League deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            console.log("League not found with id " + leagueId);                
        }
            console.log("Could not delete League with id " + leagueId);
    });
};


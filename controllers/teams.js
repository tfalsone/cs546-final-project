const Team = require('../models/teams.js');
const uuid = require("node-uuid");

exports.findAll = function() {
    return Team.find()
    .then(team => {
        return team
        //res.send(team);
    }).catch(err => {
        console.log(err.message || "Some error occurred while retrieving teams.");
    });
};

exports.createTeam = function(name) {

    const team = new Team({
        _id: uuid.v4(),
        name: name,
        roster: [],
        record: []
    });
    return team.save()
    .then(data => {
        return team;
        //console.log(data);
        //res.redirect("/");
    }).catch(err => {
        console.log(err.message || "Some error occurred while creating the Game.");
    });
};

exports.addUser = function(teamId, userId) {
    return Team.findById(teamId)
    .then(team => {
        if(!team) {
            
                console.log( "Team not found with id " + teamId);
        }
        team.roster.push(userId);
        team.save();
        return team;
        //res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            
            console.log( "Team not found with id " + teamId);
        }
            console.log( "Could not add to Team with id " + teamId);
    });
};


exports.removeUser = function(teamId, userId) {
    return Team.findById(teamId)
    .then(team => {
        if(!team) {
            
                console.log( "Team not found with id " + teamId);
        }
        team.roster.pull(userId);
        team.save();
        return team
        //res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            
            console.log( "Team not found with id " + teamId);
        }
            console.log( "Could not add to Team with id " + teamId);
    });
};

exports.addLeague = function(teamId, leagueId) {
    return Team.findById(teamId)
    .then(team => {
        if(!team) {
            
                console.log( "Team not found with id " + teamId);
        }
        var record = {
            leagueId: leagueId,
            wins: 0,
            losses: 0
        };
        team.record.push(record);
        team.save();
        return team;
        //res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            
            console.log( "Team not found with id " + teamId);
        }
            console.log( "Could not add to Team with id " + teamId);
    });
};


exports.removeLeague = function(teamId, leagueId) {
    return Team.update({_id : teamId }, { "$pull": {"record": { "leagueId": leagueId}}}, { safe: true })
    .then(team => {
        if(!team) {
            
                console.log( "Team not found with id " + teamId);
        }
        return team;
        //res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            
                console.log( "Team not found with id " + teamId);
        }
        
            console.log( "Could not remove League from Team with id " + teamId);
    });
};

exports.updateWin = function(teamId, leagueId) {
    return Team.update({"_id" : teamId, "record.leagueId": leagueId }, {"$inc" : {"record.$.wins": 1}}, { safe: true })
    .then(team => {
        if(!team) {
            
                console.log( "Team not found with id " + teamId);            
        }
        return team;
        //res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            
                console.log( "Team not found with id " + teamId);                
        }
            console.log( "Error retrieving Team with id " + teamId);
    });
};

exports.updateLoss = function(teamId, leagueId) {
    return Team.update({"_id" : teamId, "record.leagueId": leagueId }, {"$inc" : {"record.$.losses": 1}}, { safe: true })
    .then(team => {
        if(!team) {
            
                console.log( "Team not found with id " + teamId);            
        }
        return team;
        //res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            
                console.log( "Team not found with id " + teamId);                
        }
            console.log( "Error retrieving Team with id " + teamId);
    });
};

exports.delete = function (teamId){
    return Team.findByIdAndRemove(teamId)
    .then(team => {
        if(!team) {
            
                console.log( "Team not found with id " + teamId);
        }
        return true;
        //console.log( "Team deleted successfully!");
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            
                console.log( "Team not found with id " + teamId);                
        }
            console.log( "Team not delete Game with id " + teamId);
    });
};

exports.findOne = function (teamId){
    return Team.findById(teamId)
    .then(team => {
        if(!team) {
            
            console.log( "Team not found with id " + teamId);            
        }
        return team;
        //res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            
                console.log( "Team not found with id " + teamId);                
        }
            console.log( "Error retrieving Team with id " + teamId);
    });
};

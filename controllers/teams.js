const Team = require('../models/teams.js');
const uuid = require("node-uuid");

exports.findAll = (req, res) => {
    Team.find()
    .then(team => {
        res.send(team);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving teams."
        });
    });
};

exports.createTeam = (req, res) => {
    console.log(req.body);
    if(!req.body.name) {
        return res.status(400).send({
            message: "Incomplete Form"
        });
    }

    const team = new Team({
        _id: uuid.v4(),
        name: req.body.name,
        roster: [],
        record: []
    });
    team.save()
    .then(data => {
        console.log(data);
        res.redirect("/");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Game."
        });
    });
};

exports.addUser = (req, res) => {
    Team.findById(req.params.teamId)
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        team.roster.push(req.params.userId);
        team.save();

        res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        return res.status.send({
            message: "Could not add to Team with id " + req.params.teamId
        });
    });
};


exports.removeUser = (req, res) => {
    Team.findById(req.params.teamId)
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        team.roster.pull(req.params.userId);
        team.save();

        res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        return res.status.send({
            message: "Could not add to Team with id " + req.params.teamId
        });
    });
};

exports.addLeague = (req, res) => {
    Team.findById(req.params.teamId)
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        var record = {
            leagueId: req.params.leagueId,
            wins: 0,
            losses: 0
        };
        team.record.push(record);
        team.save();

        res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        return res.status.send({
            message: "Could not add to Team with id " + req.params.teamId
        });
    });
};


exports.removeLeague = (req, res) => {
    Team.update({_id : req.params.teamId }, { "$pull": {"record": { "leagueId": req.params.leagueId}}}, { safe: true })
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        res.send(team);
    }).catch(err => {
        if(err.kind === 'String' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        return res.status(404).send({
            message: "Could not remove League from Team with id " + req.params.teamId
        });
    });
};

exports.updateWin = (req, res) => {
    Team.update({"_id" : req.params.teamId, "record.leagueId": req.params.leagueId }, {"$inc" : {"record.$.wins": 1}}, { safe: true })
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });            
        }
        res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Team with id " + req.params.teamId
        });
    });
};

exports.updateLoss = (req, res) => {
    Team.update({"_id" : req.params.teamId, "record.leagueId": req.params.leagueId }, {"$inc" : {"record.$.losses": 1}}, { safe: true })
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });            
        }
        res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Team with id " + req.params.teamId
        });
    });
};

exports.delete = (req, res) => {
    Team.findByIdAndRemove(req.params.teamId)
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });
        }
        res.send({message: "Team deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });                
        }
        return res.status(500).send({
            message: "Team not delete Game with id " + req.params.teamId
        });
    });
};

exports.findOne = (req, res) => {
    Team.findById(req.params.teamId)
    .then(team => {
        if(!team) {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });            
        }
        res.send(team);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Team not found with id " + req.params.teamId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Team with id " + req.params.teamId
        });
    });
};

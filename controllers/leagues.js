const League = require('../models/leagues.js');
const uuid = require("node-uuid");

// Retrieve and return all leagues from the database.
exports.findAll = (req, res) => {
    League.find()
    .then(leagues => {
        res.send(leagues);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving leagues."
        });
    });
};

exports.createLeague = (req, res) => {
    // Validate request
    console.log(req.body);
    if(!req.body.name) {
        return res.status(400).send({
            message: "League name can not be empty"
        });
    }

    // Create a Note
    const league = new League({
        _id: uuid.v4(),
        name: req.body.name, 
        sport: req.body.sport, 
        teams: req.body.teams || [],
        games: req.body.games || []
    });

    // Save Note in the database
    league.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the League."
        });
    });
};

exports.findOne = (req, res) => {
    League.findById(req.params.leagueId)
    .then(league => {
        if(!league) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.leagueId
            });            
        }
        res.send(league);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.leagueId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.leagueId
        });
    });
};

exports.delete = (req, res) => {
    League.findByIdAndRemove(req.params.leagueId)
    .then(league => {
        if(!league) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.leagueId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.leagueId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.leagueId
        });
    });

};


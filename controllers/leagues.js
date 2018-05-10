const League = require('../models/leagues.js');

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
        _id: "Temp",
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

const League = require('../models/leagues.js');
const uuid = require("node-uuid");


// Retrieve and return all leagues from the database.
exports.findAll = (req, res) => {
    League.find()
    .then(leagues => {
        res.render("admin_add_team", {leagues});
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
    });

    // Save Note in the database
    league.save()
    .then(data => {
        res.redirect("/");
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
                message: "League not found with id " + req.params.leagueId
            });            
        }
        res.send(league);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "League not found with id " + req.params.leagueId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving League with id " + req.params.leagueId
        });
    });
};

exports.delete = (req, res) => {
    League.findByIdAndRemove(req.params.leagueId)
    .then(league => {
        if(!league) {
            return res.status(404).send({
                message: "League not found with id " + req.params.leagueId
            });
        }
        res.send({message: "League deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "League not found with id " + req.params.leagueId
            });                
        }
        return res.status(500).send({
            message: "Could not delete League with id " + req.params.leagueId
        });
    });
};

exports.addGame = (req, res) => {
    var game = {
        _id: uuid.v4(),
        teams: {team1: req.body.team1, team2: req.body.team1},
        time: req.body.date,
        location: req.body.location,
        score: {team1: "-", team2: "-"}
    };
    League.findById(req.params.leagueId)
    .then(league => {
        if(!league) {
            return res.status(404).send({
                message: "League not found with id " + req.params.leagueId
            });
        }
        league.games.push(game);
        league.save();

        res.send(league);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "League not found with id " + req.params.leagueId
            });                
        }
        return res.status(500).send({
            message: "Could not delete League with id " + req.params.leagueId
        });
    });
};

exports.updateScore = (req, res) => {
    var score = {team1: req.body.scoreTeam1, team2: req.body.scoreTeam2};
    League.findOne({ "games._id": req.params.gameId})
    .then(game => {
        if(!game) {
            return res.status(404).send({
                message: "League not found with id " + req.params.gameId
            });
        }
        games.score(score);
        games.save();

        res.send(league);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "League not found with id " + req.params.leagueId
            });                
        }
        return res.status(500).send({
            message: "Could not delete League with id " + req.params.leagueId
        });
    });

};
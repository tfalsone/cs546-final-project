const Game = require('../models/games.js');
const uuid = require("node-uuid");


exports.findAll = (req, res) => {
    Game.find()
    .then(game => {
        res.send(game);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving games."
        });
    });
};

exports.createGame = (req, res) => {
    // Validate request
    console.log(req.body);
    if(!req.body.leagueId || !req.body.team1 || !req.body.team2 || !req.body.time || !req.body.location) {
        return res.status(400).send({
            message: "Incomplete Form"
        });
    }

    // Create a Note
    const game = new Game({
        _id: uuid.v4(),
        leagueId: req.body.leagueId,
        teams: {team1: req.body.team1, team2: req.body.team2},
        time: req.body.time,
        location: req.body.location,
        score: {team1Score: "-", team2Score: "-"}
    });

    // Save Note in the database
    game.save()
    .then(data => {
        console.log(data);
        res.redirect("/");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Game."
        });
    });
};


exports.updateScore = (req, res) => {
    Game.findByIdAndUpdate(req.params.gameId, {
        $set: {
            "score.team1Score": req.body.team1,
            "score.team2Score": req.body.team2
        }
    }, {new: true})
    .then(game => {
        if(!game) {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });            
        }
        res.send(game);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Game with id " + req.params.gameId
        });
    });
};

exports.delete = (req, res) => {
    Game.findByIdAndRemove(req.params.gameId)
    .then(game => {
        if(!game) {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });
        }
        res.send({message: "Game deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Game with id " + req.params.gameId
        });
    });
};

exports.findOne = (req, res) => {
    Game.findById(req.params.gameId)
    .then(game => {
        if(!game) {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });            
        }
        res.send(game);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Game not found with id " + req.params.gameId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Game with id " + req.params.gameId
        });
    });
};



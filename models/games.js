const mongoose = require('mongoose');
var Schema = mongoose.Schema

const gameSchema = Schema({
        _id: String,
        leagueId: String,
        teams: {team1: String, team2: String},
        time: Date,
        location: String,
        score: {team1Score: String, team2Score: String}
});

module.exports = mongoose.model('Game', gameSchema);
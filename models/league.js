const mongoose = require('mongoose')
var Schema = mongoose.Schema

const leagueSchema = Schema({
    _id: String,
    name: String,
    sport: String,
    teams: [String],
    games: [{
        gameId: String,
        teams: {team1: String, team2: String},
        time: Date,
        location: String,
        score: {team1: String, team2: String}
    }]
});

module.exports = mongoose.model('League', leagueSchema);
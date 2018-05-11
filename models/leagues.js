const dbConnection = require("../config/mongoConnection");
const mongoose = require('mongoose')
const data = require("../data/");
const leagues = data.leagues;
var Schema = mongoose.Schema

/*
const leagueSchema = Schema({
    id: String,
    name: String,
    sport: String,
    teams: [String],
    games: [{
        gameID: String,
        teams: {team1: String, team2: String},
        time: String,
        location: String,
        score: {team1: int, team2: int}
    }]
});
*/
//module.exports = mongoose.model('League', leagueSchema);
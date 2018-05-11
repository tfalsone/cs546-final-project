const mongoose = require('mongoose');
var Schema = mongoose.Schema

const leagueSchema = Schema({
    _id: String,
    name: String,
    sport: String,
    teams: [String]
});

module.exports = mongoose.model('League', leagueSchema);
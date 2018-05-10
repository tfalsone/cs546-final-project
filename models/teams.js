const dbConnection = require("../config/mongoConnection");
const mongoose = require('mongoose')
const data = require("../data/");
const teams = data.teams;
var Schema = mongoose.Schema

const teamSchema = Schema({
    id: String,
    name: String,
    roster: [String],
    record: [{
        leagueId: String,
        wins: int,
        losses: int
    }]
});

module.exports = mongoose.model('Team', teamSchema);
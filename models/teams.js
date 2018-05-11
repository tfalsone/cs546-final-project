// const dbConnection = require("../config/mongoConnection");
const mongoose = require('mongoose')
// const data = require("../data/");
// const teams = data.teams;
var Schema = mongoose.Schema

const teamSchema = Schema({
    _id: String,
    name: {
        type: String,
        unique: true
    },
    roster: [String],
    record: [{
        leagueId: String,
        wins: Number,
        losses: Number
    }]
});

module.exports = mongoose.model('Team', teamSchema);
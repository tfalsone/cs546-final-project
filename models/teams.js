// const dbConnection = require("../config/mongoConnection");
const mongoose = require('mongoose')
// const data = require("../data/");
// const teams = data.teams;
var Schema = mongoose.Schema

const teamSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true
    },
    roster: [Schema.Types.ObjectId],
    record: [{
        leagueId: Schema.Types.ObjectId,
        wins: Number,
        losses: Number
    }]
});

module.exports = mongoose.model('Team', teamSchema);
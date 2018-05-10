const dbConnection = require("../config/mongoConnection");
const mongoose = require('mongoose')
const data = require("../data/");
const users = data.users;
var Schema = mongoose.Schema

const userSchema = Schema({
    _id: String,
    sessionId: String,
    lastName: String,
    firstName: String,
    email: String,
    hashPwd: String,
    teams: [String],
    leagues: [String],
    profileType: String
});

module.exports = mongoose.model('User', userSchema);
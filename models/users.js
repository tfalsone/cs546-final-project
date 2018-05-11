// const dbConnection = require("../config/mongoConnection");
const mongoose = require('mongoose')
// const data = require("../data/");
// const users = data.users;
var Schema = mongoose.Schema

const userSchema = Schema({
    // _id: Schema.Types.ObjectId,
    _id: String,
    sessionId: String,
    lastName: String,
    firstName: String,
    email: {
        type: String,
        unique: true
    },
    hashPwd: String,
    teams: [Schema.Types.ObjectId],
    leagues: [Schema.Types.ObjectId],
    profileType: String
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose')
var Schema = mongoose.Schema

const userSchema = Schema({
    _id: String,
    sessionId: String,
    lastName: String,
    firstName: String,
    email: {
        type: String,
        unique: true
    },
    hashPwd: String,
    teams: [String],
    leagues: [String],
    profileType: String
});

module.exports = mongoose.model('User', userSchema);
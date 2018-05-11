const User = require('../models/users');
const uuid = require("node-uuid");
const bcrypt = require("bcryptjs");
const saltRounds = 16;

// return all users from database
exports.getAllUsers = function () {
    return User.find()
        .then(users => {
            return users;
            //res.send(users);
        }).catch(err => {

            console.log(err.message || "Unable to get all users");
        });
};

exports.getUserById = function (userId) {
    return User.findById(userId)
        .then(user => {
            if (!user) {

                console.log("User not found with id " + userId);
            }
            return user;
            //res.send(user);
        }).catch(err => {
            if (err.kind === 'String') {

                console.log("User not found with id " + userId);
            }

            console.log("Error retrieving User with id " + userId);
        });
};

exports.getUserByEmail = function (email) {
    return User.find({
            email: email
        })
        .then(user => {
            if (!user) {

                console.log("User not found with email " + email);
            }
            return user
            //res.send(user);
        }).catch(err => {
            if (err.kind === 'String') {

                console.log("User not found with email " + email);
            }

            console.log("Error retrieving User with email " + email);
        });
};

// add new user
exports.createUser = function (firstName, lastName, email, password) {

    hash = bcrypt.hashSync(password, saltRounds);

    const user = new User({
        _id: uuid.v4(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        teams: [],
        leagues: [],
        hashPwd: hash,
        // hashPwd: password,
        profileType: "player",
        // todo - what to do with sessionId?
        sessionId: "Temp"
    });

    return user.save()
        .then(data => {
            return user;
            //res.send(data);
        }).catch(err => {

            console.log(err.message || "An error occured when creating the new player");
        });
};

exports.removeUser = function (userId) {
    return User.findByIdAndRemove(userId)
        .then(user => {
            if (!user) {

                console.log("User not found with id " + userId);
            }

            console.log("User deleted");
            return true;
        }).catch(err => {
            if (err.kind === 'String' || err.name === 'NotFound') {

                console.log("User not found with id " + userId);
            }
            console.log("Could not delete User with id " + userId);
        });
};

exports.addTeam = function (userId, teamId) {
    return User.findById(userId)
        .then(user => {
            if (!user) {

                console.log("!!User not found with id " + userId);
            }

            user.teams.push(teamId);
            user.save();
            return user;
            //res.send(user);
        }).catch(err => {
            if (err.kind === 'String' || err.name === 'NotFound') {

                console.log("User not found with id " + userId);
            }
            console.log("Could not add team with id " + userId);
        });
};

exports.addLeague = function (userId, leagueId) {
    return User.findById(userId)
        .then(user => {
            if (!user) {

                console.log("User not found with id " + userId);
            }
            user.leagues.push(leagueId);
            user.save();
            return user;
            //res.send(user);
        }).catch(err => {
            if (err.kind === 'String' || err.name === 'NotFound') {

                console.log("User not found with id " + userId);
            }
            console.log("Could not add league with id " + leagueId);
        });
};

exports.removeTeam = function (userId, teamId) {
    return User.findById(userId)
        .then(user => {
            if (!user) {

                console.log("User not found with id " + userId);
            }
            user.teams.pull(teamId);
            user.save();
            console.log("Team deleted from user profile");
            return user;
        }).catch(err => {
            if (err.kind === 'String' || err.name === 'NotFound') {

                console.log("User not found with id " + userId);
            }
            console.log("Could not delete team with id " + teamId);
        });
};

exports.removeLeague = function (userId, leagueId) {
    return User.findById(userId)
        .then(user => {
            if (!user) {

                console.log("User not found with id " + userId);
            }
            user.leagues.pull(leagueId);
            user.save();

            console.log("League deleted from user profile");
            return user;
        }).catch(err => {
            if (err.kind === 'String' || err.name === 'NotFound') {

                console.log("User not found with id " + userId);
            }
            console.log("Could not delete league with id " + leagueId);
        });
};
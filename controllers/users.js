const User = require('../models/users');
const uuid = require("node-uuid");
const bcrypt = require("bcryptjs");
const saltRounds = 16;

// return all users from database
exports.getAllUsers = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Unable to get all users"
        });
    });
};

exports.getUserById = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });
};

// add new user
exports.createUser = (req, res) => {
    console.log(req.body);

    // error checking
    if(!(req.body.firstName || req.body.lastName || req.body.email)) {
        return res.status(400).send({
            message: "One or more fields are missing"
        });
    }

    hash = bcrypt.hash(req.body.password, saltRounds);
    
    const user = new User({
        _id: uuid.v4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        teams: req.body.teams || [],
        leagues: req.body.leagues || [],
        // hashPwd: hash,
        hashPwd: req.body.password,
        profileType: "player",
        // todo - what to do with sessionId?
        sessionId: "Temp"
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err=> {
        res.status(500).send({
            message: err.message || "An error occured when creating the new player"
        });
    });
};

exports.removeUser = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }

        res.send({ message: "User deleted" });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status.send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};

exports.addTeam = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "!!User not found with id " + req.params.userId
            });
        }
        
        user.teams.push(req.body.teamId);
        user.save();

        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status.send({
            message: "Could not add team with id " + req.params.userId
        });
    });
};

exports.addLeague = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        user.leagues.push(req.body.leagueId);
        user.save();

        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status.send({
            message: "Could not add league with id " + req.params.leagueId
        });
    });
};

exports.removeTeam = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        user.teams.pull(req.body.teamId);
        user.save();

        res.send({ message: "Team deleted from user profile" });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status.send({
            message: "Could not delete team with id " + req.params.teamId
        });
    });
};

exports.removeLeague = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        user.leagues.pull(req.body.leagueId);
        user.save();

        res.send({ message: "League deleted from user profile" });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status.send({
            message: "Could not delete league with id " + req.params.leagueId
        });
    });
};
const mongoCollections = require("../config/mongoCollection");
const users = mongoCollections.users;
// const teams = mongoCollections.teams;
// const leagues = mongoCollections.leagues;
const uuid = require("node-uuid");
const bcrypt = require("bcryptjs");
const saltRounds = 16;

let exportedMethods = {
    getAllUsers() {
        return users().then(userCollection => {
            return userCollection.find({}).toArray();
        });
    },

    getUserById(id) {
        return users().then(userCollection => {
            return userCollection.findOne({ _id: id }).then(user => {
                if (!user) throw "User not found";

                return user;
            });
        });
    },
/*
    getUsersByTeam(teamId) {
        return users().then(userCollection => {
            // todo - how to search a list of teams within each profile?
            return userCollection.find({  }).then(usersOnTeam => {
                if (!usersOnTeam) throw "Users not found";

                return usersOnTeam.toArray();
            });
        });
    },

    getUsersByLeague(leagueId) {
        return users().then(userCollection => {
            // todo - see above
            return userCollection.find({  }).then(usersInLeague => {
                if (!usersInLeague) throw "Users not found";

                return usersInLeague.toArray();
            });
        });
    },
*/
/*
    addUser(firstName, lastName, email, password) {
        return users().then(userCollection => {
            if(userCollection.find({ email: email })) throw "User with this email already exists";

            hash = bcrypt.hash(password, saltRounds);
            // todo - how to use sessionId?
            let newUser = {
                firstName: firstName,
                lastName: lastName,
                _id = "temp",
                email: email,
                teams: [],
                leagues: [],
                hashPwd: hash,
                profileType: "player",
                sessionId: "temp"
            };

            return userCollection
                .insertOne(newUser)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
                .then(newId => {
                    return this.getUserById(newId);
                });
        });
    },
*/
    removeUser(userId) {
        return users().then(userCollection => {
            return userCollection.removeOne({ _id: userId }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${userId}`;
                }
            });
        });
    },

    addTeam(userId, teamId) {
        return this.getUserById(userId).then(currentUser => {
            return userCollection.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        teams: teamId
                    }
                }
            );
        });
    },

    addLeague(userId, leagueId) {
        return this.getUserById(userId).then(currentUser => {
            return userCollection.updateOne(
                { _id: userId },
                {
                    $addToSet: {
                        leagues: leagueId
                    }
                }
            );
        });
    },

    removeTeam(userId, teamId) {
        return this.getUserById(userId).then(currentUser => {
            return userCollection.updateOne(
                { _id: userId },
                {
                    $pull: {
                        teams: teamId
                    }
                }
            );
        });
    },

    removeLeague(userId, leagueId) {
        return this.getUserById(userId).then(currentUser => {
            return userCollection.updateOne(
                { _id: userId },
                {
                    $pull: {
                        leagues: leagueId
                    }
                }
            );
        });
    }
};
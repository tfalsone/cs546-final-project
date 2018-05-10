const mongoCollections = require("../config/mongoCollection");
const teams = mongoCollections.teams;

let exportedMethods = {
    getAllTeams() {
        return teams().then(teamCollection => {
            return teamCollection.find({}).toArray();
        });
    },

    getTeamById(teamId) {
        return teams.then(teamCollection => {
            return teamCollection.findOne({ teamId: id }).then(team => {
                if (!team) throw "Team not found";

                return team;
            });
        });
    },

    getTeamRoster(teamId) {
        return this.getTeamById(teamId).then(currentTeam => {
            return currentTeam.roster.toArray();
        });
    },

    getTeamName(teamId) {
        return this.getTeamById(teamId).then(currentTeam => {
            return currentTeam.name;
        });
    },

    getTeamRecord(teamId) {
        return this.getTeamById(teamId).then(currentTeam => {
            return currentTeam.record.toArray();
        });
    },

    getTeamRecordByLeague(teamId, leagueId) {
        return this.getTeamRecord(teamId).then(currentRecord => {
            return currentRecord.find({ leagueId: leagueId }).toArray();
        });
    },

    addToRoster(teamId, playerId) {
        return this.getTeamById(teamId).then(currentTeam => {
            return teamCollection.updateOne(
                { id: id },
                {
                    $addToSet: {
                        roster: playerId
                    }
                }
            )
        });
    },

    removeFromRoster(teamId, playerId) {
        return this.getTeamById(teamId).then(currentTeam => {
            return teamCollection.updateOne(
                { id: teamId },
                {
                    $pull: {
                        roster: playerId
                    }
                }
            );
        });
    },

    addTeam(name) {
        return teams().then(teamCollection => {
            if(teamCollection.find({ name: name })) throw "Team name already exists";

            let newTeam = {
                id: uuid.v4(),
                name: name,
                roster: [],
                record: [] // todo - is more needed to initialize?
            };

            return teamCollection.insertOne(newTeam)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
                .then(newId => {
                    return this.getTeamById(newId);
                });
        });
    },

    removeTeam(teamId) {
        return teams().then(teamCollection => {
            return teamCollection.removeOne({ id: teamId }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete team with id of ${teamId}`;
                }
            });
        });
    },

    changeName(teamId, newName) {
        return this.getTeamById(teamId).then(currentTeam => {
            let updatedTeam = { name: newName };

            let updateCommand = { $set: updatedTeam };

            return teamCollection.updateOne({ id: teamId }, updateCommand).then(() => {
                return this.getTeamById(teamId);
            });
        });
    },

    addNewLeague(teamId, leagueId) {
        // Team enrolls in new league (add to record array)
        return this.getTeamById(teamId).then(currentTeam => {
            return teamCollection.updateOne(
                { id: teamId },
                {
                    $addToSet: {
                        record: {
                            leagueId: leagueId,
                            wins: 0,
                            losses: 0
                        }
                    }
                }
            );
        });
    },

    removeLeague(teamId, leagueId) {
        return this.getTeamById(teamId).then(currentTeam => {
            return teamCollection.updateOne(
                { id: teamId },
                {
                    $pull: {
                        record: { leagueId: leagueId }
                    }
                }
            );
        });
    },

    addWinToLeague(teamId, leagueId) {
        return this.getTeamRecordByLeague(teamId, leagueId).then(currentRecord => {
            winCount = currentRecord.wins;

            let newRecord = { wins: winCount++ };

            let updateCommand = { $set: newRecord };

            return currentRecord.updateOne({ leagueId: leagueId }, updateCommand.then(() => {
                return this.getTeamRecordByLeague(teamId, leagueId);
            }));
        });
    },

    addLossToLeague(teamId, leagueId) {
        return this.getTeamRecordByLeague(teamId, leagueId).then(currentRecord => {
            lossCount = currentRecord.losses;

            let newRecord = { losses: lossCount++ };

            let updateCommand = { $set: newRecord };

            return currentRecord.updateOne({ leagueId: leagueId }, updateCommand.then(() => {
                return this.getTeamRecordByLeague(teamId, leagueId);
            }));
        });
    }
};
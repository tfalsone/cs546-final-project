const League = require('../models/league.js');

// Retrieve and return all leagues from the database.
exports.findAll = (req, res) => {
    League.find()
    .then(leagues => {
        res.send(leagues);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving leagues."
        });
    });
};

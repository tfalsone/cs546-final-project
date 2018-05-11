const express = require("express");
const router = express.Router();
const user = require('../controllers/users');

router.get("/", (req, res) => {
    user.getAllUsers()
        .then(users => {
            res.send(users);
            //res.render("admin_add_team", {leagues});
        });
});

router.post("/", (req, res) => {
    // error checking
    if (!(req.body.firstName || req.body.lastName || req.body.email)) {
        return res.status(400).send({
            message: "One or more fields are missing"
        });
    }
    user.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
        .then(u => {
            res.send(u);
            //res.render("admin_add_team", {leagues});
        });
});
/*
    user post needs the following  params:
    first name, last name, email, password
*/

router.get("/:userId", (req, res) => {
    user.getUserById(req.params.userId)
        .then(u => {
            res.send(u);
            //res.render("admin_add_team", {leagues});
        });
});

router.put("/getByEmail", (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({
            message: "Missing email field"
        });
    }
    user.getUserByEmail(req.body.email)
        .then(u => {
            res.send(u);
            //res.render("admin_add_team", {leagues});
        });
});

router.delete("/:userId", (req, res) => {

    user.removeUser(req.params.userId)
        .then(success => {
            if (success) {
                res.redirect("/home");
            } else {
                res.status(404).send({
                    message: "User not deleted " + req.params.userId
                });
            }
        });
});

router.put("/addTeam/:userId", (req, res) => {
    if (!req.body.teamId) {
        return res.status(400).send({
            message: "Missing teamId field"
        });
    }
    user.addTeam(req.params.userId, req.body.teamId)
        .then(u => {
            res.send(u);
            //res.render("admin_add_team", {leagues});
        });
});

router.put("/addLeague/:userId", (req, res) => {
    if (!req.body.leagueId) {
        return res.status(400).send({
            message: "Missing leagueId field"
        });
    }
    user.addLeague(req.params.userId, req.body.leagueId)
        .then(u => {
            res.send(u);
            //res.render("admin_add_team", {leagues});
        });
});

router.put("/removeTeam/:userId", (req, res) => {
    if (!req.body.teamId) {
        return res.status(400).send({
            message: "Missing teamId field"
        });
    }
    user.removeTeam(req.params.userId, req.body.teamId)
        .then(u => {
            res.send(u);
            //res.render("admin_add_team", {leagues});
        });
});

router.put("/removeLeague/:userId", (req, res) => {
    if (!req.body.leagueId) {
        return res.status(400).send({
            message: "Missing leagueId field"
        });
    }
    user.removeLeague(req.params.userId, req.body.leagueId)
        .then(u => {
            res.send(u);
            //res.render("admin_add_team", {leagues});
        });
});

module.exports = router;
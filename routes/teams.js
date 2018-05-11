const express = require("express");
const router = express.Router();
const team = require('../controllers/teams');
// get, post, put, other functions


router.get("/", (req, res) => {
    team.findAll()
    .then(teams => {
        res.send(teams);
        //res.render("admin_add_team", {leagues});
        });
});

router.post("/", (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Incomplete Form"
        });
    }
    team.createTeam(req.body.name, req.body.leagueId)
    .then(t => {
        //res.send(t);
        res.redirect("pages/addTeam");
    });

});

router.get("/updateWin/:teamId/:leagueId", (req, res) => {
team.updateWin(req.params.teamId, req.params.leagueId)
.then(t => {
    res.send(t);
    //res.render("admin_add_team", {leagues});
    });
});

router.get("/updateLoss/:teamId/:leagueId", (req, res) => {
    team.updateLoss(req.params.teamId, req.params.leagueId)
    .then(t => {
        res.send(t);
        //res.render("admin_add_team", {leagues});
        });
    });

router.get("/addLeague/:teamId/:leagueId", (req, res) => {
    team.addLeague(req.params.teamId, req.params.leagueId)
    .then(t => {
        res.send(t);
        //res.render("admin_add_team", {leagues});
    });
});

router.get("/removeLeague/:teamId/:leagueId", (req, res) => {
    team.removeLeague(req.params.teamId, req.params.leagueId)
    .then(t => {
        res.send(t);
        //res.render("admin_add_team", {leagues});
    });
});

router.get("/addUser/:teamId/:userId", (req, res) => {
    team.addUser(req.params.teamId, req.params.userId)
    .then(t => {
        res.send(t);
        //res.render("admin_add_team", {leagues});
    });
});

router.get("/removeUser/:teamId/:userId", (req, res) => {
    team.removeUser(req.params.teamId, req.params.userId)
    .then(t => {
        res.send(t);
        //res.render("admin_add_team", {leagues});
    });
});

router.delete("/:teamId", (req, res) => {
    team.delete(req.params.teamId)
    .then(success => {
        if(success){
            res.redirect("/home");
        }else {
            res.status(404).send({
                message: "Team not deleted " + req.params.teamId
            });                
        }
    });
});

router.get("/:teamId", (req, res) => {
    team.findOne(req.params.teamId)
    .then(t => {
        res.send(t);
    });
});

module.exports = router;
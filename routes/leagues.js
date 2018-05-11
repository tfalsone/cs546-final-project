const express = require("express");
const router = express.Router();
const league = require('../controllers/leagues');
// get, post, put, other functions


//get all leagues
router.get("/", (req, res) => {
    league.findAll()
    .then(leagues => {
    //res.send(leagues);
    console.log(leagues);
    res.render("admin_add_team", {leagues});
    });
});

router.post("/", (req, res) => {
    if(!req.body.name || !req.body.name) {
        return res.status(400).send({
            message: "League name can not be empty"
        });
    }

    league.createLeague(req.body.name, req.body.sport)
    .then(l => {
        res.send(l);
        //res.render("admin_add_team", {leagues});
    });


});


router.put("/:leagueId", (req, res) => {
    if(!req.body.teamId) {
        return res.status(400).send({
            message: "TeamId name can not be empty"
        });
    }
    league.addTeam(req.params.leagueId, req.body.teamId)
    .then(l => {
        res.send(l);
        //res.render("admin_add_team", {leagues});
    });
});

router.get("/:leagueId", (req, res) => {
    league.findOne(req.params.leagueId)
    .then(l => {
        res.send(l);
    });
});

router.delete("/:leagueId", (req, res) => {
    league.delete(req.params.leagueId)
    .then(success => {
        if(success){
            res.redirect("/home");
        }else {
            res.status(404).send({
                message: "League not deleted " + req.params.leagueId
            });                
        }
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const game = require('../controllers/games');

router.get("/", (req, res) => {
    game.findAll()
    .then(games => {
    res.send(games);
    //res.render("admin_add_team", {leagues});
    });
});

router.post("/", (req, res) => {
    if(!req.body.leagueId || !req.body.team1 || !req.body.team2 || !req.body.time || !req.body.location) {
        return res.status(400).send({
            message: "Incomplete Form"
        });
    }   
    game.createGame(req.body.leagueId, req.body.team1, req.body.team2, req.body.time, req.body.location)
    .then(g => {
        res.send(g);
        //res.render("admin_add_team", {leagues});
        });
});

router.put("/updateScore/:gameId", (req, res) => {
    if(!req.body.team1 || !req.body.team2) {
        return res.status(400).send({
            message: "Incomplete Form"
        });
    }   
    game.updateScore(req.params.gameId, req.body.team1, req.body.team2)
    .then(g => {
        res.send(g);
        //res.render("admin_add_team", {leagues});
        });
});

router.delete("/:gameId", (req, res) => {
    game.delete(req.params.gameId)
    .then(success => {
        if(success){
            res.redirect("/home");
        } else {
            res.status(404).send({
                message: "Game not deleted " + req.params.gameId
            });                
        }
    });
});

router.get("/:gameId", (req, res) => {
    game.findOne(req.params.gameId)
    .then(g => {
        res.send(g);
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const team = require('../controllers/teams');
// get, post, put, other functions


router.get("/", team.findAll);

router.post("/", team.createTeam);

router.get("/updateWin/:teamId/:leagueId", team.updateWin);

router.get("/updateLoss/:teamId/:leagueId", team.updateLoss);

router.get("/addLeague/:teamId/:leagueId", team.addLeague);

router.get("/removeLeague/:teamId/:leagueId", team.removeLeague);

router.get("/addUser/:teamId/:userId", team.addUser);

router.get("/removeUser/:teamId/:userId", team.removeUser);

router.delete("/:teamId", team.delete);

router.get("/:teamId", team.findOne);

module.exports = router;
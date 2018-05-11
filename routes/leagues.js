const express = require("express");
const router = express.Router();
const league = require('../controllers/leagues.js');
// get, post, put, other functions


//get all leagues
router.get("/", league.findAll);

router.post("/", league.createLeague);

router.get("/:leagueId", league.findOne);

router.delete("/:leagueId", league.delete);

router.put("/addGame/:leagueId", league.addGame);

module.exports = router;

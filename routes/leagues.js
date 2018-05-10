const express = require("express");
const router = express.Router();
const league = require('../controllers/league.js');
// get, post, put, other functions


//get all leagues
router.get("/", league.findAll);

router.post("/", league.createLeague);

module.exports = router;
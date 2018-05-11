const express = require("express");
const router = express.Router();
const page = require('../controllers/pages');

router.get("/profile/:userId", page.getProfile);

router.get("/addTeam", page.getAddTeam);

router.get("/teams/:userId", page.getTeams);

router.get("/AddLeague", page.getAddLeague);

router.get("/leagues/:userId", page.getLeague);

module.exports = router;
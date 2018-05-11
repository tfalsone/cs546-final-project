const express = require("express");
const router = express.Router();
const page = require('../controllers/pages');

router.get("/home/:userId", page.getHome);

router.get("/profile/:userId", page.getProfile);

router.get("/addTeam", page.getAddTeam);

router.get("/teams/:userId", page.getTeams);

router.get("/AddLeague", page.getAddLeague);

module.exports = router;
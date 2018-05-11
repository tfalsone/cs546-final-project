const express = require("express");
const router = express.Router();
const page = require('../controllers/pages');



router.get("/home/:userId", page.getHome);

router.get("/profile/:userId", page.getProfile);

router.get("/addTeam", page.getAddTeam);

router.get("/teams", page.getTeams);

module.exports = router;
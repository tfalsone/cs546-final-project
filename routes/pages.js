const express = require("express");
const router = express.Router();
const page = require('../controllers/pages');

router.get("/profile/:userId", page.getProfile);

router.get("/addTeam", (req, res) => {
    page.getAddTeam()
    .then(leagues => {
        console.log(leagues);
        res.render("admin_add_team", {leagues});
        //res.render("admin_add_team", {leagues});
        });
});

router.get("/teams/:userId", page.getTeams);

router.get("/AddLeague", (req, res) => {
    res.render("admin_add_league");
});

router.get("/leagues/:userId", page.getLeague);

module.exports = router;
const express = require("express");
const router = express.Router();
const user = require('../controllers/users');

router.get("/", user.getAllUsers);

router.post("/", user.createUser);

router.get("/:userId", user.getUserById);

router.delete("/:userId", user.removeUser);

router.put("/addTeam/:userId", user.addTeam);

router.put("/addLeague/:userId", user.addLeague);

router.delete("/removeTeam/:userId/:teamId", user.removeTeam);

router.delete("/removeLeague/:userId/:leagueId", user.removeLeague);

module.exports = router;
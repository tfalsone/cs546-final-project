const express = require("express");
const router = express.Router();
const user = require('../controllers/users');

router.get("/", user.getAllUsers);

router.post("/", user.createUser);
/*
    user post needs the following  params:
    first name, last name, email, password
*/

router.get("/:userId", user.getUserById);

router.delete("/:userId", user.removeUser);

router.put("/addTeam/:userId", user.addTeam);

router.put("/addLeague/:userId", user.addLeague);

router.patch("/removeTeam/:userId", user.removeTeam);

router.delete("/removeLeague/:userId", user.removeLeague);

module.exports = router;
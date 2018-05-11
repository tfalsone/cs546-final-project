const express = require("express");
const router = express.Router();
const game = require('../controllers/games');

router.get("/", game.findAll);

router.post("/", game.createGame);

router.put("/updateScore/:gameId", game.updateScore);

router.delete("/:gameId", game.delete);

router.get("/:gameId", game.findOne);

module.exports = router;
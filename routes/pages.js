const express = require("express");
const router = express.Router();
const page = require('../controllers/pages');

router.get("/profile/:userId", page.getProfile);

router.get("/leagues/:userId", page.getLeague);

module.exports = router;
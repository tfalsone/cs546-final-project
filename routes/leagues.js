const express = require("express");
const router = express.Router();
const data = require("../data");
const leagueData = data.leagues;

// get, post, put, other functions


//get all leagues
router.get("/", async (req, res) => {
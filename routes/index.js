const express = require("express");
const userRoutes = require("./users");
const leagueRoutes = require("./leagues");
const teamRoutes = require("./teams");
const path = require("path");
const static = express.static(__dirname + '/public');


const constructorMethod = app => {
    //app.use("/users", userRoutes);
    //app.use("/teams", teamRoutes);
    app.use("/leagues", leagueRoutes);

    app.get("/home", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/home.html'));
    });

    app.get("/profile", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/profile.html'));
    });

    app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/login.html'));
    });
};

module.exports = constructorMethod;
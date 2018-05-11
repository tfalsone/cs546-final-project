const express = require("express");
const userRoutes = require("./users");
const leagueRoutes = require("./leagues");
const teamRoutes = require("./teams");
const gameRoutes = require("./games");
const pageRoutes = require("./pages");
const path = require("path");
const static = express.static(__dirname + '/public');
const userController = require("./../controllers/users");
const bcrypt = require("bcryptjs");

const cookieParser = require('cookie-parser');

const constructorMethod = app => {
    app.use("/users", userRoutes);
    app.use("/teams", teamRoutes);
    app.use("/leagues", leagueRoutes);
    app.use("/games", gameRoutes);
    app.use("/pages", pageRoutes);

    app.use(cookieParser());

    var currUser = "";

    app.get("/login", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/login.html'));
    });

    app.post("/login", (req, res) => {
        if (req.cookies.AuthCookie) {
            console.log("User is already authenticated");
            res.redirect("/home");
        } else {
            const email = req.body.username;
            if (email == "") {
                console.log("No username indicated");
                res.redirect("/login");
            } else {
                currUser = userController.getUserByEmail(email);
                var pass = req.body.password;
                if (pass = "") {
                    console.log("No password provided");
                    res.redirect("/login");
                } else {
                    var passAuth = bcrypt.compare(pass, currUser.hashPwd);
                    if (passAuth) {
                        console.log("Password confirmed");
                        res.cookie("AuthCookie", currUser);
                        res.redirect("/home");
                    } else {
                        console.log("Incorrect password");
                        res.redirect("/login");
                    }
                }
            }
        }        
    });

    app.get("/logout", (req, res) => {
        res.clearCookie("AuthCookie");
        currUser = "";
        res.status(200).send("User has been logged out");
        res.redirect("/");
    });

    app.use("/home", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            res.status(403).send("Unauthorized: User is not logged in");
            res.redirect("/");
        }
        next();
    });

    app.get("/home", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/home.html'));
    });

    app.use("/profile", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            res.status(403).send("Unauthorized: User is not logged in");
            res.redirect("/");
        }
        next();
    });

    app.get("/profile", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/profile.html'));
    });

    app.get("/", (req, res) => {
        if (req.cookies.AuthCookie) {
            console.log("User is authenticated");
            res.redirect("/home");
        }
        console.log("User needs to log in");
        res.redirect("/login");
    });
};

module.exports = constructorMethod;
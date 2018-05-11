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

    app.use("/login", (req, res, next) => {
        if (req.cookies.AuthCookie) {
            console.log("User is already logged in");
            res.redirect("/home");
        }
        next();
    });

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
                userController.getUserByEmail(email)
                .then(user => {
                    console.log(user);
                    var currUser = user;
                    if(currUser == "") {
                        console.log("User does not exist");
                        res.redirect("/login");
                    } else {
                        var pass = req.body.password;
                        if (pass == "") {
                            console.log("No password provided");
                            res.redirect("/login");
                        } else {
                            console.log(pass);
                            console.log(user);
                            console.log(user["hashPwd"]);
                            var passAuth = bcrypt.compareSync(pass, user["hashPwd"]);
                            if (passAuth) {
                                console.log("Password confirmed");
                                res.cookie("AuthCookie", currUser);
                                res.redirect("/home");
                            } else {
                                console.log("Passwords do not match");
                                res.redirect("/login");
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }        
    });

    app.get("/register", (req, res) => {
        console.log("register");
        res.sendFile(path.join(__dirname + '/../public/pages/sign_up.html'));
    });

    app.post("/register", (req, res) => {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.lastname;
        var password = req.body.password;
        var confirm_pass = req.body.password_conf;

        if (password != confirm_pass) {
            console.log("Passwords do not match");
            res.redirect("/register");
        } else {
            currUser = userController.createUser(firstname, lastname, email, password);
            console.log(currUser);
            res.cookie("AuthCookie", currUser);
            res.redirect("/home");
        }
    });

    app.get("/logout", (req, res) => {
        res.clearCookie("AuthCookie");
        currUser = "";
        console.log("User has been logged out");
        res.redirect("/");
    });

    app.use("/home", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            console.log("User is already logged in");
            res.redirect("/");
        }
        next();
    });

    app.get("/home", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/home.html'));
    });

    app.use("/profile", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            console.log("Unauthorized: User is not logged in");
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
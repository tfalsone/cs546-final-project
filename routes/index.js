const express = require("express");
const userRoutes = require("./users");
const leagueRoutes = require("./leagues");
const teamRoutes = require("./teams");
const gameRoutes = require("./games");
const path = require("path");
const static = express.static(__dirname + '/public');
const leagueController = require("./../controllers/leagues");
const userController = require("./../controllers/users");
const gameController = require("./../controllers/games");
const teamController = require("./../controllers/teams");
const bcrypt = require("bcryptjs");

const cookieParser = require('cookie-parser');

const constructorMethod = app => {
    app.use("/users", userRoutes);
    app.use("/teams", teamRoutes);
    app.use("/leagues", leagueRoutes);
    app.use("/games", gameRoutes);

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
                        var currUser = user[0];
                        if (currUser == "") {
                            console.log("User does not exist");
                            res.redirect("/login");
                        } else {
                            var pass = req.body.password;
                            if (pass == "") {
                                console.log("No password provided");
                                res.redirect("/login");
                            } else {
                                console.log(pass);
                                console.log(currUser);
                                console.log(currUser.hashPwd);
                                var passAuth = bcrypt.compareSync(pass, currUser.hashPwd);
                                if (passAuth) {
                                    console.log("Password confirmed");
                                    res.cookie("AuthCookie", currUser._id);
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

    app.use("/register", (req, res, next) => {
        if (req.cookies.AuthCookie) {
            console.log("User is already logged in");
            res.redirect("/home");
        }
        next();
    });
    
    app.get("/register", (req, res) => {
        console.log("register");
        res.sendFile(path.join(__dirname + '/../public/pages/sign_up.html'));
    });

    app.post("/register", (req, res) => {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
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

    app.use("/teamsPage", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            console.log("Unauthorized: User is not logged in");
            res.redirect("/");
        }
        next();
    });

    app.get("/teamsPage", (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/pages/teams.html'));
    });

    app.use("/addLeague", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            console.log("Unauthorized: User is not logged in");
            res.redirect("/");
        }
        next();
    });

    app.get("/addLeague", (req, res) => {
        res.render("admin_add_league");
    });


    app.use("/addTeam", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            console.log("Unauthorized: User is not logged in");
            res.redirect("/");
        }
        next();
    });

    app.get("/addTeam", (req, res) => {
        leagueController.findAll()
            .then(leagues => {
                console.log(leagues);
                res.render("admin_add_team", {
                    leagues
                });
                //res.render("admin_add_team", {leagues});
            });
    });

    app.get("/teamsPage", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            console.log("Unauthorized: User is not logged in");
            res.redirect("/");
        }
        next();
    });

    app.get("/teamsPage", async (req, res) => {
        currentUser = req.cookies.AuthCookie;
        //console.log(currentUser._id);
        let teams = await teamController.findByUser(currentUser._id);
        //console.log(teams);

        let teamIdArray = teams.map(a => a._id);

        for (var i = 0; i < teams.length; i++) {
            for (var j = 0; j < teams[i].roster.length; j++) {
                let u = await userController.getUserById(teams[i].roster[j]);
                teams[i].roster[j] = u.firstName + " " + u.lastName;
            }
        }


        let upcomingGames = await gameController.findUpcoming(teamIdArray);
        let recentGames = await gameController.findPrevious(teamIdArray);

        for(var i = 0; i < upcomingGames.length; i++){
            let l = await leagueController.findOne(upcomingGames[i].leagueId);
            let team1 = await teamController.findOne(upcomingGames[i].team1);
            let team2 = await teamController.findOne(upcomingGames[i].team2);
            upcomingGames[i].leagueId = l.name;
            upcomingGames[i].team1 = team1.name;
            upcomingGames[i].team2 = team2.name;
        }

        for(var i = 0; i < recentGames.length; i++){
            let l = await leagueController.findOne(recentGames[i].leagueId);
            let team1 = await teamController.findOne(recentGames[i].team1);
            let team2 = await teamController.findOne(recentGames[i].team2);
            recentGames[i].leagueId = l.name;
            recentGames[i].team1 = team1.name;
            recentGames[i].team2 = team2.name;
        }

        console.log(teams);
        console.log("Upcoming games", upcomingGames);
        console.log("Recent games", recentGames);
        res.render("teams", {teams: teams,
            upcomingGames: upcomingGames,
            recentGames: recentGames
        });
        //res.send(teams);
        //page.getTeams
    });

    app.get("/leaguesPage", (req, res, next) => {
        if (!(req.cookies.AuthCookie)) {
            console.log("Unauthorized: User is not logged in");
            res.redirect("/");
        }
        next();
    });



    app.get("/leaguesPage", async (req, res) => {
        currentUser = req.cookies.AuthCookie;
        //console.log(currentUser._id)

        let teams = await teamController.findByUser(currentUser._id);
        let teamIdArray = teams.map(a => a._id);

        let leagues = await leagueController.findByTeamIds(teamIdArray);

        //let leagues = await leagueController.findByUser(currentUser._id);

        console.log(leagues);
        res.send(leagues);

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
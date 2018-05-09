const userRoutes = require("./users");
const leagueRoutes = require("./leagues");
const teamRoutes = require("./teams");
const path = require("path");

const constructorMethod = app => {
    app.use("/users", userRoutes);
    app.use("/teams", teamRoutes);
    app.use("/leagues", leagueRoutes);
    
    app.use("*", (req, res) => {
        // not sure?
    })
}
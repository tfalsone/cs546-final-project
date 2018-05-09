const userRoutes = require("./users");
const teamRoutes = require("./teams");
const leagueRoutes = require("./leagues");

let constructorMethod = app => {
    app.use("/user", userRoutes);
    app.use("/team", teamRoutes);
    app.use("/league", leagueRoutes);
};

module.exports = {
    users: require("./users"),
    teams: require("./teams"),
    leagues: require("./leagues")
};
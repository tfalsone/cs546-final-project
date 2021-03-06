const dbConnection = require("./mongoConnection");

const getCollectionFn = collection => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }

        return _col;
    };
};

module.exports = {
    // list of mongo databases
    users: getCollectionFn("users"),
    teams: getCollectionFn("teams"),
    leagues: getCollectionFn("leagues")
};
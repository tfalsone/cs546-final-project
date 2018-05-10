const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/:id", (req, res) => {
    userData
        .getUserById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(() => {
            res.status(404).json({ error: "User not found" });
        });
});

router.post("/", (req, res) => {
    let userInfo = req.body;

    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to create a new user" });
        return;
    }

    if (!userInfo.firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }
    
    if (!userInfo.lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    if (!userInfo.email) {
        res.status(400).json({ error: "You must provide an email address" });
        return;
    }

    if (!userInfo.password) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }
})
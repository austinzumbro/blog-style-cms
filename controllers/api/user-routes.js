const router = require("express").Router();
const { User } = require("../../models");

// CREATE new user
router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        console.log("\n------- CREATE USER RESPONSE --------\n");
        console.log(dbUserData);

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.dataValues.id;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    console.log(req.body);
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        console.log(dbUserData.dataValues.id);

        if (!dbUserData) {
            res.status(400).json({
                message: "Incorrect username or password. Please try again!",
            });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect username or password. Please try again!",
            });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.dataValues.id;
            console.log(req.session.userId);
            res.status(200).json({
                user: dbUserData,
                message: "You are now logged in!",
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            console.log("Successfully logged out.");
            res.status(204).end();
        });
    } else {
        console.log("You were not actually logged in.");
        res.status(404).end();
    }
});

module.exports = router;

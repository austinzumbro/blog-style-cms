const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { withAuth, areAuth } = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("home", { posts: posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", areAuth, async (req, res) => {
    res.render("login");
});

router.get("/signup", areAuth, async (req, res) => {
    res.render("signup");
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            include: [
                {
                    model: Post,
                    include: { model: Comment },
                },
                { model: Comment },
            ],
            attributes: ["username"],
        });
        userData.posts = userData.posts.sort((a, b) => b.id - a.id);
        userData.comments = userData.comments.sort((a, b) => b.id - a.id);
        const user = userData.get({ plain: true });
        const posts = user.posts;
        const comments = user.comments;

        console.log("\n---- USER DATA ----\n\n", user);

        res.render("dashboard", {
            user: user,
            posts: posts,
            comments: comments,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

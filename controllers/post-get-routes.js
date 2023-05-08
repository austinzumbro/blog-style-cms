const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const { withAuth, areAuth } = require("../utils/auth");

router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["username"] }],
        });
        const post = postData.get({ plain: true });

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            include: [{ model: User, attributes: ["username"] }],
        });

        const comments = commentData.map((comment) =>
            comment.get({ plain: true })
        );

        res.render("post", {
            post: post,
            comments: comments,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/:id/update", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["username"] }],
        });
        const post = postData.get({ plain: true });

        res.render("post-update", {
            post: post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

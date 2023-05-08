const router = require("express").Router();
const { Comment } = require("../../models");

// CREATE new comment
router.post("/", async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            content: req.body.content,
            date_created: new Date(),
            post_id: req.body.post_id,
            user_id: req.session.userId,
        });

        console.log("\n------- CREATE COMMENT RESPONSE --------\n");
        console.log(dbCommentData);
        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

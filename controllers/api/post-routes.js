const router = require("express").Router();
const { Post } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date_created: new Date(),
            user_id: req.session.userId,
        });

        console.log("\n------- CREATE POST RESPONSE --------\n");
        console.log(dbPostData);
        res.status(200).json(dbPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        console.log(req.body);
        const dbPostData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!dbPostData[0]) {
            res.status(404).json({ message: "No user with this id!" });
            return;
        }
        res.status(200).json(dbPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

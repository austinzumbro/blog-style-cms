const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { posts: posts });
    } catch (err) {
        res.json(err);
    }
})

module.exports = router;
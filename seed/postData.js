const { Post } = require('../models');

const postdata = [
    {
        title: 'Blog Post 1',
        content: 'Blogs are fun to write. This is the first post on the blog.',
        user_id: 1
    },
    {
        title: 'Blog Post 2',
        content: 'I am no longer having fun writing blog posts. This is the second post on the blog.',
        user_id: 1
    },
    {
        title: 'Blog Post 3',
        content: `Maybe it's time for someone else to write a blog post, @firstUser. This is a blog post written by secondUser!`,
        user_id: 2,
    },
    {
        title: 'Blog Post 4',
        content: `thirdUser is writing blog posts now.`,
        user_id: 3,
    },

];

const seedPosts = () => Post.bulkCreate(userdata);

module.exports = seedPosts;
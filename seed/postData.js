const { Post } = require('../models');

const postdata = [
    {
        title: 'Blog Post 1',
        content: 'Blogs are fun to write. This is the first post on the blog.',
        date_created: new Date(2023, 4, 29, 8, 12, 34),
        user_id: 1
    },
    {
        title: 'Blog Post 2',
        content: 'I am no longer having fun writing blog posts. This is the second post on the blog.',
        date_created: new Date(2023, 5, 2, 9, 42, 2),
        user_id: 1
    },
    {
        title: 'Blog Post 3',
        content: `Maybe it's time for someone else to write a blog post, @firstUser. This is a blog post written by secondUser!`,
        date_created: new Date(2023, 5, 3, 12, 0, 0),
        user_id: 2,
    },
    {
        title: 'Blog Post 4',
        content: `thirdUser is writing blog posts now.`,
        date_created: new Date(2023, 5, 4, 13, 1, 29),
        user_id: 3,
    },

];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
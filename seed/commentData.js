const { Comment } = require('../models');

const commentdata = [
    {
        content: 'Great first post. Very optimistic.',
        post_id: 1,
        user_id: 3
    },
    {
        content: `I, secondUser, agree with thirdUser's comment above.`,
        post_id: 1,
        user_id: 2
    },
    {
        content: `This is much less optimistic.`,
        post_id: 2,
        user_id: 3
    },
    {
        content: `Hey firstUser, go check out my blog post.`,
        post_id: 2,
        user_id: 2
    },
    {
        content: `Ah, yes. I appreciate this, secondUser.`,
        post_id: 3,
        user_id: 1
    },
    {
        content: `Okay, let's not all pile on.`,
        post_id: 4,
        user_id: 1
    },
];

const seedComments = () => Comment.bulkCreate(userdata);

module.exports = seedComments;
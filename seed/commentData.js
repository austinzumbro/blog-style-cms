const { Comment } = require("../models");

const commentdata = [
    {
        content: "Great first post. Very optimistic.",
        date_created: new Date(2023, 4, 1, 12, 0, 0),
        post_id: 1,
        user_id: 3,
    },
    {
        content: `I, secondUser, agree with thirdUser's comment above.`,
        date_created: new Date(2023, 4, 2, 5, 30, 10),
        post_id: 1,
        user_id: 2,
    },
    {
        content: `This is much less optimistic.`,
        date_created: new Date(2023, 4, 2, 14, 19, 53),
        post_id: 2,
        user_id: 3,
    },
    {
        content: `Hey firstUser, go check out the blog post I just posted 5 minutes ago exactly.`,
        date_created: new Date(2023, 4, 3, 12, 5, 0),
        post_id: 2,
        user_id: 2,
    },
    {
        content: `Ah, yes. I appreciate this, secondUser.`,
        date_created: new Date(2023, 4, 4, 7, 51, 33),
        post_id: 3,
        user_id: 1,
    },
    {
        content: `Okay, let's not all start making posts. People won't be able to find what they're looking for.`,
        date_created: new Date(2023, 4, 4, 14, 11, 3),
        post_id: 4,
        user_id: 1,
    },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;

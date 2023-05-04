const { User } = require('../models');

const userdata = [
    {
        username: 'firstUser',
        email: 'firstUser@email.com',
        password: 'password123'
    },
    {
        name: 'secondUser',
        email: 'secondUser@email.com',
        password: 'password456',
    },
    {
        name: 'thirdUser',
        email: 'thirdUser@email.com',
        password: 'password789',
    },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;
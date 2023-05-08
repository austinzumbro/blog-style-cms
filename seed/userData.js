const { User } = require('../models');

const userdata = [
    {
        username: 'firstUser',
        password: 'password123'
    },
    {
        username: 'secondUser',
        password: 'password456',
    },
    {
        username: 'thirdUser',
        password: 'password789',
    },
];

const seedUsers = async () => {
    for (let i = 0; i < userdata.length; i++) {
        await User.create(userdata[i]);
    }
}

module.exports = seedUsers;
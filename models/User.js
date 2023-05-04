const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class User extends Model { }

User.init(
    {
        // Username
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            // Username cannot already exist in the database
            unique: true,
            // Username must be 2 or more characters in length
            validate: {
                len: [2]
            }
        },
        // Email address
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        // Password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // Password must be at least 8 characters
            validate: {
                len: [8],
            }
        }
    },
    {
        hooks: {
            // Modify the input before creation
            beforeCreate: async (newUserData) => {
                // Force the email into all lowercase characters
                newUserData.email = await newUserData.email.toLowerCase();
                // Encrypt the user's password
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Modify the input before updating
            beforeUpdate: async (updatedUserData) => {
                // Force the email address into all lowercase characters
                updatedUserData.email = await updatedUserData.email.toLowerCase();
                return updatedUserData;
            },
        },
        sequelize,
        freezeTableName: false,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
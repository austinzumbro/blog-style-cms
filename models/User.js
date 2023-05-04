const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class User extends Model { }

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.email = await newUserData.email.toLowerCase();
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
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
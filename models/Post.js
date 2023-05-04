const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model { }

Post.init(
    {
        // Post title.
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Post content
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Record datetime of the moment of post creation
        date_created: {
            type: DataTypes.NOW,
            allowNull: false,
        },
        // Associated User id of the user making the post
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: false,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;
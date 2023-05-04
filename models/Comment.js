const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model { }

Comment.init(
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        date_created: {
            type: DataTypes.NOW,
            allowNull: false,
        },

        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'comment',
    }
);

module.exports = Comment;
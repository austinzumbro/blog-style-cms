const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model { }

Comment.init(
    {
        // Text content of the comment.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Store the current datetime at moment of creation
        date_created: {
            type: DataTypes.NOW,
            allowNull: false,
        },
        // Associated Post id
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        // Associated User id of the user making the comment
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
        modelName: 'comment',
    }
);

module.exports = Comment;
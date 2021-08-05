//Extracting model from Sequelize and creating connection to config folder
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create a new sequilize model for Comment
class Comment extends Model { };

//defining fields/columns on model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        //linking user to comment
        user_id: {
            type: DataTypes.INT,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },

        //linking post to comment
        post_id: {
            type: DataTypes.INT,
            references: {
                model: 'post',
                key: 'id',
            }
        },
        comment_content: {
            //want to limit the amount of characters string has max 255
            dataType: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    },
    {
        sequelize,
        timestamp: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

//exporting comment model
module.exports = Comment;
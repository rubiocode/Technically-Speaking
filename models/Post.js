//Extracting model from Sequelize and creating connection to config folder
const {Model, DataTypes} = require('sequelize');
const sequelize= require('../config/connection');

//Create a new Sequelize model for posts
class Post extends Model {}

//defining fields/columns on model
Post.init(
    {
        id: {
            type: DataTypes.INT,
            allowNull:false,
            primaryKey:true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_content: {
            // using text per sequelize documentation it had unlimited length text column vs string has 255 default length
            type: DataTypes.TEXT,
            allowNull:true,
        },
        user_id: {
            type: DataTypes.INT,
            references: {
                model: 'user',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamp: true,
        freezeTableName: true,
        underscored: true,
        modelName:'post'
    }
);

module.exports =Post;
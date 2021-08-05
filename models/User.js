//Extracting model from Sequelize and creating connection to config folder, adding bcrypt to hash password
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//Create a new Sequelize model for posts and checking password function 
class User extends Model { 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//defining fields/columns on model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            //Adding unique constraint to not repeat usernames in db
            unique: true,
        },
        twitter:{
            dataType: DataTypes.STRING,
            allowNull: true,
        },
        linkedin: {
            dataType: DataTypes.STRING,
            allowNull: true,
        },
        github: {
            dataType: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        //setting up two hooks for user creation and user update
        hooks: {
            beforeCreate: async (newUserData) => {

                //want to hash the password
                const salt = await bcrypt.genSalt(10);

                //hash everything in the event of getting hacked
                newUserData.password = await bcrypt.hash(req.body.password, salt);

                //turning email to lowercase before adding to db
                newUserData.email = newUserData.email.toLowerCase();
                return newUserData;
            },

            beforeUpdate: async (updatedUserData)=>{
                updatedUserData.email = updatedUserData.email.toLowerCase();
                return updatedUserData;
            },
        },

        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscore: true,
        modelName: 'user',
    }
);

module.exports = User;
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
            type: DataTypes.STRING,
            allowNull: true,
        },
        github: {
            type: DataTypes.STRING,
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
                try {
                //want to hash the password
                const salt = await bcrypt.genSalt(10);

                //hash everything in the event of getting hacked
                newUserData.password = await bcrypt.hash(req.body.password, salt);

                //turning email to lowercase before adding to db
                newUserData.email = newUserData.email.toLowerCase();
                return newUserData;

                } catch (e) {

                    return e;

                }
            },

            beforeUpdate: async (updatedUserData)=>{
                try {
                    updatedUserData.email = await updatedUserData.email.toLowerCase();
                    return updatedUserData;

                } catch (e) {
                    
                    return e;
                } 
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
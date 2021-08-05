//establishing sequelize config connection and requiring all seed files and functions
const sequelize = require('../config/connection');
const seedUser= require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentData');

//storing all functions in seeds files in a variable function
const seedAll = async ()=> {
        await sequelize.sync({ force:true });

        await seedUser();

        await seedPost();

        await seedComment();
        
        process.exit(0);

};

//invoking seedAll function
seedAll();
//establishing sequelize config connection and extracting User schema from the models folder
//requiring userData.json and post/comment seeds files
const sequelize = require('../config/connection');
const seedUser= require('./userData');
const seedPost = require('./postData');
const seedComment = require('./commentData');

const seedAll = async ()=> {
    await sequelize.sync({force:true});
    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};

seedAll();
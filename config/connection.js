//requiring dependency
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//Using JAWSDB_URL to host database (cannot use local storage in our computer).
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else{
    sequelize = new Sequelize(

        //using .env to connect our environmental variables
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port:3306
        }
    );
}

//exporting sequelize
module.exports=sequelize;

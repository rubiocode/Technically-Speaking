//Requiring dependencies
const express = require('express');

//setting up sequelize connection to our config folder and file
const sequelize= require('./config/connection');

//storing express as a function in a variable 
const app = express();

// creating a port 
const PORT = process.env.PORT || 3001;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*Using sequelize.sync to synchronize all models setting force to false to not drop our existing tables then start server*/
sequelize.sync({force:false}).then(()=>{

    //Making app listen to PORT
    app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));
});



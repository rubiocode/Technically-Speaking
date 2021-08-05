//Requiring dependencies
const express = require('express');
const exphbs= require('express-handlebars');

//setting up sequelize connection to our config folder and file
const sequelize= require('./config/connection');

//requiring routes folder
const routes = require('./controllers');

//storing express as a function in a variable 
const app = express();

// creating a port 
const PORT = process.env.PORT || 3001;

//handlebars create
const hbs =exphbs.create({});

//setting express handlebars engine up 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app use so we can start using routes
app.use(routes);

/*Using sequelize.sync to synchronize all models setting force to false to not drop our existing tables then start server*/
sequelize.sync({force:false}).then(()=>{

    //Making app listen to PORT
    app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));
});



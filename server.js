//Requiring dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//setting up sequelize connection to our config folder and file
const sequelize = require('./config/connection');

//requiring routes folder
const routes = require('./controllers');

//getting helper functions
const helpers = require('./utils/helpers');

//storing express as a function in a variable 
const app = express();

// creating a port 
const PORT = process.env.PORT || 3001;

//Setting up the session
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

//handlebars create
const hbs = exphbs.create({ helpers });

//setting express handlebars engine up 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app use so we can start using routes
app.use(routes);

/*Using sequelize.sync to synchronize all models setting force to false to not drop our existing tables then start server*/
sequelize.sync({ force: false }).then(() => {

    //Making app listen to PORT
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});



//Requiring dependencies
const express = require('express');

//storing express as a function in a variable 
const app = express();

// creating a port 
const PORT = process.env.PORT || 3001;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Making app listen to PORT

app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));


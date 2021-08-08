//requiring express and router function
const router= require('express').Router();

//requiring other routes
const homeRoutes= require('./homeRoutes.js');
const dashboardRoutes=require('./dashboardRoutes.js');

//Requiring API routes folder
const apiRoutes = require('./api');

// router so we can use homeRoutes and apiRoutes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);


//export router
module.exports = router;
//requiring express and router function
const router= require('express').Router();

//requiring other routes
const homeRoutes= require('./homeRoutes.js');

//Requiring API routes folder
const apiRoutes = require('./apiRoutes');

// router so we can use homeRoutes and apiRoutes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//export router
module.exports = router;
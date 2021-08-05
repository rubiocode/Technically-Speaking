//requiring express and router function
const router= require('express').Router();

//requiring other routes
const homeRoutes= require('./homeRoutes.js')

// router so we can use homeRoutes
router.use('/', homeRoutes);

//export router
module.exports = router;
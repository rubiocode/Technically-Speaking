//requiring express and router function
const router= require('express').Router();

//requiring userRoutes
const userRoutes= require('./userRoutes');

// router so we can use usersRoutes 
router.use('/users', userRoutes);

//export router
module.exports = router;
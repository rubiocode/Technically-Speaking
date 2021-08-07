//requiring express and router function
const router= require('express').Router();

//requiring userRoutes
const userRoutes= require('./userRoutes');
const commentRoutes = require('./commentRoutes');

// router so we can use usersRoutes 
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

//export router
module.exports = router;
//requiring express and router function
const router= require('express').Router();

//requiring userRoutes
const userRoutes= require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes= require('./postRoutes');

// router so we can use usersRoutes 
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);

//export router
module.exports = router;
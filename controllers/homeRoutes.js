// getting our router stored in variable
const router= require('express').Router();

//testing if seeds renders on page 
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
    const userData = await User.findAll({});
    const users=userData.map(user => user.get({plain:true}));

    console.log(users);
    res.render('homepage', {users});
    } catch (e) {
    res.status(400).json(e);
    }
});

module.exports = router;
// getting our router stored in variable
const router= require('express').Router();

//testing if seeds renders on page 
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
    const users = await User.findAll({});

    res.json(users);
    } catch (e) {
    res.status(400).json(e);
    }
});

module.exports = router;
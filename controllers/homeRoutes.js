// getting our router stored in variable
const router= require('express').Router();

//testing if seeds renders on page 
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
    const users = await User.findAll({});

    req.json(users);
    } catch (e) {
    req.status(400).json(e);
    }
});

module.exports = router;
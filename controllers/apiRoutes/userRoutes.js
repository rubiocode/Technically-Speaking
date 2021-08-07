//requiring express and router function
const router= require('express').Router();

//deconstructing user, post, and comment from model's folder 
const { User } = require('../../models');

//Create new user 
router.post('/', async (req, res) => {
    try {
        const userData= await User.create({
            username: req.body.username,
            twitter: req.body.twitter,
            linkedin: req.body.linkedin,
            github: req.body.github,
            email: req.body.email,
            password: req.body.password,
        });
        
        req.session.save(()=>{
            req.session.loggedIn =true;

            res.status(200).json(userData);
        });
        
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});



//Setting up a GET/api/users
router.get('/', async (req, res) => {
    try {
    const userData = await User.findAll({
        attributes: {exclude: ['password']}
    });
    const users=userData.map(user => user.get({plain:true}));

    console.log(users);
    
    res.render('homepage', {users});
    } catch (e) {
        console.error(e);
        res.status(400).json(e);
    }
});

module.exports = router;
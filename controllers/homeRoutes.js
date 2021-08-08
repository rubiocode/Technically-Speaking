// getting our router stored in variable
const router = require('express').Router();

//requiring connection file
const sequelize = require('../config/connection')

//testing if seeds renders on page 
const { User, Post, Comment } = require('../models');

//homepage logic: render all posts and comments (with respective user), route to log in or sign up 

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll(
            {
                attributes: ['id', 'title', 'post_content'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'twitter', 'github']
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'user_id', 'post_id', 'comment_content']
                    },
                ],
            },
        );
        const users = userData.map(user => user.get({ plain: true }));
        console.log(users);
        res.render('homepage', { users, loggedIn: req.session.loggedIn });
    } catch (e) {
        res.status(400).json(e);
    }
});


//Signing up in the homepage 

router.get('/signup', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return
        }
        res.status(200).render('signup');
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//Loging in the homepage
router.get('/login', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return
        }
        res.status(200).render('login');
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});


//grab single post to view in the homepage
router.get('/post/:id', async (req, res) => {
    try {
        const postData= await Post.findOne(
            {
                where: { 
                    id: req.params.id
                },
                attributes: ['id', 'title', 'post_content'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'twitter', 'github']
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'user_id', 'post_id', 'comment_content']
                    },
                ],
            },
        );
        if (!postData) {
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        const posts = postData.map(post => post.get({ plain: true }));
        console.log(post);
        res.render('single-post', { posts, loggedIn: req.session.loggedIn });

    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})






module.exports = router;
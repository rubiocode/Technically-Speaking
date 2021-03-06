//requiring express and router function
const router = require('express').Router();

//deconstructing comment from model's folder 
const { User, Comment, Post } = require('../models');

//require utils auth file
const withAuth = require('../utils/auth');

//requiring connection file
const sequelize = require('../config/connection');

//Dashboard logic: see all personal posts and be able to create and update posts.

//Get all personal posts from database
router.get('/', withAuth, async (req, res) => {
    console.log('YEEEEEEEEEEEEEEEEEEEE')
    try {
        const postData = await Post.findAll(
            {
                where: {
                    user_id: req.session.user_id,
                },
                attributes: ['id', 'title', 'createdAt', 'post_content'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'twitter', 'github'],
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'user_id', 'post_id', 'comment_content', 'createdAt'],
                    },
                ],
            },
        );

        const posts = postData.map(post => post.toJSON());
        res.render('dashboard', { posts, loggedIn: true });
    } catch (e) {
        console.log(e.message, "ERRRRRRRRRROOOOOOR");
        res.status(500).json(e);
    }
});


//Grab a specific post by its id to view and edit
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne(
            {
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'title', 'created_at', 'post_content', 'user_id'],
                include: [
                    {
                        model: Comment,
                        attributes: ['id', 'user_id', 'post_id', 'comment_content', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username', 'twitter', 'github'],
                        }
                    },
                    {
                        model: User,
                        attributes: ['username', 'twitter', 'github'],
                    }
                ]
            },
        );
        if (!postData) {
            res.status(404).json({ message: 'Post not found with this id' });
            return;
        }
        
        const post = postData.get({plain:true});
        console.log({post});
        res.render('edit-post', { post, loggedIn: req.session.loggedIn });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});


//Create post from dashboard
router.get('/create/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'createdAt',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            },
            {
                model: User,
                attributes: ['username', 'twitter', 'github']
            }
        ]
    })
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('create-post', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

///////////  DELETE AND EDIT POST JS FUNCTIONS NOT WORKING PROPERLY////////////////////////////////////
//update existing comment
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const updateComment = await Comment.update(
                {
                    user_id: req.session.user_id,
                    comment_content: req.body.comment_content,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                });
            if (!updateComment[0]) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.status(200).json(updateComment);
        }

    } catch (e) {
        console.log(e);
        res.status(500).json(e);

    }
});


module.exports = router;
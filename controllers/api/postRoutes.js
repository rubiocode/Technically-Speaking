//requiring express and router function
const router = require('express').Router();

//deconstructing comment from model's folder 
const { User, Comment, Post } = require('../../models');

//require utils auth file
const withAuth = require('../../utils/auth');

//Post logic: create new post, update, delete and retrieve posts.

//Create new post
//POST/api/posts
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id,

        });
        res.status(200).json(postData);


    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});


// Get all post and the comments and username they are attached to
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            //include associated user and comment data
            attributes: ['id', 'title', 'post_content', 'user_id'],
            include: [
                {
                    model: User,
                    attributes: ['username', 'twitter', 'github'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'user_id', 'post_id', 'comment_content'],
                },
            ],
        });
        res.status(200).json(postData);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.title,
                post_content: req.body.post_content,
                user_id: req.session.user_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            });
        if (!updatePost[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(updatePost);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);

    }
});

//Delete post 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!deletePost) {
            res.status(404).json({ message: 'No post found with that id' });
            return;
        }
        res.status(200).json(deletePost);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});



module.exports = router;
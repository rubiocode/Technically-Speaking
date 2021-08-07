//requiring express and router function
const router = require('express').Router();

//deconstructing comment from model's folder 
const { User, Comment, Post } = require('../../models');

//Post logic: create new post, update, delete and retrieve posts.

// Get all post and the comments and username they are attached to
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            //include associated user and blog data
            attributes: ['id', 'title', 'post_content', 'user_id'],
            include: [
                {
                    model: User,
                    attribute: ['user_username'],
                },
                {
                    model: Comment,
                    attribute: ['comment_function']
                },
            ],
        });
        res.status(200).json(postData);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;
//requiring express and router function
/*const router = require('express').Router();

//deconstructing comment from model's folder 
const { Comment } = require('../../models');

//Comment logic: create new comment, update, delete and retrieve comments.

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            //include associated user and blog data
            attributes: ['id', 'user_id', 'post_id', 'comment_content'],
            include: [
                {
                    model: User,
                    attribute: ['user_username'],
                },
                {
                    model: Post,
                    attribute: ['post_title']
                },
            ],
        });
        res.status(200).json(commentData);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//*/
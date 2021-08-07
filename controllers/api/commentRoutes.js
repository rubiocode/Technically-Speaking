//requiring express and router function
const router = require('express').Router();

//deconstructing comment from model's folder 
const { User, Comment, Post } = require('../../models');

//require utils auth file
const withAuth = require('../../utils/auth');

//Comment logic: create new comment, update, delete and retrieve comments.

// Get all comments and the blog and username they are attached to
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

//Create new comment
router.post('/', async (req, res) => {
    try {

        if (req.session) {
            const commentData = await Comment.create({
                user_id: req.session.user_id,
                post_id: req.body.post_id,
                comment_content: req.body.comment_content,
            });
            res.status(200).json(commentData);
        }
        res.status(404).json({ message: 'Something went wrong!' });

    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});


//update existing comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const updateComment = await Comment.update(
                {
                    user_id: req.session.user_id,
                    post_id: req.body.post_id,
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

//Delete comment 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        if(req.session){
            const deleteCommment = await Comment.destroy({
                where: {
                    id: req.params.id,
                }
            });
            if (!deleteComment) {
                res.status(404).json({ message: 'No comment found with that id' });
                return;
            }
            res.status(200).json(deleteComment);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});






module.exports = router;
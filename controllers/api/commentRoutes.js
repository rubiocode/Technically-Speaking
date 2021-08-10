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
        const commentData = await Comment.findAll({})
        res.status(200).json(commentData);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//Create new comment
router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_content,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        console.log(commentData);
            .then(commentData => res.json(commentData))
            .catch(e => {
                console.log(e);
                res.status(400).json(e);
            });
    }
});



//update existing comment
router.put('/:id', withAuth, async (req, res) => {
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

//Delete comment 
router.delete('/:id', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const deleteComment = await Comment.destroy({
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
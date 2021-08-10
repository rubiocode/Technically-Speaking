//requiring express and router function
const router = require('express').Router();

//deconstructing comment from model's folder 
const { User, Comment, Post } = require('../../models');

//require utils auth file
const withAuth = require('../../utils/auth');

//Post logic: create new post, update, delete and retrieve posts.

//Create new post
//POST/api/posts
router.post('/', withAuth,  async (req, res) => {
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
            attributes: ['id', 'title', 'post_content', 'user_id', 'createdAt'],
            order: [['created_at', 'DESC']],
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
        {
            model: User,
            attributes: ['username', 'twitter', 'github']
        },
    );
        
        res.status(200).json(postData);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});


//get a single post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne(
            {
                where: { id: req.params.id },
                attributes: ['id', 'title', 'created_at','post_content'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'twitter', 'github'],
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'user_id', 'post_id', 'comment_content', 'createdAt'],
                        include: {
                            model: User,
                            attributes: ['username', 'twitter', 'github'],
                        },
                    },
                ],
            },
        );
        if(!postData){
            res.status(404).json({ message:'No post found with that id!'});
            return;
        }
       // const posts = postData.map(post => post.get({ plain: true }));
        res.render('single-post', { postData, loggedIn: req.session.loggedIn });
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
                user_id: req.session.user_id,
            }
        });
        if (!deletePost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(deletePost);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});



module.exports = router;
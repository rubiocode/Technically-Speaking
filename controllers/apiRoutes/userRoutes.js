//requiring express and router function
const router = require('express').Router();

//deconstructing user, post, and comment from model's folder 
const { User, Post, Comment } = require('../../models');

//User logic: user needs to log in, log out, create new user, delete user, update user, find blog and comments for single user(?).

//Create new user and stay logged in the session
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            twitter: req.body.twitter,
            linkedin: req.body.linkedin,
            github: req.body.github,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });

    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//update user by id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateUser = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updateUser[0]) {
            res.status(404).json({ message: 'No user with this id!' });
            return;
        }
        res.status(200).json(updateUser);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);

    }
});

//Delete user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteUser = await User.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!deleteUser) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.status(200).json(deleteUser);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

//Log in existing user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.twitter = userData.twitter;
            req.session.linkedin - userData.linkedin;
            req.session.github = userData.github;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'Welcome Back!' });
        });

    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

//Log out user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//IS THIS FUNCTION NEEDED ANYMORE ? Setting up a GET/api/users
/*router.get('/', async (req, res) => {
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
});*/

module.exports = router;
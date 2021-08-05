const { User }= require('../models');

const userData = [
    {
        username: "Rockstar",
        twitter:null,
        linkedin:"www.linkedin.com/in/rubidia-rubio-in",
        github:"https://github.com/rubiocode",
        email: "rubi@hotmail.com",
        password: "password12345"
    },
    {
        username: "Averie19",
        twitter:"twitterTestAverie19",
        linkedin:null,
        github:"https://github.com/",
        email: "averie@gmail.com",
        password: "password12345"
    },
    {
        username: "Lidia63",
        twitter:null,
        linkedin:null,
        github:null,
        email: "lidia@live.com",
        password: "password12345"
    },
    {
        username: "Michael62",
        twitter:"twitterTestMichael62",
        linkedin:null,
        github:"https://github.com/",
        email: "michael@msn.com",
        password: "password12345"
    }
];

const userPost = ()=>User.bulkCreate(userData);

module.exports=userPost;
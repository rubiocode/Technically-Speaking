const { Comment }= require('../models');

const commentData=[
    {
        user_id: 2,
        post_id: 1,
        comment_content: "I Believe this generation cannot stay away from technology",
    },
    {
        user_id: 3,
        post_id: 1,
        comment_content: "I think is great kids now a days are so tech savy they are def the future",
    },
    {
        user_id: 4,
        post_id: 1,
        comment_content: "Is amazing how much technology changes human interactions and creates new ways to interact with people all over the world. Phones have come a long ways from when I was young for sure!",
    },
    {
        user_id: 3,
        post_id: 2,
        comment_content: "Do not get a HP Pavillion I have had mine for 2 years and is breaking already, i need to get a new one too!",
    },
    {
        user_id: 2,
        post_id: 2,
        comment_content: "What operating system are you looking for? I really like my Mac",
    },
    {
        user_id: 3,
        post_id: 3,
        comment_content: "Thats amazing! I will look into it!",
    },
    {
        user_id: 1,
        post_id: 4,
        comment_content: "Wow that is so amazing that, even though he is paralyzed from the chest down, can still play video games!",
    },
    {
        user_id: 2,
        post_id: 4,
        comment_content: "I read this too! The future and hope of many people who wish can do what they used to before!",
    },
    {
        user_id: 4,
        post_id: 5,
        comment_content: "I went to a bootcamp and even though the xperience was pleasant... it was hard! it was intense going full time! I would not change it anything I love my new job as a sofware developer!",
    },
    {
        user_id: 1,
        post_id: 5,
        comment_content: "Is everything online or do you go to school?",
    },
];

const seedComment = ()=>Comment.bulkCreate(commentData);

module.exports=seedComment;
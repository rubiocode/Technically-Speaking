const { Post }= require('../models');

const postData = [
    {
        title: 'Technology Review',
        post_content: 'Guys I read this today! "I asked my students to turn off their cell phones and wrie about living without them and the majority began to think that their cellphones were in fact limiting their relationship with other"-MIT Technology Review',
        user_id: 1,
    },
    {
        title: 'Downsizing',
        post_content: 'Is hard to believe i have had the same PC since 2012!! I am in serious need of an upgrade and move away from PC any suggestions? ',
        user_id: 1,
    },
    {
        title: 'Attention: Girls who code!',
        post_content: 'Become a kick-ass web developer! Can you believe only 17% of tech industry is represented by women? The time is now! Register for a bootcamp asap!',
        user_id: 2,
    },
    {
        title: 'Brain implant and video games?',
        post_content: 'Man with brain injury implant on Musk\'s Neuralink states that the implant allows him to enjoy his favorite passtime: play video games',
        user_id: 4,
    },
    {
        title: 'Bootcamp Review',
        post_content: 'I signed up for the coding bootcamp not knowing what to expect! Now I cannot wait to get on the field and showcase everything I learned. I would recommend! Any suggestions on programming languages to learn next?',
        user_id: 3,
    },
];

const seedPost = ()=>Post.bulkCreate(postData);

module.exports=seedPost;
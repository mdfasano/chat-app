const Profile = require('../models/profile');




async function create (req, res) {
    const postId = req.params.id;
    await Profile.find({posts: {postId}});
    console.log(post, 'helloingthere')
        // post.comments.push(req.body)
        // try {
        //     await post.save();
        // } catch (err) {
        //     console.log(err);
        // }
    res.redirect('/profiles/home');
}


module.exports = {
    create
    // index
}
// async function index (req, res) {
//     const comments = res.locals.profile.posts;
//     res.render('profiles/posts/index', {
//         title: 'all posts',
//         posts: posts

//     });
// }
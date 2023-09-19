const Profile = require('../models/profile');
const { post } = require('../routes');

async function create (req, res) {
    const postId = req.params.id;
    const thisProfile = res.locals.profile;
    const thisPost = await thisProfile.posts.id(postId);
    thisPost.comments.push(req.body);
    try {
        await thisProfile.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/profiles/home');
}

async function index (req, res) {
    const thisProfile = res.locals.profile;
    const thisPost = await thisProfile.posts.id(req.params.id);
    res.render('profiles/posts/comments/index', {
        title: 'all comments',
        postContent: thisPost.content,
        comments: thisPost.comments
    });
}

module.exports = {
    create,
    index
}

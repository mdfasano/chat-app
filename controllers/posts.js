const Profile = require('../models/profile');

function newPost (req, res) {
    res.render('profiles/posts/new', {
      title: 'creating new post'
    });
}

async function index (req, res) {
    console.log(res.locals.profile)
    const posts = res.locals.profile.posts;
    res.render('profiles/posts/index', {
        title: 'all posts',
        posts: posts

    });
}

async function create (req, res) {
    thisProfile = await Profile.findById(req.params.id);
    if (req.user._id.equals(thisProfile.ownerId)) {
        thisProfile.posts.push(req.body);
        try {
            await thisProfile.save();
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect('/profiles/home');
}

async function deletePost (req, res) {
    const thisProfile = res.locals.profile;
    if (req.user._id.equals(thisProfile.ownerId)) {
        thisProfile.posts.remove(req.params.id);
        try {
            await thisProfile.save();
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect('/profiles/posts/index');
}

function edit (req, res) {
    const thisProfile = res.locals.profile; 
    if (req.user._id.equals(thisProfile.ownerId)) {
        thisPost = thisProfile.posts.id(req.params.id);
        
        res.render('profiles/posts/edit', {
            post: thisPost,
            title: "editing"
        });
    }
}

async function patch (req, res) {
    const thisProfile = res.locals.profile;
    if (req.user._id.equals(thisProfile.ownerId)) {
        thisProfile.posts.remove(req.params.id);
        thisProfile.posts.push(req.body);
        try {
            await thisProfile.save();
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect('/profiles/posts/index');
}

module.exports = {
    new: newPost,
    create,
    index,
    delete: deletePost,
    edit,
    patch
}
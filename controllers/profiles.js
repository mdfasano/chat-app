const Profile = require ('../models/profile.js');
const User = require('../models/user');

function renderProfile (req, res) {
    res.render('profiles/home', { 
      title: 'My Profile',
    });
}

function newProfile (req, res) {
  res.render('profiles/new', {
    title: 'creating new profile'
  });
}

async function create (req, res) {
  req.body
  thisUser = await User.findById(req.user._id)
  profile = await Profile.create({
    username: req.body.username,
    ownerId: thisUser._id
  });
  thisUser.profileId = profile._id;
  thisUser.save();
  res.redirect('/profiles/home');
}

module.exports = {
    renderProfile,
    newProfile,
    create
}
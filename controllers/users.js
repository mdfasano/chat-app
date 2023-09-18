const User = require ('../models/user.js');

function profile (req, res, next) {
    res.render('users', { 
      title: 'Users',
      user: res.locals.user
    });
}

module.exports = {
    profile,
}
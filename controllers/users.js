const User = require ('../models/user.js');

function index (req, res, next) {
    res.render('/user', { 
      title: 'Users',
      user: res.locals.user
    });
}

function test (req, res) {
    console.log(res.locals)
    res.render('users/index', {
        title: 'titel',
        user: 'oo'
    });
}

module.exports = {
    index,
    test
}
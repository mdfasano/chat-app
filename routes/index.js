var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
  console.log(res.locals)
  res.render('index', {title: 'hello'})
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    // *********update these redirect links
    successRedirect: '/users/test',
    failureRedirect: '/users/test'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;

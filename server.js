var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
const User = require('./models/user');
const Profile = require ('./models/profile.js');

require('dotenv').config();
require('./config/database');
require('./config/passport');


var indexRouter = require('./routes/index');
var profilesRouter = require('./routes/profiles');
var postsRouter = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use("/css", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use("/js", express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// adds user to locals
// also adds profile to locals if it exists
app.use(async function (req, res, next) {
  res.locals.user = req.user;
  if (req.user && req.user.profileId !== null) {
  const profile = await Profile.findById(req.user.profileId);
  res.locals.profile = profile;
  }
  next();
});


//deal with authorization
app.use('/', indexRouter);

// if no logged in user, show the log in screen
app.use(function (req, res, next) {
  if (req.user) {
    next();
  }
  else {
    res.render('index.ejs');
  }
});

app.use('/profiles', profilesRouter);
app.use('/', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

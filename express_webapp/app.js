var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routers 
var indexRouter   = require('./routes/index');
var usersRouter   = require('./routes/users');
var connectRouter = require('./routes/connect');
var registerRouter  = require('./routes/register');
var uploadRouter    = require('./routes/upload');
var activityRouter  = require('./routes/activity');
const { activity }  = require('../sport-track-db/sport-track-db');

var app = express();

// INSERT INTO Users (email, password, first_name, last_name, birthday, gender, height, weight) VALUES ("bob@bob.com", "test", "abc", "abc", "20/20/2001", "MAN", 180, 80);
// INSERT INTO Activities (emailUser, date, description, distanceTotal, duration, startHour, endHour, cardioFreqMin, cardioFreqMax, cardioFreqAvg) VALUES ("bob@bob.com", "20/20/2020", "IUT -> RU", 1000, "0:15:00", "13:00:00", "13:15:00", 80, 100, 90);

global.appRoot = path.resolve(__dirname);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ABCDEFGH'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/connect', connectRouter);
app.use('/upload', uploadRouter);
app.use('/activities', activityRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

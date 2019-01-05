var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var sessions = require('express-session');


//
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setting for passport  & session
var Passport = require("./models/Passport");

app.use(Passport.initialize());
app.use(Passport.session())

app.use(sessions({  
  secret: '(!)*#(!JE)WJEqw09ej12',
  resave: false,
  saveUninitialized: true
}));
//


//Router for customer
var indexRouter = require('./routes/index');
var busCompanyRouter = require('./routes/Customer/BusCompany/busCompany');
var routesRouter = require('./routes/Customer/Routes/routes');
var tripsRouter = require('./routes/Customer/Trips/trips');
var paymentRouter = require('./routes/Payment/payment');
var signInRouter = require('./routes/Customer/Authentication/signin');
var profileRouter = require('./routes/Customer/Profile/profile');
var signOutRouter = require('./routes/signout');


app.use('/', indexRouter);
app.use('/busCompany', busCompanyRouter);
app.use('/busRoute', routesRouter);
app.use('/trips', tripsRouter);
app.use('/payment', paymentRouter);
app.use('/profile', profileRouter);

app.use('/signin', signInRouter);
app.use('/signout', signOutRouter);
//Router for admin





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
// module.exports.sqlConnection = sqlConnection

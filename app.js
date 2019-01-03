var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

//Router
var indexRouter = require('./routes/index');
var busCompanyRouter = require('./routes/BusCompany/busCompany');
var routesRouter = require('./routes/Routes/routes');
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


// //Create connection to MYSQL
// var sqlConnection = mysql.createConnection({
//   host:"127.0.0.1",
//   user: "root",
//   password: null,
//   database:"id5460038_busticket",
// })

// sqlConnection.connect(function(err) {
//   if (err) 
//    console.log(err);
//   else 
//     console.log("Connected!!!")
// });


// Api Web 
app.use('/', indexRouter);
app.use('/busCompany', busCompanyRouter);
app.use('/busRoute', routesRouter);
// app.use('/getRoutes', routes);

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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var createGroupRouter = require('./routes/createGroup');
var addExpenseRouter = require('./routes/addExpense');
var updateExpenseRouter = require('./routes/updateExpense');
var deleteExpenseRouter = require('./routes/deleteExpense');
var balanceExpenseRouter = require('./routes/balanceExpense');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/creategroup', createGroupRouter);
app.use('/addexpense', addExpenseRouter);
app.use('/updateexpense', updateExpenseRouter);
app.use('/deleteexpense', deleteExpenseRouter);
app.use('/balanceexpense', balanceExpenseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//global variables
list_obj = [];


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

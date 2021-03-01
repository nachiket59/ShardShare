var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testApi");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/testApi", testAPIRouter);

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

const mongoURL = "mongodb://ShardShareUser:seproject123@shardshare-shard-00-00.1a5qt.mongodb.net:27017,shardshare-shard-00-01.1a5qt.mongodb.net:27017,shardshare-shard-00-02.1a5qt.mongodb.net:27017/ShardShare?ssl=true&replicaSet=atlas-vfiwm5-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoURL, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
  console.log("Succesfully Connected To Database...");
}).catch((err)=>{
  console.log(err);
});

module.exports = app;
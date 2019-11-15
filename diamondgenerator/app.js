var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var shapeRouter = require('./routes/shapes');
var cutRouter = require('./routes/cuts');

var cors = require('cors');
var app = express();
app.use(express.static('/'))
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shapes', shapeRouter);
app.use('/cuts', cutRouter);

module.exports = app;
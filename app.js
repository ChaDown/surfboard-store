const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const surfboardModelRouter = require('./routes/surfboardModel');
const shaperRouter = require('./routes/shaper');
const createRouter = require('./routes/create');

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const { mainModule } = require('process');
mongoose.set('strictQuery', 'false');
const mongoDB =
  XXXXXXX;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/surfboardModel', surfboardModelRouter);
app.use('/shaper', shaperRouter);
app.use('/create', createRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const collections = Object.keys(mongoose.connection.collections);
console.log(collections);

module.exports = app;

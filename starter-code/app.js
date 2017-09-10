const express        = require("express");
const path           = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const bcrypt     	 = require("bcryptjs");
const session        = require("express-session");
const MongoSession   = require("connect-mongo")(session);
const app            = express();

//require routes
const index = require('./routes/index');
const users = require('./routes/users');
const authController = require('./routes/authController');

//Controllers

// Mongoose configuration
mongoose.connect("mongodb://localhost/linkedin");

// Middlewares configuration
app.use(logger("dev"));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout", "layouts/main-layout");
app.use(express.static(path.join(__dirname, "public")));

//Session Cookie
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoSession({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

//Routes
app.use("/", authController);
app.use('/', index);
app.use('/users', users);


// Authentication
app.use(cookieParser());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

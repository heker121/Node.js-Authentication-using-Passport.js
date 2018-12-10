const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport');

mongoose.connect("mongodb://localhost:27017/Authentication", {
  useNewUrlParser: true
});

var app = express();

const indexRouter = require('./routes/index');

app.use(require('express-session')({
  secret: "Top Secret",
  resave: false,
  saveUninitialized: false
}));
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

app.listen(3000, function() {
  console.log("Server is up and running");
});

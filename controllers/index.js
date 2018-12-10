const passport = require('passport'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose'),
  User = require('../models/user');



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));


exports.home = (req, res) => {
  res.render("home", {
    user: req.user
  });
};

exports.secret = (req, res) => {
  res.render("secret", {
    user: req.user
  });
};

exports.register = (req, res) => {
  res.render("register", {
    user: req.user
  });
};

exports.register_post = (req, res) => {
  req.body.password
  req.body.username
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/secret");

    });
  });
};

exports.login = (req, res) => {
  res.render("login", {
    user: req.user
  });
};

exports.login_post = passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

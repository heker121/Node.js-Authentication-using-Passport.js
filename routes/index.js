const express = require('express');
const router = express.Router();

const auth = require('../controllers/index');

router.get('/', auth.home);
router.get('/secret', isLoggedIn, auth.secret);
router.get('/logout', auth.logout);
router.get('/login', auth.login);
router.post('/login', auth.login_post);
router.get('/register/', auth.register);
router.post('/register/', auth.register_post);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;

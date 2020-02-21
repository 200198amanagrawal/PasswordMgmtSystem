var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Management System' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Password Management System' });
});

router.get('/passwordCategory', function(req, res, next) {
  res.render('password_category', { title: 'Password Management System' });
});

router.get('/add-new-category', function(req, res, next) {
  res.render('addNewCategory', { title: 'Password Management System' });
});

router.get('/add-new-password', function(req, res, next) {
  res.render('add-new-password', { title: 'Password Management System' });
});
router.get('/view-all-password', function(req, res, next) {
  res.render('view-all-password', { title: 'Password Management System' });
});
module.exports = router;

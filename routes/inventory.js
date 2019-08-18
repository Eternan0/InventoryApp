var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('inventory', {title: 'Here is the page where you will filter your item research'})
});

module.exports = router;

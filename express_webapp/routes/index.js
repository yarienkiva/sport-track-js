var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { active: 'home', auth: req.session.authenticated});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var user_dao = require('../../sport-track-db').user_dao;

router.get('/', function(req, res, next) {
	if (req.session.authenticated) {
		res.redirect('/');
	} else {

		res.render('register', { active: 'register' });
	}
});

module.exports = router;

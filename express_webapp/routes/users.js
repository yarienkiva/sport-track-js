var express = require('express');
var router = express.Router();
var user_dao = require('../../sport-track-db').user_dao;

router.get('/', function(req, res, next) {
	if (req.session.authenticated) {
		user_dao.findAll(function(err, rows) {
			if (err != null) {
				console.log("ERROR= " +err);
			} else {
				res.render('users', {active: 'users', data:rows});
			}
		});
	} else {
		res.write('<h1>Please login first.</h1>');
		res.end('<a href='+'/connect'+'>Login</a>'); 
	}
});

module.exports = router;

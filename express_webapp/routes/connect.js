var express = require('express');
var router = express.Router();
var user_dao = require('../../sport-track-db').user_dao;
// TODO add bcrypt support
// const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
	res.render('connect', {active: 'connect'});
});

router.post('/', function (req, res, next) {
	if (!req.body.email || !req.body.password) {
		res.redirect('/connect');
	}
	user_dao.findByKey(req.body.email, function(err, rows) {
		console.log(rows);
		if (err != null || rows === undefined || rows.length == 0) {
			res.redirect('/connect');
		} else {
//				bcrypt.compare(req.body.password, rows[0]['password'], function(err, res){
//				req.session.authenticated = true;
//				res.redirect('/users');
//			});
			if (req.body.password === rows[0]['password']) {
				req.session.email = req.body.email;
				req.session.authenticated = true;
				res.redirect('/');
			} else {
				res.redirect('/connect');
			}
		}
	});
});

router.get('/logout', (req,res) => {
	if (req.session.authenticated) {
	    req.session.destroy((err) => {
	        if(err) {
	            return console.log(err);
	        }
			res.write('<h1>Logged out</h1>');
			res.write('<a href='+'/connect'+'>Login</a>'); 
			res.end('<a href='+'/'+'></a>'); 
	    });
	}
	res.redirect('/');
});

// TODO get('/register') et post('/register')

module.exports = router;

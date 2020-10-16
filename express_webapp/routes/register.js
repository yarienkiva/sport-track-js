var bcrypt  = require('bcrypt');
var express = require('express');
var router  = express.Router();
var sport_track = require('../../sport-track-db');

var User = sport_track.user;
var user_dao = sport_track.user_dao;

/**
 * Affiche le formulaire d'inscription
 */
router.get('/', function(req, res) {
	if (req.session.authenticated) {
		return res.redirect('/');
	} else {
		res.render('register', { active: 'register' });
	}
});

/**
 * Insère le nouvel utilisateur dans la base de donnée si les données
 * fournis sont valides et si l'utilisateur n'existe pas déjà
 */
router.post('/', function(req, res) {
	if (req.session.authenticated) {
		res.redirect('/');
	} else {
		if (req.body.email == undefined || req.body.password == undefined || req.body.last_name == undefined ||  
			req.body.first_name == undefined || req.body.birthday == undefined || req.body.gender == undefined ||
			 req.body.height == undefined || req.body.weight == undefined) {
			res.status(500).render('error', {message: "Couldn't create user", error:{status: 500, stack: "A value wasn't enterred correctly"}});
		} else {
			let password = bcrypt.hashSync(req.body.password, 10);
			let new_user = new User(req.body.email, password, req.body.last_name, req.body.first_name, req.body.birthday, req.body.gender, req.body.height, req.body.weight);
			console.log(new_user);
			user_dao.findByKey(req.body.email, function(err, rows) {
				console.log(rows);
				if (err != null || rows == undefined || rows.length == 0) {
					user_dao.insert(new_user, function(err){
						if (err) res.status(500).render('error', {message: "Couldn't create user", error:{status: 500, stack: "A user with that email already exists"}});
						else res.redirect('/connect');
					});
				} else {
					return res.redirect('/register');
				}
			});
		}
	}
})

module.exports = router;

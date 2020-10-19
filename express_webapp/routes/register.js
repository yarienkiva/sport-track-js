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
		res.render('register', { active: 'register', auth: req.session.authenticated });
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
		let new_user = new User(req.body.email, req.body.password, req.body.last_name, req.body.first_name, req.body.birthday, req.body.gender, req.body.height, req.body.weight);

		console.log(new_user);
		if (!new_user.isValid()) {
			return res.status(400).render('register', {active: 'register', auth: req.session.authenticated, error: "Please fill in all fields"});
		
		} else {
			new_user.password = bcrypt.hashSync(req.body.password, 10);

			user_dao.findByKey(req.body.email, function(err, rows) {
				console.log(rows);
				if (err != null || rows == undefined || rows.length == 0) {
					user_dao.insert(new_user, function(err){
						if (err) {
							console.log(err);
							return res.status(500).render('register', {
								active: 'register',
								auth: req.session.authenticated, 
								error: "Couldn't create user, please contact an administrator"
							});
						}
						else res.redirect('/connect');
					});
				} else {
					return res.status(400).render('register', {
						active: 'register',
						auth: req.session.authenticated,
						error: "A user with that email already exists"
					});
				}
			});

		}
	}
})

module.exports = router;

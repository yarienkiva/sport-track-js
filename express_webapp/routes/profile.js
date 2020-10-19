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
	if (! req.session.authenticated) {
		return res.redirect('/register');
	} else {
		res.render('profile', { active: 'profile', user: req.session.user, auth: req.session.authenticated });
	}
});

/**
 * Update l'utilisateur dans la base de donnée si les données
 * fournis sont valides
 */
router.post('/', function(req, res) {
	if (!req.session.authenticated) {
		res.redirect('/register');
	} else {
		// console.log(req.body)
		let new_user = new User(req.body.email, req.body.password, req.body.last_name, req.body.first_name, req.body.birthday, req.body.gender, req.body.height, req.body.weight);
		if (!new_user.isValid()) {
			res.status(400).render('profile', {
				active: 'profile', error: "Please enter all the values.",
				auth: req.session.authenticated,
				user: req.session.user
			});

		} else if(bcrypt.compareSync(req.body.password, req.session.user.password)) {
			new_user.password = req.session.user.password;
			user_dao.update(new_user, function(err){
				if (err) res.status(500).render('profile', {
						active: 'profile', error: "Error while updating the profile.",
						auth: req.session.authenticated
					});
				else {
					req.session.user = new_user;
					res.render('profile', {active: 'profile', user: req.session.user, auth: req.session.authenticated});
				}
			});
		
		} else {
			res.status(400).render('profile', {
				active: 'profile', error: "Incorrect password",
				auth: req.session.authenticated,
				user: req.session.user
			});
		}
	}
})

module.exports = router;

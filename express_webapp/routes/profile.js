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
		if (req.body.email == undefined || req.body.password == undefined || req.body.last_name == undefined ||  
			req.body.first_name == undefined || req.body.birthday == undefined || req.body.gender == undefined ||
			 req.body.height == undefined || req.body.weight == undefined) {
			res.status(500).render('profile', {
				active: 'profile', error: "Please enter all the values.",
				auth: req.session.authenticated
			});
		} else {
			let password = bcrypt.hashSync(req.body.password, 10);
			let new_user = new User(req.body.email, password, req.body.last_name, req.body.first_name, req.body.birthday, req.body.gender, req.body.height, req.body.weight);
			user_dao.update(new_user, function(err){
				if (err) res.status(500).render('profile', {
						active: 'profile', error: "Error while updating the profile.", auth: req.session.authenticated
					});
				else {
					res.render('profile', {active: 'profile', auth: req.session.authenticated});
				}
			});
		}
	}
})

module.exports = router;

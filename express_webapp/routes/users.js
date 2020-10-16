var express = require('express');
var router = express.Router();
var user_dao = require('../../sport-track-db').user_dao;

/**
 * Affiche la liste de tous les utilisateurs
 */
router.get('/', function(req, res) {
	if (req.session.authenticated) {
		user_dao.findAll(function(err, rows) {
			if (err != null) {
				console.log("ERROR= " +err);
			} else {
				res.render('users', {active: 'users', data:rows, auth: req.session.authenticated});
			}
		});
	} else {
		res.redirect('connect');
	}
});

module.exports = router;

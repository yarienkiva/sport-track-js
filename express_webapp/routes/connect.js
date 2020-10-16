const bcrypt = require('bcrypt');
var express  = require('express');
var router   = express.Router();
var user_dao = require('../../sport-track-db').user_dao;

/**
 * Affiche le formulaire de connection
 */
router.get('/', function (req, res) {
<<<<<<< HEAD
	if (req.session.authenticated) {
		return res.redirect('/');
	} else {
		return res.render('connect', {active: 'connect'});
	}
||||||| 213ee70
	return res.render('connect', {active: 'connect'});
=======
	return res.render('connect', {active: 'connect', auth: req.session.authenticated});
>>>>>>> 47f09a91776bfd74eed724715a687dd1e146f5ce
});

/**
 * Connecte l'utilisateur en créant une session authentifiée
 */
router.post('/', function (req, res) {
	if (req.session.authenticated) {
		return res.redirect('/');
	}
	if (!req.body.email || !req.body.password) {
		return res.render('connect', {email: req.body.email, auth: req.session.authenticated});
	}
	user_dao.findByKey(req.body.email, function(err, rows) {
		if (err != null || rows === undefined || rows.length == 0) {
			return res.render('connect', {email: req.body.email, auth: req.session.authenticated});
		} else {
			if(bcrypt.compareSync(req.body.password, rows[0]['password'])) {
				req.session.email = req.body.email;
				req.session.authenticated = true;
				res.redirect('/');
			} else {
				return res.render('connect', {email: req.body.email, auth: req.session.authenticated});
			}
		}
	});
});

router.get('/logout', (req,res) => {
	if (req.session.authenticated) {
	    req.session.destroy((err) => {});
	}
	res.redirect('/');
});

module.exports = router;
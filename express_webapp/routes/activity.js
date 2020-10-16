var express = require('express');
var router = express.Router();
var activity_dao = require('../../sport-track-db').activity_dao;

/**
 * Affiche toutes les activitées d'un utilisateur
 */
router.get('/', function(req, res, next) {
    if (req.session.authenticated) {
        activity_dao.findByKey(req.session.email, function(err, rows) {
            if (err != null) {
                console.log("ERROR= " +err);
            } else {
                res.render('activities', {active: 'activities', data:rows});
            }
        });
    } else {
        res.redirect('connect');
    }
});

module.exports = router;

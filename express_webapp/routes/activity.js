var express = require('express');
var router = express.Router();
var activity_dao = require('../../sport-track-db').activity_dao;

function roundData (rows) {
    if (rows !== null && rows !== undefined) {
        rows.forEach(elem => {
            elem["distanceTotal"] = Math.round(elem["distanceTotal"]*10)/10;
            elem["cardioFreqMin"] = Math.round(elem["cardioFreqMin"]*10)/10;
            elem["cardioFreqMax"] = Math.round(elem["cardioFreqMax"]*10)/10;
            elem["cardioFreqAvg"] = Math.round(elem["cardioFreqAvg"]*10)/10;
        });
    }
}

/**
 * Affiche toutes les activitées d'un utilisateur
 */
router.get('/', function(req, res) {
    if (req.session.authenticated) {
        activity_dao.findByKey(req.session.email, function(err, rows) {
            if (err != null) {
                console.log("ERROR= " +err);
            } else {
                roundData(rows);
                res.render('activities', {active: 'activities', auth: req.session.authenticated, data: rows});
            }
        });
    } else {
        res.redirect('connect');
    }
});

module.exports = router;

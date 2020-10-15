const express = require('express');
var router = express.Router();

var activity_dao = require('../../sport-track-db').activity_dao;

// endpoint "/activities"
router.get('/', (req, res, next) => {
    if (req.session.authenticated !== true) {
        res.redirect('/connect');
    } else {
        activity_dao.findByKey(req.session.email, (err, row) => {
            if (err !== null) {
                console.log(error.message)
            } else {
                console.log(row);
                res.render('activities', {active: 'activities'});
            }
        });

    }
});

module.exports = router;
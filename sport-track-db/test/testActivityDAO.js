const sport_track = require('../sport-track-db');
const User = require('../models/Activity');
const Activity = require('../models/Activity');

var user_dao = sport_track.user_dao;
var activity_dao = sport_track.activity_dao;

var user1 = new User("bob@protonmail.com", "passw0rd", "alice", "bob", "01/01/2000", "MAN", 180, 80);
var act1 = new Activity(-1, "bob@protonmail.com", "01/01/2000", "IUT -> RU", 1200, 15, "15:30:00", "16:00:00", 80, 120, 100);

// INSERT
activity_dao.insert(act1, function (err) {
    if (err) {
        console.log("Error: " + err.message);
    } else {
        console.log("Activity inserted !");
        act1.actId = this.lastID;

        // UPDATE
        act1.description = "NOUVELLE DESC !!!!!!!!!!!!!!!!!!";
        activity_dao.update(act1, (err) => {
            if (err) {
                console.log("Error: " + err.message);
            } 
            else {
                console.log("Activity updated !");

                // FIND ALL
                console.log("DISPLAY THE ACTIVITY DATABASE:")
                activity_dao.findAll((err, rows) => {
                    if (err) { 
                        console.log(err.message);
                    } else {
                        console.log(rows);
                        
                        // FIND BY KEY
                        console.log("FIND ONLY ONE ACTIVITY:")
                        activity_dao.findByKey(act1.actId, (err, rows) => {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log(rows);

                                // DELETE
                                activity_dao.delete(act1, (err) => {
                                    if (err) {
                                        console.log(err.message)
                                    } else {
                                        console.log("Activity deleted !");
                                    }
                                })
                            }
                        })

                    }
                });

            }
        });

    }
});
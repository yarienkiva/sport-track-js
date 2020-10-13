const sport_track = require('../sport-track-db');
const ActivityEntry = require('../models/ActivityEntry');

var activityentry_dao = sport_track.activityentry_dao;
var actEntry1 = new ActivityEntry(-1, "13:30:00", 98, 2.301358, -2.453, 15.2, 1);
// hour, cardioFreq, latitude, longitude, altitude, activityId

// INSERT
activityentry_dao.insert(actEntry1, function (err) {
    if (err) {
        console.log("Error: " + err.message);
    } else {
        console.log("ActivityEntry inserted !");
        actEntry1.dataId = this.lastID;

        // UPDATE
        actEntry1.latitude = 10;
        actEntry1.longitude = 10;
        actEntry1.altitude = 10;
        activityentry_dao.update(actEntry1, (err) => {
            if (err) {
                console.log("Error: " + err.message);
            } 
            else {
                console.log("ActivityEntry updated !");

                // FIND ALL
                console.log("DISPLAY THE ACTIVITY ENTRY DATABASE:")
                activityentry_dao.findAll((err, rows) => {
                    if (err) { 
                        console.log(err.message);
                    } else {
                        console.log(rows);
                        
                        // FIND BY KEY
                        console.log("FIND ONLY ONE ACTIVITY ENTRY:")
                        activityentry_dao.findByKey(actEntry1.dataId, (err, rows) => {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log(rows);

                                // DELETE
                                activityentry_dao.delete(actEntry1, (err) => {
                                    if (err) {
                                        console.log(err.message)
                                    } else {
                                        console.log("ActivityEntry deleted !");
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
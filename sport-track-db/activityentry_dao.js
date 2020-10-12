var db = require('./sqlite_connection');

var ActivityEntryDAO = function(){
    
    this.insert = function(activityentry, callback){
        stmt = db.prepare("INSERT INTO ActivitiesData (activityId, hour, cardioFreq, latitude, longitude, altitude) VALUES (?,?,?,?,?,?)");
        stmt.run(activityentry.activityId, activityentry.hour, activityentry.cardioFreq, activityentry.latitude, activityentry.longitude, activityentry.altitude);
        stmt.finalize();
        callback();
    };

    this.update = function(activityentry, callback){
        stmt = db.prepare("UPDATE ActivitiesData SET activityId=?, hour=?, cardioFreq=?, latitude=?, longitude=?, altitude=? WHERE dataId=?;");
        stmt.run(activityentry.activityId, activityentry.hour, activityentry.cardioFreq, activityentry.latitude, activityentry.longitude, activityentry.altitude, activityentry.dataId);
        stmt.finalize();
        callback();
    };

    this.delete = function(activityentry, callback){
        stmt = db.prepare("DELETE FROM ActivitiesData WHERE dataId=?");
        stmt.run(activityentry.dataId);
        stmt.finalize();
        callback();
    };

    this.findAll = function(callback){
        db.all("SELECT * FROM ActivitiesData ORDER BY dataId", [], function(err, rows) {
            callback(err, rows);
        });
    };

    this.findByKey = function(activityentry, callback){
        db.all("SELECT * FROM ActivitiesData WHERE dataId=?", [activityentry.dataId], function(err, rows) {
            if(err) {
                console.err(err.message);
            } else {
                console.log("Row : " + rows);
                
                rows.forEach( function(row) {
                    console.log("Key : ("+key+") :");
                    callback(rows);
                });
            }
        });
    };
};

var dao = new ActivityEntryDAO();
module.exports = dao;
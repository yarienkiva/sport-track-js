var db = require('./sqlite_connection');

var ActivityEntryDAO = function(){
    
    this.insert = (actEntry, callback) => {
        let query = "INSERT INTO ActivitiesData (activityId, hour, cardioFreq, latitude, longitude, altitude) VALUES (?,?,?,?,?,?);";
        db.run(
            query,
            [actEntry.activityId, actEntry.hour, actEntry.cardioFreq, actEntry.latitude, actEntry.longitude, actEntry.altitude],
            callback
        );
    };

    this.update = (actEntry, callback) => {
        let query = "UPDATE ActivitiesData SET activityId=?, hour=?, cardioFreq=?, latitude=?, longitude=?, altitude=? WHERE dataId=?;";
        db.run(
            query,
            [actEntry.activityId, actEntry.hour, actEntry.cardioFreq, actEntry.latitude, actEntry.longitude, actEntry.altitude, actEntry.dataId],
            callback
        );
    };

    this.delete = (actEntry, callback) => {
        let query = "DELETE FROM ActivitiesData WHERE dataId=?;";
        db.run(
            query,
            [actEntry.dataId],
            callback
        );
    };

    this.findAll = (callback) => {
        let query = "SELECT * FROM ActivitiesData ORDER BY dataId;";
        db.all(
            query,
            [],
            callback
        );
    };

    this.findByKey = (actEntryId, callback) => {
        let query = "SELECT * FROM ActivitiesData WHERE dataId=?;";
        db.all(
            query,
            [actEntryId],
            callback
        );
    };
};

var dao = new ActivityEntryDAO();
module.exports = dao;